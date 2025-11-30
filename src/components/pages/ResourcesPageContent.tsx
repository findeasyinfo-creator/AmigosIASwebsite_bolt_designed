'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import CommunityForum from '@/components/CommunityForum';

export default function ResourcesPageContent() {
  const [activeTab, setActiveTab] = useState('study-materials');

  const tabs = [
    { id: 'study-materials', name: 'Study Materials' },
    { id: 'strategy', name: 'Strategy Articles' },
    { id: 'pyq', name: 'Previous Year Papers' },
    { id: 'videos', name: 'Video Lectures' },
    { id: 'faculty-columns', name: 'Faculty Columns' },
    { id: 'exam-updates', name: 'Exam Updates' },
    { id: 'community-forum', name: 'Community Forum' },
  ];

  // Handle hash navigation on mount
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash && tabs.some(tab => tab.id === hash)) {
      setActiveTab(hash);
    }
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="py-16 hero-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white">Resources & Blog</h1>
          <p className="text-xl text-gray-700 dark:text-gray-300">
            Comprehensive study resources and expert insights for UPSC preparation
          </p>
        </div>
      </section>

      {/* Tab Navigation and Content */}
      <section id="resources-tabs" className="py-8 resources-tabs in-view" data-section="resources-tabs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tab Navigation */}
          <div className="sticky top-[72px] md:top-[119px] z-30 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-4 mb-8 -mt-2 shadow-md">
            <div className="max-w-7xl mx-auto overflow-x-auto">
              <div className="flex space-x-2 pb-2">
                {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-lg font-medium whitespace-nowrap transition-all duration-200 ${
                    activeTab === tab.id
                    ? 'bg-orange-500 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-700 hover:border-orange-300'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <div>
            {activeTab === 'study-materials' && <StudyMaterialsTab />}
            {activeTab === 'strategy' && <StrategyTab />}
            {activeTab === 'pyq' && <PYQTab />}
            {activeTab === 'videos' && <VideosTab />}
            {activeTab === 'faculty-columns' && <FacultyColumnsTab />}
            {activeTab === 'exam-updates' && <ExamUpdatesTab />}
            {activeTab === 'community-forum' && <CommunityForumTab />}
          </div>
        </div>
      </section>

      {/* Floating Community Forum Button - Resources page only */}
      <button
        type="button"
        aria-label="Open Community Forum"
        title="Community Forum"
        onClick={() => setActiveTab('community-forum')}
        className="fixed bottom-[190px] right-[30px] z-40 w-14 h-14 rounded-full shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300/50 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-[3px] hover:scale-105 active:scale-95 overflow-hidden bg-transparent md:bottom-[190px] md:right-[30px] md:w-14 md:h-14 sm:bottom-[214px] sm:right-[12px] sm:w-[50px] sm:h-[50px] max-sm:bottom-[178px] max-sm:right-[10px] max-sm:w-[44px] max-sm:h-[44px]"
        style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)' }}
      >
        <span className="sr-only">Open Community Forum</span>
        <img 
          src="/faq-icon.png" 
          alt="FAQ Community Forum"
          className="w-full h-full object-cover scale-[2]"
        />
      </button>
    </div>
  );
}

