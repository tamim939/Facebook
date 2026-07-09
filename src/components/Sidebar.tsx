import { SessionConfig } from '../types';
import { Settings, Play, Square, ExternalLink, Sliders, Shield, Zap, MessageCircle, Facebook, LogOut, User as UserIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { Dispatch, SetStateAction } from 'react';

interface SidebarProps {
  config: SessionConfig;
  setConfig: Dispatch<SetStateAction<SessionConfig>>;
  onStart: () => void;
  onStop: () => void;
  isRunning: boolean;
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

export function Sidebar({ config, setConfig, onStart, onStop, isRunning, isLoggedIn, setIsLoggedIn }: SidebarProps) {
  const handleChange = (key: keyof SessionConfig, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  return (
    <aside className="w-80 h-full bg-[#11141d] border-r border-white/5 p-6 flex flex-col gap-8 shrink-0 overflow-y-auto">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-blue-400 tracking-tight">Aether Pro</h1>
        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold">Session Multiplexer v5.8</p>
      </div>

      <div className="space-y-6">
        {/* Account Section */}
        <div className="bg-[#1a1e26] rounded-lg border border-white/5 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Active Session</span>
            {isLoggedIn && <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>}
          </div>
          
          {!isLoggedIn ? (
            <div className="space-y-3">
              <div className="text-sm text-gray-400 font-medium">No account connected</div>
              <button 
                onClick={() => setIsLoggedIn(true)}
                className="w-full bg-[#1877F2] hover:bg-[#166fe5] text-white py-2 rounded font-bold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <Facebook size={14} fill="currentColor" />
                Login with Facebook
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center border border-blue-500/30">
                  <UserIcon size={20} className="text-blue-400" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-white leading-none">Robiul Islam</span>
                  <span className="text-[10px] text-gray-500 mt-1">Status: Logged In</span>
                </div>
              </div>
              <button 
                onClick={() => setIsLoggedIn(false)}
                className="w-full bg-white/5 hover:bg-white/10 text-gray-400 py-2 rounded font-bold text-xs flex items-center justify-center gap-2 transition-colors border border-white/5"
              >
                <LogOut size={14} />
                Logout Account
              </button>
            </div>
          )}
        </div>
        {/* Target URL */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
            <ExternalLink size={14} className="text-blue-500" />
            Target URL
          </label>
          <input
            type="text"
            value={config.targetUrl}
            onChange={(e) => handleChange('targetUrl', e.target.value)}
            className="w-full bg-[#1a1e26] border border-white/10 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500/50 transition-colors"
            placeholder="https://facebook.com/..."
          />
        </div>

        {/* Session Count */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
            <Settings size={14} className="text-blue-500" />
            Session Count
          </label>
          <input
            type="number"
            value={config.sessionCount}
            onChange={(e) => handleChange('sessionCount', parseInt(e.target.value) || 1)}
            className="w-full bg-[#1a1e26] border border-white/10 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500/50 transition-colors"
          />
        </div>

        {/* Base Interval */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
            <Zap size={14} className="text-blue-500" />
            Base Interval (SEC)
          </label>
          <input
            type="number"
            value={config.baseInterval}
            onChange={(e) => handleChange('baseInterval', parseInt(e.target.value) || 1)}
            className="w-full bg-[#1a1e26] border border-white/10 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500/50 transition-colors"
          />
        </div>

        {/* Referrer */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
            <Shield size={14} className="text-blue-500" />
            Referrer Spoofing
          </label>
          <select
            value={config.referrerSpoofing}
            onChange={(e) => handleChange('referrerSpoofing', e.target.value)}
            className="w-full bg-[#1a1e26] border border-white/10 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500/50 transition-colors appearance-none cursor-pointer"
          >
            <option>Facebook Social</option>
            <option>Direct Traffic</option>
            <option>Google Search</option>
            <option>Instagram App</option>
          </select>
        </div>

        {/* Marketing Comment */}
        <div className="space-y-2 pt-2 border-t border-white/5">
          <label className="text-xs font-bold text-orange-500 uppercase tracking-wider flex items-center gap-2">
            <MessageCircle size={14} />
            Marketing Comment
          </label>
          <textarea
            value={config.commentText}
            onChange={(e) => handleChange('commentText', e.target.value)}
            className="w-full bg-[#1a1e26] border border-white/10 rounded-md px-3 py-2 text-xs h-20 focus:outline-none focus:border-orange-500/50 transition-colors resize-none"
            placeholder="Type your marketing comment here..."
          />
        </div>

        {/* Grid Scale */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
            <Sliders size={14} className="text-blue-500" />
            Device Zoom / Grid Scale
          </label>
          <input
            type="range"
            min="0.4"
            max="1.5"
            step="0.1"
            value={config.gridScale}
            onChange={(e) => handleChange('gridScale', parseFloat(e.target.value))}
            className="w-full h-1.5 bg-[#1a1e26] rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <div className="flex justify-between text-[10px] text-gray-600 font-mono">
            <span>0.4x</span>
            <span>1.5x</span>
          </div>
        </div>

        {/* Toggles */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400 font-medium">Staggered Anti-Bot Mode</span>
            <button
              onClick={() => handleChange('staggeredMode', !config.staggeredMode)}
              className={`w-10 h-5 rounded-full transition-colors relative ${config.staggeredMode ? 'bg-blue-600' : 'bg-gray-700'}`}
            >
              <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${config.staggeredMode ? 'left-6' : 'left-1'}`} />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400 font-medium">Active Content-Scroll</span>
            <button
              onClick={() => handleChange('activeScroll', !config.activeScroll)}
              className={`w-10 h-5 rounded-full transition-colors relative ${config.activeScroll ? 'bg-blue-600' : 'bg-gray-700'}`}
            >
              <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${config.activeScroll ? 'left-6' : 'left-1'}`} />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-auto flex flex-col gap-3">
        <button className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-600 text-white py-3 rounded-md font-bold text-sm shadow-lg shadow-orange-950/20 transition-all flex items-center justify-center gap-2">
          <Zap size={18} fill="currentColor" />
          Send a gift
        </button>

        {!isRunning ? (
          <div className="space-y-2">
            {!isLoggedIn && (
              <p className="text-[10px] text-orange-400 font-bold uppercase text-center animate-pulse">
                Please login to start
              </p>
            )}
            <button
              onClick={onStart}
              disabled={!isLoggedIn}
              className={`w-full py-3 rounded-md font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2 ${
                isLoggedIn 
                  ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-950/20' 
                  : 'bg-gray-700 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Play size={18} fill="currentColor" />
              Launch Engine
            </button>
          </div>
        ) : (
          <button
            onClick={onStop}
            className="w-full bg-red-600 hover:bg-red-500 text-white py-3 rounded-md font-bold text-sm shadow-lg shadow-red-950/20 transition-all flex items-center justify-center gap-2"
          >
            <Square size={18} fill="currentColor" />
            Stop Engine
          </button>
        )}
      </div>
    </aside>
  );
}
