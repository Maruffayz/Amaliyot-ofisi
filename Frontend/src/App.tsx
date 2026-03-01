import React, { useEffect, useState } from 'react';
import LandingPage from './components/LandingPage';
import AdminDashboard from './components/AdminDashboard';
import InternSubmission from './components/InternSubmission';
import AnalyticsReport from './components/AnalyticsReport';
import Onboarding from './components/Onboarding';
import AuthPage from './components/AuthPage';
import PartnershipForm from './components/PartnershipForm';
import UserWorkspace from './components/UserWorkspace';

type ViewState =
  | 'landing'
  | 'admin'
  | 'submission'
  | 'analytics'
  | 'onboarding'
  | 'auth'        // user auth
  | 'adminAuth'   // admin auth
  | 'partnership'
  | 'workspace';

export default function App() {
  const getViewFromLocation = (): ViewState => {
    const path = window.location.pathname;
    switch (path) {
      case '/auth':
        return 'auth';
      case '/admin':
        // Dedicated admin auth URL
        return 'adminAuth';
      case '/admin/dashboard':
        return 'admin';
      case '/workspace':
        return 'workspace';
      case '/submission':
        return 'submission';
      case '/analytics':
        return 'analytics';
      case '/onboarding':
        return 'onboarding';
      case '/partnership':
        return 'partnership';
      case '/':
      default:
        return 'landing';
    }
  };

  const getPathForView = (view: ViewState): string => {
    switch (view) {
      case 'auth':
        // Canonical path for user auth
        return '/auth';
      case 'adminAuth':
        // Canonical path for admin auth
        return '/admin';
      case 'workspace':
        return '/workspace';
      case 'admin':
        return '/admin/dashboard';
      case 'submission':
        return '/submission';
      case 'analytics':
        return '/analytics';
      case 'onboarding':
        return '/onboarding';
      case 'partnership':
        return '/partnership';
      case 'landing':
      default:
        return '/';
    }
  };

  const [currentView, setCurrentView] = useState<ViewState>(getViewFromLocation);

  // Navigation function that updates both state and URL
  const navigate = (view: ViewState) => {
    const path = getPathForView(view);
    if (window.location.pathname !== path) {
      window.history.pushState({ view }, '', path);
    }
    setCurrentView(view);
  };

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentView(getViewFromLocation());
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Simple selector for the demo
  const NavigationOverlay = () => (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] bg-black/80 backdrop-blur-md p-2 rounded-full border border-white/10 shadow-2xl flex gap-1 overflow-x-auto max-w-[90vw]">
      <NavButton view="landing" icon="home" label="Home" />
      <NavButton view="auth" icon="lock" label="User Login" />
      <NavButton view="adminAuth" icon="admin_panel_settings" label="Admin Login" />
      <NavButton view="workspace" icon="workspace_premium" label="Workspace" />
      <NavButton view="admin" icon="dashboard" label="Admin" />
      <NavButton view="submission" icon="edit_document" label="Submit" />
      <NavButton view="analytics" icon="analytics" label="Analytics" />
      <NavButton view="onboarding" icon="waving_hand" label="Onboard" />
    </div>
  );

  const NavButton = ({ view, icon, label }: { view: ViewState; icon: string; label: string }) => (
    <button
      onClick={() => navigate(view)}
      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
        currentView === view
          ? 'bg-accent text-primary shadow-[0_0_15px_rgba(255,214,1,0.5)]'
          : 'text-white/70 hover:bg-white/10 hover:text-white'
      }`}
    >
      <span className="material-symbols-outlined text-[18px]">{icon}</span>
      {label}
    </button>
  );

  return (
    <div className="relative min-h-screen">
      {currentView === 'landing' && <LandingPage onNavigate={navigate} />}
      {currentView === 'admin' && <AdminDashboard onNavigate={navigate} />}
      {currentView === 'workspace' && <UserWorkspace />}
      {currentView === 'submission' && <InternSubmission onNavigate={navigate} />}
      {currentView === 'analytics' && <AnalyticsReport onNavigate={navigate} />}
      {currentView === 'onboarding' && <Onboarding onNavigate={navigate} />}
      {/* User auth → UserWorkspace */}
      {currentView === 'auth' && (
        <AuthPage onLogin={() => navigate('workspace')} onNavigate={navigate} />
      )}
      {/* Admin auth → AdminDashboard */}
      {currentView === 'adminAuth' && (
        <AuthPage onLogin={() => navigate('admin')} onNavigate={navigate} />
      )}
      {currentView === 'partnership' && <PartnershipForm onNavigate={navigate} />}
    </div>
  );
}