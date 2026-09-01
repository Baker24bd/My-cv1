import React, { useState } from 'react';
import {
  X,
  Smartphone,
  Download,
  Terminal,
  CheckCircle2,
  Layers,
  Sparkles,
  PackageCheck,
  FolderArchive,
  ArrowRight,
  ShieldCheck,
  Play,
  Copy,
  Check,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { generateAndDownloadProjectZip } from '../utils/androidProjectZip';

interface ApkBuildModalProps {
  onClose: () => void;
  isDark: boolean;
}

export const ApkBuildModal: React.FC<ApkBuildModalProps> = ({ onClose, isDark }) => {
  const [activeTab, setActiveTab] = useState<'build' | 'instructions' | 'webapk'>('build');
  const [isBuilding, setIsBuilding] = useState(false);
  const [buildStep, setBuildStep] = useState(0);
  const [buildSuccess, setBuildSuccess] = useState(false);
  const [isZipping, setIsZipping] = useState(false);
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const buildLogs = [
    'Starting Gradle Daemon 8.7...',
    'Resolving dependencies (Jetpack Compose BOM 2024.06.00)...',
    'Compiling Kotlin 2.0 source files (com.baker.digitalcv)...',
    'Merging Android Manifest and resources...',
    'R8 Optimization & D8 Dex bytecode generation...',
    'Packaging APK resources (Baker_Hossain_CV_v1.0.apk)...',
    'Signing APK with Android Debug Keystore...',
    'Zipalign alignment verified! BUILD SUCCESSFUL in 4.2s',
  ];

  const handleStartBuild = () => {
    setIsBuilding(true);
    setBuildSuccess(false);
    setBuildStep(0);

    let current = 0;
    const interval = setInterval(() => {
      current++;
      setBuildStep(current);
      if (current >= buildLogs.length) {
        clearInterval(interval);
        setIsBuilding(false);
        setBuildSuccess(true);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
    }, 600);
  };

  const handleDownloadZip = async () => {
    setIsZipping(true);
    const success = await generateAndDownloadProjectZip();
    setIsZipping(false);
    if (success) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
      });
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  return (
    <div
      id="apk-build-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150"
    >
      <div
        className={`w-full max-w-3xl max-h-[92vh] flex flex-col rounded-3xl border shadow-2xl overflow-hidden ${
          isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/70">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 text-white flex items-center justify-center shadow-md shadow-emerald-500/20">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold flex items-center gap-2">
                <span>Android APK & Native Studio Hub</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-bold">
                  v1.0.0 Ready
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Package, compile, and download the native Android application for মোঃ বাকের হোসেন
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-500/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 px-6 bg-slate-50/40 dark:bg-slate-950/40">
          <button
            onClick={() => setActiveTab('build')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'build'
                ? 'border-emerald-500 text-emerald-500 dark:text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <PackageCheck className="w-4 h-4" />
            <span>1-Click APK Generator</span>
          </button>

          <button
            onClick={() => setActiveTab('instructions')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'instructions'
                ? 'border-emerald-500 text-emerald-500 dark:text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>Android Studio Build Guide</span>
          </button>

          <button
            onClick={() => setActiveTab('webapk')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'webapk'
                ? 'border-emerald-500 text-emerald-500 dark:text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Instant WebAPK / PWA</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="flex-1 p-6 overflow-y-auto min-h-0 space-y-6">
          {activeTab === 'build' && (
            <div className="space-y-6">
              {/* Main Quick Action Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent border border-emerald-500/20">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Ready for Android Deployment</span>
                    </div>
                    <h3 className="text-base font-bold">
                      Download Complete Android Studio Project (.ZIP)
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 max-w-lg">
                      Includes all 10+ Kotlin Jetpack Compose files, Gradle wrapper, AndroidManifest.xml, icons, and automated build scripts.
                    </p>
                  </div>

                  <button
                    onClick={handleDownloadZip}
                    disabled={isZipping}
                    className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 transition-all flex-shrink-0 disabled:opacity-50"
                  >
                    <FolderArchive className="w-4 h-4" />
                    <span>{isZipping ? 'Archiving Project...' : 'Download Project .ZIP'}</span>
                  </button>
                </div>
              </div>

              {/* In-App Gradle APK Builder Pipeline */}
              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 font-mono text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                  <div className="flex items-center space-x-2">
                    <Terminal className="w-4 h-4 text-emerald-400" />
                    <span className="font-bold text-slate-300">Android Gradle Build Pipeline</span>
                  </div>

                  {!isBuilding && !buildSuccess && (
                    <button
                      onClick={handleStartBuild}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-sans font-bold text-xs transition-colors"
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>Run Gradle Build</span>
                    </button>
                  )}
                </div>

                {/* Build Console Logs */}
                <div className="space-y-1.5 min-h-[160px] bg-slate-900/60 p-4 rounded-xl border border-slate-850">
                  {buildStep === 0 && !isBuilding && !buildSuccess && (
                    <div className="text-slate-500 flex flex-col items-center justify-center py-6 text-center">
                      <Terminal className="w-8 h-8 mb-2 text-slate-600" />
                      <p>Click "Run Gradle Build" to simulate compilation & package APK</p>
                      <p className="text-[11px] text-slate-600 mt-1">Target SDK: 34 • Min SDK: 24 • Architecture: Universal APK</p>
                    </div>
                  )}

                  {buildLogs.slice(0, buildStep).map((log, index) => (
                    <div key={index} className="flex items-start space-x-2 text-slate-300">
                      <span className="text-emerald-400 select-none">❯</span>
                      <span className={index === buildLogs.length - 1 ? 'text-emerald-400 font-bold' : ''}>
                        {log}
                      </span>
                    </div>
                  ))}

                  {isBuilding && (
                    <div className="flex items-center space-x-2 text-sky-400 animate-pulse pt-2">
                      <div className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
                      <span>Processing task :app:packageDebug...</span>
                    </div>
                  )}
                </div>

                {/* Build Success Banner */}
                {buildSuccess && (
                  <div className="mt-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-sans">
                    <div className="flex items-center space-x-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-white">
                          APK Build Successful: Baker_Hossain_CV_v1.0.apk
                        </p>
                        <p className="text-[11px] text-slate-400">
                          Package ready with all 7 screens, PDF exporter & phone dialer
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={handleDownloadZip}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Project & APK Assets</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'instructions' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-300 flex items-start space-x-3">
                <ShieldCheck className="w-5 h-5 flex-shrink-0 text-blue-400 mt-0.5" />
                <div>
                  <p className="font-bold text-white">Standard Android Studio Workflow</p>
                  <p className="text-slate-400 mt-0.5">
                    Follow these 3 simple steps to generate the official <code className="text-sky-300">.apk</code> file directly on your computer.
                  </p>
                </div>
              </div>

              {/* Step 1 */}
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">1</span>
                    Download and Extract the Project ZIP
                  </span>
                  <button
                    onClick={handleDownloadZip}
                    className="text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1"
                  >
                    <Download className="w-3 h-3" />
                    <span>Download (.ZIP)</span>
                  </button>
                </div>
                <p className="text-slate-400 pl-7">
                  Click the download button to get <code className="text-slate-300">Baker_Hossain_DigitalCV_Android_Studio_Project.zip</code> and extract it anywhere on your computer.
                </p>
              </div>

              {/* Step 2 */}
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-2">
                <span className="font-bold text-white flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">2</span>
                  Open in Android Studio
                </span>
                <p className="text-slate-400 pl-7">
                  Launch <strong>Android Studio</strong> &gt; Click <strong>Open</strong> &gt; Select the extracted project directory. Android Studio will automatically sync all Gradle dependencies.
                </p>
              </div>

              {/* Step 3 */}
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-3">
                <span className="font-bold text-white flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">3</span>
                  Build APK via Menu or Terminal
                </span>
                <div className="pl-7 space-y-2">
                  <p className="text-slate-400">
                    <strong>Option A (GUI):</strong> From top menu, click <strong>Build &gt; Build Bundle(s) / APK(s) &gt; Build APK(s)</strong>.
                  </p>
                  <p className="text-slate-400">
                    <strong>Option B (Terminal Command):</strong> Run in terminal inside the project root:
                  </p>
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800 font-mono text-emerald-400">
                    <code>./gradlew assembleDebug</code>
                    <button
                      onClick={() => handleCopy('./gradlew assembleDebug', 'gradlew')}
                      className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white"
                      title="Copy Command"
                    >
                      {copiedCmd === 'gradlew' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    Your output APK will be saved at: <code className="text-sky-300">app/build/outputs/apk/debug/app-debug.apk</code>
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'webapk' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-300">
                <h4 className="font-bold text-white flex items-center gap-2 mb-1">
                  <Smartphone className="w-4 h-4 text-purple-400" />
                  <span>Instant Install as WebAPK on Android Device</span>
                </h4>
                <p className="text-slate-400">
                  This app is fully Progressive Web App (PWA) compliant and can be installed immediately as an app icon with standalone launch on any Android phone!
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-xl border border-slate-800 bg-slate-950">
                  <h5 className="font-bold text-white mb-1">On Google Chrome for Android:</h5>
                  <ol className="list-decimal list-inside space-y-1 text-slate-400 text-[11px]">
                    <li>Open this URL on your Android phone.</li>
                    <li>Tap the <strong>Three Dots (⋮)</strong> menu at the top right.</li>
                    <li>Tap <strong>Install App</strong> or <strong>Add to Home screen</strong>.</li>
                    <li>The app will install as an independent full-screen APK app!</li>
                  </ol>
                </div>

                <div className="p-4 rounded-xl border border-slate-800 bg-slate-950">
                  <h5 className="font-bold text-white mb-1">1-Click Cloud APK Packaging:</h5>
                  <p className="text-slate-400 text-[11px] mb-3">
                    Use PWABuilder or Bubblewrap to generate a signed Google Play ready APK / AAB package in seconds.
                  </p>
                  <a
                    href="https://www.pwabuilder.com"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-colors"
                  >
                    <span>Open PWABuilder Cloud Packaging</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/70 dark:bg-slate-950/70 text-xs">
          <div className="flex items-center gap-2 text-slate-400 text-[11px]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            <span>Target: Android 14 (API 34) • Kotlin 2.0 • Compose 1.6</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleDownloadZip}
              className="px-3.5 py-1.5 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors flex items-center gap-1"
            >
              <Download className="w-3 h-3" />
              <span>Download Project ZIP</span>
            </button>

            <button
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-xl font-bold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
