
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { SecurityConfig } from '../types';

interface SecurityLocksProps {
  config: SecurityConfig;
  setConfig: React.Dispatch<React.SetStateAction<SecurityConfig>>;
}

const SecurityLocks: React.FC<SecurityLocksProps> = ({ config, setConfig }) => {
  const [activeSimulation, setActiveSimulation] = useState<'EMOTION' | 'PATTERN' | 'AR' | 'FAKE_OS' | null>(null);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SecurityModule 
          title="Emotion Unlock"
          description="Unlocks only when a smile and blink pattern is detected via front camera."
          icon="fa-face-smile"
          enabled={config.emotionLockEnabled}
          onToggle={() => setConfig(prev => ({ ...prev, emotionLockEnabled: !prev.emotionLockEnabled }))}
          onSimulate={() => setActiveSimulation('EMOTION')}
        />
        <SecurityModule 
          title="Invisible Pattern"
          description="High-security gesture lock with no visible grid or path tracing."
          icon="fa-fingerprint"
          enabled={config.invisiblePatternEnabled}
          onToggle={() => setConfig(prev => ({ ...prev, invisiblePatternEnabled: !prev.invisiblePatternEnabled }))}
          onSimulate={() => setActiveSimulation('PATTERN')}
        />
        <SecurityModule 
          title="Fake OS Spy Trap"
          description="Shows a dummy system on failed attempts to capture intruder behavior."
          icon="fa-user-ninja"
          enabled={true}
          onToggle={() => {}}
          onSimulate={() => setActiveSimulation('FAKE_OS')}
        />
      </div>

      {activeSimulation && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 backdrop-blur-xl p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative">
            <button 
              onClick={() => setActiveSimulation(null)}
              className="absolute top-4 right-4 text-slate-500 hover:text-white z-[110]"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
            
            <div className="p-0">
              {activeSimulation === 'EMOTION' && <div className="p-8"><EmotionSimulator /></div>}
              {activeSimulation === 'PATTERN' && <div className="p-8"><PatternSimulator /></div>}
              {activeSimulation === 'AR' && <div className="p-8"><ARSimulator /></div>}
              {activeSimulation === 'FAKE_OS' && <FakeOSSimulator />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const SecurityModule: React.FC<{ 
  title: string, 
  description: string, 
  icon: string, 
  enabled: boolean, 
  onToggle: () => void,
  onSimulate: () => void
}> = ({ title, description, icon, enabled, onToggle, onSimulate }) => (
  <div className={`p-6 rounded-3xl border transition-all ${enabled ? 'bg-blue-600/5 border-blue-500/30' : 'bg-slate-900/40 border-slate-800 opacity-60'}`}>
    <div className="flex justify-between items-start mb-4">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${enabled ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-500'}`}>
        <i className={`fas ${icon} text-xl`}></i>
      </div>
      <button 
        onClick={onToggle}
        className={`w-12 h-6 rounded-full relative transition-colors ${enabled ? 'bg-blue-500' : 'bg-slate-700'}`}
      >
        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${enabled ? 'right-1' : 'left-1'}`}></div>
      </button>
    </div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-slate-400 text-sm mb-6 leading-relaxed">{description}</p>
    <button 
      onClick={onSimulate}
      className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 font-bold transition-all text-sm"
    >
      Test Protocol Simulation
    </button>
  </div>
);

const FakeOSSimulator: React.FC = () => {
  return (
    <div className="bg-slate-100 h-[500px] w-full relative flex flex-col text-slate-900">
      {/* Fake Status Bar */}
      <div className="bg-slate-200 h-6 flex justify-between px-4 items-center text-[10px] font-bold">
        <span>10:24 AM</span>
        <div className="flex gap-2">
           <i className="fas fa-signal"></i>
           <i className="fas fa-wifi"></i>
           <i className="fas fa-battery-full"></i>
        </div>
      </div>
      
      {/* Fake Launcher Content */}
      <div className="flex-1 p-8 grid grid-cols-4 gap-6 content-start">
         <FakeAppIcon icon="fa-envelope" label="Mail" color="bg-blue-500" />
         <FakeAppIcon icon="fa-camera" label="Photos" color="bg-emerald-500" />
         <FakeAppIcon icon="fa-calendar" label="Calendar" color="bg-red-500" />
         <FakeAppIcon icon="fa-address-book" label="Contacts" color="bg-orange-500" />
         <FakeAppIcon icon="fa-message" label="SMS" color="bg-green-500" />
         <FakeAppIcon icon="fa-gear" label="System" color="bg-slate-500" />
      </div>

      {/* Floating Spy Warning (Only for owner in simulation) */}
      <div className="absolute inset-x-0 bottom-24 flex justify-center pointer-events-none">
         <div className="bg-red-600 text-white px-6 py-2 rounded-full font-black text-xs animate-pulse shadow-xl uppercase">
            Spy Trap Active: Intruder Photo Captured
         </div>
      </div>

      {/* Fake Dock */}
      <div className="h-20 bg-slate-300/50 flex justify-center items-center gap-6 px-8 rounded-t-3xl border-t border-slate-300">
         <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-blue-500">
            <i className="fas fa-phone"></i>
         </div>
         <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-emerald-500">
            <i className="fas fa-browser"></i>
         </div>
         <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-purple-500">
            <i className="fas fa-music"></i>
         </div>
      </div>
    </div>
  );
};

const FakeAppIcon: React.FC<{ icon: string, label: string, color: string }> = ({ icon, label, color }) => (
  <div className="flex flex-col items-center gap-1">
     <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white text-xl shadow-md ${color}`}>
        <i className={`fas ${icon}`}></i>
     </div>
     <span className="text-[10px] font-bold">{label}</span>
  </div>
);

const EmotionSimulator: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [success, setSuccess] = useState(false);

  const startCamera = async () => {
    try {
      setAnalyzing(true);
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setTimeout(() => {
        setSuccess(true);
        setAnalyzing(false);
      }, 3000);
    } catch (err) {
      alert("Camera permission denied");
      setAnalyzing(false);
    }
  };

  useEffect(() => {
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach(t => t.stop());
      }
    };
  }, []);

  return (
    <div className="text-center">
      <h2 className="text-2xl font-black mb-2">Emotion Recognition Test</h2>
      <p className="text-slate-400 mb-8">System looking for: <span className="text-blue-400 font-bold">Broad Smile</span></p>
      
      <div className="relative w-64 h-64 mx-auto mb-8 rounded-full overflow-hidden border-4 border-blue-500/30">
        {!analyzing && !success && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-950/80 z-10">
             <i className="fas fa-camera text-4xl text-blue-500"></i>
          </div>
        )}
        <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover scale-x-[-1]" />
        {analyzing && <div className="absolute inset-0 border-4 border-blue-500 animate-[ping_2s_infinite] rounded-full"></div>}
        {success && (
          <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
             <div className="bg-green-500 rounded-full p-4 scale-150 shadow-lg shadow-green-500/50">
               <i className="fas fa-check text-white"></i>
             </div>
          </div>
        )}
      </div>

      {!success ? (
        <button 
          onClick={startCamera}
          disabled={analyzing}
          className="bg-blue-600 px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all disabled:opacity-50"
        >
          {analyzing ? 'Scanning Face...' : 'Initialize Biometric Scan'}
        </button>
      ) : (
        <p className="text-green-400 font-bold flex items-center justify-center gap-2">
          <i className="fas fa-shield-check"></i> Identity Verified
        </p>
      )}
    </div>
  );
};

