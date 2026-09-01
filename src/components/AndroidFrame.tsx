import React, { useState, useEffect } from 'react';
import { Wifi, BatteryMedium, Signal, Smartphone, Monitor } from 'lucide-react';

interface AndroidFrameProps {
  children: React.ReactNode;
  isDark: boolean;
  viewMode: 'device' | 'full';
  onToggleViewMode: () => void;
}

export const AndroidFrame: React.FC<AndroidFrameProps> = ({
  children,
  isDark,
  viewMode,
  onToggleViewMode,
}) => {
  const [currentTime, setCurrentTime] = useState('12:30');

  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      const hours = d.getHours().toString().padStart(2, '0');
      const mins = d.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${mins}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  if (viewMode === 'full') {
    return (
      <div className={`min-h-screen w-full transition-colors duration-200 ${
        isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}>
        {/* Floating View Switcher Button */}
        <div className="fixed bottom-4 right-4 z-50">
          <button
            onClick={onToggleViewMode}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold shadow-xl border backdrop-blur-md transition-all ${
              isDark
                ? 'bg-slate-900/90 hover:bg-slate-800 text-sky-400 border-slate-700'
                : 'bg-white/90 hover:bg-slate-100 text-blue-600 border-slate-300'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>Switch to Phone Frame</span>
          </button>
        </div>
        <div className="max-w-4xl mx-auto min-h-screen flex flex-col">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen w-full py-4 sm:py-8 px-2 sm:px-4 flex flex-col items-center justify-center transition-colors duration-200 ${
      isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-100 text-slate-900'
    }`}>
      {/* Top Floating Controls */}
      <div className="mb-3 flex items-center justify-between w-full max-w-md px-2 text-xs text-slate-500">
        <span className="font-semibold flex items-center gap-1">
          <Smartphone className="w-3.5 h-3.5 text-blue-500" />
          <span>Android Pixel UI</span>
        </span>
        <button
          onClick={onToggleViewMode}
          className={`flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full border transition-all ${
            isDark
              ? 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800'
              : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300 shadow-sm'
          }`}
        >
          <Monitor className="w-3 h-3 text-blue-500" />
          <span>Full Width</span>
        </button>
      </div>

      {/* Android Device Outer Bezel */}
      <div className={`relative w-full max-w-md rounded-[44px] p-3 shadow-2xl border transition-all ${
        isDark
          ? 'bg-slate-900 border-slate-800 shadow-black/60'
          : 'bg-slate-800 border-slate-700 shadow-slate-400/30'
      }`}>
        {/* Device Screen */}
        <div className={`relative w-full rounded-[36px] overflow-hidden flex flex-col h-[840px] max-h-[88vh] border ${
          isDark
            ? 'bg-slate-950 border-slate-800/80 text-slate-100'
            : 'bg-slate-50 border-slate-200 text-slate-900'
        }`}>
          {/* Android Status Bar */}
          <div className={`w-full px-6 py-2 flex items-center justify-between text-xs font-semibold z-30 select-none ${
            isDark ? 'bg-slate-900/90 text-slate-300' : 'bg-white/90 text-slate-700'
          }`}>
            <span>{currentTime}</span>

            {/* Camera Punch Hole */}
            <div className="w-3.5 h-3.5 rounded-full bg-black border border-slate-700/50 shadow-inner flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-slate-800" />
            </div>

            <div className="flex items-center space-x-1.5">
              <Signal className="w-3.5 h-3.5" />
              <Wifi className="w-3.5 h-3.5" />
              <div className="flex items-center">
                <span className="text-[10px] mr-0.5">100%</span>
                <BatteryMedium className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Screen Content Scrollable Container */}
          <div className="flex-1 flex flex-col min-h-0 overflow-y-auto overflow-x-hidden relative">
            {children}
          </div>

          {/* Android Bottom Gesture Navigation Pill */}
          <div className={`w-full py-1.5 flex justify-center items-center z-30 select-none ${
            isDark ? 'bg-slate-900/95' : 'bg-white/95'
          }`}>
            <div className="w-32 h-1 rounded-full bg-slate-400/50 hover:bg-slate-400 transition-colors" />
          </div>
        </div>
      </div>
    </div>
  );
};
