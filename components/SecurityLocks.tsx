
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { SecurityConfig } from '../types';

interface SecurityLocksProps {
  config: SecurityConfig;
  setConfig: React.Dispatch<React.SetStateAction<SecurityConfig>>;
}

const SecurityLocks: React.FC<SecurityLocksProps> = ({ config, setConfig }) => {
  const [activeSimulation, setActiveSimulation] = useState<'EMOTION' | 'PATTERN' | 'AR' | null>(null);

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
          title="AR Object Anchor"
          description="Register a real-world object as your master physical key."
          icon="fa-cube"
          enabled={config.arLockEnabled}
          onToggle={() => setConfig(prev => ({ ...prev, arLockEnabled: !prev.arLockEnabled }))}
          onSimulate={() => setActiveSimulation('AR')}
        />
      </div>

      {activeSimulation && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 backdrop-blur-xl p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative">
            <button 
              onClick={() => setActiveSimulation(null)}
              className="absolute top-4 right-4 text-slate-500 hover:text-white"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
            
            <div className="p-8">
              {activeSimulation === 'EMOTION' && <EmotionSimulator />}
              {activeSimulation === 'PATTERN' && <PatternSimulator />}
              {activeSimulation === 'AR' && <ARSimulator />}
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
      // Fake analysis delay
      setTimeout(() => {
        setSuccess(true);
        setAnalyzing(false);
      }, 3000);
    } catch (err) {
      alert("Camera permission denied or not available");
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
      
      <div className="relative w-64 h-64 mx-auto mb-8 rounded-full overflow-hidden border-4 border-blue-500/30 group">
        {!analyzing && !success && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-950/80 z-10">
             <i className="fas fa-camera text-4xl text-blue-500"></i>
          </div>
        )}
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          muted 
          className="w-full h-full object-cover scale-x-[-1]"
        />
        {analyzing && (
          <div className="absolute inset-0 border-4 border-blue-500 animate-[ping_2s_infinite] rounded-full"></div>
        )}
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
          <i className="fas fa-shield-check"></i> Identity Verified Successfully
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

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    setStatus('recording');
    setPoints([]);
  };

  const draw = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    setPoints(prev => [...prev, { x, y }]);
  }, [isDrawing]);

  const endDrawing = () => {
    setIsDrawing(false);
    setStatus('validating');
    setTimeout(() => {
      setStatus('idle');
      setPoints([]);
    }, 1500);
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-black mb-2">Invisible Pattern Field</h2>
      <p className="text-slate-400 mb-8">Draw your gesture on the touch field below.</p>
      
      <div className="relative w-full aspect-square max-w-[400px] mx-auto bg-slate-950/50 border border-slate-800 rounded-3xl overflow-hidden cursor-crosshair">
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className="absolute inset-0 w-full h-full"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={endDrawing}
          onMouseLeave={endDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={endDrawing}
        />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
          <i className="fas fa-fingerprint text-[10rem]"></i>
        </div>
        
        {/* Visual indicators (usually invisible, but here for demo validation) */}
        {points.length > 0 && (
          <svg className="absolute inset-0 pointer-events-none w-full h-full">
            <polyline
              points={points.map(p => `${p.x},${p.y}`).join(' ')}
              fill="none"
              stroke={status === 'validating' ? '#3b82f6' : '#ffffff'}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={status === 'validating' ? 'opacity-50 blur-sm' : 'opacity-10'}
            />
          </svg>
        )}

        <div className="absolute bottom-4 left-0 right-0 text-xs font-bold uppercase tracking-widest text-slate-500">
          {status === 'recording' ? 'Capturing Coordinates...' : status === 'validating' ? 'Matching Sequence...' : 'Ready for input'}
        </div>
      </div>
    </div>
  );
};

const ARSimulator: React.FC = () => {
  return (
    <div className="text-center py-10">
      <i className="fas fa-cube text-6xl text-blue-500 mb-6 animate-bounce"></i>
      <h2 className="text-2xl font-black mb-2">AR Anchor Recognition</h2>
      <p className="text-slate-400 mb-8 max-w-sm mx-auto">
        ARCore uses spatial mapping to lock your apps to a physical object. 
        Select your "Key Object" from the environment.
      </p>
      <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 inline-block">
        <p className="text-blue-400 font-bold mb-4">Object Registry Status:</p>
        <div className="flex items-center gap-3 text-left">
           <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center">
              <i className="fas fa-coffee"></i>
           </div>
           <div>
             <div className="text-sm font-bold">Black Desk Mug</div>
             <div className="text-xs text-slate-500">Anchor ID: 82x-01-ROY</div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityLocks;
