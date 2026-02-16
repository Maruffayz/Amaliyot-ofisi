import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import AdminDashboard from './components/AdminDashboard';
import InternSubmission from './components/InternSubmission';
import AnalyticsReport from './components/AnalyticsReport';
import Onboarding from './components/Onboarding';
import AuthPage from './components/AuthPage';

type ViewState = 'landing' | 'admin' | 'submission' | 'analytics' | 'onboarding' | 'auth';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('landing');

  // Navigation function that can be passed to components
  const navigate = (view: ViewState) => {
    setCurrentView(view);
  };

  // Simple selector for the demo
  const NavigationOverlay = () => (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] bg-black/80 backdrop-blur-md p-2 rounded-full border border-white/10 shadow-2xl flex gap-1 overflow-x-auto max-w-[90vw]">
      <NavButton view="landing" icon="home" label="Home" />
      <NavButton view="auth" icon="lock" label="Auth" />
      <NavButton view="admin" icon="admin_panel_settings" label="Admin" />
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
      {currentView === 'landing' && <LandingPage onNavigate={() => navigate('auth')} />}
      {currentView === 'admin' && <AdminDashboard onNavigate={navigate} />}
      {currentView === 'submission' && <InternSubmission onNavigate={navigate} />}
      {currentView === 'analytics' && <AnalyticsReport onNavigate={navigate} />}
      {currentView === 'onboarding' && <Onboarding onNavigate={navigate} />}
      {currentView === 'auth' && <AuthPage onLogin={() => navigate('admin')} onNavigate={navigate} />}
    </div>
  );
}