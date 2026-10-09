import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type Dispatch,
  type ReactNode,
} from 'react';
import { FURNITURE, type FurnitureItem, type RoomPhoto } from '../data/catalog';
import { getTranslation, type Language } from '../data/translations';

export type UserRole = 'homeowner' | 'designer';

export interface PlacedFurniture {
  instanceId: string;
  furnitureId: string;
  color: string;
  colorHex: string;
  material: string;
  size: 'Small' | 'Medium' | 'Large';
  x: number;
  y: number;
  rotation: number;
  scale: number;
  scaleX?: number;
  scaleY?: number;
  flipX?: boolean;
  stickerStyle?: 'diecut' | 'seamless';
}

export interface AccessibilitySettings {
  highContrast: boolean;
  textSize: 'small' | 'medium' | 'large';
  reduceMotion: boolean;
  largerControls: boolean;
  colorBlind: boolean;
  showColorLabels: boolean;
  increaseBorders: boolean;
}

export interface Comment {
  id: string;
  author: string;
  role: string;
  text: string;
  status: 'open' | 'resolved';
  replies: { id: string; author: string; text: string }[];
  markerX: number;
  markerY: number;
}

export interface ProjectSetup {
  name: string;
  roomType: string;
  style: string;
  budget: string;
}

export interface ARCapture {
  id: string;
  image: string;
  label: string;
  createdAt: number;
}

interface AppState {
  user: { name: string; role: UserRole; email: string } | null;
  selectedRole: UserRole;
  project: ProjectSetup;
  selectedRoom: RoomPhoto | null;
  uploadedRoomUrl: string | null;
  placedFurniture: PlacedFurniture[];
  selectedInstanceId: string | null;
  customizingId: string | null;
  scanState: 'idle' | 'scanning' | 'complete';
  scanKey: number;
  designApproved: boolean;
  saveToast: string | null;
  comments: Comment[];
  syncStatus: 'synced' | 'syncing';
  accessibility: AccessibilitySettings;
  history: PlacedFurniture[][];
  historyIndex: number;
  aiAddedIds: string[];
  arCaptures: ARCapture[];
  language: Language;
}

type Action =
  | { type: 'SET_ROLE'; role: UserRole }
  | { type: 'LOGIN'; email: string; role: UserRole }
  | { type: 'LOGOUT' }
  | { type: 'SET_PROJECT'; project: Partial<ProjectSetup> }
  | { type: 'SET_ROOM'; room: RoomPhoto }
  | { type: 'UPLOAD_ROOM'; url: string }
  | { type: 'SET_SCAN'; state: AppState['scanState'] }
  | { type: 'RESCAN' }
  | { type: 'ADD_FURNITURE'; item: FurnitureItem; color?: string; colorHex?: string }
  | { type: 'SELECT_INSTANCE'; id: string | null }
  | { type: 'DELETE_INSTANCE'; id: string }
  | { type: 'UPDATE_INSTANCE'; id: string; updates: Partial<PlacedFurniture> }
  | { type: 'SET_COLOR'; id: string; color: string; colorHex: string }
  | { type: 'SET_CUSTOMIZING'; id: string | null }
  | { type: 'APPLY_CUSTOMIZATION'; id: string; updates: Partial<PlacedFurniture> }
  | { type: 'UNDO' }
  | { type: 'REDO' }
  | { type: 'SAVE'; message?: string }
  | { type: 'CLEAR_TOAST' }
  | { type: 'APPROVE_DESIGN' }
  | { type: 'REQUEST_CHANGES' }
  | { type: 'ADD_COMMENT'; text: string }
  | { type: 'REPLY_COMMENT'; id: string; text: string }
  | { type: 'RESOLVE_COMMENT'; id: string }
  | { type: 'SET_SYNC'; status: 'synced' | 'syncing' }
  | { type: 'SET_A11Y'; settings: Partial<AccessibilitySettings> }
  | { type: 'RESET_A11Y' }
  | { type: 'AI_ADD'; furnitureId: string }
  | { type: 'ADD_AR_CAPTURE'; image: string; label?: string }
  | { type: 'DELETE_AR_CAPTURE'; id: string }
  | { type: 'SET_LANGUAGE'; language: Language };

const defaultA11y: AccessibilitySettings = {
  highContrast: false,
  textSize: 'medium',
  reduceMotion: false,
  largerControls: false,
  colorBlind: false,
  showColorLabels: false,
  increaseBorders: false,
};

