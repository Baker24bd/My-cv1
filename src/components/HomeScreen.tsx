import React, { useRef } from 'react';
import { motion } from 'motion/react';
import {
  FileText,
  Download,
  PhoneCall,
  Mail,
  MessageCircle,
  Briefcase,
  GraduationCap,
  Award,
  Camera,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { CvData, ScreenTab } from '../types';

interface HomeScreenProps {
  cvData: CvData;
  onSelectTab: (tab: ScreenTab) => void;
  onDownloadPdf: () => void;
  onUpdatePhoto: (photoUrl: string) => void;
  onOpenApkModal: () => void;
  isDark: boolean;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  cvData,
  onSelectTab,
  onDownloadPdf,
  onUpdatePhoto,
  onOpenApkModal,
  isDark,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { personalInfo, experience, education, skills } = cvData;

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          onUpdatePhoto(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const totalExperienceYears = experience.reduce((acc, curr) => acc + (curr.yearsCount || 2), 0);

  return (
    <div id="home-screen" className="space-y-5 pb-8 animate-in fade-in duration-300">
      {/* Hidden File Input for Easy Photo Replacement */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handlePhotoUpload}
      />

      {/* Hero Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={`relative overflow-hidden rounded-3xl p-6 sm:p-7 border transition-all ${
          isDark
            ? 'bg-gradient-to-br from-slate-900 via-slate-900 to-slate-850 border-slate-800 shadow-xl shadow-black/20'
            : 'bg-gradient-to-br from-white via-slate-50 to-blue-50/40 border-slate-200/80 shadow-lg shadow-slate-200/50'
        }`}
      >
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 right-0 w-44 h-44 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Circular Profile Photo with Easy Upload Badge */}
          <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-tr from-blue-600 via-indigo-500 to-sky-400 shadow-xl shadow-blue-500/20">
              <div className={`w-full h-full rounded-full overflow-hidden flex items-center justify-center ${
                isDark ? 'bg-slate-800' : 'bg-slate-100'
              }`}>
                {personalInfo.photoUrl ? (
                  <img
                    src={personalInfo.photoUrl}
                    alt={personalInfo.fullNameEnglish}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-blue-600 to-indigo-700 text-white select-none">
                    <span className="text-3xl sm:text-4xl font-black tracking-tight">BH</span>
                    <span className="text-[10px] uppercase font-semibold tracking-wider text-blue-200 mt-0.5">
                      মোঃ বাকের
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Change Photo Overlay Badge */}
            <div
              className={`absolute bottom-0 right-0 p-2 rounded-full border shadow-md transition-transform group-hover:scale-110 ${
                isDark
                  ? 'bg-slate-800 border-slate-700 text-sky-400'
                  : 'bg-white border-slate-200 text-blue-600'
              }`}
              title="Click to change profile photo"
            >
              <Camera className="w-4 h-4" />
            </div>
          </div>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="text-[11px] text-slate-500 dark:text-slate-400 hover:text-blue-500 mt-1.5 font-medium flex items-center gap-1"
          >
            <span>{personalInfo.photoUrl ? 'Change Photo' : 'Upload Your Photo'}</span>
          </button>

          {/* Name in Bengali & English */}
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-3 text-slate-900 dark:text-white font-['Noto_Sans_Bengali',sans-serif]">
            {personalInfo.fullNameBangla}
          </h2>
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
            {personalInfo.fullNameEnglish}
          </p>

          {/* Professional Title Badge */}
          <div className="mt-2.5 inline-flex items-center px-3.5 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-600 dark:text-sky-400 border border-blue-500/20">
            <Sparkles className="w-3.5 h-3.5 mr-1.5" />
            <span>{personalInfo.professionalTitle}</span>
          </div>

          {/* Short Professional Summary */}
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-4 leading-relaxed max-w-lg text-center">
            {personalInfo.summary}
          </p>

          {/* Core Action Buttons requested by user: [View My CV] [Download CV] [Contact Me] */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 w-full mt-6 pt-2">
            <button
              id="home-view-cv-btn"
              onClick={() => onSelectTab('cv_preview')}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.98] shadow-md shadow-blue-600/25 transition-all"
            >
              <FileText className="w-4 h-4" />
              <span>View My CV</span>
            </button>

            <button
              id="home-download-cv-btn"
              onClick={onDownloadPdf}
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm border transition-all active:scale-[0.98] ${
                isDark
                  ? 'bg-slate-800/90 hover:bg-slate-800 text-sky-400 border-slate-700 shadow-sm'
                  : 'bg-white hover:bg-slate-50 text-blue-700 border-slate-300 shadow-sm'
              }`}
            >
              <Download className="w-4 h-4" />
              <span>Download CV</span>
            </button>

            <button
              id="home-contact-me-btn"
              onClick={() => onSelectTab('contact')}
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all active:scale-[0.98] ${
                isDark
                  ? 'bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/30'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20'
              }`}
            >
              <PhoneCall className="w-4 h-4" />
              <span>Contact Me</span>
            </button>
          </div>

          {/* Android APK & Studio Project Download Banner */}
          <div
            onClick={onOpenApkModal}
            className={`w-full mt-4 p-3.5 rounded-2xl border cursor-pointer transition-all hover:scale-[1.01] flex items-center justify-between text-left ${
              isDark
                ? 'bg-emerald-500/10 border-emerald-500/30 hover:bg-emerald-500/15 text-emerald-300'
                : 'bg-emerald-50 border-emerald-200 hover:bg-emerald-100/70 text-emerald-800'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center flex-shrink-0 font-bold">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold flex items-center gap-1.5">
                  <span>Download Android App APK / Studio Project</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-extrabold uppercase">
                    v1.0.0
                  </span>
                </p>
                <p className="text-[11px] opacity-80 mt-0.5">
                  Get full Native Kotlin Jetpack Compose code & ready-to-compile APK package
                </p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 flex-shrink-0 ml-2" />
          </div>
        </div>
      </motion.div>

      {/* Highlight Stats Row */}
      <div className="grid grid-cols-3 gap-3">
        <div
          onClick={() => onSelectTab('experience')}
          className={`p-3.5 rounded-2xl border cursor-pointer transition-all hover:scale-[1.02] ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200/80 shadow-sm'
          }`}
        >
          <div className="flex items-center space-x-1.5 text-blue-500 mb-1">
            <Briefcase className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase tracking-wider">Experience</span>
          </div>
          <p className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
            {totalExperienceYears}+ Years
          </p>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
            Garments & NGO
          </p>
        </div>

        <div
          onClick={() => onSelectTab('skills')}
          className={`p-3.5 rounded-2xl border cursor-pointer transition-all hover:scale-[1.02] ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200/80 shadow-sm'
          }`}
        >
          <div className="flex items-center space-x-1.5 text-emerald-500 mb-1">
            <Award className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase tracking-wider">Skills</span>
          </div>
          <p className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
            {skills.length}+ Core
          </p>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
            IT & Business Ops
          </p>
        </div>

        <div
          onClick={() => onSelectTab('education')}
          className={`p-3.5 rounded-2xl border cursor-pointer transition-all hover:scale-[1.02] ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200/80 shadow-sm'
          }`}
        >
          <div className="flex items-center space-x-1.5 text-indigo-500 mb-1">
            <GraduationCap className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase tracking-wider">Education</span>
          </div>
          <p className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
            HSC / SSC
          </p>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
            Board Bangladesh
          </p>
        </div>
      </div>

      {/* Quick Direct Contact Strip */}
      <div
        className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-3 ${
          isDark
            ? 'bg-slate-900/80 border-slate-800'
            : 'bg-white border-slate-200 shadow-sm'
        }`}
      >
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center flex-shrink-0">
            <PhoneCall className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900 dark:text-white">
              Direct Contact Available
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              {personalInfo.phone} • {personalInfo.email}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
          <a
            href={`tel:${personalInfo.phone.replace(/[^0-9+]/g, '')}`}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Call</span>
          </a>

          <a
            href={`https://wa.me/88${personalInfo.phone.replace(/[^0-9]/g, '').replace(/^88/, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-green-600 hover:bg-green-700 transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>

          <a
            href={`mailto:${personalInfo.email}`}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition-colors ${
              isDark
                ? 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
                : 'bg-slate-100 text-slate-800 border-slate-200 hover:bg-slate-200'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Email</span>
          </a>
        </div>
      </div>

      {/* Experience Timeline Preview Card */}
      <div
        className={`p-5 rounded-3xl border ${
          isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200/80 shadow-sm'
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Briefcase className="w-4 h-4 text-blue-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Professional Journey
            </h3>
          </div>
          <button
            onClick={() => onSelectTab('experience')}
            className="text-xs font-bold text-blue-600 dark:text-sky-400 hover:underline flex items-center gap-1"
          >
            <span>See All Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-3">
          {experience.map((exp, idx) => (
            <div
              key={exp.id}
              onClick={() => onSelectTab('experience')}
              className={`p-3.5 rounded-2xl border transition-colors cursor-pointer ${
                isDark
                  ? 'bg-slate-850/80 hover:bg-slate-800/80 border-slate-800'
                  : 'bg-slate-50/80 hover:bg-blue-50/50 border-slate-200/60'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    {exp.role}
                  </h4>
                  <p className="text-[11px] text-blue-600 dark:text-sky-400 font-semibold mt-0.5">
                    {exp.sector}
                  </p>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  {exp.duration}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 line-clamp-1">
                {exp.responsibilities[0]} • {exp.responsibilities[1]}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Offline Privacy Guarantee Pill */}
      <div className="flex items-center justify-center space-x-2 text-[11px] text-slate-500 dark:text-slate-400 pt-1">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
        <span>100% Offline-First Native CV • Privacy Protected</span>
      </div>
    </div>
  );
};