function StudyMaterialsTab() {
  const materials = [
    { title: 'Indian Polity Complete Notes', subject: 'Polity', year: 2025, pages: '250 pages' },
    { title: 'Modern Indian History', subject: 'History', year: 2025, pages: '180 pages' },
    { title: 'Indian Economy Handbook', subject: 'Economy', year: 2025, pages: '320 pages' },
    { title: 'Geography and Environment', subject: 'Geography', year: 2025, pages: '210 pages' },
    { title: 'International Relations Notes', subject: 'IR', year: 2025, pages: '160 pages' },
    { title: 'Science and Technology', subject: 'Science', year: 2025, pages: '140 pages' },
    { title: 'Ancient India - Indus to Gupta', subject: 'History', year: 2025, pages: '195 pages' },
    { title: 'Medieval India History', subject: 'History', year: 2025, pages: '165 pages' },
    { title: 'Art and Culture of India', subject: 'Culture', year: 2025, pages: '220 pages' },
    { title: 'Ethics, Integrity & Aptitude', subject: 'Ethics', year: 2025, pages: '175 pages' },
    { title: 'Indian Society & Social Justice', subject: 'Society', year: 2025, pages: '190 pages' },
    { title: 'Internal Security & Defense', subject: 'Security', year: 2025, pages: '155 pages' },
    { title: 'Disaster Management', subject: 'Geography', year: 2025, pages: '130 pages' },
    { title: 'Agriculture & Food Security', subject: 'Economy', year: 2025, pages: '145 pages' },
    { title: 'Industrial & Infrastructure Development', subject: 'Economy', year: 2025, pages: '170 pages' },
    { title: 'Biodiversity & Climate Change', subject: 'Environment', year: 2025, pages: '185 pages' },
    { title: 'Governance & Public Policy', subject: 'Polity', year: 2025, pages: '200 pages' },
    { title: 'World History - Modern Period', subject: 'History', year: 2025, pages: '160 pages' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
      {materials.map((material, index) => {
        const titleSlug = material.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '');
        
        // Use custom image for first card (Polity), AI for others
        const imageUrl = index === 0 
          ? 'https://image.pollinations.ai/prompt/wooden%20judge%20gavel%20with%20constitution%20book%2C%203D%20render%2C%20realistic%2C%20soft%20lighting%2C%20isolated%20object%2C%20natural%20shadow%2C%20transparent%20background?seed=polity-gavel&width=512&height=512&nologo=true'
          : `https://image.pollinations.ai/prompt/${encodeURIComponent(
              `${material.title} 3D illustration, realistic high-quality render, soft studio lighting, isolated subject with subtle shadow, clean white background, professional photography, detailed textures`
            )}?seed=${encodeURIComponent(titleSlug)}&width=512&height=512&nologo=true&enhance=true`;
        
        const icon = (() => {
          switch (material.subject.toLowerCase()) {
            case 'polity':
              return (
                <svg viewBox="0 0 64 64" className="w-16 h-16">
                  <path d="M14 38h36" stroke="#7a3b00" strokeWidth="4" strokeLinecap="round"/>
                  <rect x="10" y="40" width="44" height="10" rx="5" fill="#b36b2c"/>
                  <path d="M26 16l12 12" stroke="#7a3b00" strokeWidth="4" strokeLinecap="round"/>
                  <rect x="24" y="10" width="10" height="12" rx="2" fill="#d49a6a"/>
                </svg>
              );
            case 'economy':
              return (
                <svg viewBox="0 0 64 64" className="w-16 h-16">
                  <path d="M10 50h44" stroke="#0e4a7b" strokeWidth="3"/>
                  <rect x="14" y="34" width="8" height="16" fill="#4cc3ff" rx="2"/>
                  <rect x="28" y="28" width="8" height="22" fill="#2fa8ff" rx="2"/>
                  <rect x="42" y="20" width="8" height="30" fill="#1283d8" rx="2"/>
                  <path d="M14 36c8-10 16-14 36-20" stroke="#ff8c5a" strokeWidth="3" fill="none"/>
                </svg>
              );
            case 'geography':
              return (
                <svg viewBox="0 0 64 64" className="w-16 h-16">
                  <rect x="12" y="18" width="40" height="28" rx="4" fill="#cde6ff" stroke="#559ad6"/>
                  <path d="M16 40l12-10 8 6 12-12" stroke="#5bbf72" strokeWidth="3" fill="none"/>
                </svg>
              );
            case 'ir':
            case 'international relations':
              return (
                <svg viewBox="0 0 64 64" className="w-16 h-16">
                  <circle cx="24" cy="28" r="10" fill="#54a9ff"/>
                  <circle cx="42" cy="36" r="10" fill="#6bd17e"/>
                  <path d="M24 28c6 0 10 4 18 8" stroke="#2c7be5" strokeWidth="3" fill="none"/>
                </svg>
              );
            case 'science':
              return (
                <svg viewBox="0 0 64 64" className="w-16 h-16">
                  <path d="M22 18l10 18-10 10" stroke="#7a3bd1" strokeWidth="3" fill="none"/>
                  <circle cx="40" cy="22" r="6" fill="#ff6ea8"/>
                  <circle cx="30" cy="40" r="6" fill="#5cd1ff"/>
                </svg>
              );
            default:
              return (
                <svg viewBox="0 0 24 24" className="w-14 h-14" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              );
          }
        })();

        return (
          <div
            key={index}
            className="rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.1)] hover:scale-[1.02] transition-all duration-300 border border-[#f2dccb] dark:border-gray-700"
            style={{
              background:
                'radial-gradient(140% 120% at 0% 0%, rgba(255,214,176,0.55) 0%, rgba(255,249,244,0.95) 45%, rgba(246,248,255,0.95) 100%), linear-gradient(135deg, #ffffff 0%, #ffffff 100%)',
            }}
            data-theme-card="study"
          >
            <div className="flex items-start justify-between mb-3 sm:mb-4 md:mb-6">
              <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32">
                {/* AI-generated 3D image based on title - blends with card background */}
                <img
                  src={imageUrl}
                  alt={`${material.title} illustration`}
                  className="w-full h-full object-contain opacity-95 mix-blend-multiply dark:mix-blend-normal rounded-xl"
                />
              </div>
              <span className="px-2.5 py-1 sm:px-3 sm:py-1 md:px-4 md:py-1.5 bg-[#d4c4b0] text-[#4a4035] dark:bg-[#d4c4b0] dark:text-[#4a4035] rounded-full text-[10px] sm:text-xs font-medium shadow-[0_2px_8px_rgba(0,0,0,0.12)]">
                {material.subject}
              </span>
            </div>
            <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold mb-1 sm:mb-1.5 md:mb-2 text-[#1a1a1a] dark:text-white leading-snug">{material.title}</h3>
            <p className="text-xs sm:text-sm md:text-base text-[#5c5c5c] dark:text-gray-400 mb-3 sm:mb-4 md:mb-6">{material.pages} • {material.year}</p>
            <button className="w-full bg-gradient-to-r from-[#ff6a2b] to-[#ff8347] hover:from-[#ff7a3f] hover:to-[#ff8f57] text-white font-bold py-2 sm:py-2.5 md:py-3.5 px-4 sm:px-5 md:px-6 rounded-full transition-all duration-200 text-xs sm:text-sm md:text-base shadow-[inset_0_3px_8px_rgba(255,255,255,0.5),0_10px_22px_rgba(255,106,43,0.38)] flex items-center justify-center gap-1.5 sm:gap-2">
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
              </svg>
              <span className="hidden xs:inline sm:inline">Download PDF</span>
              <span className="xs:hidden sm:hidden">Download</span>
            </button>
          </div>
        );
      })}
    </div>
  );
}

function StrategyTab() {
  const articles = [
    { title: 'How to Prepare for UPSC Prelims in 6 Months', author: 'Dr. Rajesh Kumar', date: '2025-11-01', readTime: '8 min' },
    { title: 'Answer Writing Strategy for Mains', author: 'Prof. Anjali Sharma', date: '2025-10-28', readTime: '10 min' },
    { title: 'Mastering Current Affairs for UPSC', author: 'Dr. Amit Verma', date: '2025-10-25', readTime: '12 min' },
    { title: 'Optional Subject Selection Guide', author: 'Ms. Priya Singh', date: '2025-10-20', readTime: '6 min' },
    { title: 'Time Management Tips for UPSC Preparation', author: 'Dr. Vikram Patel', date: '2025-10-15', readTime: '9 min' },
    { title: 'How to Score 300+ in UPSC Mains', author: 'Prof. Anjali Sharma', date: '2025-10-10', readTime: '15 min' },
    { title: 'Revision Strategy for Last 3 Months', author: 'Dr. Rajesh Kumar', date: '2025-10-05', readTime: '11 min' },
    { title: 'Interview Preparation Complete Guide', author: 'Ms. Priya Singh', date: '2025-09-28', readTime: '14 min' },
    { title: 'Daily Routine for UPSC Aspirants', author: 'Dr. Amit Verma', date: '2025-09-20', readTime: '7 min' },
    { title: 'How to Make Effective Notes', author: 'Dr. Neha Reddy', date: '2025-09-15', readTime: '10 min' },
    { title: 'Essay Writing Masterclass', author: 'Prof. Suresh Gupta', date: '2025-09-10', readTime: '13 min' },
    { title: 'Tackling Negative Marking in Prelims', author: 'Dr. Vikram Patel', date: '2025-09-05', readTime: '8 min' },
  ];

  return (
    <div className="space-y-6">
      {articles.map((article, index) => (
        <div key={index} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-semibold hover:text-orange-500 transition-colors cursor-pointer">
              {article.title}
            </h3>
            <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap ml-4">{article.readTime}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
            <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-semibold mr-3">
              {article.author.charAt(0)}
            </div>
            <div>
              <div className="font-medium">{article.author}</div>
              <div className="text-xs">{article.date}</div>
            </div>
          </div>
          <Link href="#" className="text-orange-500 hover:text-orange-600 font-medium text-sm flex items-center">
            Read Full Article
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      ))}
    </div>
  );
}

function PYQTab() {
  const papers = [
    { year: 2024, stage: 'Prelims', title: 'General Studies Paper I', stats: '100 Questions • 2.5 MB', icon: '🧭' },
    { year: 2024, stage: 'Mains', title: 'Essay Paper', stats: '2 Questions • 1.2 MB', icon: '📄' },
    { year: 2023, stage: 'Prelims', title: 'General Studies Paper I', stats: '100 Questions • 2.4 MB', icon: '📚' },
  ];

  return (
    <div id="pyq" className="py-8" aria-labelledby="pyq-heading">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {papers.map((p, i) => (
          <div 
            key={`${p.year}-${p.stage}-${i}`} 
            className="relative bg-gradient-to-br from-[#FFF8F0] to-[#FFF0E0] dark:from-[#FFF8F0] dark:to-[#FFF0E0] rounded-3xl p-8 shadow-xl overflow-hidden"
            role="group" 
            aria-label={`${p.year} ${p.stage} ${p.title}`}
          >
            {/* Decorative background elements */}
            <div className="absolute top-4 right-4 text-6xl opacity-10">🏛️</div>
            <div className="absolute bottom-4 left-4 text-6xl opacity-10">📖</div>
            
            {/* Year Badge with ribbon effect */}
            <div className="relative inline-block mb-6">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-lg shadow-lg font-bold text-xl relative z-10">
                {p.year} {p.stage}
              </div>
              <div className="absolute top-0 right-0 w-8 h-8 bg-orange-700 transform translate-x-2 -translate-y-2 rounded-tr-lg"></div>
              <div className="absolute right-2 top-2 text-3xl">{p.icon}</div>
            </div>

            {/* Content */}
            <div className="relative z-10 mb-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="text-2xl opacity-60">
                  {p.stage === 'Prelims' ? '❓' : '📝'}
                </div>
                <p className="text-amber-900 dark:text-amber-950 font-medium text-base">
                  {p.stats}
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 relative z-10">
              <button 
                className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-[1.02]" 
                aria-label={`Download ${p.title}`}
              >
                Download
              </button>
              <button 
                className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-[1.02]" 
                aria-label={`View ${p.title}`}
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function VideosTab() {
  const videos = [
    { 
      title: 'Indus Valley Civilization', 
      subtitle: 'Dr. Amit Verma',
      duration: '45:30', 
      views: '12.5K', 
      image: 'https://images.unsplash.com/photo-1596414086775-3e321ab08f36?w=800&q=80',
      facultyName: 'DR. AMIT VERMA',
      category: 'ANCIENT HISTORY'
    },
    { 
      title: 'Indian Constitution Overview', 
      subtitle: 'Ms. Priya Singh',
      duration: '38:15', 
      views: '8.2K', 
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80',
      facultyName: 'MS. PRIYA SINGH',
      category: 'INDIAN CONSTITUTION OVERVIEW'
    },
    { 
      title: 'Physical Geography of India', 
      subtitle: 'Dr. Rajesh Kumar',
      duration: '52:40', 
      views: '15.3K', 
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
      facultyName: 'DR. RAJESH KUMAR',
      category: 'PHYSICAL GEOGRAPHY OF INDIA'
    },
  ];

  return (
    <div id="videos" className="py-8" aria-labelledby="videos-heading">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((v, i) => (
          <div 
            key={`${v.title}-${i}`} 
            className="bg-gradient-to-br from-[#FFF8F0] to-[#FFF0E0] dark:from-[#FFF8F0] dark:to-[#FFF0E0] rounded-3xl overflow-hidden shadow-xl" 
            role="group" 
            aria-label={`${v.title} video`}
          >
            {/* Video Thumbnail */}
            <div className="relative h-56 overflow-hidden">
              <img 
                src={v.image} 
                alt={v.category}
                className="w-full h-full object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/50"></div>
              
              {/* Thumbnail content */}
              <div className="absolute inset-0 flex flex-col items-start justify-between p-6">
                <div>
                  <h3 className="text-yellow-300 font-bold text-2xl mb-2 uppercase tracking-wide drop-shadow-lg">
                    {v.category}
                  </h3>
                  <div className="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-1.5 rounded inline-block font-bold text-sm">
                    {v.facultyName}
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded text-sm font-semibold">
                  {v.duration}
                </div>
              </div>
              
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-white/95 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform cursor-pointer">
                  <svg className="w-10 h-10 text-orange-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6">
              <h3 className="text-lg font-bold mb-2 text-amber-900">
                {v.title} - {v.subtitle}
              </h3>
              <p className="text-sm text-amber-800 mb-4">
                {v.subtitle} • {v.views} views
              </p>
              <button 
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-[1.02] flex items-center justify-center gap-2" 
                aria-label={`Watch ${v.title} now`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Watch Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FacultyColumnsTab() {
  const columns = [
    { title: 'Understanding Constitutional Amendments', author: 'Dr. Amit Verma', date: '2025-11-02', category: 'Polity' },
    { title: 'Global Economic Trends and India', author: 'Ms. Priya Singh', date: '2025-10-30', category: 'Economy' },
    { title: 'Freedom Struggle: Lesser Known Facts', author: 'Dr. Rajesh Kumar', date: '2025-10-27', category: 'History' },
    { title: "Climate Change and India's Response", author: 'Dr. Neha Reddy', date: '2025-10-22', category: 'Environment' },
    { title: 'India-China Relations: Past and Present', author: 'Dr. Amit Verma', date: '2025-10-18', category: 'International Relations' },
    { title: 'Digital Economy and Financial Inclusion', author: 'Ms. Priya Singh', date: '2025-10-12', category: 'Economy' },
    { title: 'Ethics in Public Administration', author: 'Prof. Suresh Gupta', date: '2025-10-08', category: 'Ethics' },
    { title: 'Ancient India: Vedic Civilization', author: 'Dr. Rajesh Kumar', date: '2025-10-05', category: 'History' },
    { title: 'Space Technology and ISRO Achievements', author: 'Dr. Vikram Patel', date: '2025-09-30', category: 'Science & Technology' },
    { title: 'Federalism in Indian Constitution', author: 'Dr. Amit Verma', date: '2025-09-25', category: 'Polity' },
    { title: 'Water Crisis and Management', author: 'Dr. Neha Reddy', date: '2025-09-20', category: 'Geography' },
    { title: "India's Foreign Policy Challenges", author: 'Prof. Anjali Sharma', date: '2025-09-15', category: 'International Relations' },
  ];

  return (
    <div id="faculty-columns" className="space-y-6">
      {columns.map((column, index) => (
        <div key={index} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
          <span className="inline-block px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-full text-sm font-medium mb-3">
            {column.category}
          </span>
          <h3 className="text-xl font-semibold mb-3 hover:text-orange-500 transition-colors cursor-pointer">
            {column.title}
          </h3>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-semibold mr-3">
              {column.author.charAt(0)}
            </div>
            <div>
              <div className="font-medium">{column.author}</div>
              <div className="text-xs">{column.date}</div>
            </div>
          </div>
          <Link href="#" className="text-orange-500 hover:text-orange-600 font-medium text-sm flex items-center">
            Read More
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      ))}
    </div>
  );
}

function ExamUpdatesTab() {
  const updates = [
    { title: 'UPSC CSE 2026 Notification Released', date: '2025-11-03', type: 'Notification', urgent: true },
    { title: 'Prelims Exam Date Announced', date: '2025-10-29', type: 'Important', urgent: true },
    { title: 'Interview Schedule for CSE 2025', date: '2025-10-25', type: 'Schedule', urgent: false },
    { title: 'Changes in Optional Subject Syllabus', date: '2025-10-20', type: 'Update', urgent: false },
    { title: 'Mains Admit Card Release Date', date: '2025-10-15', type: 'Important', urgent: true },
    { title: 'Revised Exam Calendar for 2026', date: '2025-10-10', type: 'Schedule', urgent: false },
    { title: 'Final Result Declaration - CSE 2024', date: '2025-10-05', type: 'Result', urgent: true },
    { title: 'New Application Portal Guidelines', date: '2025-09-28', type: 'Update', urgent: false },
    { title: 'Interview Panel and Locations Announced', date: '2025-09-20', type: 'Schedule', urgent: false },
    { title: 'Document Verification Process Update', date: '2025-09-15', type: 'Update', urgent: false },
    { title: 'Prelims Result 2025 Declared', date: '2025-09-10', type: 'Result', urgent: true },
    { title: 'Important FAQs Updated', date: '2025-09-05', type: 'Information', urgent: false },
  ];

  return (
    <div className="space-y-4">
      {updates.map((update, index) => (
        <div key={index} className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg ${update.urgent ? 'border-l-4 border-red-500' : ''}`}>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  update.urgent
                    ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                    : 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'
                }`}>
                  {update.type}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{update.date}</span>
              </div>
              <h3 className="text-lg font-semibold mb-3">{update.title}</h3>
              <Link href="#" className="text-orange-500 hover:text-orange-600 font-medium text-sm flex items-center">
                Read Details
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            {update.urgent && (
              <svg className="w-6 h-6 text-red-500 flex-shrink-0 ml-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function CommunityForumTab() {
  return <CommunityForum />;
}