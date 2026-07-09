/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { StatsHeader } from './components/StatsHeader';
import { SessionGrid } from './components/SessionGrid';
import { SessionConfig, SessionInstance, Stats } from './types';
import { Facebook } from 'lucide-react';

export default function App() {
  const [config, setConfig] = useState<SessionConfig>({
    targetUrl: 'https://www.facebook.com/reel/12691481',
    commentText: 'Great content! Keep it up! 🔥',
    sessionCount: 8,
    baseInterval: 60,
    referrerSpoofing: 'Facebook Social',
    gridScale: 0.8,
    staggeredMode: true,
    activeScroll: true,
    autoMuted: true,
  });

  const [stats, setStats] = useState<Stats>({
    activeProxies: 15,
    totalLoads: 0,
    countdown: 18.6,
  });

  const [sessions, setSessions] = useState<SessionInstance[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Initialize sessions based on count
    const newSessions: SessionInstance[] = Array.from({ length: config.sessionCount }).map((_, i) => ({
      id: `session-${i}`,
      deviceName: ['iPhone 13', 'Galaxy S24', 'Pixel 8', 'iPad Safari'][i % 4],
      profileId: i + 1,
      status: 'idle',
      currentStep: 'waiting',
      lastAction: 'Ready',
    }));
    setSessions(newSessions);
  }, [config.sessionCount]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setSessions(prev => prev.map(session => {
          // Simulated state machine for automation
          if (session.currentStep === 'waiting') {
            return { ...session, currentStep: 'navigating', status: 'running', lastAction: 'Opening Video...' };
          }
          if (session.currentStep === 'navigating') {
            return { ...session, currentStep: 'commenting', lastAction: 'Posting Comment...' };
          }
          if (session.currentStep === 'commenting') {
            return { ...session, currentStep: 'scrolling', lastAction: 'Scrolling to Next...' };
          }
          if (session.currentStep === 'scrolling') {
             return { ...session, currentStep: 'navigating', lastAction: 'Next Video found' };
          }
          return session;
        }));
      }, 3000); // Cycle every 3 seconds for demo
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStart = () => setIsRunning(true);
  const handleStop = () => setIsRunning(false);

  return (
    <div className="flex h-screen w-full bg-[#0a0c10] text-gray-300 overflow-hidden font-sans selection:bg-blue-500/30">
      <Sidebar 
        config={config} 
        setConfig={setConfig} 
        onStart={handleStart} 
        onStop={handleStop}
        isRunning={isRunning}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
      
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <StatsHeader 
          stats={stats} 
          autoMuted={config.autoMuted}
          onToggleMute={() => setConfig(prev => ({ ...prev, autoMuted: !prev.autoMuted }))}
        />
        
        <main className="flex-1 overflow-y-auto p-6 bg-[#0f1218]">
          <SessionGrid 
            sessions={sessions} 
            config={config}
          />
        </main>

        {/* Floating Bottom Bar (Simulated OS Taskbar as seen in image) */}
        <div className="h-12 bg-[#1a1e26]/80 backdrop-blur-md border-t border-white/5 flex items-center px-4 gap-4">
          <div className="flex gap-3">
             <div className="w-6 h-6 rounded bg-blue-600/20 flex items-center justify-center">
                <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
             </div>
             <div className="w-6 h-6 rounded hover:bg-white/5 transition-colors"></div>
             <div className="w-6 h-6 rounded hover:bg-white/5 transition-colors"></div>
          </div>
          <div className="flex-1"></div>
          <div className="text-[10px] text-gray-500 flex items-center gap-4">
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              System Live
            </span>
            <span>1:12 PM 7/8/2026</span>
          </div>
        </div>
      </div>
    </div>
  );
}
