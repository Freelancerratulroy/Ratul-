
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const usageData = [
  { app: 'Instagram', minutes: 125 },
  { app: 'TikTok', minutes: 89 },
  { app: 'YouTube', minutes: 154 },
  { app: 'Reddit', minutes: 45 },
  { app: 'WhatsApp', minutes: 32 },
];

const AIBehavior: React.FC = () => {
  const [motivation, setMotivation] = useState<string>("Analyzing usage patterns to generate behavioral coaching...");
  const [loading, setLoading] = useState(false);

  const fetchAIMessage = async () => {
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `I have spent 154 minutes on YouTube and 125 minutes on Instagram today. 
                  Generate a short, stern, but motivational psychological 'lock' message for a user who is procrastinating. 
                  Maximum 2 sentences. Sound like a futuristic security AI.`,
      });
      setMotivation(response.text || "Security protocol engaged: Screen time exceeds healthy limits. Focus on your primary goals.");
    } catch (error) {
      setMotivation("Warning: Excessive digital consumption detected. Regain control of your cognitive resources.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAIMessage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-3xl p-8">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
          <i className="fas fa-brain text-blue-500"></i>
          Psychological Feedback Engine
        </h3>
        
        <div className="bg-blue-600/10 border border-blue-500/20 p-6 rounded-2xl mb-8 min-h-[140px] flex flex-col justify-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
             <i className="fas fa-quote-right text-6xl"></i>
          </div>
          {loading ? (
             <div className="flex gap-2 items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
             </div>
          ) : (
            <p className="text-lg font-medium text-slate-200 leading-relaxed italic">"{motivation}"</p>
          )}
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-bold uppercase tracking-widest text-slate-500">Current Restrictions</h4>
          <div className="grid grid-cols-2 gap-4">
            <RestrictionCard label="Unlock Delay" value="10s" icon="fa-hourglass-start" color="orange" />
            <RestrictionCard label="Overlay Intensity" value="High" icon="fa-eye-low-vision" color="red" />
          </div>
        </div>

        <button 
          onClick={fetchAIMessage}
          className="mt-8 w-full py-4 bg-slate-800 hover:bg-slate-700 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all"
        >
          <i className="fas fa-rotate"></i>
          Recalibrate Motivation
        </button>
      </div>

      <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-3xl p-8">
        <h3 className="text-xl font-bold mb-6">Cognitive Drain Analysis</h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={usageData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={true} vertical={false} />
              <XAxis type="number" hide />
              <YAxis dataKey="app" type="category" stroke="#64748b" width={80} fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                cursor={{ fill: '#1e293b' }}
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
              />
              <Bar dataKey="minutes" radius={[0, 4, 4, 0]}>
                {usageData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.minutes > 100 ? '#ef4444' : '#3b82f6'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-slate-400 text-xs mt-4 text-center">
          *Red indicates high cognitive dependency and priority locking.
        </p>
      </div>
    </div>
  );
};

const RestrictionCard: React.FC<{ label: string, value: string, icon: string, color: string }> = ({ label, value, icon, color }) => {
  const colors: any = {
    orange: 'text-orange-500 border-orange-500/20 bg-orange-500/5',
    red: 'text-red-500 border-red-500/20 bg-red-500/5',
  };
  return (
    <div className={`p-4 rounded-2xl border ${colors[color]}`}>
      <div className="flex items-center gap-2 mb-1">
        <i className={`fas ${icon} text-xs`}></i>
        <span className="text-[10px] font-bold uppercase tracking-tighter opacity-70">{label}</span>
      </div>
      <div className="text-xl font-black">{value}</div>
    </div>
  );
};

export default AIBehavior;