const defaultComments: Comment[] = [
  {
    id: 'c1',
    author: 'Arjun Mehta',
    role: 'Interior Designer',
    text: 'Consider shifting the sofa 12" left to open the walkway toward the balcony.',
    status: 'open',
    replies: [],
    markerX: 42,
    markerY: 58,
  },
  {
    id: 'c2',
    author: 'Riya Sharma',
    role: 'Homeowner',
    text: 'Love the warm palette — can we try olive on the accent chair?',
    status: 'open',
    replies: [
      {
        id: 'r1',
        author: 'Arjun Mehta',
        text: 'Absolutely — I’ll swap the fabric option in the editor.',
      },
    ],
    markerX: 68,
    markerY: 40,
  },
  {
    id: 'c3',
    author: 'Arjun Mehta',
    role: 'Interior Designer',
    text: 'Lighting plan approved for the pendant above the coffee table.',
    status: 'resolved',
    replies: [],
    markerX: 55,
    markerY: 28,
  },
];

function initialPlaced(): PlacedFurniture[] {
  const sofa = FURNITURE[0];
  const table = FURNITURE[2];
  const lamp = FURNITURE[6];
  return [
    {
      instanceId: 'inst-sofa',
      furnitureId: sofa.id,
      color: sofa.colors[0].name,
      colorHex: sofa.colors[0].hex,
      material: sofa.material,
      size: 'Medium',
      x: 38,
      y: 58,
      rotation: 0,
      scale: 1,
      scaleX: 1,
      scaleY: 1,
      flipX: false,
      stickerStyle: 'diecut',
    },
    {
      instanceId: 'inst-table',
      furnitureId: table.id,
      color: table.colors[0].name,
      colorHex: table.colors[0].hex,
      material: table.material,
      size: 'Medium',
      x: 52,
      y: 68,
      rotation: 0,
      scale: 0.85,
      scaleX: 1,
      scaleY: 1,
      flipX: false,
      stickerStyle: 'diecut',
    },
    {
      instanceId: 'inst-lamp',
      furnitureId: lamp.id,
      color: lamp.colors[0].name,
      colorHex: lamp.colors[0].hex,
      material: lamp.material,
      size: 'Medium',
      x: 72,
      y: 48,
      rotation: 0,
      scale: 0.7,
      scaleX: 1,
      scaleY: 1,
      flipX: false,
      stickerStyle: 'diecut',
    },
  ];
}

const initialState: AppState = {
  user: null,
  selectedRole: 'homeowner',
  project: {
    name: 'Modern Living Room',
    roomType: 'Living Room',
    style: 'Modern',
    budget: '10000',
  },
  selectedRoom: null,
  uploadedRoomUrl: null,
  placedFurniture: initialPlaced(),
  selectedInstanceId: 'inst-sofa',
  customizingId: null,
  scanState: 'idle',
  scanKey: 0,
  designApproved: false,
  saveToast: null,
  comments: defaultComments,
  syncStatus: 'synced',
  accessibility: defaultA11y,
  history: [initialPlaced()],
  historyIndex: 0,
  aiAddedIds: [],
  arCaptures: [],
  language: (localStorage.getItem('app_language') as Language) || 'en',
};

