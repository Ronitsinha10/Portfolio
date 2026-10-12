import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Printer, Mail, MapPin, ExternalLink } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-gray-950/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl h-[85vh] flex flex-col rounded-3xl border border-gray-200/20 dark:border-gray-800/80 bg-white dark:bg-gray-900 shadow-2xl overflow-hidden z-10"
          >
            {/* Header controls */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200/20 dark:border-gray-800/50 bg-gray-50 dark:bg-gray-950/50">
              <span className="font-display font-bold text-sm tracking-tight text-gray-800 dark:text-gray-200">
                Interactive Resume Preview
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="p-2 rounded-xl text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                  title="Print Resume"
                >
                  <Printer className="w-4 h-4" />
                </button>
                <a
                  href={`mailto:${portfolioData.personalInfo.email}`}
                  className="p-2 rounded-xl text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                  title="Contact Ronit"
                >
                  <Mail className="w-4 h-4" />
                </a>
                <button
                  onClick={onClose}
                  className="p-2.5 rounded-xl bg-gray-200/30 hover:bg-gray-200/60 dark:bg-gray-800/50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 cursor-pointer transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Scrollable PDF Sheet View */}
            <div className="flex-1 overflow-y-auto p-8 bg-gray-100 dark:bg-gray-950 flex justify-center">
              <div className="w-full max-w-2xl bg-white text-gray-800 p-8 sm:p-12 rounded-xl shadow-md flex flex-col gap-6 text-xs font-sans print:p-0 print:shadow-none print:w-full print:max-w-none">
                {/* PDF Header */}
                <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-4 border-b pb-6 border-gray-200">
                  <div>
                    <h1 className="text-2xl font-bold font-display tracking-tight text-gray-900">
                      {portfolioData.personalInfo.name}
                    </h1>
                    <p className="text-lightAccent font-medium mt-1">
                      {portfolioData.personalInfo.title}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1 text-gray-500 font-mono text-[10px]">
                    <span className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5" />
                      {portfolioData.personalInfo.email}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      {portfolioData.personalInfo.location}
                    </span>
                  </div>
                </div>

                {/* PDF Core Sections */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Left Column (Details, Skills, Educations) */}
                  <div className="md:col-span-1 flex flex-col gap-6">
                    <div>
                      <h2 className="text-xs uppercase font-extrabold tracking-widest text-gray-900 border-b pb-2 border-gray-200 mb-3">
                        Technical Skills
                      </h2>
                      <div className="flex flex-wrap gap-1.5">
                        {portfolioData.skills.map((skill) => (
                          <span
                            key={skill.name}
                            className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-[10px] font-medium"
                          >
                            {skill.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h2 className="text-xs uppercase font-extrabold tracking-widest text-gray-900 border-b pb-2 border-gray-200 mb-3">
                        Education
                      </h2>
                      <div className="flex flex-col gap-3">
                        <div>
                          <p className="font-semibold text-gray-900">B.Tech, Computer Science</p>
                          <p className="text-gray-500">Technical University</p>
                          <p className="text-gray-400">2022 - 2026 | CGPA 9.1</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h2 className="text-xs uppercase font-extrabold tracking-widest text-gray-900 border-b pb-2 border-gray-200 mb-3">
                        Coding Profiles
                      </h2>
                      <div className="flex flex-col gap-2 font-mono text-[10px]">
                        <a href={portfolioData.personalInfo.socials.github} target="_blank" rel="noreferrer" className="flex items-center justify-between text-lightAccent hover:underline">
                          <span>GitHub</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                        <a href={portfolioData.personalInfo.socials.leetcode} target="_blank" rel="noreferrer" className="flex items-center justify-between text-lightAccent hover:underline">
                          <span>LeetCode</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Right Column (Experience, Projects) */}
                  <div className="md:col-span-2 flex flex-col gap-6">
                    <div>
                      <h2 className="text-xs uppercase font-extrabold tracking-widest text-gray-900 border-b pb-2 border-gray-200 mb-3">
                        Professional Experience
                      </h2>
                      <div className="flex flex-col gap-4">
                        {portfolioData.experience.slice(0, 3).map((exp) => (
                          <div key={exp.id}>
                            <div className="flex justify-between font-semibold text-gray-900">
                              <span>{exp.role}</span>
                              <span className="text-gray-400 text-[10px] font-mono">{exp.period}</span>
                            </div>
                            <p className="text-lightAccent font-medium mb-1">{exp.company}</p>
                            <ul className="list-disc pl-4 text-gray-500 space-y-1">
                              {exp.description.map((desc, idx) => (
                                <li key={idx}>{desc}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h2 className="text-xs uppercase font-extrabold tracking-widest text-gray-900 border-b pb-2 border-gray-200 mb-3">
                        Key Projects
                      </h2>
                      <div className="flex flex-col gap-3">
                        {portfolioData.projects.slice(0, 3).map((proj) => (
                          <div key={proj.id}>
                            <p className="font-semibold text-gray-900">{proj.title}</p>
                            <p className="text-gray-500 mt-0.5">{proj.description}</p>
                            <p className="text-[10px] font-mono text-lightAccent mt-1">
                              Stack: {proj.techStack.join(', ')}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200/20 dark:border-gray-800/50 bg-gray-50 dark:bg-gray-950/50">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300 font-medium text-xs uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
              >
                Close
              </button>
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-lightAccent dark:bg-darkAccent hover:bg-lightAccent/90 dark:hover:bg-darkAccent/90 text-white font-medium text-xs uppercase tracking-wider cursor-pointer shadow-lg shadow-lightAccent/10 transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                Download PDF / Print
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
