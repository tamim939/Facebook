import { SessionInstance, SessionConfig } from '../types';
import { Smartphone, MoreHorizontal, Heart, MessageCircle, Share2, User, Search, Home, Menu, Bell } from 'lucide-react';
import { motion } from 'motion/react';
import { FC } from 'react';

interface SessionCellProps {
  session: SessionInstance;
  config: SessionConfig;
}

export const SessionCell: FC<SessionCellProps> = ({ session, config }) => {
  const scale = config.gridScale;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#1a1e26] rounded-xl border border-white/5 overflow-hidden flex flex-col shadow-2xl relative group"
      style={{
        width: 300 * scale,
        height: 520 * scale,
      }}
    >
      {/* Session Header */}
      <div className="h-10 bg-[#0a0c10] px-3 flex items-center justify-between border-b border-white/5 shrink-0">
        <div className="flex items-center gap-2">
          <Smartphone size={14 * scale} className="text-blue-500" />
          <span className="text-[10px] font-bold text-gray-400 truncate max-w-[120px]">
            {session.deviceName} (Profile {session.profileId})
          </span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
          <MoreHorizontal size={14 * scale} className="text-gray-600" />
        </div>
      </div>

      {/* Simulated Browser Content (Facebook App UI) */}
      <div className="flex-1 bg-black relative flex flex-col overflow-hidden">
        
        {/* FB Header Mock */}
        <div className="h-12 bg-[#242526] px-3 flex items-center justify-between shrink-0">
           <div className="flex items-center gap-3">
              <div className="text-blue-500 font-black text-xl italic leading-none">f</div>
              <div className="relative">
                <Search size={16 * scale} className="text-gray-400" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 rounded-full text-[8px] flex items-center justify-center font-bold text-white border-2 border-[#242526]">15+</div>
              </div>
              <div className="relative">
                <Bell size={16 * scale} className="text-gray-400" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 rounded-full text-[8px] flex items-center justify-center font-bold text-white border-2 border-[#242526]">2</div>
              </div>
              <div className="relative">
                 <MessageCircle size={16 * scale} className="text-gray-400" />
                 <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 rounded-full text-[8px] flex items-center justify-center font-bold text-white border-2 border-[#242526]">1</div>
              </div>
           </div>
           <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden border border-white/10">
              <User size={16 * scale} className="text-gray-400" />
           </div>
        </div>

        {/* Content Area (Simulated Reel/Post) */}
        <div className="flex-1 relative overflow-hidden bg-[#18191a]">
          {/* Background Image / Video Placeholder */}
          <div className="absolute inset-0 opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700">
             <img 
               src={`https://picsum.photos/seed/${session.id}/400/800`} 
               alt="Post content" 
               className="w-full h-full object-cover"
               referrerPolicy="no-referrer"
             />
          </div>

          {/* Overlay Content */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
             <div className="space-y-2">
                <div className="flex items-center gap-2">
                   <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center border border-white/20">
                      <User size={14 * scale} className="text-white" />
                   </div>
                   <span className="text-xs font-bold text-white">Md. Robiul and 12 others...</span>
                </div>
                <p className="text-[10px] text-gray-300 line-clamp-2">
                   ফেসবুক ... more
                </p>
                <div className="flex items-center gap-3 pt-2">
                   <div className="flex flex-col items-center gap-1">
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                        <Heart size={16 * scale} className="text-white" />
                      </div>
                      <span className="text-[8px] font-bold">52</span>
                   </div>
                   <div className="flex flex-col items-center gap-1">
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                        <MessageCircle size={16 * scale} className="text-white" />
                      </div>
                      <span className="text-[8px] font-bold">43</span>
                   </div>
                   <div className="flex flex-col items-center gap-1">
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                        <Share2 size={16 * scale} className="text-white" />
                      </div>
                      <span className="text-[8px] font-bold">9</span>
                   </div>
                </div>
             </div>
          </div>

          {/* Simulated Login / Overlay Status */}
          <div className="absolute top-4 left-4 right-4 bg-black/60 backdrop-blur-sm rounded p-2 border border-white/10">
             <div className="flex items-center justify-between">
                <span className="text-[8px] font-bold text-blue-400">R... Q</span>
                <span className="text-[8px] font-bold text-gray-400">Tap to unmute</span>
             </div>
          </div>
        </div>

        {/* FB Footer Mock */}
        <div className="h-12 bg-[#242526] border-t border-white/5 flex items-center justify-around shrink-0">
           <Home size={18 * scale} className="text-blue-500" />
           <Smartphone size={18 * scale} className="text-gray-400" />
           <User size={18 * scale} className="text-gray-400" />
           <Bell size={18 * scale} className="text-gray-400" />
           <Menu size={18 * scale} className="text-gray-400" />
        </div>
      </div>

      {/* Overlay for "Running" Status */}
      {session.status === 'running' && (
        <div className="absolute inset-x-0 top-10 z-20 flex flex-col">
          <div className="h-1 bg-blue-500/20 w-full overflow-hidden">
             <motion.div 
               initial={{ x: '-100%' }}
               animate={{ x: '100%' }}
               transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
               className="h-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)] w-1/3"
             />
          </div>
          
          <div className="bg-blue-600/90 backdrop-blur-md px-3 py-1 flex items-center justify-between shadow-lg">
             <div className="flex items-center gap-2">
                <motion.div 
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full bg-white"
                />
                <span className="text-[9px] font-bold text-white uppercase tracking-tighter">
                  {session.lastAction}
                </span>
             </div>
             
             {session.currentStep === 'commenting' && (
               <motion.div 
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="bg-white/20 px-1.5 py-0.5 rounded text-[8px] font-mono text-white"
               >
                 TYPING...
               </motion.div>
             )}
          </div>
        </div>
      )}

      {/* Simulated Typing Overlay */}
      {session.currentStep === 'commenting' && (
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="absolute bottom-16 left-4 right-4 z-30 bg-[#242526] p-3 rounded-lg border border-blue-500/50 shadow-2xl"
        >
          <div className="text-[8px] text-blue-400 font-bold mb-1 uppercase">Automated Comment</div>
          <div className="text-[10px] text-white italic line-clamp-2">
            "{config.commentText}"
          </div>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 2 }}
            className="h-0.5 bg-blue-500 mt-2"
          />
        </motion.div>
      )}

      {/* Simulated Scroll Animation Overlay */}
      {session.currentStep === 'scrolling' && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 z-30 bg-black/40 backdrop-blur-[2px] flex items-center justify-center"
        >
          <div className="flex flex-col items-center gap-2">
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              <Smartphone size={32 * scale} className="text-white opacity-50" />
            </motion.div>
            <span className="text-[10px] font-bold text-white uppercase tracking-widest">Scrolling...</span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};
