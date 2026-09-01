import React, { useState } from 'react';
import {
  Moon,
  Sun,
  Share2,
  Download,
  Settings,
  Code2,
  FileCheck,
  RotateCcw,
  Smartphone,
  Sparkles,
} from 'lucide-react';
import { ScreenTab } from '../types';

interface TopBarProps {
  currentTab: ScreenTab;
  onSelectTab: (tab: ScreenTab) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onDownloadPdf: () => void;
  onShareCv: () => void;
  onOpenSettings: () => void;
  onOpenCodeViewer: () => void;
  onOpenApkModal: () => void;
  onResetData: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentTab,
  onSelectTab,
  isDark,
  onToggleTheme,
  onDownloadPdf,
  onShareCv,
  onOpenSettings,
  onOpenCodeViewer,
  onOpenApkModal,
  onResetData,
}) => {
  const [showMenu, setShowMenu] = useState(false);

  const getScreenTitle = (tab: ScreenTab) => {
    switch (tab) {
      case 'home':
        return { title: 'Baker Hossain', subtitle: 'Digital CV' };
      case 'about':
        return { title: 'About Me', subtitle: 'মোঃ বাকের হোসেন' };
      case 'experience':
        return { title: 'Work Experience', subtitle: '4+ Years History' };
      case 'education':
        return { title: 'Education', subtitle: 'Academic Timeline' };
      case 'skills':
        return { title: 'Skills & Expertise', subtitle: 'Key Competencies' };
      case 'contact':
        return { title: 'Contact Me', subtitle: 'Direct Communication' };
      case 'cv_preview':
        return { title: 'Printable CV Preview', subtitle: 'A4 Format' };
    }
  };

  const { title, subtitle } = getScreenTitle(currentTab);

  return (
    <header
      id="android-top-bar"
      className={`relative z-40 w-full px-4 py-3 border-b transition-colors duration-200 ${
        isDark
          ? 'bg-slate-900/90 border-slate-800 text-slate-100'
          : 'bg-white/90 border-slate-200 text-slate-900'
      } backdrop-blur-md`}
    >
      <div className="flex items-center justify-between max-w-5xl mx-auto">
        {/* Title Area */}
        <div className="flex items-center space-x-3">
          {currentTab !== 'home' ? (
            <button
              id="topbar-back-btn"
              onClick={() => onSelectTab('home')}
              className={`p-2 -ml-1 rounded-full transition-colors ${
                isDark ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-slate-100 text-slate-700'
              }`}
              title="Back to Home"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          ) : (
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-sky-400 flex items-center justify-center text-white font-bold text-sm shadow-sm shadow-blue-500/20">
              BH
            </div>
          )}

          <div>
            <h1 className="text-base font-bold tracking-tight leading-none flex items-center gap-1.5">
              <span>{title}</span>
              {currentTab === 'home' && (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-500 font-semibold border border-blue-500/20">
                  Native
                </span>
              )}
            </h1>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 font-medium leading-none">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-1 sm:space-x-1.5">
          {/* Quick Theme Toggle */}
          <button
            id="topbar-theme-toggle"
            onClick={onToggleTheme}
            className={`p-2 rounded-full transition-colors ${
              isDark ? 'hover:bg-slate-800 text-amber-400' : 'hover:bg-slate-100 text-slate-600'
            }`}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDark ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
          </button>

          {/* Quick PDF Download */}
          <button
            id="topbar-download-pdf-btn"
            onClick={onDownloadPdf}
            className="p-2 rounded-full transition-colors hover:bg-blue-500/10 text-blue-600 dark:text-sky-400"
            title="Download PDF CV"
          >
            <Download className="w-4.5 h-4.5" />
          </button>

          {/* Quick Share */}
          <button
            id="topbar-share-btn"
            onClick={onShareCv}
            className={`p-2 rounded-full transition-colors ${
              isDark ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-slate-100 text-slate-600'
            }`}
            title="Share CV"
          >
            <Share2 className="w-4.5 h-4.5" />
          </button>

          {/* Android APK Download Button */}
          <button
            id="topbar-apk-btn"
            onClick={onOpenApkModal}
            className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1.5 rounded-lg border transition-all ${
              isDark
                ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/25'
                : 'bg-emerald-600 border-emerald-600 text-white hover:bg-emerald-700 shadow-sm'
            }`}
            title="Build & Download Android APK / Studio Project"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Build APK</span>
          </button>

          {/* Menu Dropdown */}
          <div className="relative">
            <button
              id="topbar-menu-toggle"
              onClick={() => setShowMenu(!showMenu)}
              className={`p-2 rounded-full transition-colors ${
                isDark ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-slate-100 text-slate-600'
              }`}
              title="More Options"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
            </button>

            {/* Menu Popover */}
            {showMenu && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowMenu(false)}
                />
                <div
                  id="topbar-dropdown-menu"
                  className={`absolute right-0 mt-2 w-60 rounded-2xl shadow-xl border py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150 ${
                    isDark
                      ? 'bg-slate-800 border-slate-700 text-slate-200'
                      : 'bg-white border-slate-200 text-slate-800'
                  }`}
                >
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      onOpenApkModal();
                    }}
                    className="w-full flex items-center px-4 py-2.5 text-xs font-bold text-emerald-500 hover:bg-emerald-500/10 transition-colors text-left"
                  >
                    <Smartphone className="w-4 h-4 mr-3 text-emerald-500" />
                    <span>Build & Download APK / Project</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowMenu(false);
                      onSelectTab('cv_preview');
                    }}
                    className="w-full flex items-center px-4 py-2.5 text-xs font-medium hover:bg-slate-500/10 transition-colors text-left"
                  >
                    <FileCheck className="w-4 h-4 mr-3 text-blue-500" />
                    <span>View A4 CV Document</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowMenu(false);
                      onDownloadPdf();
                    }}
                    className="w-full flex items-center px-4 py-2.5 text-xs font-medium hover:bg-slate-500/10 transition-colors text-left"
                  >
                    <Download className="w-4 h-4 mr-3 text-emerald-500" />
                    <span>Download PDF CV</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowMenu(false);
                      onShareCv();
                    }}
                    className="w-full flex items-center px-4 py-2.5 text-xs font-medium hover:bg-slate-500/10 transition-colors text-left"
                  >
                    <Share2 className="w-4 h-4 mr-3 text-sky-500" />
                    <span>Share CV Link / Details</span>
                  </button>

                  <div className="my-1 border-t border-slate-200 dark:border-slate-700" />

                  <button
                    onClick={() => {
                      setShowMenu(false);
                      onOpenCodeViewer();
                    }}
                    className="w-full flex items-center px-4 py-2.5 text-xs font-medium hover:bg-slate-500/10 transition-colors text-left"
                  >
                    <Code2 className="w-4 h-4 mr-3 text-indigo-500" />
                    <span>Kotlin & Compose Source Code</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowMenu(false);
                      onOpenSettings();
                    }}
                    className="w-full flex items-center px-4 py-2.5 text-xs font-medium hover:bg-slate-500/10 transition-colors text-left"
                  >
                    <Settings className="w-4 h-4 mr-3 text-slate-400" />
                    <span>Edit CV Profile Data</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowMenu(false);
                      if (window.confirm('Reset CV data back to default মোঃ বাকের হোসেন values?')) {
                        onResetData();
                      }
                    }}
                    className="w-full flex items-center px-4 py-2 text-xs font-medium hover:bg-red-500/10 text-red-500 transition-colors text-left"
                  >
                    <RotateCcw className="w-4 h-4 mr-3" />
                    <span>Reset Data to Default</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
