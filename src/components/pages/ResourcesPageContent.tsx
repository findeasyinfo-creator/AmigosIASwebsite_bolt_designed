'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import CommunityForum from '@/components/CommunityForum';

export default function ResourcesPageContent() {
  const [activeTab, setActiveTab] = useState('study-materials');

  const tabs = [
    { id: 'study-materials', name: 'Study Materials' },
    { id: 'ncerts', name: 'NCERTs' },
    { id: 'strategy', name: 'Strategy Articles' },
    { id: 'pyq', name: 'Previous Year Papers' },
    { id: 'videos', name: 'Video Lectures' },
    { id: 'faculty-columns', name: 'Faculty Columns' },
    { id: 'exam-updates', name: 'Exam Updates' },
    { id: 'community-forum', name: 'Community Forum' },
  ];

  // Handle hash navigation on mount and maintain state across refreshes
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash && tabs.some(tab => tab.id === hash)) {
      setActiveTab(hash);
    }
  }, []);

  // Update hash when tab changes
  useEffect(() => {
    window.history.replaceState(null, '', `#${activeTab}`);
  }, [activeTab]);

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
            {activeTab === 'ncerts' && <NCERTsTab />}
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
      {materials.map((material, index) => (
        <LazyStudyCard key={material.title} material={material} index={index} />
      ))}
    </div>
  );
}

