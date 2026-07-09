import { SessionInstance } from '../types';
import { Smartphone, RefreshCw, Facebook, RotateCcw } from 'lucide-react';
import { motion } from 'motion/react';
import { FC, useState } from 'react';

interface SessionCellProps {
  session: SessionInstance;
  scale: number;
}

export const SessionCell: FC<SessionCellProps> = ({ session, scale }) => {
  const [iframeKey, setIframeKey] = useState(0);

  const reloadIframe = () => {
    setIframeKey(prev => prev + 1);
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-[#1a1e26] rounded-[2rem] border-[6px] border-[#2a2f3a] overflow-hidden flex flex-col shadow-2xl relative group ring-1 ring-white/10"
      style={{
        width: 300 * scale,
        height: 580 * scale,
      }}
    >
      {/* Mobile Top Notch/Bar */}
      <div className="h-8 bg-[#2a2f3a] px-6 flex items-center justify-between shrink-0">
        <span className="text-[10px] font-bold text-gray-400">9:41</span>
        <div className="w-16 h-4 bg-[#0a0c10] rounded-full"></div>
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded-full border border-gray-500"></div>
          <div className="w-3 h-3 rounded-full border border-gray-500"></div>
        </div>
      </div>

      {/* Browser Header / Address Bar */}
      <div className="h-12 bg-[#11141d] px-3 flex items-center gap-2 border-b border-white/5 shrink-0">
        <button 
          onClick={() => window.history.back()}
          className="p-1.5 hover:bg-white/10 rounded text-gray-400 transition-colors"
          title="Back"
        >
          <RotateCcw size={14} className="-scale-x-100" />
        </button>
        
        <div className="flex-1 bg-[#1a1e26] rounded-full h-7 px-3 flex items-center justify-between border border-white/5">
           <span className="text-[9px] text-gray-500 font-mono truncate">m.facebook.com</span>
           <Facebook size={10} className="text-blue-500" />
        </div>

        <div className="flex items-center gap-1">
          <button 
            onClick={reloadIframe}
            className="p-1.5 hover:bg-white/10 rounded text-gray-400 transition-colors"
            title="Refresh"
          >
            <RefreshCw size={14} />
          </button>
          <button 
            onClick={() => setIframeKey(prev => prev + 1)}
            className="p-1.5 hover:bg-white/10 rounded text-blue-500 transition-colors"
            title="Go to Home"
          >
            <Facebook size={14} fill="currentColor" />
          </button>
        </div>
      </div>

      {/* Real Facebook Iframe */}
      <div className="flex-1 bg-white relative">
        <iframe 
          key={iframeKey}
          src="https://m.facebook.com/login"
          className="w-full h-full border-none"
          title={`session-${session.id}`}
          sandbox="allow-forms allow-scripts allow-same-origin allow-popups"
        />
      </div>

      {/* Device Info Footer */}
      <div className="h-12 bg-[#2a2f3a] px-4 flex items-center justify-center shrink-0">
         <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
            <Smartphone size={12} />
            Device #{session.profileId}
         </div>
      </div>
    </motion.div>
  );
};
