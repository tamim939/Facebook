import { Stats } from '../types';
import { Shield, BarChart2, Volume2, VolumeX, Timer } from 'lucide-react';

interface StatsHeaderProps {
  stats: Stats;
  autoMuted: boolean;
  onToggleMute: () => void;
}

export function StatsHeader({ stats, autoMuted, onToggleMute }: StatsHeaderProps) {
  return (
    <header className="h-16 bg-[#0a0c10] border-b border-white/5 px-6 flex items-center gap-12">
      <div className="flex items-center gap-3">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-widest text-blue-500 font-bold">Active Proxies</span>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-white leading-none">{stats.activeProxies}</span>
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Total Loads (HTS)</span>
          <span className="text-xl font-bold text-white leading-none">{stats.totalLoads}</span>
        </div>
      </div>

      <div className="flex items-center gap-4 ml-auto">
        <button 
          onClick={onToggleMute}
          className={`flex items-center gap-2 px-3 py-1.5 rounded bg-[#1a1e26] border border-white/5 transition-all ${autoMuted ? 'text-blue-400 border-blue-500/20' : 'text-gray-500'}`}
        >
          {autoMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          <span className="text-[10px] uppercase tracking-widest font-bold">Auto-Muted</span>
        </button>

        <div className="flex items-center gap-3 px-4 py-1.5 rounded bg-blue-600/10 border border-blue-500/20">
          <Timer size={14} className="text-blue-500" />
          <div className="flex flex-col leading-none">
            <span className="text-[10px] uppercase tracking-widest text-blue-500 font-bold leading-tight">Countdown</span>
            <span className="text-sm font-mono font-bold text-white leading-tight">{stats.countdown.toFixed(1)}s</span>
          </div>
        </div>
      </div>
    </header>
  );
}