// Lazy loaded card component using IntersectionObserver
function LazyStudyCard({ material, index }: { material: { title: string; subject: string; year: number; pages: string }; index: number }) {
  const [visible, setVisible] = React.useState(false);
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '120px', threshold: 0.05 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const titleSlug = material.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  const imageUrl = index === 0
    ? 'https://image.pollinations.ai/prompt/wooden%20judge%20gavel%20with%20constitution%20book%2C%203D%20render%2C%20realistic%2C%20soft%20lighting%2C%20isolated%20object%2C%20natural%20shadow%2C%20transparent%20background?seed=polity-gavel&width=512&height=512&nologo=true'
    : `https://image.pollinations.ai/prompt/${encodeURIComponent(
        `${material.title} 3D illustration, realistic high-quality render, soft studio lighting, isolated subject with subtle shadow, clean white background, professional photography, detailed textures`
      )}?seed=${encodeURIComponent(titleSlug)}&width=512&height=512&nologo=true&enhance=true`;

  return (
    <div
      ref={ref}
      className="study-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.1)] hover:scale-[1.02] transition-all duration-300 border border-[#f2dccb] dark:border-gray-700"
      style={{
        background:
          'radial-gradient(140% 120% at 0% 0%, rgba(255,214,176,0.55) 0%, rgba(255,249,244,0.95) 45%, rgba(246,248,255,0.95) 100%), linear-gradient(135deg, #ffffff 0%, #ffffff 100%)',
        ['--study-delay' as any]: `${index * 70}ms`
      }}
      data-theme-card="study"
    >
      <div className="flex items-start justify-between mb-3 sm:mb-4 md:mb-6">
        <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32">
          {visible ? (
            <img
              src={imageUrl}
              alt={`${material.title} illustration`}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-contain opacity-95 mix-blend-multiply dark:mix-blend-normal rounded-xl"
            />
          ) : (
            <div className="w-full h-full rounded-xl bg-gradient-to-br from-orange-50 to-rose-50 animate-pulse" />
          )}
        </div>
        <span className="px-2.5 py-1 sm:px-3 sm:py-1 md:px-4 md:py-1.5 bg-[#d4c4b0] text-[#4a4035] dark:bg-[#d4c4b0] dark:text-[#4a4035] rounded-full text-[10px] sm:text-xs font-medium shadow-[0_2px_8px_rgba(0,0,0,0.12)]">
          {material.subject}
        </span>
      </div>
      <h3 className="study-title text-sm sm:text-base md:text-lg lg:text-xl font-bold mb-1 sm:mb-1.5 md:mb-2 text-[#1a1a1a] dark:text-white leading-snug">{material.title}</h3>
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
}

function NCERTsTab() {
  const [selectedSubject, setSelectedSubject] = useState('all');

  const subjects = [
    { id: 'all', name: 'All Subjects' },
    { id: 'history', name: 'History' },
    { id: 'geography', name: 'Geography' },
    { id: 'polity', name: 'Polity' },
    { id: 'economics', name: 'Economics' },
    { id: 'science', name: 'Science' },
    { id: 'environment', name: 'Environment' },
  ];

  const ncerts = [
    { title: 'NCERT Class 6 - History (Our Pasts - I)', subject: 'history', class: '6', pages: '186 pages', description: 'Introduction to ancient civilizations and early Indian history', image: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=400&q=80' },
    { title: 'NCERT Class 6 - Geography (The Earth: Our Habitat)', subject: 'geography', class: '6', pages: '142 pages', description: 'Understanding Earth as a planet and basic geographical concepts', image: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=400&q=80' },
    { title: 'NCERT Class 6 - Polity (Social and Political Life)', subject: 'polity', class: '6', pages: '118 pages', description: 'Basics of democracy, government, and social structures', image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&q=80' },
    { title: 'NCERT Class 7 - History (Our Pasts - II)', subject: 'history', class: '7', pages: '220 pages', description: 'Medieval Indian history from 8th to 18th century', image: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=400&q=80' },
    { title: 'NCERT Class 7 - Geography (Our Environment)', subject: 'geography', class: '7', pages: '156 pages', description: 'Environmental studies and natural resource management', image: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=400&q=80' },
    { title: 'NCERT Class 7 - Polity (Social and Political Life - II)', subject: 'polity', class: '7', pages: '134 pages', description: 'State government, media, and local governance', image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&q=80' },
    { title: 'NCERT Class 8 - History (Our Pasts - III)', subject: 'history', class: '8', pages: '198 pages', description: 'Colonial India and freedom struggle movements', image: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=400&q=80' },
    { title: 'NCERT Class 8 - Geography (Resources and Development)', subject: 'geography', class: '8', pages: '148 pages', description: 'Natural resources, industries, and human resources', image: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=400&q=80' },
    { title: 'NCERT Class 8 - Polity (Social and Political Life - III)', subject: 'polity', class: '8', pages: '142 pages', description: 'Constitution, judiciary, and parliamentary system', image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&q=80' },
    { title: 'NCERT Class 9 - History (India and the Contemporary World - I)', subject: 'history', class: '9', pages: '216 pages', description: 'French Revolution, Nazism, and modern world history', image: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=400&q=80' },
    { title: 'NCERT Class 9 - Geography (Contemporary India - I)', subject: 'geography', class: '9', pages: '176 pages', description: 'Physical features of India, climate, and vegetation', image: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=400&q=80' },
    { title: 'NCERT Class 9 - Economics (Economics)', subject: 'economics', class: '9', pages: '128 pages', description: 'Introduction to economics, poverty, and food security', image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&q=80' },
    { title: 'NCERT Class 9 - Polity (Democratic Politics - I)', subject: 'polity', class: '9', pages: '154 pages', description: 'Democracy, electoral politics, and institutions', image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&q=80' },
    { title: 'NCERT Class 10 - History (India and the Contemporary World - II)', subject: 'history', class: '10', pages: '234 pages', description: 'Nationalism in Europe, Asia, and India', image: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=400&q=80' },
    { title: 'NCERT Class 10 - Geography (Contemporary India - II)', subject: 'geography', class: '10', pages: '188 pages', description: 'Resources, agriculture, minerals, and transport', image: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=400&q=80' },
    { title: 'NCERT Class 10 - Economics (Understanding Economic Development)', subject: 'economics', class: '10', pages: '142 pages', description: 'Development, sectors of economy, and globalization', image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&q=80' },
    { title: 'NCERT Class 10 - Polity (Democratic Politics - II)', subject: 'polity', class: '10', pages: '168 pages', description: 'Power sharing, federalism, and political parties', image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&q=80' },
    { title: 'NCERT Class 11 - History (Themes in World History)', subject: 'history', class: '11', pages: '264 pages', description: 'Ancient civilizations, empires, and cultural transformations', image: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=400&q=80' },
    { title: 'NCERT Class 11 - Geography (Fundamentals of Physical Geography)', subject: 'geography', class: '11', pages: '198 pages', description: 'Earth structure, landforms, climate, and water', image: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=400&q=80' },
    { title: 'NCERT Class 11 - Geography (India: Physical Environment)', subject: 'geography', class: '11', pages: '176 pages', description: 'India\'s physiography, climate, and natural vegetation', image: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=400&q=80' },
    { title: 'NCERT Class 11 - Polity (Indian Constitution at Work)', subject: 'polity', class: '11', pages: '192 pages', description: 'Constitution making, fundamental rights, and parliament', image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&q=80' },
    { title: 'NCERT Class 11 - Economics (Indian Economic Development)', subject: 'economics', class: '11', pages: '186 pages', description: 'Economic planning, liberalization, and development', image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&q=80' },
    { title: 'NCERT Class 12 - History (Themes in Indian History - I)', subject: 'history', class: '12', pages: '288 pages', description: 'Ancient India: Harappan civilization to early states', image: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=400&q=80' },
    { title: 'NCERT Class 12 - History (Themes in Indian History - II)', subject: 'history', class: '12', pages: '276 pages', description: 'Medieval India: Delhi Sultanate to Mughal Empire', image: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=400&q=80' },
    { title: 'NCERT Class 12 - History (Themes in Indian History - III)', subject: 'history', class: '12', pages: '264 pages', description: 'Colonial India: British rule and freedom movement', image: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=400&q=80' },
    { title: 'NCERT Class 12 - Geography (Fundamentals of Human Geography)', subject: 'geography', class: '12', pages: '184 pages', description: 'Population, settlement, and human activities', image: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=400&q=80' },
    { title: 'NCERT Class 12 - Geography (India: People and Economy)', subject: 'geography', class: '12', pages: '196 pages', description: 'India\'s population, resources, and economic sectors', image: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=400&q=80' },
    { title: 'NCERT Class 12 - Polity (Contemporary World Politics)', subject: 'polity', class: '12', pages: '212 pages', description: 'Cold War, international organizations, and global issues', image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&q=80' },
    { title: 'NCERT Class 12 - Polity (Politics in India Since Independence)', subject: 'polity', class: '12', pages: '228 pages', description: 'Post-independence politics and challenges', image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&q=80' },
    { title: 'NCERT Class 12 - Economics (Introductory Microeconomics)', subject: 'economics', class: '12', pages: '168 pages', description: 'Consumer behavior, production, and market structures', image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&q=80' },
    { title: 'NCERT Class 12 - Economics (Introductory Macroeconomics)', subject: 'economics', class: '12', pages: '172 pages', description: 'National income, money, and government budget', image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&q=80' },
    { title: 'NCERT Class 11 - Biology (Living World)', subject: 'science', class: '11', pages: '198 pages', description: 'Biological classification, plant and animal kingdoms', image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&q=80' },
    { title: 'NCERT Class 12 - Biology (Biology)', subject: 'science', class: '12', pages: '328 pages', description: 'Genetics, evolution, biotechnology, and ecology', image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&q=80' },
    { title: 'NCERT Class 11 - Chemistry', subject: 'science', class: '11', pages: '286 pages', description: 'Basic concepts, atomic structure, and chemical bonding', image: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=400&q=80' },
    { title: 'NCERT Class 12 - Chemistry', subject: 'science', class: '12', pages: '298 pages', description: 'Solutions, electrochemistry, and organic chemistry', image: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=400&q=80' },
    { title: 'NCERT Class 11 - Physics', subject: 'science', class: '11', pages: '342 pages', description: 'Mechanics, thermodynamics, and waves', image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&q=80' },
    { title: 'NCERT Class 12 - Physics', subject: 'science', class: '12', pages: '356 pages', description: 'Electrostatics, magnetism, optics, and modern physics', image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&q=80' },
    { title: 'NCERT Class 11 - Environment', subject: 'environment', class: '11', pages: '164 pages', description: 'Environmental issues, biodiversity, and conservation', image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&q=80' },
    { title: 'NCERT Class 12 - Environment (Environmental Issues)', subject: 'environment', class: '12', pages: '178 pages', description: 'Pollution, climate change, and sustainable development', image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&q=80' },
  ];

  const filteredNCERTs = selectedSubject === 'all'
    ? ncerts
    : ncerts.filter(ncert => ncert.subject === selectedSubject);

  return (
    <div>
      {/* Subject Filter */}
      <div className="mb-6 flex flex-wrap gap-2">
        {subjects.map((subject) => (
          <button
            key={subject.id}
            onClick={() => setSelectedSubject(subject.id)}
            className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
              selectedSubject === subject.id
                ? 'bg-orange-500 text-white shadow-lg'
                : 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-700'
            }`}
          >
            {subject.name}
          </button>
        ))}
      </div>

      {/* NCERTs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNCERTs.map((ncert, index) => (
          <div 
            key={index}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-orange-500"
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <img 
                src={ncert.image} 
                alt={ncert.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              />
              <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 rounded-lg text-xs font-bold shadow-lg">
                Class {ncert.class}
              </div>
              <div className="absolute top-4 right-4 px-2 py-1 bg-black/60 text-white rounded text-xs">
                {ncert.pages}
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white line-clamp-2">
                {ncert.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                {ncert.description}
              </p>
              <div className="flex gap-2">
                <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 text-sm">
                  Download PDF
                </button>
                <button className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 text-sm">
                  Read Online
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
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
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filters = [
    { id: 'all', name: 'All Papers' },
    { id: 'prelims', name: 'Prelims' },
    { id: 'mains', name: 'Mains' },
  ];

  const papers = [
    { year: 2024, stage: 'Prelims', title: 'General Studies Paper I', stats: '100 Questions • 2.5 MB', icon: '🧭' },
    { year: 2024, stage: 'Prelims', title: 'General Studies Paper II (CSAT)', stats: '80 Questions • 2.2 MB', icon: '📊' },
    { year: 2024, stage: 'Mains', title: 'Essay Paper', stats: '2 Questions • 1.2 MB', icon: '📄' },
    { year: 2024, stage: 'Mains', title: 'General Studies Paper I', stats: '20 Questions • 1.8 MB', icon: '📚' },
    { year: 2024, stage: 'Mains', title: 'General Studies Paper II', stats: '20 Questions • 1.9 MB', icon: '📖' },
    { year: 2024, stage: 'Mains', title: 'General Studies Paper III', stats: '20 Questions • 2.0 MB', icon: '📝' },
    { year: 2024, stage: 'Mains', title: 'General Studies Paper IV (Ethics)', stats: '18 Questions • 1.5 MB', icon: '⚖️' },
    { year: 2023, stage: 'Prelims', title: 'General Studies Paper I', stats: '100 Questions • 2.4 MB', icon: '🧭' },
    { year: 2023, stage: 'Prelims', title: 'General Studies Paper II (CSAT)', stats: '80 Questions • 2.1 MB', icon: '📊' },
    { year: 2023, stage: 'Mains', title: 'Essay Paper', stats: '2 Questions • 1.1 MB', icon: '📄' },
    { year: 2023, stage: 'Mains', title: 'General Studies Paper I', stats: '20 Questions • 1.7 MB', icon: '📚' },
    { year: 2023, stage: 'Mains', title: 'General Studies Paper II', stats: '20 Questions • 1.8 MB', icon: '📖' },
    { year: 2023, stage: 'Mains', title: 'General Studies Paper III', stats: '20 Questions • 1.9 MB', icon: '📝' },
    { year: 2023, stage: 'Mains', title: 'General Studies Paper IV (Ethics)', stats: '18 Questions • 1.4 MB', icon: '⚖️' },
    { year: 2022, stage: 'Prelims', title: 'General Studies Paper I', stats: '100 Questions • 2.3 MB', icon: '🧭' },
    { year: 2022, stage: 'Prelims', title: 'General Studies Paper II (CSAT)', stats: '80 Questions • 2.0 MB', icon: '📊' },
    { year: 2022, stage: 'Mains', title: 'Essay Paper', stats: '2 Questions • 1.0 MB', icon: '📄' },
    { year: 2022, stage: 'Mains', title: 'General Studies Paper I', stats: '20 Questions • 1.6 MB', icon: '📚' },
    { year: 2022, stage: 'Mains', title: 'General Studies Paper II', stats: '20 Questions • 1.7 MB', icon: '📖' },
    { year: 2022, stage: 'Mains', title: 'General Studies Paper III', stats: '20 Questions • 1.8 MB', icon: '📝' },
    { year: 2022, stage: 'Mains', title: 'General Studies Paper IV (Ethics)', stats: '18 Questions • 1.3 MB', icon: '⚖️' },
  ];

  const filteredPapers = selectedFilter === 'all'
    ? papers
    : papers.filter(paper => paper.stage.toLowerCase() === selectedFilter);

  return (
    <div id="pyq" className="py-8" aria-labelledby="pyq-heading">
      {/* Filter Buttons */}
      <div className="mb-6 flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setSelectedFilter(filter.id)}
            className={`px-5 py-2.5 rounded-full font-medium transition-all duration-200 ${
              selectedFilter === filter.id
                ? 'bg-orange-500 text-white shadow-lg'
                : 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-700'
            }`}
          >
            {filter.name}
          </button>
        ))}
      </div>

      {/* Papers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPapers.map((p, i) => (
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
  const [selectedColumn, setSelectedColumn] = useState<number | null>(null);

  const columns = [
    { 
      title: 'Understanding Constitutional Amendments', 
      author: 'Dr. Amit Verma', 
      date: '2025-11-02', 
      category: 'Polity',
      excerpt: 'A comprehensive guide to constitutional amendments and their impact on Indian governance.',
      content: 'Constitutional amendments are crucial for adapting the Constitution to changing times. This article explores the process, significance, and recent amendments. Key topics include: Amendment procedure under Article 368, Types of amendments (simple majority, special majority, and ratification), Landmark amendments like 42nd, 44th, and recent ones, Their impact on fundamental rights and federal structure. Understanding constitutional amendments is vital for UPSC aspirants as they form a significant part of the Polity syllabus.',
      topics: ['Constitution', 'Polity', 'Amendments', 'Article 368']
    },
    { 
      title: 'Global Economic Trends and India', 
      author: 'Ms. Priya Singh', 
      date: '2025-10-30', 
      category: 'Economy',
      excerpt: 'Analyzing how global economic shifts impact Indian economy and policy decisions.',
      content: 'The global economy is undergoing significant transformations. This article examines: Impact of US Federal Reserve policies on emerging markets, China slowdown and opportunities for India, Energy transition and its economic implications, Trade wars and supply chain restructuring, India positioning in the changing global order. For UPSC Mains, understanding these interconnections helps in holistic answer writing across GS-II and GS-III papers.',
      topics: ['Economy', 'Global Trade', 'India', 'Policy']
    },
    { 
      title: 'Freedom Struggle: Lesser Known Facts', 
      author: 'Dr. Rajesh Kumar', 
      date: '2025-10-27', 
      category: 'History',
      excerpt: 'Uncovering forgotten heroes and events from Indian independence movement.',
      content: 'Beyond mainstream narratives, the freedom struggle has numerous untold stories. This article highlights: Contributions of tribal and peasant movements, Role of women revolutionaries often overlooked, Regional movements and their national impact, International support and diaspora contributions, Economic resistance and swadeshi movements. These perspectives enrich understanding for both Prelims and Mains preparation.',
      topics: ['Freedom Struggle', 'History', 'Heroes', 'Movements']
    },
    { 
      title: "Climate Change and India's Response", 
      author: 'Dr. Neha Reddy', 
      date: '2025-10-22', 
      category: 'Environment',
      excerpt: 'Examining climate change challenges and India mitigation strategies.',
      content: "Climate change poses existential challenges requiring urgent action. This article covers: India's climate vulnerabilities (agriculture, water, coastal areas), National Action Plan on Climate Change (NAPCC), International commitments (Paris Agreement, COP outcomes), Renewable energy initiatives and targets, Climate finance and technology transfer needs. Essential reading for GS-III Environment and current affairs integration.",
      topics: ['Climate Change', 'Environment', 'Policy', 'Sustainability']
    },
    { 
      title: 'India-China Relations: Past and Present', 
      author: 'Dr. Amit Verma', 
      date: '2025-10-18', 
      category: 'International Relations',
      excerpt: 'Historical context and contemporary dynamics of India-China bilateral relations.',
      content: 'India-China relations have evolved significantly over decades. Analysis includes: Historical ties and civilizational exchanges, Border disputes and 1962 war legacy, Trade relations and economic interdependence, Strategic competition in Indo-Pacific, Recent border tensions and diplomatic efforts. Understanding this relationship is crucial for GS-II International Relations and current affairs.',
      topics: ['India-China', 'Foreign Policy', 'Border', 'Trade']
    },
    { 
      title: 'Digital Economy and Financial Inclusion', 
      author: 'Ms. Priya Singh', 
      date: '2025-10-12', 
      category: 'Economy',
      excerpt: 'How digital technologies are transforming financial services and inclusion.',
      content: 'Digital revolution is reshaping financial services landscape. Key areas covered: Digital payment systems (UPI, BHIM, etc.), Jan Dhan-Aadhaar-Mobile (JAM) trinity, Fintech innovations and regulatory framework, Challenges (digital divide, cybersecurity, privacy), Financial literacy and consumer protection. Critical topic for GS-III Economy and technology integration questions.',
      topics: ['Digital Economy', 'Financial Inclusion', 'Technology', 'Policy']
    },
    { 
      title: 'Ethics in Public Administration', 
      author: 'Prof. Suresh Gupta', 
      date: '2025-10-08', 
      category: 'Ethics',
      excerpt: 'Core ethical principles and their application in administrative decision-making.',
      content: 'Ethical governance is foundation of good administration. Discussion includes: Foundational values (integrity, objectivity, accountability), Ethical dilemmas in public service, Case studies of ethical decision-making, Whistleblowing and protection mechanisms, International best practices. Essential for GS-IV Ethics paper and case study preparation.',
      topics: ['Ethics', 'Governance', 'Values', 'Administration']
    },
    { 
      title: 'Ancient India: Vedic Civilization', 
      author: 'Dr. Rajesh Kumar', 
      date: '2025-10-05', 
      category: 'History',
      excerpt: 'Understanding the Vedic period civilization, society, and contributions.',
      content: 'Vedic civilization laid foundations of Indian culture. Comprehensive coverage of: Vedic literature (Samhitas, Brahmanas, Aranyakas, Upanishads), Social structure and varna system, Economic life and trade, Religious and philosophical developments, Scientific and mathematical contributions. Important for Ancient History section of GS-I.',
      topics: ['Ancient India', 'Vedic Period', 'Civilization', 'Culture']
    },
    { 
      title: 'Space Technology and ISRO Achievements', 
      author: 'Dr. Vikram Patel', 
      date: '2025-09-30', 
      category: 'Science & Technology',
      excerpt: 'India space program evolution and recent technological milestones.',
      content: "ISRO has emerged as a leading space agency. Article explores: Major missions (Chandrayaan, Mangalyaan, Gaganyaan), Commercial space activities and cost-effectiveness, Space technology applications (communication, navigation, remote sensing), International collaborations and space diplomacy, Future missions and strategic importance. Vital for GS-III Science & Technology and current affairs.",
      topics: ['ISRO', 'Space', 'Technology', 'Innovation']
    },
    { 
      title: 'Federalism in Indian Constitution', 
      author: 'Dr. Amit Verma', 
      date: '2025-09-25', 
      category: 'Polity',
      excerpt: 'Federal structure features, Centre-State relations, and contemporary challenges.',
      content: 'Indian federalism has unique characteristics. Detailed analysis of: Quasi-federal nature and constitutional provisions, Distribution of powers (Union, State, Concurrent lists), Centre-State relations and coordination mechanisms, Governor role and Article 356, Cooperative federalism initiatives (NITI Aayog, GST Council). Critical for GS-II Polity and federal issues understanding.',
      topics: ['Federalism', 'Centre-State', 'Constitution', 'Governance']
    },
    { 
      title: 'Water Crisis and Management', 
      author: 'Dr. Neha Reddy', 
      date: '2025-09-20', 
      category: 'Geography',
      excerpt: 'Water scarcity challenges and sustainable management strategies.',
      content: 'Water crisis is emerging as critical challenge. Coverage includes: Water availability and distribution patterns, Interstate water disputes and resolution mechanisms, Groundwater depletion and regulation, Water conservation techniques (rainwater harvesting, watershed management), Interlinking of rivers debate. Important for GS-I Geography and GS-III Environment.',
      topics: ['Water', 'Resources', 'Management', 'Crisis']
    },
    { 
      title: "India's Foreign Policy Challenges", 
      author: 'Prof. Anjali Sharma', 
      date: '2025-09-15', 
      category: 'International Relations',
      excerpt: 'Contemporary foreign policy challenges and India strategic responses.',
      content: "India faces complex foreign policy landscape. Analysis of: Neighborhood first policy and challenges, Strategic autonomy in multipolar world, Indo-Pacific strategy and Quad, Energy security and West Asia relations, Multilateralism and UN reforms. Essential for GS-II International Relations and contemporary issues.",
      topics: ['Foreign Policy', 'Diplomacy', 'Strategy', 'India']
    },
  ];

  // Close modal on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedColumn(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedColumn !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedColumn]);

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
          {column.excerpt && (
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              {column.excerpt}
            </p>
          )}
          <button
            onClick={() => setSelectedColumn(index)}
            className="text-orange-500 hover:text-orange-600 font-medium text-sm flex items-center transition-colors"
          >
            Read More
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      ))}

      {/* Modal */}
      {selectedColumn !== null && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedColumn(null)}
        >
          <div 
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex justify-between items-start z-10">
              <div className="flex-1 pr-4">
                <span className="inline-block px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-full text-sm font-medium mb-3">
                  {columns[selectedColumn].category}
                </span>
                <h2 className="text-2xl font-bold mb-2">{columns[selectedColumn].title}</h2>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-semibold mr-3">
                    {columns[selectedColumn].author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium">{columns[selectedColumn].author}</div>
                    <div className="text-xs">{columns[selectedColumn].date}</div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedColumn(null)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                aria-label="Close modal"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  {columns[selectedColumn].content}
                </p>
                
                {columns[selectedColumn].topics && columns[selectedColumn].topics.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-3">Key Topics Covered:</h3>
                    <div className="flex flex-wrap gap-2">
                      {columns[selectedColumn].topics.map((topic, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full text-sm"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ExamUpdatesTab() {
  const [selectedUpdate, setSelectedUpdate] = useState<number | null>(null);

  const updates = [
    { 
      title: 'UPSC CSE 2026 Notification Released', 
      date: '2025-11-03', 
      type: 'Notification', 
      urgent: true,
      content: 'The Union Public Service Commission (UPSC) has officially released the notification for the Civil Services Examination (CSE) 2026. Key highlights: Application process begins from November 10, 2025. Last date for submission: December 10, 2025. Prelims exam scheduled for May 31, 2026. Age limit: 21-32 years (with relaxations for reserved categories). Total vacancies: Approximately 1,000 posts. Candidates are advised to carefully read the detailed notification and ensure eligibility before applying. The application fee is ₹100 for General/OBC candidates and NIL for SC/ST/PwD/Women candidates.',
      tags: ['CSE 2026', 'Application', 'Notification', 'Important Dates']
    },
    { 
      title: 'Prelims Exam Date Announced', 
      date: '2025-10-29', 
      type: 'Important', 
      urgent: true,
      content: 'UPSC has announced the Preliminary Examination date for CSE 2026. The exam will be conducted on May 31, 2026 (Sunday) in two sessions. Paper I (General Studies): 9:30 AM to 11:30 AM. Paper II (CSAT): 2:30 PM to 4:30 PM. Exam centers will be available in all state capitals and major cities. Admit cards will be released three weeks before the exam. Candidates must carry a valid photo ID proof along with the admit card. COVID-19 safety protocols will be followed as per government guidelines at that time.',
      tags: ['Prelims', 'Exam Date', 'CSE 2026', 'Schedule']
    },
    { 
      title: 'Interview Schedule for CSE 2025', 
      date: '2025-10-25', 
      type: 'Schedule', 
      urgent: false,
      content: 'The Personality Test (Interview) schedule for CSE 2025 has been released. Interviews will be conducted from January 15, 2026 to March 30, 2026. Candidates will receive individual interview dates via email and on the official website. Each interview session typically lasts 20-30 minutes. The board consists of a Chairman and 4-5 members from diverse backgrounds. Candidates should bring all original documents for verification. Dress code: Formal attire recommended. The interview carries 275 marks and focuses on personality, communication skills, and awareness of current affairs.',
      tags: ['Interview', 'Personality Test', 'CSE 2025', 'Schedule']
    },
    { 
      title: 'Changes in Optional Subject Syllabus', 
      date: '2025-10-20', 
      type: 'Update', 
      urgent: false,
      content: 'UPSC has introduced minor revisions in the syllabus for certain optional subjects effective from CSE 2026. Subjects affected: Geography - Added climate change adaptation strategies. Public Administration - Updated governance models section. Sociology - Expanded digital society topics. Psychology - Included neuropsychology updates. These changes reflect contemporary developments and align with modern administrative requirements. Candidates choosing these optional subjects should refer to the updated syllabus available on the UPSC website. Previous years questions remain relevant for preparation.',
      tags: ['Optional Subjects', 'Syllabus', 'Updates', 'CSE 2026']
    },
    { 
      title: 'Mains Admit Card Release Date', 
      date: '2025-10-15', 
      type: 'Important', 
      urgent: true,
      content: 'The admit cards for CSE 2025 Main Examination will be released on November 1, 2025. The Mains exam is scheduled from December 15-22, 2025. Candidates who qualified in Prelims can download their admit cards from the official UPSC website using their registration number and date of birth. Important instructions: Carry two passport-size photographs. Bring a valid photo ID proof. Use only black ball-point pen for writing. No electronic devices allowed in the examination hall. Report to the center 30 minutes before the exam.',
      tags: ['Mains', 'Admit Card', 'CSE 2025', 'Important']
    },
    { 
      title: 'Revised Exam Calendar for 2026', 
      date: '2025-10-10', 
      type: 'Schedule', 
      urgent: false,
      content: 'UPSC has released the comprehensive examination calendar for 2026. Key dates: CSE Prelims: May 31, 2026. CSE Mains: September 2026 (tentative). CSE Interview: January-March 2027. Engineering Services Exam: June 2026. Indian Forest Service: June 2026. NDA/NA: April & September 2026. CDS: February, April & September 2026. Candidates planning for multiple exams should note these dates to avoid clashes and plan their preparation accordingly.',
      tags: ['Calendar', 'Exam Schedule', '2026', 'All Exams']
    },
    { 
      title: 'Final Result Declaration - CSE 2024', 
      date: '2025-10-05', 
      type: 'Result', 
      urgent: true,
      content: 'UPSC has declared the final results for CSE 2024. Total selected candidates: 1,016. Top scorer: Shri Arjun Mehra (Roll No. 123456) with 1,050 marks. Gender distribution: Male - 640, Female - 376. Reserved category selections: SC - 152, ST - 85, OBC - 332, EWS - 103, PwD - 15. The detailed result with roll numbers and rank list is available on the UPSC official website. Selected candidates will receive joining instructions from the Department of Personnel and Training (DoPT) within 2-3 weeks.',
      tags: ['Final Result', 'CSE 2024', 'Selection', 'Toppers']
    },
    { 
      title: 'New Application Portal Guidelines', 
      date: '2025-09-28', 
      type: 'Update', 
      urgent: false,
      content: 'UPSC has updated the online application portal with new features and guidelines. New features: Real-time application status tracking. Document upload size increased to 5MB. Mobile number and email verification mandatory. Payment gateway improvements with multiple options. OTP-based login for enhanced security. Guidelines: Complete all sections before final submission. Keep scanned documents ready (photo, signature, ID proof). Use latest version of Chrome/Firefox browser. Take a printout of the submitted application. Helpdesk available on working days 10 AM - 5 PM.',
      tags: ['Application', 'Portal', 'Guidelines', 'Technology']
    },
    { 
      title: 'Interview Panel and Locations Announced', 
      date: '2025-09-20', 
      type: 'Schedule', 
      urgent: false,
      content: 'UPSC has announced the composition of Interview Boards and designated centers for CSE 2025 interviews. Board Members include: Retired civil servants, Armed forces officers, Academicians and subject experts, Retired judges, Domain specialists. Interview Centers: New Delhi (Dholpur House), Mumbai, Chennai, Kolkata, Bengaluru (for candidates requiring special accessibility). Candidates cannot request a specific board or location change except on medical grounds with proper documentation. Each board will interview 10-15 candidates per day.',
      tags: ['Interview', 'Panel', 'Centers', 'Board']
    },
    { 
      title: 'Document Verification Process Update', 
      date: '2025-09-15', 
      type: 'Update', 
      urgent: false,
      content: 'UPSC has revised the document verification process for selected candidates. Required documents: 10th & 12th mark sheets and certificates. Graduation degree and mark sheets. Caste certificate (if claiming reservation). EWS certificate (valid for current year). PwD certificate (if applicable). Character certificate from a Gazetted Officer. Recent passport-size photographs. The verification will be conducted at the time of interview. Discrepancies may lead to disqualification. Keep both original and self-attested photocopies. Digital copies also accepted in prescribed format.',
      tags: ['Document Verification', 'Certificates', 'Process', 'Requirements']
    },
    { 
      title: 'Prelims Result 2025 Declared', 
      date: '2025-09-10', 
      type: 'Result', 
      urgent: true,
      content: 'UPSC has declared the Prelims result for CSE 2025. Total candidates qualified for Mains: 11,500 (approximately). Cut-off marks (out of 200): General - 98.66, OBC - 92.34, SC - 84.00, ST - 76.66. Qualified candidates can check their result on the UPSC website using registration ID. Scorecards with detailed marks will be available after the entire examination process is complete. Qualified candidates should immediately start Mains preparation. The Mains exam will be held in December 2025.',
      tags: ['Prelims Result', 'CSE 2025', 'Cut-off', 'Mains']
    },
    { 
      title: 'Important FAQs Updated', 
      date: '2025-09-05', 
      type: 'Information', 
      urgent: false,
      content: 'UPSC has updated its Frequently Asked Questions (FAQ) section covering various aspects. New additions include: Clarity on age relaxation for various categories. Guidelines for choosing optional subjects. Explanation of tie-breaking rules in ranking. Process for name/category correction in application. Refund policy for application fees. Grievance redressal mechanism. Answer key objection process and timelines. The updated FAQs are available in both English and Hindi on the official website. Candidates are advised to refer to these before contacting the helpdesk.',
      tags: ['FAQs', 'Information', 'Help', 'Guidelines']
    },
  ];

  // Close modal on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedUpdate(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedUpdate !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedUpdate]);

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
              <button
                onClick={() => setSelectedUpdate(index)}
                className="text-orange-500 hover:text-orange-600 font-medium text-sm flex items-center transition-colors"
              >
                Read Details
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            {update.urgent && (
              <svg className="w-6 h-6 text-red-500 flex-shrink-0 ml-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            )}
          </div>
        </div>
      ))}

      {/* Modal */}
      {selectedUpdate !== null && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedUpdate(null)}
        >
          <div 
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex justify-between items-start z-10">
              <div className="flex-1 pr-4">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    updates[selectedUpdate].urgent
                      ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                      : 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'
                  }`}>
                    {updates[selectedUpdate].type}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{updates[selectedUpdate].date}</span>
                  {updates[selectedUpdate].urgent && (
                    <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded text-xs font-medium">
                      URGENT
                    </span>
                  )}
                </div>
                <h2 className="text-2xl font-bold">{updates[selectedUpdate].title}</h2>
              </div>
              <button
                onClick={() => setSelectedUpdate(null)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                aria-label="Close modal"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 whitespace-pre-line">
                  {updates[selectedUpdate].content}
                </p>
                
                {updates[selectedUpdate].tags && updates[selectedUpdate].tags.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-3">Related Tags:</h3>
                    <div className="flex flex-wrap gap-2">
                      {updates[selectedUpdate].tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CommunityForumTab() {
  return (
    <div className="min-h-[500px] flex items-center justify-center p-8">
      <div className="max-w-2xl w-full relative">
        {/* Gradient background card */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 animate-gradient-shift"></div>
          
          {/* Overlay pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px'}}></div>
          </div>
          
          {/* Content */}
          <div className="relative z-10 p-12 text-center text-white">
            {/* Icon */}
            <div className="mb-6 flex justify-center">
              <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
            </div>
            
            {/* Title */}
            <h2 className="text-4xl font-bold mb-4">Community Forum</h2>
            
            {/* Coming Soon Badge */}
            <div className="inline-block bg-white/30 backdrop-blur-md px-6 py-2 rounded-full mb-6">
              <span className="text-lg font-semibold tracking-wide">COMING SOON</span>
            </div>
            
            {/* Description */}
            <p className="text-lg text-white/90 mb-8 max-w-xl mx-auto">
              Connect with fellow UPSC aspirants, share insights, ask questions, and build your learning community.
            </p>
            
            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="font-semibold mb-1">💬 Discussion Boards</div>
                <div className="text-white/80">Topic-wise discussions</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="font-semibold mb-1">🤝 Peer Support</div>
                <div className="text-white/80">Help each other grow</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="font-semibold mb-1">📚 Study Groups</div>
                <div className="text-white/80">Collaborative learning</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}