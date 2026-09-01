import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CvData, ScreenTab } from './types';
import { loadCvData, saveCvData, resetCvData } from './data/cvData';
import { generateAndDownloadPdf, shareCv } from './utils/pdfGenerator';
import { SplashScreen } from './components/SplashScreen';
import { AndroidFrame } from './components/AndroidFrame';
import { TopBar } from './components/TopBar';
import { BottomNavBar } from './components/BottomNavBar';
import { HomeScreen } from './components/HomeScreen';
import { AboutScreen } from './components/AboutScreen';
import { EducationScreen } from './components/EducationScreen';
import { ExperienceScreen } from './components/ExperienceScreen';
import { SkillsScreen } from './components/SkillsScreen';
import { ContactScreen } from './components/ContactScreen';
import { CvPreviewScreen } from './components/CvPreviewScreen';
import { CvEditModal } from './components/CvEditModal';
import { AndroidCodeModal } from './components/AndroidCodeModal';
import { ApkBuildModal } from './components/ApkBuildModal';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function App() {
  const [cvData, setCvData] = useState<CvData>(() => loadCvData());
  const [currentTab, setCurrentTab] = useState<ScreenTab>('home');
  const [showSplash, setShowSplash] = useState(true);
  const [isDark, setIsDark] = useState(true);
  const [viewMode, setViewMode] = useState<'device' | 'full'>('device');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [isApkModalOpen, setIsApkModalOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  // Sync dark class on root
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  const handleDownloadPdf = async () => {
    showToast('Generating official A4 PDF CV...', 'info');
    const success = await generateAndDownloadPdf(cvData, 'cv-printable-sheet');
    if (success) {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
      });
      showToast('PDF CV downloaded successfully! Check your Downloads folder.', 'success');
    } else {
      showToast('Downloaded formatted CV document.', 'success');
    }
  };

  const handleShareCv = async () => {
    const result = await shareCv(cvData);
    if (result.success) {
      showToast(result.message, 'success');
    } else {
      showToast(result.message, 'info');
    }
  };

  const handleUpdatePhoto = (photoUrl: string) => {
    const updated: CvData = {
      ...cvData,
      personalInfo: {
        ...cvData.personalInfo,
        photoUrl,
      },
    };
    setCvData(updated);
    saveCvData(updated);
    showToast('Profile photo updated successfully!', 'success');
  };

  const handleSaveCvData = (newData: CvData) => {
    setCvData(newData);
    saveCvData(newData);
    showToast('CV Information saved offline!', 'success');
  };

  const handleResetData = () => {
    const initial = resetCvData();
    setCvData(initial);
    showToast('CV data restored to default profile for মোঃ বাকের হোসেন', 'info');
  };

  return (
    <>
      {/* Animated Splash Screen */}
      {showSplash ? (
        <SplashScreen onFinish={() => setShowSplash(false)} isDark={isDark} />
      ) : (
        <AndroidFrame
          isDark={isDark}
          viewMode={viewMode}
          onToggleViewMode={() => setViewMode(viewMode === 'device' ? 'full' : 'device')}
        >
          {/* Main Top Bar */}
          <TopBar
            currentTab={currentTab}
            onSelectTab={setCurrentTab}
            isDark={isDark}
            onToggleTheme={() => setIsDark(!isDark)}
            onDownloadPdf={handleDownloadPdf}
            onShareCv={handleShareCv}
            onOpenSettings={() => setIsEditModalOpen(true)}
            onOpenCodeViewer={() => setIsCodeModalOpen(true)}
            onOpenApkModal={() => setIsApkModalOpen(true)}
            onResetData={handleResetData}
          />

          {/* Active Screen Content */}
          <main className="flex-1 p-4 sm:p-5 overflow-y-auto">
            {currentTab === 'home' && (
              <HomeScreen
                cvData={cvData}
                onSelectTab={setCurrentTab}
                onDownloadPdf={handleDownloadPdf}
                onUpdatePhoto={handleUpdatePhoto}
                onOpenApkModal={() => setIsApkModalOpen(true)}
                isDark={isDark}
              />
            )}

            {currentTab === 'about' && (
              <AboutScreen cvData={cvData} isDark={isDark} />
            )}

            {currentTab === 'experience' && (
              <ExperienceScreen cvData={cvData} isDark={isDark} />
            )}

            {currentTab === 'education' && (
              <EducationScreen cvData={cvData} isDark={isDark} />
            )}

            {currentTab === 'skills' && (
              <SkillsScreen cvData={cvData} isDark={isDark} />
            )}

            {currentTab === 'contact' && (
              <ContactScreen
                cvData={cvData}
                onShareCv={handleShareCv}
                isDark={isDark}
              />
            )}

            {currentTab === 'cv_preview' && (
              <CvPreviewScreen
                cvData={cvData}
                onDownloadPdf={handleDownloadPdf}
                onShareCv={handleShareCv}
                isDark={isDark}
              />
            )}
          </main>

          {/* Material 3 Bottom Navigation Bar */}
          <BottomNavBar
            currentTab={currentTab}
            onSelectTab={setCurrentTab}
            isDark={isDark}
          />
        </AndroidFrame>
      )}

      {/* Floating Toast Notification */}
      {toast && (
        <div
          id="app-toast-notification"
          className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2.5 rounded-2xl shadow-2xl border text-xs font-bold bg-slate-900 text-white border-slate-700 animate-in fade-in slide-in-from-bottom-3 duration-200"
        >
          {toast.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-sky-400 flex-shrink-0" />
          )}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Edit CV Data Modal */}
      {isEditModalOpen && (
        <CvEditModal
          cvData={cvData}
          onSave={handleSaveCvData}
          onClose={() => setIsEditModalOpen(false)}
          onReset={handleResetData}
          isDark={isDark}
        />
      )}

      {/* Android Kotlin Source Code Explorer Modal */}
      {isCodeModalOpen && (
        <AndroidCodeModal
          onClose={() => setIsCodeModalOpen(false)}
          isDark={isDark}
        />
      )}

      {/* Android APK & Native Studio Build Modal */}
      {isApkModalOpen && (
        <ApkBuildModal
          onClose={() => setIsApkModalOpen(false)}
          isDark={isDark}
        />
      )}
    </>
  );
}
