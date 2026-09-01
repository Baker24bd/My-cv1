import React from 'react';
import { motion } from 'motion/react';
import {
  User,
  Target,
  CheckCircle2,
  Globe,
  Award,
  HeartHandshake,
  Shield,
  FileCheck,
  TrendingUp,
  MapPin,
  Mail,
  Phone,
} from 'lucide-react';
import { CvData } from '../types';

interface AboutScreenProps {
  cvData: CvData;
  isDark: boolean;
}

export const AboutScreen: React.FC<AboutScreenProps> = ({ cvData, isDark }) => {
  const { personalInfo } = cvData;

  const coreStrengths = [
    {
      title: 'Business Development & Growth',
      desc: '2 years driving market expansion and customer relationship management in garments manufacturing.',
      icon: TrendingUp,
      color: 'text-blue-500 bg-blue-500/10',
    },
    {
      title: 'NGO & Field Operations',
      desc: '2 years of ground-level member communication, installment collection, and timely reconciliation.',
      icon: HeartHandshake,
      color: 'text-emerald-500 bg-emerald-500/10',
    },
    {
      title: 'Computer & Office Skills',
      desc: 'Formal certified computer training with practical proficiency in MS Office and digital reporting.',
      icon: Award,
      color: 'text-indigo-500 bg-indigo-500/10',
    },
    {
      title: 'Record Keeping & Accuracy',
      desc: 'Meticulous daily ledger maintenance, documentation, and reporting to higher management.',
      icon: FileCheck,
      color: 'text-amber-500 bg-amber-500/10',
    },
  ];

  return (
    <div id="about-screen" className="space-y-5 pb-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-6 rounded-3xl border ${
          isDark
            ? 'bg-slate-900/80 border-slate-800'
            : 'bg-gradient-to-br from-white to-blue-50/50 border-slate-200/80 shadow-sm'
        }`}
      >
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-sky-400 flex items-center justify-center">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white font-['Noto_Sans_Bengali',sans-serif]">
              {personalInfo.fullNameBangla}
            </h2>
            <p className="text-xs text-blue-600 dark:text-sky-400 font-semibold">
              {personalInfo.professionalTitle}
            </p>
          </div>
        </div>

        {/* Full Professional Summary */}
        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
            Professional Summary
          </h3>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
            {personalInfo.summary}
          </p>
        </div>
      </motion.div>

      {/* Career Objective Card */}
      <div
        className={`p-5 rounded-3xl border ${
          isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}
      >
        <div className="flex items-center space-x-2.5 mb-2.5">
          <Target className="w-4 h-4 text-emerald-500" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
            Career Objective
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {personalInfo.objective ||
            'To leverage my 4+ years of combined experience in Business Development and NGO field management to contribute productively to progressive organizations, ensuring client satisfaction and operational excellence.'}
        </p>
      </div>

      {/* Core Strengths Grid */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-1">
          Core Professional Competencies
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {coreStrengths.map((strength, idx) => {
            const Icon = strength.icon;
            return (
              <div
                key={idx}
                className={`p-4 rounded-2xl border transition-all ${
                  isDark
                    ? 'bg-slate-900/60 border-slate-800'
                    : 'bg-white border-slate-200/80 shadow-sm'
                }`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center mb-2.5 ${strength.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  {strength.title}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-normal">
                  {strength.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Personal Details & Languages Card */}
      <div
        className={`p-5 rounded-3xl border ${
          isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}
      >
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
          Profile Details & Communication
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="flex items-center space-x-2 text-slate-700 dark:text-slate-300">
            <Phone className="w-3.5 h-3.5 text-blue-500" />
            <span className="text-slate-400">Phone:</span>
            <span className="font-semibold">{personalInfo.phone}</span>
          </div>

          <div className="flex items-center space-x-2 text-slate-700 dark:text-slate-300">
            <Mail className="w-3.5 h-3.5 text-blue-500" />
            <span className="text-slate-400">Email:</span>
            <span className="font-semibold truncate">{personalInfo.email}</span>
          </div>

          <div className="flex items-center space-x-2 text-slate-700 dark:text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-blue-500" />
            <span className="text-slate-400">Location:</span>
            <span className="font-semibold">{personalInfo.location || 'Bangladesh'}</span>
          </div>

          <div className="flex items-center space-x-2 text-slate-700 dark:text-slate-300">
            <Globe className="w-3.5 h-3.5 text-blue-500" />
            <span className="text-slate-400">Languages:</span>
            <span className="font-semibold">Bengali (Native), English</span>
          </div>
        </div>
      </div>
    </div>
  );
};
