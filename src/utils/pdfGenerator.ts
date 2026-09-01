import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { CvData } from '../types';

export interface GeneratePdfOptions {
  elementId?: string;
  filename?: string;
}

export async function generateAndDownloadPdf(
  cvData: CvData,
  elementId: string = 'cv-printable-sheet'
): Promise<boolean> {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      console.warn('Target element for PDF not found, falling back to programmatic PDF');
      return generateProgrammaticPdf(cvData);
    }

    // Capture element with html2canvas at high resolution (scale 2.5)
    const canvas = await html2canvas(element, {
      scale: 2.5,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: 1024,
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.98);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    let heightLeft = imgHeight;
    let position = 0;

    // Add first page
    pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
    heightLeft -= pageHeight;

    // If multi-page
    while (heightLeft >= 10) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pageHeight;
    }

    const cleanName = (cvData.personalInfo.fullNameEnglish || 'Baker_Hossain')
      .replace(/\s+/g, '_')
      .replace(/[^a-zA-Z0-9_]/g, '');
    const filename = `${cleanName}_CV.pdf`;
    pdf.save(filename);
    return true;
  } catch (error) {
    console.error('Error generating PDF with html2canvas, trying programmatic fallback:', error);
    return generateProgrammaticPdf(cvData);
  }
}

export function generateProgrammaticPdf(cvData: CvData): boolean {
  try {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const { personalInfo, education, experience, skills } = cvData;

    // Background header band
    doc.setFillColor(30, 41, 59); // Slate-800
    doc.rect(0, 0, 210, 38, 'F');

    // Name & Title
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.text(personalInfo.fullNameEnglish.toUpperCase(), 15, 16);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(203, 213, 225);
    doc.text(personalInfo.fullNameBangla, 15, 22);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(56, 189, 248); // Sky blue
    doc.text(personalInfo.professionalTitle, 15, 29);

    // Contact info block (Right side)
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(241, 245, 249);
    doc.text(`Phone: ${personalInfo.phone}`, 200, 16, { align: 'right' });
    doc.text(`Email: ${personalInfo.email}`, 200, 22, { align: 'right' });
    doc.text(`Location: ${personalInfo.location || 'Bangladesh'}`, 200, 28, { align: 'right' });

    let currentY = 46;

    // Helper: Section Header
    const drawSectionHeader = (title: string, y: number) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(15, 23, 42); // Slate-900
      doc.text(title.toUpperCase(), 15, y);
      doc.setDrawColor(203, 213, 225);
      doc.setLineWidth(0.5);
      doc.line(15, y + 2, 195, y + 2);
      return y + 7;
    };

    // Professional Summary
    currentY = drawSectionHeader('Professional Summary', currentY);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(51, 65, 85);
    const splitSummary = doc.splitTextToSize(personalInfo.summary, 180);
    doc.text(splitSummary, 15, currentY);
    currentY += splitSummary.length * 4.5 + 4;

    // Work Experience
    currentY = drawSectionHeader('Work Experience', currentY);
    experience.forEach((exp) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(15, 23, 42);
      doc.text(exp.role, 15, currentY);

      doc.setFont('helvetica', 'italic');
      doc.setFontSize(9);
      doc.setTextColor(100, 116, 139);
      doc.text(`${exp.sector} | Duration: ${exp.duration}`, 200, currentY, { align: 'right' });
      currentY += 4.5;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(71, 85, 105);
      exp.responsibilities.forEach((resp) => {
        doc.text(`• ${resp}`, 18, currentY);
        currentY += 4;
      });
      currentY += 2;
    });

    // Education
    currentY = drawSectionHeader('Education', currentY);
    education.forEach((edu) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(15, 23, 42);
      doc.text(edu.degree, 15, currentY);

      doc.setFont('helvetica', 'bold');
      doc.setTextColor(37, 99, 235); // Blue
      doc.text(`GPA: ${edu.gpa} / ${edu.outOf}`, 200, currentY, { align: 'right' });
      currentY += 4.5;

      if (edu.description) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(100, 116, 139);
        doc.text(edu.description, 18, currentY);
        currentY += 4.5;
      }
    });

    // Skills
    currentY = drawSectionHeader('Key Competencies & Skills', currentY);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(51, 65, 85);

    const skillNames = skills.map((s) => s.name);
    // Draw in two columns
    const half = Math.ceil(skillNames.length / 2);
    const col1 = skillNames.slice(0, half);
    const col2 = skillNames.slice(half);

    const startSkillY = currentY;
    col1.forEach((sk, i) => {
      doc.text(`✔  ${sk}`, 18, startSkillY + i * 4.5);
    });
    col2.forEach((sk, i) => {
      doc.text(`✔  ${sk}`, 105, startSkillY + i * 4.5);
    });

    const cleanName = (personalInfo.fullNameEnglish || 'Baker_Hossain')
      .replace(/\s+/g, '_')
      .replace(/[^a-zA-Z0-9_]/g, '');
    doc.save(`${cleanName}_CV.pdf`);
    return true;
  } catch (err) {
    console.error('Programmatic PDF generation failed:', err);
    return false;
  }
}

export function printCvDocument(): void {
  window.print();
}

export async function shareCv(cvData: CvData): Promise<{ success: boolean; message: string }> {
  const shareData = {
    title: `${cvData.personalInfo.fullNameBangla} (${cvData.personalInfo.fullNameEnglish}) – Digital CV`,
    text: `Check out the professional Digital CV of ${cvData.personalInfo.fullNameEnglish} (${cvData.personalInfo.professionalTitle}). Phone: ${cvData.personalInfo.phone}, Email: ${cvData.personalInfo.email}`,
    url: window.location.href,
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
      return { success: true, message: 'Shared successfully!' };
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        console.warn('Error using Web Share API', err);
      }
    }
  }

  // Fallback: Copy link
  try {
    await navigator.clipboard.writeText(
      `${shareData.title}\n${shareData.text}\n${shareData.url}`
    );
    return { success: true, message: 'CV details & link copied to clipboard!' };
  } catch {
    return { success: false, message: 'Unable to share or copy link.' };
  }
}
