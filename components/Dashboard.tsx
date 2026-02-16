
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { SecurityConfig } from '../types';

const data = [
  { name: '08:00', attempts: 2 },
  { name: '10:00', attempts: 5 },
  { name: '12:00', attempts: 12 },
  { name: '14:00', attempts: 8 },
  { name: '16:00', attempts: 15 },
  { name: '18:00', attempts: 22 },
  { name: '20:00', attempts: 7 },
];

const Dashboard: React.FC<{ config: SecurityConfig }> = ({ config }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Stats Cards */}
      <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatCard 
          icon="fa-lock" 
          label="Apps Secured" 
          value="42" 
          trend="+3 today" 
          color="blue" 
        />
        <StatCard 
          icon="fa-user-ninja" 
          label="Intrusions Blocked" 
          value="156" 
          trend="2 today" 
          color="red" 
        />
        <StatCard 
          icon="fa-clock" 
          label="Usage Limit" 
          value="4h 20m" 
          trend="Near limit" 
          color="orange" 
        />
        <StatCard 
          icon="fa-face-smile-beam" 
          label="Face Recognition" 
          value="98.2%" 
          trend="Optimal" 
          color="emerald" 
        />
      </div>

      {/* Quick Status */}
      <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 flex flex-col">
        <h3 className="text-lg font-bold mb-4">Security Modules</h3>
        <ul className="space-y-4">
          <ModuleItem label="Emotion Unlock" active={config.emotionLockEnabled} />
          <ModuleItem label="Invisible Pattern" active={config.invisiblePatternEnabled} />
          <ModuleItem label="AR Anchor Recognition" active={config.arLockEnabled} />
          <ModuleItem label="Psychological Delay" active={true} />
          <ModuleItem label="Fake OS Simulator" active={true} />
        </ul>
      </div>

      {/* Chart Section */}
      <div className="md:col-span-3 bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-3xl p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-xl font-bold">Intrusion Attempt Timeline</h3>
            <p className="text-slate-400 text-sm">Real-time monitoring of unlock failures</p>
          </div>
          <select className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1 text-sm outline-none">
            <option>Last 24 Hours</option>
            <option>Last 7 Days</option>
          </select>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorAttempts" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                itemStyle={{ color: '#3b82f6' }}
              />
              <Area type="monotone" dataKey="attempts" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorAttempts)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ icon: string, label: string, value: string, trend: string, color: string }> = ({ icon, label, value, trend, color }) => {
  const colorMap: any = {
    blue: 'text-blue-500 bg-blue-500/10',
    red: 'text-red-500 bg-red-500/10',
    orange: 'text-orange-500 bg-orange-500/10',
    emerald: 'text-emerald-500 bg-emerald-500/10',
  };

  return (
    <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 hover:border-slate-700 transition-colors group">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${colorMap[color]}`}>
        <i className={`fas ${icon} text-xl`}></i>
      </div>
      <p className="text-slate-400 text-sm font-medium">{label}</p>
      <div className="flex items-end justify-between mt-1">
        <h4 className="text-2xl font-bold">{value}</h4>
        <span className="text-xs font-bold text-slate-500">{trend}</span>
      </div>
    </div>
  );
};

const ModuleItem: React.FC<{ label: string, active: boolean }> = ({ label, active }) => (
  <li className="flex items-center justify-between p-3 rounded-2xl bg-slate-800/30">
    <span className="text-sm font-medium">{label}</span>
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${active ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-700/50 text-slate-500'}`}>
      {active ? 'Armed' : 'Inactive'}
    </span>
  </li>
);

export default Dashboard;
