import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Award,
  Laptop,
  FileSpreadsheet,
  MessageSquare,
  TrendingUp,
  Users,
  MapPin,
  BookOpen,
  FileText,
  UserCheck,
  CheckCircle2,
  Search,
  Check,
} from 'lucide-react';
import { CvData, SkillItem } from '../types';

interface SkillsScreenProps {
  cvData: CvData;
  isDark: boolean;
}

export const SkillsScreen: React.FC<SkillsScreenProps> = ({ cvData, isDark }) => {
  const { skills } = cvData;
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const getSkillIcon = (name: string, category: string) => {
    switch (name.toLowerCase()) {
      case 'computer training':
        return Award;
      case 'computer operation':
        return Laptop;
      case 'microsoft office':
        return FileSpreadsheet;
      case 'communication':
        return MessageSquare;
      case 'business development':
        return TrendingUp;
      case 'customer relationship management':
      case 'customer relationship management (crm)':
        return Users;
      case 'field operations':
        return MapPin;
      case 'record keeping':
        return BookOpen;
      case 'reporting':
        return FileText;
      case 'teamwork':
        return UserCheck;
      case 'problem solving':
        return CheckCircle2;
      default:
        return category === 'technical'
          ? Laptop
          : category === 'business'
          ? TrendingUp
          : category === 'operations'
          ? MapPin
          : CheckCircle2;
    }
  };

  const getCategoryTheme = (category: string) => {
    switch (category) {
      case 'technical':
        return {
          bg: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
          label: 'Technical & IT',
          barColor: 'from-indigo-500 to-blue-500',
        };
      case 'business':
        return {
          bg: 'bg-blue-500/10 text-blue-600 dark:text-sky-400 border-blue-500/20',
          label: 'Business Growth',
          barColor: 'from-blue-500 to-sky-400',
        };
      case 'operations':
        return {
          bg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
          label: 'Field Operations',
          barColor: 'from-emerald-500 to-teal-400',
        };
      default:
        return {
          bg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
          label: 'Core Competency',
          barColor: 'from-amber-500 to-orange-400',
        };
    }
  };

  const categories = [
    { id: 'all', label: 'All Skills' },
    { id: 'technical', label: 'Technical & IT' },
    { id: 'business', label: 'Business & CRM' },
    { id: 'operations', label: 'Field & Operations' },
    { id: 'soft', label: 'Professional Skills' },
  ];

  const filteredSkills = skills.filter((s) => {
    const matchesCategory = selectedCategory === 'all' || s.category === selectedCategory;
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div id="skills-screen" className="space-y-5 pb-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-6 rounded-3xl border ${
          isDark
            ? 'bg-slate-900/80 border-slate-800'
            : 'bg-gradient-to-br from-white to-emerald-50/40 border-slate-200 shadow-sm'
        }`}
      >
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Skills & Expertise
            </h2>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
              11+ Core Professional Competencies
            </p>
          </div>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
          Comprehensive skillset blending computer operations, customer relationship management, and field-tested operational execution.
        </p>

        {/* Search Input */}
        <div className="mt-4 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            id="skills-search-input"
            type="text"
            placeholder="Search skills (e.g. Computer, CRM, Field)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-9 pr-4 py-2 text-xs rounded-xl border outline-none transition-all ${
              isDark
                ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-emerald-500'
                : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-emerald-500'
            }`}
          />
        </div>
      </motion.div>

      {/* Category Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            id={`skill-filter-${cat.id}`}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/20'
                : isDark
                ? 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-750'
                : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Modern Skill Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {filteredSkills.map((skill, index) => {
          const Icon = getSkillIcon(skill.name, skill.category);
          const theme = getCategoryTheme(skill.category);

          return (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.04 }}
              className={`p-4 rounded-3xl border transition-all ${
                isDark
                  ? 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                  : 'bg-white border-slate-200/90 shadow-sm hover:shadow-md'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-9 h-9 rounded-2xl flex items-center justify-center ${theme.bg}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                      {skill.name}
                    </h3>
                    <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500">
                      {theme.label}
                    </span>
                  </div>
                </div>

                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {skill.proficiency}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="mt-3 w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${theme.barColor} transition-all duration-500`}
                  style={{ width: `${skill.proficiency}%` }}
                />
              </div>

              {skill.description && (
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 leading-normal">
                  {skill.description}
                </p>
              )}
            </motion.div>
          );
        })}
      </div>

      {filteredSkills.length === 0 && (
        <div className="p-8 text-center text-slate-400 text-xs">
          No skills found matching "{searchQuery}".
        </div>
      )}
    </div>
  );
};
