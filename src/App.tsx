import type { ReactNode } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import NewDesign from './pages/NewDesign';
import RoomPhotoBrowser from './pages/RoomPhotoBrowser';
import RoomSetup from './pages/RoomSetup';
import Editor from './pages/Editor';
import FurnitureCustomization from './pages/FurnitureCustomization';
import ARPreview from './pages/ARPreview';
import AIAssistant from './pages/AIAssistant';
import Collaboration from './pages/Collaboration';
import Compare from './pages/Compare';
import Accessibility from './pages/Accessibility';
import DesignerProjects from './pages/DesignerProjects';
import DesignerStudio from './pages/DesignerStudio';
import DesignerLibrary from './pages/DesignerLibrary';
import DesignerProfile from './pages/DesignerProfile';

function Protected({ children }: { children: ReactNode }) {
  const { state } = useApp();
  if (!state.user) return <Navigate to="/login" replace />;
  return children;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route
        element={
          <Protected>
            <Layout />
          </Protected>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/new-design" element={<NewDesign />} />
        <Route path="/room-photos" element={<RoomPhotoBrowser />} />
        <Route path="/room-setup" element={<RoomSetup />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/customize" element={<FurnitureCustomization />} />
        <Route path="/ar-preview" element={<ARPreview />} />
        <Route path="/ai-assistant" element={<AIAssistant />} />
        <Route path="/collaboration" element={<Collaboration />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/settings" element={<Accessibility />} />
        {/* Designer-only pages */}
        <Route path="/designer/projects" element={<DesignerProjects />} />
        <Route path="/designer/studio" element={<DesignerStudio />} />
        <Route path="/designer/library" element={<DesignerLibrary />} />
        <Route path="/designer/profile" element={<DesignerProfile />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}
