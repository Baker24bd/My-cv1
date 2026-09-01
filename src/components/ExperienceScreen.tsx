import React from 'react';
import { motion } from 'motion/react';
import {
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  TrendingUp,
  HeartHandshake,
  Award,
  Sparkles,
} from 'lucide-react';
import { CvData } from '../types';

interface ExperienceScreenProps {
  cvData: CvData;
  isDark: boolean;
}

export const ExperienceScreen: React.FC<ExperienceScreenProps> = ({ cvData, isDark }) => {
  const { experience } = cvData;

  const totalYears = experience.reduce((acc, curr) => acc + (curr.yearsCount || 2), 0);

  return (
    <div id="experience-screen" className="space-y-5 pb-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-6 rounded-3xl border ${
          isDark
            ? 'bg-slate-900/80 border-slate-800'
            : 'bg-gradient-to-br from-white to-blue-50/50 border-slate-200 shadow-sm'
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-sky-400 flex items-center justify-center">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Work Experience
              </h2>
              <p className="text-xs text-blue-600 dark:text-sky-400 font-semibold">
                Professional Career Timeline
              </p>
            </div>
          </div>

          <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-sky-400 border border-blue-500/20">
            {totalYears}+ Years Total
          </span>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
          Demonstrated track record spanning 2 years in Garments Business Development and 2 years in NGO Field Operations & Management.
        </p>
      </motion.div>

      {/* Experience Timeline */}
      <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2.5 sm:before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-blue-500 via-sky-500 to-slate-300 dark:to-slate-700">
        {experience.map((item, index) => {
          const isGarments = item.sector.toLowerCase().includes('garment');
          const Icon = isGarments ? TrendingUp : HeartHandshake;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15 }}
              className="relative group"
            >
              {/* Timeline Marker */}
              <div
                className={`absolute -left-[30px] sm:-left-[35px] top-4 w-5 h-5 rounded-full border-4 transition-transform group-hover:scale-125 ${
                  isDark
                    ? 'bg-slate-950 border-blue-400 ring-2 ring-blue-500/20'
                    : 'bg-white border-blue-600 ring-2 ring-blue-200'
                }`}
              />

              {/* Experience Card */}
              <div
                className={`p-5 sm:p-6 rounded-3xl border transition-all ${
                  isDark
                    ? 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                    : 'bg-white border-slate-200/90 shadow-sm hover:shadow-md'
                }`}
              >
                {/* Position Title & Sector */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <div className="flex items-start space-x-3">
                    <div
                      className={`w-9 h-9 rounded-2xl flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        isGarments
                          ? 'bg-blue-500/10 text-blue-600 dark:text-sky-400'
                          : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        {item.role}
                      </h3>
                      <div className="flex items-center flex-wrap gap-1.5 mt-1">
                        <span className="inline-flex items-center text-xs font-semibold text-blue-600 dark:text-sky-400">
                          <Building2 className="w-3 h-3 mr-1" />
                          {item.sector}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Duration Tag */}
                  <div className="inline-flex items-center self-start px-3 py-1 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    <Calendar className="w-3.5 h-3.5 mr-1.5 text-blue-500" />
                    <span>{item.duration}</span>
                  </div>
                </div>

                {/* Key Responsibilities */}
                <div className="mt-4 pt-3.5 border-t border-slate-100 dark:border-slate-800">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Key Responsibilities & Activities</span>
                  </h4>

                  <ul className="space-y-2">
                    {item.responsibilities.map((resp, rIdx) => (
                      <li
                        key={rIdx}
                        className="flex items-start text-xs sm:text-[13px] text-slate-700 dark:text-slate-300 leading-relaxed group/item"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-sky-400 mt-1.5 mr-2.5 flex-shrink-0 group-hover/item:scale-125 transition-transform" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Key Achievements if present */}
                {item.keyAchievements && item.keyAchievements.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-dashed border-slate-200 dark:border-slate-800 bg-blue-50/40 dark:bg-slate-850/50 p-3 rounded-2xl">
                    <h5 className="text-[11px] font-bold text-blue-700 dark:text-sky-300 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                      <Award className="w-3.5 h-3.5" />
                      Key Milestones
                    </h5>
                    <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
                      {item.keyAchievements.map((ach, aIdx) => (
                        <li key={aIdx} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
