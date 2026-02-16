
import React, { useState, useEffect } from 'react';
import { AppView, SecurityConfig } from './types';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import SecurityLocks from './components/SecurityLocks';
import AIBehavior from './components/AIBehavior';
import IntruderLogs from './components/IntruderLogs';
import Settings from './components/Settings';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);
  const [config, setConfig] = useState<SecurityConfig>({
    isDualMode: false,
    secretModeActive: false,
    emotionLockEnabled: true,
    invisiblePatternEnabled: true,
    arLockEnabled: false,
  });

  // Handle Dual Personality state change visual effects
  const themeClass = config.secretModeActive 
    ? "from-purple-950 to-indigo-950" 
    : "from-slate-950 to-slate-900";

  return (
    <div className={`flex h-screen w-full bg-gradient-to-br ${themeClass} overflow-hidden transition-all duration-1000`}>
      <Sidebar 
        currentView={currentView} 
        onViewChange={setCurrentView} 
        config={config}
      />
      
      <main className="flex-1 flex flex-col overflow-y-auto p-4 md:p-8 relative">
        {/* Animated Background Gradients */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"></div>

        <header className="mb-8 z-10">
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            <span className="bg-blue-600 px-2 py-1 rounded-md text-sm">PRO</span>
            ROY APP LOCKER <span className="text-slate-500 font-light text-xl">| {currentView.replace('_', ' ')}</span>
          </h1>
          <p className="text-slate-400 mt-2">
            {config.secretModeActive ? "STRICT SECRET PROTOCOL ACTIVE" : "System Status: Secured & Operational"}
          </p>
        </header>

        <section className="flex-1 z-10">
          {currentView === AppView.DASHBOARD && <Dashboard config={config} />}
          {currentView === AppView.SECURITY_LOCKS && <SecurityLocks config={config} setConfig={setConfig} />}
          {currentView === AppView.AI_BEHAVIOR && <AIBehavior />}
          {currentView === AppView.INTRUDER_LOGS && <IntruderLogs />}
          {currentView === AppView.SETTINGS && <Settings config={config} setConfig={setConfig} />}
        </section>

        {/* Global Action Bar */}
        <div className="fixed bottom-6 right-6 flex gap-4">
            {config.isDualMode && (
                <button 
                    onClick={() => setConfig(prev => ({ ...prev, secretModeActive: !prev.secretModeActive }))}
                    className="bg-red-500/20 hover:bg-red-500/40 border border-red-500/50 backdrop-blur-xl text-red-100 px-6 py-3 rounded-full flex items-center gap-2 shadow-2xl transition-all font-bold"
                >
                    <i className="fas fa-key"></i>
                    {config.secretModeActive ? "EXIT SECRET MODE" : "ENTER SECRET MODE"}
                </button>
            )}
        </div>
      </main>
    </div>
  );
};

export default App;
