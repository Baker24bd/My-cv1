import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  FileText,
  Download,
  Share2,
  Printer,
  Sparkles,
  Eye,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Building2,
  GraduationCap,
  Award,
  ZoomIn,
  ZoomOut,
  RefreshCw,
} from 'lucide-react';
import { CvData } from '../types';
import { printCvDocument } from '../utils/pdfGenerator';

interface CvPreviewScreenProps {
  cvData: CvData;
  onDownloadPdf: () => void;
  onShareCv: () => void;
  isDark: boolean;
}

export const CvPreviewScreen: React.FC<CvPreviewScreenProps> = ({
  cvData,
  onDownloadPdf,
  onShareCv,
  isDark,
}) => {
  const { personalInfo, education, experience, skills } = cvData;
  const [isGenerating, setIsGenerating] = useState(false);
  const [zoomLevel, setZoomLevel] = useState<number>(100);

  const handleGeneratePdf = async () => {
    setIsGenerating(true);
    await new Promise((res) => setTimeout(res, 600));
    await onDownloadPdf();
    setIsGenerating(false);
  };

  return (
    <div id="cv-preview-screen" className="space-y-5 pb-12 animate-in fade-in duration-300">
      {/* Top Action Toolbar */}
      <div
        className={`p-4 rounded-3xl border sticky top-0 z-20 backdrop-blur-md transition-all ${
          isDark
            ? 'bg-slate-900/90 border-slate-800'
            : 'bg-white/90 border-slate-200 shadow-md shadow-slate-200/50'
        }`}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2.5 self-start sm:self-auto">
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-600 dark:text-sky-400 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                A4 Professional CV Sheet
              </h2>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">
                Recruiter-Grade Print & PDF Layout
              </p>
            </div>
          </div>

          {/* Action Buttons: Generate, Download, Share, Print */}
          <div className="flex items-center flex-wrap gap-1.5 w-full sm:w-auto justify-end">
            {/* Zoom Controls */}
            <div className="hidden md:flex items-center space-x-1 mr-1 px-1.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setZoomLevel(Math.max(60, zoomLevel - 10))}
                className="p-1 text-slate-500 hover:text-slate-900 dark:hover:text-white"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-[10px] font-mono font-bold px-1 text-slate-600 dark:text-slate-300">
                {zoomLevel}%
              </span>
              <button
                onClick={() => setZoomLevel(Math.min(130, zoomLevel + 10))}
                className="p-1 text-slate-500 hover:text-slate-900 dark:hover:text-white"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Print Button */}
            <button
              id="cv-print-btn"
              onClick={printCvDocument}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                isDark
                  ? 'bg-slate-800 hover:bg-slate-750 text-slate-200 border-slate-700'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
              }`}
              title="Print CV Document"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Print</span>
            </button>

            {/* Share Button */}
            <button
              id="cv-share-btn"
              onClick={onShareCv}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                isDark
                  ? 'bg-slate-800 hover:bg-slate-750 text-sky-400 border-slate-700'
                  : 'bg-white hover:bg-slate-50 text-blue-600 border-slate-200'
              }`}
              title="Share CV"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Share</span>
            </button>

            {/* Generate & Download PDF Button */}
            <button
              id="cv-generate-download-btn"
              disabled={isGenerating}
              onClick={handleGeneratePdf}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md shadow-blue-600/20 active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Generating PDF...</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* A4 Printable CV Document Container with Zoom scaling */}
      <div className="overflow-x-auto pb-4 flex justify-center">
        <div
          style={{
            transform: `scale(${zoomLevel / 100})`,
            transformOrigin: 'top center',
            transition: 'transform 0.2s ease-out',
          }}
          className="w-full max-w-[800px]"
        >
          {/* Real A4 Paper Card */}
          <div
            id="cv-printable-sheet"
            className="bg-white text-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 print:border-none print:shadow-none print:rounded-none font-['Plus_Jakarta_Sans',sans-serif]"
          >
            {/* Header Navy / Slate Banner */}
            <div className="bg-slate-900 text-white p-7 sm:p-8 relative">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  {/* Photo or Monogram */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-2 border-white/20 overflow-hidden flex-shrink-0 bg-slate-800 flex items-center justify-center">
                    {personalInfo.photoUrl ? (
                      <img
                        src={personalInfo.photoUrl}
                        alt={personalInfo.fullNameEnglish}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-tr from-blue-700 to-indigo-800 text-white">
                        <span className="text-2xl font-black">BH</span>
                        <span className="text-[8px] uppercase tracking-wider text-blue-200">
                          মোঃ বাকের
                        </span>
                      </div>
                    )}
                  </div>

                  <div>
                    <h1 className="text-xl sm:text-2xl font-extrabold uppercase tracking-wide">
                      {personalInfo.fullNameEnglish}
                    </h1>
                    <p className="text-sm font-semibold text-slate-300 font-['Noto_Sans_Bengali',sans-serif] mt-0.5">
                      {personalInfo.fullNameBangla}
                    </p>
                    <p className="text-xs sm:text-sm font-bold text-sky-400 mt-1">
                      {personalInfo.professionalTitle}
                    </p>
                  </div>
                </div>

                {/* Header Contact Block */}
                <div className="space-y-1.5 text-xs text-slate-300 self-stretch sm:self-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800 sm:text-right">
                  <div className="flex sm:justify-end items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-sky-400" />
                    <span className="font-semibold text-white">{personalInfo.phone}</span>
                  </div>
                  <div className="flex sm:justify-end items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-sky-400" />
                    <span>{personalInfo.email}</span>
                  </div>
                  <div className="flex sm:justify-end items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-sky-400" />
                    <span>{personalInfo.location || 'Bangladesh'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Body Content */}
            <div className="p-7 sm:p-8 space-y-6">
              {/* Section 1: Professional Summary */}
              <section>
                <div className="flex items-center space-x-2 border-b-2 border-slate-900 pb-1.5 mb-2.5">
                  <h2 className="text-xs font-black uppercase tracking-wider text-slate-900">
                    Professional Summary
                  </h2>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-normal">
                  {personalInfo.summary}
                </p>
              </section>

              {/* Section 2: Work Experience */}
              <section>
                <div className="flex items-center space-x-2 border-b-2 border-slate-900 pb-1.5 mb-3">
                  <h2 className="text-xs font-black uppercase tracking-wider text-slate-900">
                    Work Experience
                  </h2>
                </div>

                <div className="space-y-4">
                  {experience.map((exp) => (
                    <div key={exp.id} className="space-y-1.5">
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                        <div>
                          <h3 className="text-xs font-bold text-slate-900">
                            {exp.role}
                          </h3>
                          <p className="text-[11px] font-semibold text-blue-700">
                            {exp.sector}
                          </p>
                        </div>
                        <span className="text-[11px] font-bold text-slate-600">
                          {exp.duration}
                        </span>
                      </div>

                      <ul className="space-y-1 pl-3.5 text-[11px] text-slate-700">
                        {exp.responsibilities.map((resp, rIdx) => (
                          <li key={rIdx} className="list-disc leading-relaxed">
                            {resp}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section 3: Education */}
              <section>
                <div className="flex items-center space-x-2 border-b-2 border-slate-900 pb-1.5 mb-3">
                  <h2 className="text-xs font-black uppercase tracking-wider text-slate-900">
                    Education
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {education.map((edu) => (
                    <div key={edu.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xs font-bold text-slate-900">
                            {edu.degree}
                          </h3>
                          <p className="text-[10px] text-slate-500">
                            {edu.institution || 'Education Board Bangladesh'}
                          </p>
                        </div>
                        <span className="text-xs font-extrabold text-blue-700">
                          GPA: {edu.gpa} / {edu.outOf}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section 4: Skills & Key Competencies */}
              <section>
                <div className="flex items-center space-x-2 border-b-2 border-slate-900 pb-1.5 mb-3">
                  <h2 className="text-xs font-black uppercase tracking-wider text-slate-900">
                    Key Competencies & Skills
                  </h2>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {skills.map((skill) => (
                    <div
                      key={skill.id}
                      className="flex items-center space-x-1.5 text-[11px] text-slate-800 p-1.5 bg-slate-50/80 rounded-lg border border-slate-100"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span className="font-medium truncate">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section 5: Contact & Declaration */}
              <section className="pt-2 border-t border-slate-200">
                <div className="flex flex-col sm:flex-row items-center justify-between text-[10px] text-slate-500 gap-1">
                  <span>Contact: {personalInfo.phone} | {personalInfo.email}</span>
                  <span>Personal Digital CV • মোঃ বাকের হোসেন</span>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
