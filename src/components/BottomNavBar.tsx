import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Home,
  User,
  Briefcase,
  GraduationCap,
  Award,
  PhoneCall,
  FileText,
} from 'lucide-react';
import { ScreenTab } from '../types';

interface BottomNavBarProps {
  currentTab: ScreenTab;
  onSelectTab: (tab: ScreenTab) => void;
  isDark: boolean;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  currentTab,
  onSelectTab,
  isDark,
}) => {
  const tabs: { id: ScreenTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills', icon: Award },
    { id: 'contact', label: 'Contact', icon: PhoneCall },
    { id: 'cv_preview', label: 'CV', icon: FileText },
  ];

  return (
    <nav
      id="android-bottom-nav"
      aria-label="Bottom Navigation"
      className={`relative z-30 w-full border-t transition-colors duration-200 ${
        isDark
          ? 'bg-slate-900/95 border-slate-800 text-slate-400'
          : 'bg-white/95 border-slate-200 text-slate-600'
      } backdrop-blur-md pb-safe`}
    >
      <div className="flex items-center justify-around px-1 py-1.5 max-w-lg mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`nav-btn-${tab.id}`}
              onClick={() => onSelectTab(tab.id)}
              className={`group relative flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-2xl transition-all duration-200 select-none ${
                isActive
                  ? isDark
                    ? 'text-sky-400'
                    : 'text-blue-600'
                  : isDark
                  ? 'hover:text-slate-200 active:scale-95'
                  : 'hover:text-slate-900 active:scale-95'
              }`}
            >
              {/* Material 3 Active Indicator Pill */}
              <div className="relative flex items-center justify-center">
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      layoutId="activePill"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                      className={`absolute inset-0 -mx-3 -my-1 rounded-full ${
                        isDark ? 'bg-sky-500/15' : 'bg-blue-50'
                      }`}
                    />
                  )}
                </AnimatePresence>
                <Icon
                  className={`w-5 h-5 relative z-10 transition-transform duration-200 ${
                    isActive ? 'scale-110 font-bold stroke-[2.4]' : 'stroke-[1.75]'
                  }`}
                />
              </div>
              <span
                className={`text-[10px] mt-1 tracking-tight font-medium relative z-10 transition-all duration-150 ${
                  isActive ? 'font-bold opacity-100' : 'opacity-80'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
