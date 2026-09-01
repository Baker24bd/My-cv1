import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface SplashScreenProps {
  onFinish: () => void;
  isDark: boolean;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish, isDark }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2400);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div
      id="splash-screen"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center p-6 select-none transition-colors duration-500 ${
        isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-900 text-white'
      }`}
    >
      {/* Ambient background glow */}
      <div className="absolute w-72 h-72 rounded-full bg-blue-600/20 blur-3xl -top-12 -left-12 pointer-events-none" />
      <div className="absolute w-72 h-72 rounded-full bg-sky-500/15 blur-3xl -bottom-12 -right-12 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-sm">
        {/* Animated Avatar / Monogram Logo */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0, rotate: -15 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-6"
        >
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-400 p-[2px] shadow-2xl shadow-blue-500/30">
            <div className="w-full h-full rounded-[22px] bg-slate-900 flex flex-col items-center justify-center">
              <span className="text-3xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-300">
                BH
              </span>
              <span className="text-[10px] text-slate-400 font-medium tracking-widest uppercase">
                Profile
              </span>
            </div>
          </div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: 'spring' }}
            className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-blue-500 border-2 border-slate-900 flex items-center justify-center text-white"
          >
            <Sparkles className="w-4 h-4" />
          </motion.div>
        </motion.div>

        {/* Bengali Name with smooth fade/slide */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-3xl font-bold tracking-tight text-white font-['Noto_Sans_Bengali',sans-serif] mb-2"
        >
          মোঃ বাকের হোসেন
        </motion.h1>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex items-center space-x-2"
        >
          <div className="h-[1px] w-6 bg-sky-500/50" />
          <p className="text-sm font-semibold tracking-widest text-sky-400 uppercase">
            Digital CV
          </p>
          <div className="h-[1px] w-6 bg-sky-500/50" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="text-xs text-slate-400 mt-2 font-medium"
        >
          Business Development & NGO Professional
        </motion.p>

        {/* Loading / Progress Indicator */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 140, opacity: 1 }}
          transition={{ delay: 0.7, duration: 1.5 }}
          className="h-1 bg-gradient-to-r from-blue-500 to-sky-400 rounded-full mt-8 overflow-hidden"
        >
          <motion.div
            animate={{ x: [-140, 140] }}
            transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
            className="w-12 h-full bg-white/60"
          />
        </motion.div>

        {/* Quick Skip Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          onClick={onFinish}
          className="mt-8 px-4 py-2 rounded-full text-xs font-semibold text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 flex items-center gap-1.5 transition-all"
        >
          <span>Open CV</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </motion.button>
      </div>

      <div className="absolute bottom-6 text-[11px] text-slate-500 font-medium">
        Offline-Ready Native CV Experience
      </div>
    </div>
  );
};