function pushHistory(state: AppState, placed: PlacedFurniture[]): AppState {
  const history = state.history.slice(0, state.historyIndex + 1);
  history.push(placed);
  return {
    ...state,
    placedFurniture: placed,
    history,
    historyIndex: history.length - 1,
  };
}

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_ROLE':
      return { ...state, selectedRole: action.role };
    case 'LOGIN': {
      const name =
        action.role === 'designer' ? 'Arjun Mehta' : 'Riya Sharma';
      return {
        ...state,
        selectedRole: action.role,
        user: { name, role: action.role, email: action.email },
      };
    }
    case 'LOGOUT':
      return { ...state, user: null };
    case 'SET_PROJECT':
      return { ...state, project: { ...state.project, ...action.project } };
    case 'SET_ROOM':
      return {
        ...state,
        selectedRoom: action.room,
        uploadedRoomUrl: null,
        scanState: 'idle',
      };
    case 'UPLOAD_ROOM':
      return {
        ...state,
        uploadedRoomUrl: action.url,
        selectedRoom: {
          id: 'uploaded',
          name: 'Uploaded Room',
          category: 'Living Room',
          image: action.url,
          size: 'Custom',
        },
        scanState: 'idle',
      };
    case 'SET_SCAN':
      return { ...state, scanState: action.state };
    case 'RESCAN':
      return {
        ...state,
        scanState: 'scanning',
        scanKey: state.scanKey + 1,
      };
    case 'ADD_FURNITURE': {
      const color = action.color ?? action.item.colors[0].name;
      const colorHex = action.colorHex ?? action.item.colors[0].hex;
      const next: PlacedFurniture = {
        instanceId: `inst-${Date.now()}`,
        furnitureId: action.item.id,
        color,
        colorHex,
        material: action.item.material,
        size: 'Medium',
        x: 45 + Math.random() * 20,
        y: 50 + Math.random() * 15,
        rotation: 0,
        scale: 1,
        scaleX: 1,
        scaleY: 1,
        flipX: false,
        stickerStyle: 'diecut',
      };
      const placed = [...state.placedFurniture, next];
      return {
        ...pushHistory(state, placed),
        selectedInstanceId: next.instanceId,
        saveToast: `${action.item.name} added to design`,
      };
    }
    case 'SELECT_INSTANCE':
      return { ...state, selectedInstanceId: action.id };
    case 'DELETE_INSTANCE': {
      const placed = state.placedFurniture.filter(
        (p) => p.instanceId !== action.id,
      );
      const nextSelected =
        state.selectedInstanceId === action.id
          ? (placed[0]?.instanceId ?? null)
          : state.selectedInstanceId;
      return {
        ...pushHistory(state, placed),
        selectedInstanceId: nextSelected,
        customizingId:
          state.customizingId === action.id ? null : state.customizingId,
        saveToast: 'Furniture removed from design',
      };
    }
    case 'UPDATE_INSTANCE': {
      const placed = state.placedFurniture.map((p) =>
        p.instanceId === action.id ? { ...p, ...action.updates } : p,
      );
      return pushHistory(state, placed);
    }
    case 'SET_COLOR': {
      const placed = state.placedFurniture.map((p) =>
        p.instanceId === action.id
          ? { ...p, color: action.color, colorHex: action.colorHex }
          : p,
      );
      return pushHistory(state, placed);
    }
    case 'SET_CUSTOMIZING':
      return { ...state, customizingId: action.id };
    case 'APPLY_CUSTOMIZATION': {
      const placed = state.placedFurniture.map((p) =>
        p.instanceId === action.id ? { ...p, ...action.updates } : p,
      );
      return {
        ...pushHistory(state, placed),
        saveToast: 'Furniture customization saved',
      };
    }
    case 'UNDO': {
      if (state.historyIndex <= 0) return state;
      const historyIndex = state.historyIndex - 1;
      return {
        ...state,
        historyIndex,
        placedFurniture: state.history[historyIndex],
      };
    }
    case 'REDO': {
      if (state.historyIndex >= state.history.length - 1) return state;
      const historyIndex = state.historyIndex + 1;
      return {
        ...state,
        historyIndex,
        placedFurniture: state.history[historyIndex],
      };
    }
    case 'SAVE':
      return {
        ...state,
        saveToast: action.message ?? 'Design saved',
        syncStatus: 'synced',
      };
    case 'CLEAR_TOAST':
      return { ...state, saveToast: null };
    case 'APPROVE_DESIGN':
      return { ...state, designApproved: true };
    case 'REQUEST_CHANGES':
      return {
        ...state,
        designApproved: false,
        saveToast: 'Change request sent to Arjun Mehta',
      };
    case 'ADD_COMMENT': {
      const comment: Comment = {
        id: `c-${Date.now()}`,
        author: state.user?.name ?? 'Riya Sharma',
        role:
          state.user?.role === 'designer'
            ? 'Interior Designer'
            : 'Homeowner',
        text: action.text,
        status: 'open',
        replies: [],
        markerX: 30 + Math.random() * 40,
        markerY: 30 + Math.random() * 40,
      };
      return {
        ...state,
        comments: [comment, ...state.comments],
        syncStatus: 'syncing',
      };
    }
    case 'REPLY_COMMENT': {
      const comments = state.comments.map((c) =>
        c.id === action.id
          ? {
              ...c,
              replies: [
                ...c.replies,
                {
                  id: `r-${Date.now()}`,
                  author: state.user?.name ?? 'Riya Sharma',
                  text: action.text,
                },
              ],
            }
          : c,
      );
      return { ...state, comments, syncStatus: 'syncing' };
    }
    case 'RESOLVE_COMMENT': {
      const comments = state.comments.map((c) =>
        c.id === action.id ? { ...c, status: 'resolved' as const } : c,
      );
      return { ...state, comments, syncStatus: 'syncing' };
    }
    case 'SET_SYNC':
      return { ...state, syncStatus: action.status };
    case 'SET_A11Y':
      return {
        ...state,
        accessibility: { ...state.accessibility, ...action.settings },
      };
    case 'RESET_A11Y':
      return { ...state, accessibility: defaultA11y };
    case 'AI_ADD': {
      const item = FURNITURE.find((f) => f.id === action.furnitureId);
      if (!item) return state;
      if (state.aiAddedIds.includes(action.furnitureId)) {
        return {
          ...state,
          saveToast: 'Already added from AI recommendations',
        };
      }
      const next: PlacedFurniture = {
        instanceId: `ai-${Date.now()}`,
        furnitureId: item.id,
        color: item.colors[0].name,
        colorHex: item.colors[0].hex,
        material: item.material,
        size: 'Medium',
        x: 40 + Math.random() * 25,
        y: 45 + Math.random() * 20,
        rotation: 0,
        scale: 1,
      };
      return {
        ...pushHistory(state, [...state.placedFurniture, next]),
        aiAddedIds: [...state.aiAddedIds, action.furnitureId],
        selectedInstanceId: next.instanceId,
        saveToast: `${item.name} added from AI Assistant`,
      };
    }
    case 'ADD_AR_CAPTURE': {
      const capture: ARCapture = {
        id: `cap-${Date.now()}`,
        image: action.image,
        label: action.label ?? `AR Capture ${state.arCaptures.length + 1}`,
        createdAt: Date.now(),
      };
      return {
        ...state,
        arCaptures: [capture, ...state.arCaptures],
        saveToast: 'AR frame captured',
      };
    }
    case 'DELETE_AR_CAPTURE':
      return {
        ...state,
        arCaptures: state.arCaptures.filter((c) => c.id !== action.id),
        saveToast: 'Capture deleted',
      };
    case 'SET_LANGUAGE': {
      localStorage.setItem('app_language', action.language);
      const toastMap: Record<Language, string> = {
        en: 'Language changed to English',
        hi: 'भाषा हिंदी में बदली गई',
        mr: 'भाषा मराठी मध्ये बदलली',
      };
      return {
        ...state,
        language: action.language,
        saveToast: toastMap[action.language],
      };
    }
    default:
      return state;
  }
}

