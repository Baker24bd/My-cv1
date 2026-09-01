import React, { useState } from 'react';
import {
  X,
  Save,
  RotateCcw,
  Plus,
  Trash2,
  User,
  Phone,
  Mail,
  GraduationCap,
  Briefcase,
  Award,
  FileText,
} from 'lucide-react';
import { CvData, EducationItem, ExperienceItem, SkillItem } from '../types';

interface CvEditModalProps {
  cvData: CvData;
  onSave: (newData: CvData) => void;
  onClose: () => void;
  onReset: () => void;
  isDark: boolean;
}

export const CvEditModal: React.FC<CvEditModalProps> = ({
  cvData,
  onSave,
  onClose,
  onReset,
  isDark,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'experience' | 'education' | 'skills'>('profile');
  const [formData, setFormData] = useState<CvData>(JSON.parse(JSON.stringify(cvData)));

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div
      id="cv-edit-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150"
    >
      <div
        className={`w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl border shadow-2xl overflow-hidden ${
          isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h2 className="text-base font-bold">Edit CV Profile Data</h2>
            <p className="text-xs text-slate-400">Updates will be stored locally in offline storage</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-500/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Edit Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 px-6 gap-2 pt-2">
          {[
            { id: 'profile', label: 'Profile Info', icon: User },
            { id: 'experience', label: 'Experience', icon: Briefcase },
            { id: 'education', label: 'Education', icon: GraduationCap },
            { id: 'skills', label: 'Skills', icon: Award },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold border-b-2 transition-all ${
                  isActive
                    ? 'border-blue-500 text-blue-600 dark:text-sky-400'
                    : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4 text-xs">
          {activeTab === 'profile' && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-500 dark:text-slate-400 block mb-1">
                    Bangla Name
                  </label>
                  <input
                    type="text"
                    value={formData.personalInfo.fullNameBangla}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        personalInfo: { ...formData.personalInfo, fullNameBangla: e.target.value },
                      })
                    }
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-500 dark:text-slate-400 block mb-1">
                    English Name
                  </label>
                  <input
                    type="text"
                    value={formData.personalInfo.fullNameEnglish}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        personalInfo: { ...formData.personalInfo, fullNameEnglish: e.target.value },
                      })
                    }
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-500 dark:text-slate-400 block mb-1">
                  Professional Title
                </label>
                <input
                  type="text"
                  value={formData.personalInfo.professionalTitle}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      personalInfo: { ...formData.personalInfo, professionalTitle: e.target.value },
                    })
                  }
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-500 dark:text-slate-400 block mb-1">
                    Phone
                  </label>
                  <input
                    type="text"
                    value={formData.personalInfo.phone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        personalInfo: { ...formData.personalInfo, phone: e.target.value },
                      })
                    }
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-500 dark:text-slate-400 block mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.personalInfo.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        personalInfo: { ...formData.personalInfo, email: e.target.value },
                      })
                    }
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-500 dark:text-slate-400 block mb-1">
                  Professional Summary
                </label>
                <textarea
                  rows={4}
                  value={formData.personalInfo.summary}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      personalInfo: { ...formData.personalInfo, summary: e.target.value },
                    })
                  }
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent leading-relaxed"
                />
              </div>
            </div>
          )}

          {activeTab === 'experience' && (
            <div className="space-y-4">
              {formData.experience.map((exp, idx) => (
                <div
                  key={exp.id}
                  className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2.5 bg-slate-50/50 dark:bg-slate-850/50"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-blue-500">Position #{idx + 1}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Role"
                      value={exp.role}
                      onChange={(e) => {
                        const next = [...formData.experience];
                        next[idx].role = e.target.value;
                        setFormData({ ...formData, experience: next });
                      }}
                      className="p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Sector / Industry"
                      value={exp.sector}
                      onChange={(e) => {
                        const next = [...formData.experience];
                        next[idx].sector = e.target.value;
                        setFormData({ ...formData, experience: next });
                      }}
                      className="p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 font-semibold block mb-1">
                      Responsibilities (one per line)
                    </label>
                    <textarea
                      rows={4}
                      value={exp.responsibilities.join('\n')}
                      onChange={(e) => {
                        const next = [...formData.experience];
                        next[idx].responsibilities = e.target.value.split('\n').filter((l) => l.trim().length > 0);
                        setFormData({ ...formData, experience: next });
                      }}
                      className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'education' && (
            <div className="space-y-4">
              {formData.education.map((edu, idx) => (
                <div
                  key={edu.id}
                  className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2.5 bg-slate-50/50 dark:bg-slate-850/50"
                >
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-1">Degree Title</label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => {
                          const next = [...formData.education];
                          next[idx].degree = e.target.value;
                          setFormData({ ...formData, education: next });
                        }}
                        className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-1">GPA (out of {edu.outOf})</label>
                      <input
                        type="text"
                        value={edu.gpa}
                        onChange={(e) => {
                          const next = [...formData.education];
                          next[idx].gpa = e.target.value;
                          setFormData({ ...formData, education: next });
                        }}
                        className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="space-y-2">
              <p className="text-slate-400 text-xs mb-2">Edit skill names and ratings:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {formData.skills.map((skill, idx) => (
                  <div
                    key={skill.id}
                    className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2"
                  >
                    <input
                      type="text"
                      value={skill.name}
                      onChange={(e) => {
                        const next = [...formData.skills];
                        next[idx].name = e.target.value;
                        setFormData({ ...formData, skills: next });
                      }}
                      className="p-1.5 flex-1 rounded border border-slate-300 dark:border-slate-700 bg-transparent text-xs"
                    />
                    <input
                      type="number"
                      min={10}
                      max={100}
                      value={skill.proficiency}
                      onChange={(e) => {
                        const next = [...formData.skills];
                        next[idx].proficiency = parseInt(e.target.value) || 80;
                        setFormData({ ...formData, skills: next });
                      }}
                      className="w-14 p-1.5 rounded border border-slate-300 dark:border-slate-700 bg-transparent text-xs text-center"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
          <button
            onClick={() => {
              if (window.confirm('Reset all fields back to default values?')) {
                onReset();
                onClose();
              }
            }}
            className="flex items-center gap-1.5 text-xs text-red-500 hover:underline font-semibold"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Default</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold hover:bg-slate-500/10"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