const PatternSimulator: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [points, setPoints] = useState<{x: number, y: number}[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [status, setStatus] = useState<'idle' | 'recording' | 'validating'>('idle');

  const startDrawing = () => { setIsDrawing(true); setStatus('recording'); setPoints([]); };
  const draw = useCallback((e: any) => {
    if (!isDrawing || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    setPoints(prev => [...prev, { x: clientX - rect.left, y: clientY - rect.top }]);
  }, [isDrawing]);

  const endDrawing = () => {
    setIsDrawing(false); setStatus('validating');
    setTimeout(() => { setStatus('idle'); setPoints([]); }, 1500);
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-black mb-2">Invisible Pattern Field</h2>
      <div className="relative w-full aspect-square max-w-[400px] mx-auto bg-slate-950/50 border border-slate-800 rounded-3xl overflow-hidden cursor-crosshair">
        <canvas
          ref={canvasRef} width={400} height={400} className="absolute inset-0 w-full h-full"
          onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={endDrawing} onMouseLeave={endDrawing}
          onTouchStart={startDrawing} onTouchMove={draw} onTouchEnd={endDrawing}
        />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20"><i className="fas fa-fingerprint text-[10rem]"></i></div>
        {points.length > 0 && (
          <svg className="absolute inset-0 pointer-events-none w-full h-full">
            <polyline points={points.map(p => `${p.x},${p.y}`).join(' ')} fill="none" stroke={status === 'validating' ? '#3b82f6' : '#ffffff'} strokeWidth="4" strokeLinecap="round" className={status === 'validating' ? 'opacity-50 blur-sm' : 'opacity-10'} />
          </svg>
        )}
      </div>
    </div>
  );
};

const ARSimulator: React.FC = () => (
  <div className="text-center py-10">
    <i className="fas fa-cube text-6xl text-blue-500 mb-6 animate-bounce"></i>
    <h2 className="text-2xl font-black mb-2">AR Anchor Recognition</h2>
    <p className="text-slate-400 mb-8 max-w-sm mx-auto">Lock your apps to a physical object.</p>
  </div>
);

export default SecurityLocks;
