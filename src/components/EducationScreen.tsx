import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Award, Calendar, CheckCircle2, BookOpen } from 'lucide-react';
import { CvData } from '../types';

interface EducationScreenProps {
  cvData: CvData;
  isDark: boolean;
}

export const EducationScreen: React.FC<EducationScreenProps> = ({ cvData, isDark }) => {
  const { education } = cvData;

  return (
    <div id="education-screen" className="space-y-5 pb-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-6 rounded-3xl border ${
          isDark
            ? 'bg-slate-900/80 border-slate-800'
            : 'bg-gradient-to-br from-white to-indigo-50/40 border-slate-200 shadow-sm'
        }`}
      >
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Academic Background
            </h2>
            <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
              Formal Education & Certifications
            </p>
          </div>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
          Structured academic qualifications demonstrating strong analytical learning, discipline, and consistent dedication.
        </p>
      </motion.div>

      {/* Timeline Section */}
      <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2.5 sm:before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-indigo-500 before:via-blue-500 before:to-slate-300 dark:before:to-slate-700">
        {education.map((item, index) => {
          const isHighGPA = parseFloat(item.gpa) >= 3.5;
          const gpaPercentage = (parseFloat(item.gpa) / parseFloat(item.outOf || '5.0')) * 100;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15 }}
              className="relative group"
            >
              {/* Timeline Marker Dot */}
              <div
                className={`absolute -left-[30px] sm:-left-[35px] top-4 w-5 h-5 rounded-full border-4 transition-transform group-hover:scale-125 ${
                  isDark
                    ? 'bg-slate-950 border-indigo-400 ring-2 ring-indigo-500/20'
                    : 'bg-white border-indigo-600 ring-2 ring-indigo-200'
                }`}
              />

              {/* Education Card */}
              <div
                className={`p-5 rounded-3xl border transition-all ${
                  isDark
                    ? 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                    : 'bg-white border-slate-200/90 shadow-sm hover:shadow-md'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        {item.degree}
                      </h3>
                      {isHighGPA && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                          <Award className="w-3 h-3" />
                          High Distinction
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                      {item.institution || 'Education Board Bangladesh'}
                    </p>
                  </div>

                  {/* GPA Badge */}
                  <div
                    className={`inline-flex sm:flex flex-col items-center sm:items-end px-3 py-1.5 rounded-xl ${
                      isHighGPA
                        ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20'
                        : 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20'
                    }`}
                  >
                    <span className="text-[10px] font-semibold uppercase tracking-wider">
                      Result
                    </span>
                    <span className="text-sm font-extrabold">
                      GPA {item.gpa} <span className="text-[10px] font-normal opacity-70">/ {item.outOf}</span>
                    </span>
                  </div>
                </div>

                {/* Visual GPA Bar */}
                <div className="mt-3.5 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mb-1 font-medium">
                    <span>Performance Score</span>
                    <span>{gpaPercentage.toFixed(0)}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        isHighGPA
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                          : 'bg-gradient-to-r from-blue-500 to-indigo-500'
                      }`}
                      style={{ width: `${gpaPercentage}%` }}
                    />
                  </div>
                </div>

                {item.description && (
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                    {item.description}
                  </p>
                )}

                {item.highlights && item.highlights.length > 0 && (
                  <div className="mt-3 space-y-1">
                    {item.highlights.map((h, i) => (
                      <div key={i} className="flex items-center text-[11px] text-slate-500 dark:text-slate-400">
                        <CheckCircle2 className="w-3 h-3 mr-1.5 text-indigo-500 flex-shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
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
