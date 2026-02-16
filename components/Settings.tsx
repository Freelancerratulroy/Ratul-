
import React from 'react';
import { SecurityConfig } from '../types';

interface SettingsProps {
  config: SecurityConfig;
  setConfig: React.Dispatch<React.SetStateAction<SecurityConfig>>;
}

const Settings: React.FC<SettingsProps> = ({ config, setConfig }) => {
  return (
    <div className="max-w-4xl space-y-8">
      <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-3xl p-8">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-3 text-red-400">
          <i className="fas fa-mask"></i>
          Dual Personality Protocol
        </h3>
        <p className="text-slate-400 text-sm mb-8 leading-relaxed">
          The Dual Personality system allows you to maintain two completely separate encrypted profiles. 
          Use a unique "Emergency PIN" to unlock a fake environment that hides your sensitive applications.
        </p>
        
        <div className="space-y-6">
          <ToggleItem 
            title="Enable Dual Mode" 
            description="Allows configuration of a secondary secret profile."
            enabled={config.isDualMode}
            onToggle={() => setConfig(prev => ({ ...prev, isDualMode: !prev.isDualMode }))}
          />
          
          {config.isDualMode && (
            <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700 space-y-6 animate-in fade-in slide-in-from-top-4">
              <div className="flex flex-col sm:flex-row gap-4">
                 <div className="flex-1">
                    <label className="block text-xs font-bold text-slate-500 mb-2 uppercase">Main Mode Pattern</label>
                    <div className="w-full p-4 bg-slate-950 rounded-xl text-slate-400 border border-slate-800 text-sm font-mono flex items-center justify-between">
                       ••••••••
                       <i className="fas fa-pen text-xs text-blue-500 cursor-pointer"></i>
                    </div>
                 </div>
                 <div className="flex-1">
                    <label className="block text-xs font-bold text-slate-500 mb-2 uppercase">Secret Mode PIN</label>
                    <div className="w-full p-4 bg-slate-950 rounded-xl text-slate-400 border border-slate-800 text-sm font-mono flex items-center justify-between">
                       ••••
                       <i className="fas fa-pen text-xs text-red-500 cursor-pointer"></i>
                    </div>
                 </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-500 text-white rounded-lg flex items-center justify-center">
                       <i className="fas fa-ghost"></i>
                    </div>
                    <div>
                       <div className="text-sm font-bold text-red-400 uppercase">Stealth Launcher</div>
                       <div className="text-[10px] text-slate-500">Hide ROY Locker icon in Secret Mode</div>
                    </div>
                 </div>
                 <button className="px-4 py-2 bg-red-500 text-white text-xs font-bold rounded-lg uppercase">Configure Apps</button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-3xl p-8">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
          <i className="fas fa-shield-halved text-blue-500"></i>
          System Fortification
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <OptionBox title="Root Detection" status="Enabled" icon="fa-user-gear" />
           <OptionBox title="Debugger Prevention" status="Active" icon="fa-bug-slash" />
           <OptionBox title="Overlay Attack Protection" status="High" icon="fa-layer-group" />
           <OptionBox title="Biometric Fallback" status="PIN" icon="fa-keyboard" />
        </div>
      </div>
    </div>
  );
};

const ToggleItem: React.FC<{ title: string, description: string, enabled: boolean, onToggle: () => void }> = ({ title, description, enabled, onToggle }) => (
  <div className="flex items-center justify-between gap-4">
    <div>
      <div className="font-bold text-slate-200">{title}</div>
      <div className="text-xs text-slate-500">{description}</div>
    </div>
    <button 
      onClick={onToggle}
      className={`w-14 h-7 rounded-full relative transition-colors shrink-0 ${enabled ? 'bg-blue-500' : 'bg-slate-700'}`}
    >
      <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${enabled ? 'right-1' : 'left-1'}`}></div>
    </button>
  </div>
);

const OptionBox: React.FC<{ title: string, status: string, icon: string }> = ({ title, status, icon }) => (
  <div className="p-4 rounded-2xl bg-slate-800/30 border border-slate-800 flex items-center gap-4">
     <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-slate-400">
        <i className={`fas ${icon}`}></i>
     </div>
     <div>
        <div className="text-xs font-bold text-slate-500 uppercase tracking-tighter">{title}</div>
        <div className="text-sm font-bold text-blue-400">{status}</div>
     </div>
  </div>
);

export default Settings;
