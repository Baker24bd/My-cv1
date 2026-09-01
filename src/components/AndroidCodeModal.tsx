import React, { useState } from 'react';
import {
  X,
  Code2,
  Copy,
  Check,
  FileCode,
  Download,
  Terminal,
  FolderTree,
  FileText,
  FolderArchive,
} from 'lucide-react';
import { ANDROID_PROJECT_FILES, AndroidCodeFile } from '../utils/androidProjectCode';
import { generateAndDownloadProjectZip } from '../utils/androidProjectZip';

interface AndroidCodeModalProps {
  onClose: () => void;
  isDark: boolean;
}

export const AndroidCodeModal: React.FC<AndroidCodeModalProps> = ({ onClose, isDark }) => {
  const [selectedFile, setSelectedFile] = useState<AndroidCodeFile>(ANDROID_PROJECT_FILES[0]);
  const [copied, setCopied] = useState(false);
  const [isZipping, setIsZipping] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadSingleFile = () => {
    const blob = new Blob([selectedFile.code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = selectedFile.filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadFullProjectZip = async () => {
    setIsZipping(true);
    await generateAndDownloadProjectZip();
    setIsZipping(false);
  };

  return (
    <div
      id="android-code-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150"
    >
      <div
        className={`w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl border shadow-2xl overflow-hidden ${
          isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold flex items-center gap-2">
                <span>Native Android Kotlin Project</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                  Jetpack Compose & Material 3
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Complete, production-ready Android codebase
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-500/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body with Sidebar + Code View */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-0">
          {/* File Explorer Sidebar */}
          <div
            className={`w-full md:w-64 border-b md:border-b-0 md:border-r p-3 overflow-y-auto ${
              isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50/80 border-slate-200'
            }`}
          >
            <div className="flex items-center space-x-1.5 px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              <FolderTree className="w-3.5 h-3.5" />
              <span>Project Files</span>
            </div>

            <div className="space-y-1">
              {ANDROID_PROJECT_FILES.map((file) => {
                const isSelected = selectedFile.filename === file.filename;
                return (
                  <button
                    key={file.filename}
                    onClick={() => setSelectedFile(file)}
                    className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-left transition-all ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-sm'
                        : isDark
                        ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                    }`}
                  >
                    <FileCode className={`w-4 h-4 flex-shrink-0 ${isSelected ? 'text-white' : 'text-blue-500'}`} />
                    <div className="truncate">
                      <p className="truncate">{file.filename}</p>
                      <p className={`text-[10px] truncate opacity-70 ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                        {file.language.toUpperCase()}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Code Viewer Panel */}
          <div className="flex-1 flex flex-col min-h-0 bg-slate-950 text-slate-100 font-mono">
            {/* File Path & Action Header */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-800 bg-slate-900/90 text-xs">
              <div className="flex items-center space-x-2 truncate">
                <Terminal className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span className="text-slate-400 truncate">{selectedFile.path}</span>
              </div>

              <div className="flex items-center space-x-2 flex-shrink-0">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-sans font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
                  title="Copy File Code"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>

                <button
                  onClick={handleDownloadSingleFile}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-sans font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
                  title="Download Current File"
                >
                  <Download className="w-3 h-3" />
                  <span>File</span>
                </button>

                <button
                  onClick={handleDownloadFullProjectZip}
                  disabled={isZipping}
                  className="flex items-center gap-1 px-3 py-1 rounded-lg text-[11px] font-sans font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors disabled:opacity-50"
                  title="Download Complete Android Studio Project (.ZIP)"
                >
                  <FolderArchive className="w-3 h-3" />
                  <span>{isZipping ? 'Archiving...' : 'Project .ZIP'}</span>
                </button>
              </div>
            </div>

            {/* File Description Tag */}
            <div className="px-4 py-2 bg-slate-900/40 border-b border-slate-850 text-[11px] text-slate-400 font-sans">
              ℹ️ {selectedFile.description}
            </div>

            {/* Code Content */}
            <pre className="flex-1 p-4 overflow-auto text-xs leading-relaxed text-slate-300 select-text scrollbar-thin scrollbar-thumb-slate-700">
              <code>{selectedFile.code}</code>
            </pre>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-950/50 text-xs text-slate-500">
          <div className="flex items-center space-x-2">
            <span>Target SDK 34 • Kotlin 2.0 • Jetpack Compose BOM</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleDownloadFullProjectZip}
              disabled={isZipping}
              className="px-3 py-1.5 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors flex items-center gap-1.5"
            >
              <FolderArchive className="w-3.5 h-3.5" />
              <span>{isZipping ? 'Downloading...' : 'Download Full Android Studio Project (.ZIP)'}</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl font-bold bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
