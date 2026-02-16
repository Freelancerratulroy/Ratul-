
import React from 'react';
import { AppView, SecurityConfig } from '../types';

interface SidebarProps {
  currentView: AppView;
  onViewChange: (view: AppView) => void;
  config: SecurityConfig;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange, config }) => {
  const menuItems = [
    { id: AppView.DASHBOARD, label: 'Control Center', icon: 'fa-chart-line' },
    { id: AppView.SECURITY_LOCKS, label: 'Security Protocols', icon: 'fa-shield-halved' },
    { id: AppView.AI_BEHAVIOR, label: 'AI Psych Engine', icon: 'fa-brain' },
    { id: AppView.INTRUDER_LOGS, label: 'Intruder Reports', icon: 'fa-user-secret' },
    { id: AppView.SETTINGS, label: 'System Settings', icon: 'fa-gear' },
  ];

  return (
    <aside className="w-20 md:w-64 bg-slate-900/50 backdrop-blur-2xl border-r border-slate-800 flex flex-col transition-all">
      <div className="p-6 flex items-center justify-center md:justify-start gap-3">
        <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
          <i className="fas fa-shield-virus text-white text-xl"></i>
        </div>
        <span className="hidden md:block font-black text-xl tracking-tighter">ROY LOCK</span>
      </div>

      <nav className="flex-1 mt-4 px-3 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`w-full flex items-center justify-center md:justify-start gap-4 p-3 rounded-xl transition-all group ${
              currentView === item.id 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <i className={`fas ${item.icon} text-lg w-6`}></i>
            <span className="hidden md:block font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 mt-auto">
        <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700 hidden md:block">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            System Health
          </div>
          <div className="space-y-2">
            <div className="h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 w-[94%]"></div>
            </div>
            <p className="text-[10px] text-slate-400">Memory: 242MB / 1.2GB</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
