/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { SessionInstance } from './types';
import { Smartphone, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';
import { SessionCell } from './components/SessionCell';

export default function App() {
  const [scale, setScale] = useState(0.8);
  const [sessions, setSessions] = useState<SessionInstance[]>([]);

  useEffect(() => {
    const newSessions: SessionInstance[] = Array.from({ length: 10 }).map((_, i) => ({
      id: `device-${i + 1}`,
      deviceName: `Mobile Device ${i + 1}`,
      profileId: i + 1,
    }));
    setSessions(newSessions);
  }, []);

  const reloadAll = () => {
    window.location.reload();
  };

  return (
    <div className="flex flex-col h-screen w-full bg-[#0a0c10] text-gray-300 overflow-hidden font-sans">
      {/* Top Controls */}
      <header className="h-14 bg-[#11141d] border-b border-white/5 px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
            <Smartphone size={20} className="text-white" />
          </div>
          <h1 className="text-lg font-bold text-white tracking-tight">Multi-Login Device Manager</h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center bg-[#1a1e26] rounded-md border border-white/5 p-1">
            <button 
              onClick={() => setScale(Math.max(0.4, scale - 0.1))}
              className="p-1.5 hover:bg-white/5 rounded text-gray-400"
            >
              <ZoomOut size={16} />
            </button>
            <span className="px-3 text-xs font-mono text-blue-400">{Math.round(scale * 100)}%</span>
            <button 
              onClick={() => setScale(Math.min(1.5, scale + 0.1))}
              className="p-1.5 hover:bg-white/5 rounded text-gray-400"
            >
              <ZoomIn size={16} />
            </button>
          </div>
          
          <button 
            onClick={reloadAll}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md font-bold text-xs transition-all shadow-lg shadow-blue-950/20"
          >
            <RotateCcw size={14} />
            Reset All Sessions
          </button>
        </div>
      </header>
      
      {/* Device Grid */}
      <main className="flex-1 overflow-auto p-8 bg-[#0f1218]">
        <div 
          className="grid gap-8 justify-items-center"
          style={{
            gridTemplateColumns: `repeat(auto-fill, minmax(${300 * scale}px, 1fr))`,
          }}
        >
          {sessions.map((session) => (
            <SessionCell 
              key={session.id} 
              session={session} 
              scale={scale} 
            />
          ))}
        </div>
      </main>

      {/* Footer Info */}
      <footer className="h-8 bg-[#0a0c10] border-t border-white/5 px-4 flex items-center justify-between text-[10px] text-gray-600 uppercase tracking-widest font-medium">
        <span>10 Active Virtual Devices</span>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
            System Online
          </span>
          <span>v1.0.0</span>
        </div>
      </footer>
    </div>
  );
}
