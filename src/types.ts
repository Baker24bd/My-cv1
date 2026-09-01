export interface EducationItem {
  id: string;
  degree: string;
  institution?: string;
  board?: string;
  year?: string;
  gpa: string;
  outOf: string;
  description?: string;
  highlights?: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  sector: string;
  duration: string;
  yearsCount: number;
  period?: string;
  organization?: string;
  location?: string;
  responsibilities: string[];
  keyAchievements?: string[];
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'technical' | 'business' | 'operations' | 'soft';
  proficiency: number; // 0 to 100
  iconName: string;
  description?: string;
}

export interface PersonalInfo {
  fullNameBangla: string;
  fullNameEnglish: string;
  professionalTitle: string;
  phone: string;
  email: string;
  location: string;
  photoUrl: string;
  summary: string;
  objective?: string;
  dateOfBirth?: string;
  nationality?: string;
  languages?: { language: string; proficiency: string }[];
}

export interface CvData {
  personalInfo: PersonalInfo;
  education: EducationItem[];
  experience: ExperienceItem[];
  skills: SkillItem[];
}

export type ScreenTab = 'home' | 'about' | 'experience' | 'education' | 'skills' | 'contact' | 'cv_preview';

export type ThemeMode = 'light' | 'dark' | 'system';
