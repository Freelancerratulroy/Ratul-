
import React from 'react';

const intruderData = [
  { id: '1', date: '2023-10-24 14:22', app: 'Instagram', method: 'Invisible Pattern', location: 'San Francisco, CA', photo: 'https://picsum.photos/seed/face1/200/200' },
  { id: '2', date: '2023-10-24 12:15', app: 'WhatsApp', method: 'Emotion Scan', location: 'San Francisco, CA', photo: 'https://picsum.photos/seed/face2/200/200' },
  { id: '3', date: '2023-10-23 23:54', app: 'Gmail', method: 'PIN Input', location: 'Home Office', photo: 'https://picsum.photos/seed/face3/200/200' },
];

const IntruderLogs: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
         <h3 className="text-xl font-bold">Recent Intrusion Attempts</h3>
         <button className="text-red-500 text-sm font-bold hover:underline">Clear All Evidence</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {intruderData.map(log => (
          <div key={log.id} className="bg-slate-900/40 border border-slate-800 rounded-3xl overflow-hidden hover:border-red-500/30 transition-all group">
            <div className="relative aspect-square overflow-hidden">
               <img src={log.photo} alt="Intruder" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
               <div className="absolute top-4 right-4 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-widest shadow-lg">
                 Failed Attempt
               </div>
               <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-slate-950 to-transparent">
                  <div className="text-white font-bold">{log.date}</div>
                  <div className="text-slate-400 text-xs">{log.location}</div>
               </div>
            </div>
            <div className="p-5 space-y-3">
               <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">Target Application:</span>
                  <span className="font-bold text-blue-400">{log.app}</span>
               </div>
               <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">Protection Bypassed:</span>
                  <span className="font-bold text-slate-200">{log.method}</span>
               </div>
               <div className="pt-4 flex gap-2">
                  <button className="flex-1 py-2 bg-slate-800 rounded-lg text-xs font-bold hover:bg-slate-700 transition-all">View Details</button>
                  <button className="w-10 h-10 bg-red-500/10 text-red-500 rounded-lg flex items-center justify-center hover:bg-red-500/20 transition-all">
                    <i className="fas fa-trash-can"></i>
                  </button>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IntruderLogs;
