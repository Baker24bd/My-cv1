import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  PhoneCall,
  Mail,
  MessageCircle,
  Copy,
  Check,
  Send,
  MapPin,
  Clock,
  ShieldCheck,
  Share2,
} from 'lucide-react';
import { CvData } from '../types';

interface ContactScreenProps {
  cvData: CvData;
  onShareCv: () => void;
  isDark: boolean;
}

export const ContactScreen: React.FC<ContactScreenProps> = ({
  cvData,
  onShareCv,
  isDark,
}) => {
  const { personalInfo } = cvData;
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [customMsg, setCustomMsg] = useState<string>('');

  const rawPhone = personalInfo.phone.replace(/[^0-9]/g, '');
  const cleanPhoneForDialer = personalInfo.phone.replace(/[^0-9+]/g, '');
  const whatsappNumber = rawPhone.startsWith('88') ? rawPhone : `88${rawPhone}`;

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const defaultText = customMsg.trim() || `Hello মোঃ বাকের হোসেন, I viewed your Digital CV and would like to discuss an opportunity.`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultText)}`;
    window.open(url, '_blank');
  };

  const handleSendEmail = () => {
    const subject = encodeURIComponent(`Job Opportunity / Inquiry for ${personalInfo.fullNameEnglish}`);
    const body = encodeURIComponent(customMsg.trim() || `Dear মোঃ বাকের হোসেন,\n\nI reviewed your CV and would like to connect with you regarding an opportunity.`);
    window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div id="contact-screen" className="space-y-5 pb-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-6 rounded-3xl border ${
          isDark
            ? 'bg-slate-900/80 border-slate-800'
            : 'bg-gradient-to-br from-white to-emerald-50/50 border-slate-200 shadow-sm'
        }`}
      >
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <PhoneCall className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Get in Touch
            </h2>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
              Available for Opportunities & Discussions
            </p>
          </div>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
          Reach out directly via Phone dialer, WhatsApp messenger, or Email. Responses are typically prompt.
        </p>
      </motion.div>

      {/* Main 3 Action Buttons requested explicitly by user: Call Me, WhatsApp, Email Me */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Call Me Button */}
        <a
          id="btn-call-me"
          href={`tel:${cleanPhoneForDialer}`}
          className="flex flex-col items-center justify-center p-4 rounded-3xl bg-gradient-to-b from-blue-600 to-blue-700 text-white shadow-md shadow-blue-600/25 hover:brightness-110 active:scale-[0.98] transition-all text-center group"
        >
          <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
            <PhoneCall className="w-6 h-6" />
          </div>
          <span className="text-sm font-bold">Call Me</span>
          <span className="text-[11px] text-blue-100 mt-0.5 font-medium">
            Open Phone Dialer
          </span>
        </a>

        {/* WhatsApp Button */}
        <a
          id="btn-whatsapp-me"
          href={`https://wa.me/${whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center p-4 rounded-3xl bg-gradient-to-b from-emerald-600 to-green-600 text-white shadow-md shadow-emerald-600/25 hover:brightness-110 active:scale-[0.98] transition-all text-center group"
        >
          <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
            <MessageCircle className="w-6 h-6" />
          </div>
          <span className="text-sm font-bold">WhatsApp</span>
          <span className="text-[11px] text-emerald-100 mt-0.5 font-medium">
            Chat on WhatsApp
          </span>
        </a>

        {/* Email Me Button */}
        <a
          id="btn-email-me"
          href={`mailto:${personalInfo.email}?subject=${encodeURIComponent(
            `Inquiry for ${personalInfo.fullNameBangla} (${personalInfo.fullNameEnglish})`
          )}`}
          className="flex flex-col items-center justify-center p-4 rounded-3xl bg-gradient-to-b from-indigo-600 to-slate-800 text-white shadow-md shadow-indigo-600/25 hover:brightness-110 active:scale-[0.98] transition-all text-center group"
        >
          <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
            <Mail className="w-6 h-6" />
          </div>
          <span className="text-sm font-bold">Email Me</span>
          <span className="text-[11px] text-indigo-100 mt-0.5 font-medium">
            Open Email Client
          </span>
        </a>
      </div>

      {/* Detailed Contact Cards with Copy Feature */}
      <div className="space-y-3">
        {/* Phone Card */}
        <div
          className={`p-4 rounded-3xl border flex items-center justify-between transition-all ${
            isDark
              ? 'bg-slate-900/70 border-slate-800'
              : 'bg-white border-slate-200/90 shadow-sm'
          }`}
        >
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center flex-shrink-0">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Direct Phone
              </p>
              <p className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
                {personalInfo.phone}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleCopy(personalInfo.phone, 'phone')}
              className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1 transition-colors ${
                copiedType === 'phone'
                  ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                  : isDark
                  ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
              title="Copy Phone Number"
            >
              {copiedType === 'phone' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Email Card */}
        <div
          className={`p-4 rounded-3xl border flex items-center justify-between transition-all ${
            isDark
              ? 'bg-slate-900/70 border-slate-800'
              : 'bg-white border-slate-200/90 shadow-sm'
          }`}
        >
          <div className="flex items-center space-x-3.5 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Email Address
              </p>
              <p className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white truncate">
                {personalInfo.email}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 flex-shrink-0 ml-2">
            <button
              onClick={() => handleCopy(personalInfo.email, 'email')}
              className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1 transition-colors ${
                copiedType === 'email'
                  ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                  : isDark
                  ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
              title="Copy Email"
            >
              {copiedType === 'email' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Location & Availability */}
        <div
          className={`p-4 rounded-3xl border flex items-center space-x-3.5 ${
            isDark
              ? 'bg-slate-900/70 border-slate-800'
              : 'bg-white border-slate-200/90 shadow-sm'
          }`}
        >
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center flex-shrink-0">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Location & Availability
            </p>
            <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              {personalInfo.location || 'Bangladesh'} • Immediate / Full-Time Availability
            </p>
          </div>
        </div>
      </div>

      {/* Fast Message Box */}
      <div
        className={`p-5 rounded-3xl border ${
          isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}
      >
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-2">
          Quick Message
        </h3>
        <textarea
          rows={3}
          placeholder="Type a message or job inquiry here..."
          value={customMsg}
          onChange={(e) => setCustomMsg(e.target.value)}
          className={`w-full p-3 text-xs rounded-2xl border outline-none transition-all resize-none ${
            isDark
              ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-emerald-500'
              : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-emerald-500'
          }`}
        />

        <div className="flex items-center justify-end gap-2 mt-3">
          <button
            onClick={handleSendEmail}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-750 transition-colors"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Send Email</span>
          </button>

          <button
            onClick={handleSendWhatsApp}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send via WhatsApp</span>
          </button>
        </div>
      </div>

      {/* Share CV banner */}
      <button
        onClick={onShareCv}
        className={`w-full p-4 rounded-3xl border flex items-center justify-between transition-all text-left ${
          isDark
            ? 'bg-blue-950/40 border-blue-900/60 text-sky-400 hover:bg-blue-950/60'
            : 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100/70'
        }`}
      >
        <div className="flex items-center space-x-3">
          <Share2 className="w-5 h-5" />
          <div>
            <p className="text-xs font-bold">Share Baker Hossain's CV</p>
            <p className="text-[11px] opacity-80">Share with recruiters, hiring managers, or colleagues</p>
          </div>
        </div>
        <span className="text-xs font-extrabold uppercase">Share</span>
      </button>
    </div>
  );
};
