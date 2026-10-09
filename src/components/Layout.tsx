import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  Boxes,
  LayoutDashboard,
  PlusSquare,
  View,
  Sparkles,
  Users,
  GitCompare,
  Settings,
  LogOut,
  FolderKanban,
  PenTool,
  BookOpen,
  UserCircle2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import LanguageSelector from './LanguageSelector';

const HOMEOWNER_NAV = [
  { to: '/dashboard', labelKey: 'navDashboard', icon: LayoutDashboard, id: 'Dashboard' },
  { to: '/new-design', labelKey: 'navCreateDesign', icon: PlusSquare, id: 'Create Design' },
  { to: '/ar-preview', labelKey: 'navARPreview', icon: View, id: 'AR Preview' },
  { to: '/ai-assistant', labelKey: 'navAIAssistant', icon: Sparkles, id: 'Design Insights' },
  { to: '/collaboration', labelKey: 'navCollaboration', icon: Users, id: 'Collaboration' },
  { to: '/compare', labelKey: 'navCompare', icon: GitCompare, id: 'Compare' },
  { to: '/settings', labelKey: 'navSettings', icon: Settings, id: 'Settings' },
];

const DESIGNER_NAV = [
  { to: '/designer/projects', labelKey: 'navDesignerProjects', icon: FolderKanban, id: 'Projects & Approvals' },
  { to: '/designer/studio', labelKey: 'navDesignerStudio', icon: PenTool, id: 'Design Studio' },
  { to: '/designer/library', labelKey: 'navDesignerLibrary', icon: BookOpen, id: 'Material Library' },
  { to: '/designer/profile', labelKey: 'navDesignerProfile', icon: UserCircle2, id: 'My Profile' },
  { to: '/settings', labelKey: 'navSettings', icon: Settings, id: 'Settings' },
];

const CRUMB_KEYS: Record<string, string[]> = {
  '/dashboard': ['crumbWorkspace', 'navDashboard'],
  '/new-design': ['crumbWorkspace', 'navCreateDesign'],
  '/room-photos': ['navCreateDesign', 'crumbRoomPhotos'],
  '/room-setup': ['navCreateDesign', 'crumbRoomSetup'],
  '/editor': ['crumbDesign', 'crumb3DEditor'],
  '/customize': ['crumbDesign', 'crumbCustomization'],
  '/ar-preview': ['crumbDesign', 'navARPreview'],
  '/ai-assistant': ['crumbDesign', 'navAIAssistant'],
  '/collaboration': ['crumbDesign', 'navCollaboration'],
  '/compare': ['crumbReview', 'crumbCompareApproval'],
  '/settings': ['crumbAccount', 'crumbA11yDisplay'],
  '/designer/projects': ['crumbDesigner', 'navDesignerProjects'],
  '/designer/studio': ['crumbDesigner', 'navDesignerStudio'],
  '/designer/library': ['crumbDesigner', 'navDesignerLibrary'],
  '/designer/profile': ['crumbDesigner', 'navDesignerProfile'],
};

export default function Layout() {
  const { state, dispatch, t } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const crumbKeys = CRUMB_KEYS[location.pathname] ?? ['crumbWorkspace'];
  const initials = (state.user?.name ?? 'RS')
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2);

  const isDesigner = state.user?.role === 'designer';
  const navItems = isDesigner ? DESIGNER_NAV : HOMEOWNER_NAV;

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="sidebar-logo">
            <Boxes size={18} />
          </div>
          <div>
            <strong>{t('appName')}</strong>
            <span>{isDesigner ? (t('designerPortal') || 'Designer Portal') : t('appTagline')}</span>
          </div>
        </div>

        {isDesigner && (
          <div style={{
            margin: '0 0.75rem 0.5rem',
            padding: '0.4rem 0.75rem',
            background: 'linear-gradient(135deg, rgba(0,212,180,0.15), rgba(118,0,255,0.15))',
            borderRadius: '0.6rem',
            border: '1px solid rgba(0,212,180,0.2)',
            fontSize: '0.72rem',
            color: 'var(--teal)',
            textAlign: 'center',
            fontWeight: 600,
            letterSpacing: '0.04em',
          }}>
            ✦ {t('designerMode') || 'DESIGNER MODE'}
          </div>
        )}

        <nav className="sidebar-nav">
          {navItems.map(({ to, labelKey, icon: Icon, id }) => (
            <NavLink
              key={id}
              to={to}
              className={({ isActive }) =>
                `nav-link${isActive ? ' active' : ''}`
              }
            >
              <Icon size={18} />
              <span>{t(labelKey) || id}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-user">
          <div className="avatar">{initials}</div>
          <div>
            <strong>{state.user?.name ?? 'Riya Sharma'}</strong>
            <span>
              {isDesigner ? t('designerRole') : t('homeownerRole')}
            </span>
          </div>
        </div>
        <button
          className="nav-link"
          onClick={() => {
            dispatch({ type: 'LOGOUT' });
            navigate('/');
          }}
        >
          <LogOut size={18} />
          <span>{t('signOut')}</span>
        </button>
      </aside>

      <div className="main-area">
        <header className="topbar">
          <div className="breadcrumb">
            {crumbKeys.map((key, i) => (
              <span key={key}>
                {i > 0 && <span aria-hidden> / </span>}
                {i === crumbKeys.length - 1 ? (
                  <strong>{t(key) || key}</strong>
                ) : (
                  t(key) || key
                )}
              </span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center' }}>
            <LanguageSelector variant="compact" />
            <span className="badge badge-teal">
              {state.project.name || t('untitledProject')}
            </span>
            <button className="btn btn-secondary" onClick={() => navigate(-1)}>
              {t('backBtn')}
            </button>
          </div>
        </header>
        <main className="page">
          <Outlet />
        </main>
      </div>

      {state.saveToast && <div className="app-toast">{state.saveToast}</div>}
    </div>
  );
}

