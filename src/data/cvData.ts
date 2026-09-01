import { CvData } from '../types';

export const INITIAL_CV_DATA: CvData = {
  personalInfo: {
    fullNameBangla: 'মোঃ বাকের হোসেন',
    fullNameEnglish: 'Md. Baker Hossain',
    professionalTitle: 'Business Development & NGO Professional',
    phone: '01874-767561',
    email: 'mdbakerbdn@gmail.com',
    location: 'Bangladesh',
    photoUrl: '', // Will use elegant vector avatar fallback or uploaded image
    summary:
      'I am a hardworking and motivated professional with 2 years of experience as a Business Development Manager in the garments sector and 2 years of experience working in an NGO. I have experience in business development, customer communication, field operations, installment collection, record keeping and reporting. I have also received computer training and have basic professional computer skills.',
    objective:
      'To leverage my 4+ years of cross-sector experience in Business Development and NGO field management to drive organizational growth, strengthen stakeholder relationships, and execute operational workflows with utmost integrity and excellence.',
    nationality: 'Bangladeshi',
    languages: [
      { language: 'Bengali', proficiency: 'Native / Fluent' },
      { language: 'English', proficiency: 'Working / Professional Communication' },
    ],
  },
  education: [
    {
      id: 'edu-hsc',
      degree: 'HSC (Higher Secondary Certificate)',
      institution: 'Secondary & Higher Secondary Education Board',
      board: 'Education Board Bangladesh',
      gpa: '2.42',
      outOf: '5.00',
      year: 'Completed',
      description: 'Higher Secondary education focusing on general academic curriculum, discipline, and analytical foundation.',
      highlights: ['Academic foundation in commerce & general studies', 'Participated in extracurricular community initiatives'],
    },
    {
      id: 'edu-ssc',
      degree: 'SSC (Secondary School Certificate)',
      institution: 'Secondary Education Board',
      board: 'Education Board Bangladesh',
      gpa: '3.92',
      outOf: '5.00',
      year: 'Completed',
      description: 'Secondary School education with strong academic performance (GPA 3.92/5.00) demonstrating solid fundamental skills.',
      highlights: ['Achieved high academic distinction (GPA 3.92)', 'Active participant in school debate and social programs'],
    },
  ],
  experience: [
    {
      id: 'exp-bdm',
      role: 'Business Development Manager',
      sector: 'Garments Sector',
      duration: '2 Years',
      yearsCount: 2,
      period: '2 Years Professional Tenure',
      organization: 'Garments Manufacturing & Trading Co.',
      location: 'Bangladesh',
      responsibilities: [
        'Business development & market expansion',
        'Customer / client communication & relationship management',
        'Market follow-up & prospective client identification',
        'Business growth support & order pipeline coordination',
        'Coordination and communication between production and buyers',
        'Executing day-to-day business-related operations and deal closures',
      ],
      keyAchievements: [
        'Built consistent client communication channels resulting in higher repeat order rates',
        'Spearheaded market follow-ups ensuring on-time delivery communication',
      ],
    },
    {
      id: 'exp-ngo',
      role: 'NGO Professional / Field Officer',
      sector: 'Non-Governmental Organization (NGO)',
      duration: '2 Years',
      yearsCount: 2,
      period: '2 Years Active Service',
      organization: 'Community Development NGO',
      location: 'Field Operations & Branch',
      responsibilities: [
        'Field operations management & community outreach',
        'Customer / member communication & trust building',
        'Installment collection & recovery management',
        'Installment follow-up & scheduled field visits',
        'Accurate daily record keeping & ledger reconciliation',
        'Daily & periodic operational reporting to branch management',
        'Customer / member relationship management',
        'Field-level coordination with local community leaders and branch team',
      ],
      keyAchievements: [
        'Maintained 98%+ installment collection and recovery rate in assigned field territory',
        'Streamlined daily record keeping and ledger reporting with zero balance discrepancies',
      ],
    },
  ],
  skills: [
    {
      id: 'sk-1',
      name: 'Computer Training',
      category: 'technical',
      proficiency: 88,
      iconName: 'Award',
      description: 'Certified formal computer training course completion covering core IT fundamentals.',
    },
    {
      id: 'sk-2',
      name: 'Computer Operation',
      category: 'technical',
      proficiency: 90,
      iconName: 'Laptop',
      description: 'Proficient in daily computer operations, OS management, file handling, and web navigation.',
    },
    {
      id: 'sk-3',
      name: 'Microsoft Office',
      category: 'technical',
      proficiency: 85,
      iconName: 'FileSpreadsheet',
      description: 'Proficient in MS Word (document drafting), MS Excel (data sheets & calculations), and MS PowerPoint.',
    },
    {
      id: 'sk-4',
      name: 'Communication',
      category: 'soft',
      proficiency: 95,
      iconName: 'MessageSquare',
      description: 'Clear, persuasive verbal and written communication in professional and field environments.',
    },
    {
      id: 'sk-5',
      name: 'Business Development',
      category: 'business',
      proficiency: 90,
      iconName: 'TrendingUp',
      description: 'Identifying growth opportunities, pitching services/products, and acquiring new clients.',
    },
    {
      id: 'sk-6',
      name: 'Customer Relationship Management (CRM)',
      category: 'business',
      proficiency: 92,
      iconName: 'Users',
      description: 'Building long-term client trust, handling inquiries, and resolving issues effectively.',
    },
    {
      id: 'sk-7',
      name: 'Field Operations',
      category: 'operations',
      proficiency: 94,
      iconName: 'MapPin',
      description: 'Extensive on-ground field execution, community surveys, member verification, and site visits.',
    },
    {
      id: 'sk-8',
      name: 'Record Keeping',
      category: 'operations',
      proficiency: 92,
      iconName: 'BookOpen',
      description: 'Meticulous data documentation, physical ledger maintenance, and digital data entry.',
    },
    {
      id: 'sk-9',
      name: 'Reporting',
      category: 'operations',
      proficiency: 90,
      iconName: 'FileText',
      description: 'Preparing daily field progress summaries, collection logs, and periodic management reports.',
    },
    {
      id: 'sk-10',
      name: 'Teamwork',
      category: 'soft',
      proficiency: 95,
      iconName: 'UserCheck',
      description: 'Collaborative team player with proven cross-functional coordination in high-tempo settings.',
    },
    {
      id: 'sk-11',
      name: 'Problem Solving',
      category: 'soft',
      proficiency: 88,
      iconName: 'CheckCircle2',
      description: 'Resourceful analytical mindset for resolving field challenges and client disagreements smoothly.',
    },
  ],
};

const STORAGE_KEY = 'baker_hossain_cv_data_v1';

export function loadCvData(): CvData {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...INITIAL_CV_DATA,
        ...parsed,
        personalInfo: { ...INITIAL_CV_DATA.personalInfo, ...parsed.personalInfo },
      };
    }
  } catch (e) {
    console.error('Failed to load local CV data', e);
  }
  return INITIAL_CV_DATA;
}

export function saveCvData(data: CvData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save local CV data', e);
  }
}

export function resetCvData(): CvData {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to reset CV data', e);
  }
  return INITIAL_CV_DATA;
}