interface AppContextValue {
  state: AppState;
  dispatch: Dispatch<Action>;
  getFurniture: (id: string) => FurnitureItem | undefined;
  roomImage: string;
  t: (key: string) => string;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const roomImage =
    state.uploadedRoomUrl ||
    state.selectedRoom?.image ||
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1400&q=80';

  useEffect(() => {
    const root = document.documentElement;
    const a = state.accessibility;
    root.dataset.contrast = a.highContrast ? 'high' : 'normal';
    root.dataset.textSize = a.textSize;
    root.dataset.reduceMotion = a.reduceMotion ? 'true' : 'false';
    root.dataset.largerControls = a.largerControls ? 'true' : 'false';
    root.dataset.colorBlind = a.colorBlind ? 'true' : 'false';
    root.dataset.colorLabels = a.showColorLabels ? 'true' : 'false';
    root.dataset.borders = a.increaseBorders ? 'true' : 'false';
  }, [state.accessibility]);

  useEffect(() => {
    if (!state.saveToast) return;
    const t = setTimeout(() => dispatch({ type: 'CLEAR_TOAST' }), 2600);
    return () => clearTimeout(t);
  }, [state.saveToast]);

  useEffect(() => {
    if (state.syncStatus !== 'syncing') return;
    const t = setTimeout(
      () => dispatch({ type: 'SET_SYNC', status: 'synced' }),
      900,
    );
    return () => clearTimeout(t);
  }, [state.syncStatus]);

  useEffect(() => {
    if (state.scanState !== 'scanning') return;
    const t = setTimeout(
      () => dispatch({ type: 'SET_SCAN', state: 'complete' }),
      1800,
    );
    return () => clearTimeout(t);
  }, [state.scanState, state.scanKey]);

  const t = (key: string) => getTranslation(state.language || 'en', key);

  const value = useMemo(
    () => ({
      state,
      dispatch,
      getFurniture: (id: string) => FURNITURE.find((f) => f.id === id),
      roomImage,
      t,
    }),
    [state, roomImage],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
