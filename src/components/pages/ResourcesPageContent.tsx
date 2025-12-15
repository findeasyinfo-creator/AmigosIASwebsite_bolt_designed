'use client'
import React, { useState, useEffect, useRef } from 'react';

// Shared types for resources items
type Article = {
  title: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  excerpt?: string;
  content: string;
};

type Column = {
  title: string;
  author: string;
  date: string;
  category: string;
  excerpt?: string;
  content: string;
  topics?: string[];
};
import Link from 'next/link';
import CommunityForum from '@/components/CommunityForum';
import DottedLines from '@/components/DottedLines';

export default function ResourcesPageContent() {
  const tabs = [
    { id: 'study-materials', name: 'Study Materials' },
    { id: 'ncerts', name: 'NCERTs' },
    { id: 'strategy', name: 'Strategy Articles' },
    { id: 'pyq', name: 'Previous Year Papers' },
    { id: 'videos', name: 'Video Lectures' },
    { id: 'faculty-columns', name: 'Faculty Columns' },
    { id: 'faq', name: 'FAQ' },
    { id: 'community-forum', name: 'Community Forum' },
  ];

  const validTabIds = ['study-materials', 'ncerts', 'strategy', 'pyq', 'videos', 'faculty-columns', 'faq', 'community-forum'];

  // Avoid hydration mismatch by deferring tab selection to client mount
  const [activeTab, setActiveTab] = useState<
    'study-materials' | 'ncerts' | 'strategy' | 'pyq' | 'videos' | 'faculty-columns' | 'faq' | 'community-forum' | null
  >(null);
  const [hydrated, setHydrated] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedColumn, setSelectedColumn] = useState<Column | null>(null);

  // On mount, set hydrated and initialize activeTab from hash
  useEffect(() => {
    setHydrated(true);
    const hash = window.location.hash.slice(1);
    if (hash && validTabIds.includes(hash)) {
      setActiveTab(hash as Exclude<typeof activeTab, null>);
    } else {
      setActiveTab('study-materials');
    }
  }, []);

  // Sync hash with activeTab whenever it changes (but not on initial mount)
  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      if (activeTab) {
        window.history.replaceState(null, '', `#${activeTab}`);
      }
    }
  }, [activeTab]);

  // Handle hash navigation when hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash && validTabIds.includes(hash)) {
        setActiveTab(hash as Exclude<typeof activeTab, null>);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [validTabIds]);

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
          {/* Tab Navigation (render only when activeTab is set) */}
          {activeTab && (
            <div className="sticky top-[72px] md:top-[119px] z-30 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md py-4 mb-8 -mt-2 shadow-md overflow-visible">
              <div className="w-full overflow-x-auto overflow-y-visible px-4 sm:px-6 lg:px-8">
                <div className="flex space-x-2 pb-2 min-w-max overflow-visible">
                  {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as Exclude<typeof activeTab, null>)}
                    className={`px-6 py-3 rounded-full font-medium whitespace-nowrap transition-all duration-200 ${
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
          )}
          {/* Spacer between header tabs and content with dotted lines */}
          <div aria-hidden="true" className="py-8 sm:py-10">
            <DottedLines />
          </div>

          {/* Tab Content - gated until hydrated and activeTab set to prevent SSR/CSR mismatch */}
          {hydrated && activeTab && (
            <div>
              {activeTab === 'study-materials' && <StudyMaterialsTab />}
              {activeTab === 'ncerts' && <NCERTsTab />}
              {activeTab === 'strategy' && <StrategyTab openArticle={setSelectedArticle} />}
              {activeTab === 'pyq' && <PYQTab />}
              {activeTab === 'videos' && <VideosTab />}
              {activeTab === 'faculty-columns' && <FacultyColumnsTab openColumn={setSelectedColumn} />}
              {activeTab === 'faq' && <FAQTab />}
              {activeTab === 'community-forum' && <CommunityForumTab />}
            </div>
          )}
        </div>
      </section>

      {/* Strategy Article Detail Popup */}
      <StrategyPopup selectedArticle={selectedArticle} onClose={() => setSelectedArticle(null)} />

      {/* Faculty Column Detail Popup */}
      <FacultyColumnPopup selectedColumn={selectedColumn} onClose={() => setSelectedColumn(null)} />

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
        <span className="px-2.5 py-1 sm:px-3 sm:py-1 md:px-4 md:py-1.5 bg-[#d4c4b0] text-[#4a4035] dark:bg-[#F2C94C] dark:text-[#1a2942] rounded-full text-[10px] sm:text-xs font-medium shadow-[0_2px_8px_rgba(0,0,0,0.12)]">
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
            </div>

            {/* Content */}
            <div className="p-5">
              <p className="text-xs font-bold text-orange-600 dark:text-orange-400 mb-2 uppercase tracking-wide">
                {ncert.title}
              </p>
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

function StrategyTab({ openArticle }: { openArticle: (article: Article) => void }) {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const articles = [
    { 
      title: 'How to Prepare for UPSC Prelims in 6 Months', 
      author: 'Dr. Rajesh Kumar', 
      date: '2025-11-01', 
      readTime: '8 min',
      category: 'Prelims Strategy',
      excerpt: 'A comprehensive 6-month roadmap to crack UPSC Prelims with strategic planning and focused preparation.',
      content: 'Preparing for UPSC Prelims in 6 months requires disciplined planning and execution. Key strategies include: Month 1-2: Complete NCERT readings (6-12) with note-making, focus on building conceptual clarity. Month 3-4: Subject-wise revision with standard reference books, integrate current affairs daily. Month 5: Intensive test series practice, identify weak areas and work on them. Month 6: Revision and practice, previous year papers analysis, mock tests. Important tips: Follow 80-20 rule, focus on high-weightage topics, maintain consistency in current affairs, practice MCQs regularly, develop elimination techniques for negative marking.'
    },
    { 
      title: 'Answer Writing Strategy for Mains', 
      author: 'Prof. Anjali Sharma', 
      date: '2025-10-28', 
      readTime: '10 min',
      category: 'Mains Strategy',
      excerpt: 'Master the art of structured answer writing to score high in UPSC Mains examination.',
      content: 'Effective answer writing is crucial for Mains success. Key elements: Introduction (10%): Hook the examiner, define key terms, mention dimensions. Body (75%): Use subheadings, bullet points, diagrams/flowcharts, maintain logical flow, provide examples and case studies, show multiple perspectives, link theory with current developments. Conclusion (15%): Summarize key points, suggest way forward, end with impact statement. Additional tips: Time management (allocate 10-12 minutes per answer), presentation matters (neat handwriting, proper spacing), use of keywords from question, balance between content and presentation, regular practice with peer/mentor evaluation.'
    },
    { 
      title: 'Mastering Current Affairs for UPSC', 
      author: 'Dr. Amit Verma', 
      date: '2025-10-25', 
      readTime: '12 min',
      category: 'Current Affairs',
      excerpt: 'Strategic approach to stay updated with current affairs and integrate them effectively in your preparation.',
      content: 'Current Affairs integration is essential for both Prelims and Mains. Effective strategy: Daily: Read newspaper (The Hindu/Indian Express), note important issues, editorials, government schemes. Weekly: Consolidate notes, connect with static portions, practice MCQs. Monthly: Revise consolidated notes, prepare monthly compilations, focus on recurring themes. Sources: Newspapers, PIB releases, Yojana, Kurukshetra magazines, reliable online sources. Important areas: Government schemes and policies, International relations developments, Economic indicators and surveys, Science & technology breakthroughs, Environmental issues, Social justice initiatives. Integration technique: Link current events with syllabus topics, prepare issue-based notes, maintain separate registers for different subjects.'
    },
    { 
      title: 'Optional Subject Selection Guide', 
      author: 'Ms. Priya Singh', 
      date: '2025-10-20', 
      readTime: '6 min',
      category: 'Optional Strategy',
      excerpt: 'Comprehensive guide to choosing the right optional subject that aligns with your strengths and interests.',
      content: 'Choosing the right optional can be a game-changer. Selection criteria: Background and interest: Academic background, genuine interest in subject. Availability of resources: Quality coaching, study material, guidance. Scoring potential: Previous years toppers choices, scoring trends. Overlap with GS: Synergy with General Studies papers. Popular optionals: Geography (high scoring, overlap with GS), Public Administration (relevant for aspirants), Sociology (scoring, manageable syllabus), History (extensive but predictable), Anthropology (scientific, scoring), PSIR (overlap with GS-II). Decision factors: Give mock tests in multiple subjects, consult seniors/toppers, evaluate your commitment, consider time available. Remember: Optional can fetch 400-500 marks, choose wisely but dont overthink.'
    },
    { 
      title: 'Time Management Tips for UPSC Preparation', 
      author: 'Dr. Vikram Patel', 
      date: '2025-10-15', 
      readTime: '9 min',
      category: 'Study Planning',
      excerpt: 'Effective time management techniques to optimize your UPSC preparation and maintain work-life balance.',
      content: 'Time management is critical for long-term preparation. Effective strategies: Daily schedule: Wake up early (5-6 AM), 8-10 hours focused study, include breaks every 90 minutes, physical exercise (30-45 minutes), adequate sleep (6-7 hours). Weekly planning: Allocate subject-wise time, keep one day for revision, include current affairs daily. Monthly targets: Set monthly goals, track progress, adjust strategy based on performance. Productivity tips: Eliminate distractions (social media, phone), use Pomodoro technique, prioritize high-weightage topics, quality over quantity, active learning methods (write, discuss, teach). Balance: Take weekly offs, pursue hobbies, maintain social connections, avoid burnout. Remember: Its a marathon, not a sprint. Consistency beats intensity.'
    },
    { 
      title: 'How to Score 300+ in UPSC Mains', 
      author: 'Prof. Anjali Sharma', 
      date: '2025-10-10', 
      readTime: '15 min',
      category: 'Mains Strategy',
      excerpt: 'Proven strategies and techniques to achieve 300+ score in UPSC Mains examination.',
      content: 'Scoring 300+ in Mains requires strategic preparation and execution. Key pillars: Content Quality: Deep conceptual understanding, diverse perspectives, factual accuracy, latest data and examples. Presentation: Structured answers with intro-body-conclusion, effective use of diagrams/flowcharts, neat handwriting and spacing, proper use of headings and subheadings. Answer Writing Skills: Address all dimensions of question, maintain word limit, time management, relevant examples and case studies. Subject-wise strategy: Essay: Choose wisely, outline before writing, philosophical depth. GS-I: Focus on social issues, diverse viewpoints, map work. GS-II: Governance, polity, IR - link theory with current affairs. GS-III: Economy, environment, security - data-driven answers. GS-IV: Ethics - real-life examples, balanced approach. Optional: In-depth preparation, previous year analysis. Practice: Daily answer writing, peer review, mentor evaluation. Mock tests: Simulate exam conditions, improve speed and accuracy.'
    },
    { 
      title: 'Revision Strategy for Last 3 Months', 
      author: 'Dr. Rajesh Kumar', 
      date: '2025-10-05', 
      readTime: '11 min',
      category: 'Revision',
      excerpt: 'Comprehensive revision plan for the final 3 months before UPSC examination.',
      content: 'Last 3 months are crucial for consolidation and revision. Month-wise strategy: Month 1 (90-60 days): Complete first round of revision of all subjects, focus on weak areas, continue current affairs, start test series. Month 2 (60-30 days): Second round of quick revision using notes, intensive test series practice, error analysis and improvement, maintain current affairs. Month 3 (30-0 days): Third round of rapid revision, focus on high-weightage topics, previous year papers, maintain calm and confidence. Revision techniques: Use prepared notes, flashcards, Mind maps and diagrams, Teach/discuss concepts, Group study sessions (limited). Test series: Join reliable test series, analyze each test thoroughly, focus on time management, work on weak areas. Dont do: Start new topics, join new test series, compare with others, compromise on sleep/health. Maintain momentum, stay positive, trust your preparation.'
    },
    { 
      title: 'Interview Preparation Complete Guide', 
      author: 'Ms. Priya Singh', 
      date: '2025-09-28', 
      readTime: '14 min',
      category: 'Interview',
      excerpt: 'Complete guide to excel in UPSC personality test with confidence and authenticity.',
      content: 'UPSC Interview (Personality Test) is the final and crucial stage. Preparation strategy: DAF Analysis: Thoroughly analyze your Detailed Application Form, prepare for questions on hobbies, education, work experience, hometown. Current Affairs: Depth in national and international issues, opinions on contemporary topics, awareness of government initiatives. Optional Subject: Be ready for depth questions, connect with current developments. Core Areas: Ethics and values, administrative decision-making, problem-solving abilities, social awareness. Mock Interviews: Multiple mocks with different panels, feedback incorporation, body language improvement. Presentation: Dress formally but comfortably, maintain eye contact, clear communication, confident body language, honesty is key. Common Questions: Tell us about yourself, Why civil services?, Opinion on current issues, Situational/ethical dilemmas, Hobbies and interests (depth expected). Dos: Be yourself, think before answering, admit if you dont know, stay calm and composed. Donts: Be overconfident, argue with panel, give bookish answers, show nervousness. Remember: Panel assesses your suitability for civil services, not just knowledge.'
    },
    { 
      title: 'Daily Routine for UPSC Aspirants', 
      author: 'Dr. Amit Verma', 
      date: '2025-09-20', 
      readTime: '7 min',
      category: 'Study Planning',
      excerpt: 'Ideal daily routine to maximize productivity and maintain consistency in UPSC preparation.',
      content: 'A well-structured daily routine ensures consistency and productivity. Sample routine: 5:30 AM: Wake up, freshen up. 6:00-7:00 AM: Newspaper reading, note important issues. 7:00-8:00 AM: Morning walk/exercise, breakfast. 8:00-12:00 PM: Core study session (subject 1) with breaks. 12:00-1:00 PM: Lunch, short rest. 1:00-5:00 PM: Core study session (subject 2) with breaks. 5:00-6:00 PM: Current affairs (magazines, online sources). 6:00-7:00 PM: Break, physical activity, hobbies. 7:00-9:00 PM: Revision/test practice/answer writing. 9:00-10:00 PM: Dinner, family time. 10:00-11:00 PM: Light reading, planning next day. 11:00 PM: Sleep. Customization: Adjust timing based on your productivity peaks, working professionals: utilize early morning/late evening, keep one flexible slot for unexpected tasks. Key principles: Early start, dedicated study blocks, regular breaks, physical activity, adequate sleep (6-7 hours), consistency over intensity. Remember: Stick to routine for at least 21 days to form habit.'
    },
    { 
      title: 'How to Make Effective Notes', 
      author: 'Dr. Neha Reddy', 
      date: '2025-09-15', 
      readTime: '10 min',
      category: 'Study Techniques',
      excerpt: 'Techniques and methods to create concise, effective notes for quick revision.',
      content: 'Effective note-making is crucial for revision and retention. Note-making principles: Conciseness: Write only key points, avoid lengthy sentences, use abbreviations. Structured format: Use headings, subheadings, bullet points, numbering. Visual aids: Include diagrams, flowcharts, mind maps, tables. Highlighting: Use colors/markers for emphasis, underline important terms. Personal touch: Add your understanding, examples, connections. Note-making methods: Cornell Method: Divide page into cues, notes, summary sections. Outline Method: Hierarchical structure with main topics and subtopics. Mapping Method: Visual representation with central idea and branches. Charting Method: Compare and contrast information in table format. Subject-wise approach: History: Timeline-based, event-cause-effect. Geography: Map-based, data tables. Polity: Topic-wise, article-wise. Economy: Concept-theme-example format. Current Affairs: Issue-based, monthly compilations. Digital vs Physical: Physical notes: Better retention, easy to revise. Digital notes: Easy to edit, portable, searchable. Revision: Create different levels (detailed, medium, quick revision notes). Regular updates: Add new information, examples. Remember: Notes are personal, develop your own style that works for you.'
    },
    { 
      title: 'Essay Writing Masterclass', 
      author: 'Prof. Suresh Gupta', 
      date: '2025-09-10', 
      readTime: '13 min',
      category: 'Essay',
      excerpt: 'Master the art of essay writing with structure, content, and presentation techniques.',
      content: 'Essay paper can be a game-changer with 250 marks. Essay selection: Read all topics carefully (5-10 minutes), choose topic you can write 1000-1200 words on, prefer abstract over concrete topics, ensure you have diverse content. Essay structure: Introduction (100-150 words): Hook/quote, define key terms, outline dimensions, thesis statement. Body (700-900 words): 4-5 paragraphs, each discussing one dimension, use subheadings, examples, quotes, data, logical flow, diverse perspectives (social, economic, political, ethical). Conclusion (100-150 words): Summarize key arguments, balanced view, way forward, impactful ending. Content enrichment: Use quotes (philosophers, leaders, scriptures), examples (historical, contemporary, personal), data and facts, comparative analysis, connect with national/global context. Presentation: Clear handwriting, proper spacing, paragraphing, underline headings, avoid overwriting, maintain word limit. Types of essays: Philosophical, social, economic, political, technological. Practice: Write 2-3 essays per week, get evaluated, read quality essays, develop your unique style. Common mistakes: Going off-topic, one-sided arguments, factual errors, poor presentation, exceeding word limit. Remember: Essay reflects your personality, knowledge, and perspective. Showcase analytical ability and balanced thinking.'
    },
    { 
      title: 'Tackling Negative Marking in Prelims', 
      author: 'Dr. Vikram Patel', 
      date: '2025-09-05', 
      readTime: '8 min',
      category: 'Prelims Strategy',
      excerpt: 'Smart strategies to handle negative marking and maximize your Prelims score.',
      content: 'Negative marking (1/3 for each wrong answer) requires strategic approach. Understanding: Each correct answer: +2 marks, each wrong answer: -0.66 marks, to break even: accuracy needed is 25%. Strategies: Elimination technique: Eliminate obviously wrong options, if you can eliminate 2 options, attempt the question, if confident between 2 options, go with stronger reasoning. Confidence levels: Very confident (90%+): Must attempt. Confident (70-90%): Attempt after elimination. Moderate (50-70%): Attempt only if you can eliminate 2 options. Low confidence (<50%): Skip. Question selection: Attempt questions you know first, mark doubtful questions for review, use remaining time for intelligent guessing. Calculated risk: GS Paper 1: Aim for 60-70 attempts with 85%+ accuracy. CSAT: Aim for 65-70 attempts with 80%+ accuracy. Risk profiles: Conservative: High accuracy, fewer attempts (safe for those already in comfort zone). Moderate: Balanced approach (recommended for most). Aggressive: More attempts, slightly lower accuracy (for those needing high scores). Practice: Take multiple mock tests, analyze your risk profile, improve accuracy through practice. Remember: Quality over quantity. Its better to attempt 65 questions with 90% accuracy than 80 questions with 75% accuracy. Develop your elimination skills and trust your preparation.'
    },
  ];



  return (
    <div className="space-y-4">
      {articles.map((article, index) => (
        <div 
          key={index} 
          ref={(el) => { cardRefs.current[index] = el; }}
          className="group relative bg-white dark:bg-white backdrop-blur-sm rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-visible border border-orange-100"
        >
          {/* Decorative accent bar */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-400 to-orange-600 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />
          
          <div className="p-6 pl-8">
            {/* Category badge */}
            <div className="flex items-start justify-between mb-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 text-orange-600 dark:text-orange-400 border border-orange-200/50 dark:border-orange-700/50">
                <svg className="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
                {article.category}
              </span>
              <span className="flex items-center text-xs font-medium text-black/70 bg-orange-50 px-3 py-1 rounded-full">
                <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {article.readTime}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold mb-3 text-black group-hover:text-orange-600 transition-colors cursor-pointer line-clamp-2">
              {article.title}
            </h3>

            {/* Excerpt */}
            {article.excerpt && (
              <p className="text-sm text-black/80 mb-4 line-clamp-2 leading-relaxed">
                {article.excerpt}
              </p>
            )}

            {/* Author info and CTA */}
              <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="relative w-11 h-11">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                    {article.author.charAt(0)}
                  </div>
                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-white z-10" />
                </div>
                <div className="ml-3">
                  <div className="text-sm font-semibold text-black">{article.author}</div>
                  <div className="text-xs text-black/60 flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {article.date}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => openArticle(article)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Read Full Article
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>
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
              <div className="bg-gradient-to-r from-orange-400 via-yellow-400 to-yellow-500 text-white px-8 py-3 rounded-lg shadow-lg font-bold text-xl relative z-10">
                {p.year} {p.stage}
              </div>
              <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-br from-yellow-500 to-yellow-600 transform translate-x-2 -translate-y-2 rounded-tr-lg"></div>
              <div className="absolute right-2 top-2 text-3xl">{p.icon}</div>
            </div>

            {/* Content */}
            <div className="relative z-10 mb-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="text-2xl opacity-60">
                  {p.stage === 'Prelims' ? '📚' : '📝'}
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
                <div className="absolute bottom-4 right-4 bg-black/70 px-3 py-1 rounded text-sm font-semibold">
                  <span className="!text-white">{v.duration}</span>
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
              <p className="text-sm text-amber-800 mb-2">
                <strong style={{ fontSize: '18px', color: '#1f2937', display: 'block', marginBottom: '10px', fontWeight: '700', lineHeight: '1.4' }}>{v.title}</strong>
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

function FacultyColumnsTab({ openColumn }: { openColumn: (column: Column) => void }) {

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



  return (
    <div id="faculty-columns" className="space-y-6">
      {columns.map((column, index) => (
        <div key={index} className="bg-white/80 dark:bg-[#1a2942]/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border dark:border-[#D4AF37]/20">
          <span className="inline-block px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-full text-sm font-medium mb-3">
            {column.category}
          </span>
          <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white hover:text-orange-500 dark:hover:text-[#F2C94C] transition-colors cursor-pointer">
            {column.title}
          </h3>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 dark:from-[#D4AF37] dark:to-[#F2C94C] flex items-center justify-center text-white dark:text-[#1a2942] font-semibold mr-3">
              {column.author.charAt(0)}
            </div>
            <div>
              <div className="font-medium text-gray-900 dark:text-white">{column.author}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">{column.date}</div>
            </div>
          </div>
          {column.excerpt && (
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              {column.excerpt}
            </p>
          )}
          <div
            onClick={() => openColumn(column)}
            className="text-orange-500 dark:text-[#F2C94C] hover:text-orange-600 dark:hover:text-[#FFD700] font-medium text-sm flex items-center transition-colors cursor-pointer"
          >
            Read More
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
}

function FAQTab() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'How can I start preparing for UPSC CSE?',
      answer: 'Begin with understanding the exam pattern and syllabus. Start with NCERT books for basic foundation, focus on current affairs, and maintain consistency. Allocate at least 4-5 hours daily for structured preparation. Join coaching classes or online courses if needed for guidance. Remember, quality of study matters more than quantity.',
      category: 'Preparation'
    },
    {
      question: 'What is the age limit for UPSC CSE?',
      answer: 'The general age limit is 21-32 years. Reserved category candidates get age relaxation: SC/ST - 5 years relaxation (up to 37 years), OBC - 3 years relaxation (up to 35 years), PwD - 15 years relaxation. PWD candidates also get additional relaxation of 10 years.',
      category: 'Eligibility'
    },
    {
      question: 'How many times can I attempt UPSC CSE?',
      answer: 'For General candidates: 6 attempts or until age 32, whichever comes first. For OBC candidates: 9 attempts or until age 35, whichever comes first. For SC/ST candidates: Unlimited attempts until age 37. The number of attempts is crucial, so plan your preparation strategically.',
      category: 'Eligibility'
    },
    {
      question: 'What is the best optional subject for UPSC CSE?',
      answer: 'The best optional is one that interests you personally and matches your educational background. Popular choices: History, Geography, Political Science, Law, Physics, Chemistry, etc. Choose based on: Your comfort level, Availability of quality study material, Coaching guidance in that subject, and Your undergraduate specialization.',
      category: 'Strategy'
    },
    {
      question: 'How important is current affairs for UPSC?',
      answer: 'Current affairs is extremely important and carries significant weightage across all stages of UPSC. For Prelims: ~20-30% questions. For Mains: Integrated throughout GS papers. For Interview: 30-40% questions. Stay updated with daily news, maintain notes, and connect current events with static subjects.',
      category: 'Preparation'
    },
    {
      question: 'Is coaching necessary for UPSC preparation?',
      answer: 'Coaching is not mandatory but can be beneficial for: Structured guidance and proper direction, Expert insights and exam-oriented approach, Regular mock tests and performance tracking, Discipline and accountability. Many successful candidates have prepared without coaching using quality study materials and self-discipline.',
      category: 'Preparation'
    },
    {
      question: 'What should be my study schedule?',
      answer: 'Typical daily schedule: Morning (3 hours) - Core subject study, Afternoon (2 hours) - Current affairs and newspaper reading, Evening (1.5 hours) - Revision and note-making, Night (1 hour) - Mock tests or practice. Adjust based on your rhythm. Break this into: 60% static subjects, 30% current affairs, 10% mock tests.',
      category: 'Strategy'
    },
    {
      question: 'How should I approach UPSC Mains answer writing?',
      answer: 'Key points: Structure answers clearly with introduction and conclusion, Use headings and subheadings for clarity, Support answers with examples and data, Keep to time limit (6 minutes per answer), Focus on keyword-based answering, Add diagrams/maps where relevant. Practice regularly to develop command and speed.',
      category: 'Preparation'
    },
    {
      question: 'What are the best sources for current affairs?',
      answer: 'Recommended sources: Daily newspapers (Indian Express, Hindu, DTE), News channels (DD News, Lok Sabha TV), Weekly magazines (Yojana, Kurukshetra), Online platforms (PIB, Press Information Bureau), Mobile apps (News24, PIB news). Maintain topic-wise current affairs notes for quick revision.',
      category: 'Resources'
    },
    {
      question: 'How do I manage stress during UPSC preparation?',
      answer: 'Stress management tips: Maintain regular exercise and yoga, Take short breaks during study sessions, Avoid comparison with other candidates, Focus on your own progress, Engage in hobbies and recreational activities, Practice meditation or mindfulness, Ensure adequate sleep (7-8 hours), Maintain a support system of friends and mentors.',
      category: 'Mental Health'
    },
    {
      question: 'What documents are required for UPSC interview?',
      answer: 'Required documents: 10th & 12th certificates and mark sheets, Bachelor\'s degree certificate and mark sheets, Caste/OBC/EWS certificate (if applicable), PwD certificate (if applicable), Character certificate from a gazetted officer, Birth certificate, Recent passport-size photographs. Carry both originals and self-attested photocopies.',
      category: 'Interview'
    },
    {
      question: 'How should I prepare for the personality test (interview)?',
      answer: 'Interview preparation: Stay updated with current affairs, Develop general knowledge and analytical skills, Practice mock interviews with mentors, Work on communication and confidence, Prepare answers on your background and motivation, Develop opinions on contemporary issues, Be authentic and avoid memorized answers, Mock interviews are crucial for building confidence.',
      category: 'Interview'
    },
  ];

  return (
    <div id="faq" className="space-y-3">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <button
            onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
            className="w-full px-6 py-5 flex items-start justify-between text-left hover:bg-orange-50/50 dark:hover:bg-orange-900/10 transition-colors"
          >
            <div className="flex-1 pr-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white leading-relaxed">
                {faq.question}
              </h3>
              <span className="inline-block mt-2 px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full text-xs font-medium">
                {faq.category}
              </span>
            </div>
            <div className="flex-shrink-0 ml-4">
              <svg
                className={`w-5 h-5 text-orange-500 transition-transform duration-300 ${
                  expandedIndex === index ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </button>

          {/* Expanded Content */}
          {expandedIndex === index && (
            <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-5 bg-gradient-to-b from-transparent to-orange-50/30 dark:to-orange-900/5">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          )}
        </div>
      ))}

      {/* Additional Help Section */}
      <div className="mt-8 p-6 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 dark:from-orange-900/20 dark:to-yellow-900/20 rounded-2xl border border-orange-200/50 dark:border-orange-800/50">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
          <svg className="w-5 h-5 mr-2 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zm-11-1a1 1 0 11-2 0 1 1 0 012 0zM8 8a1 1 0 000 2h6a1 1 0 100-2H8zm0 4a1 1 0 100 2h3a1 1 0 100-2H8z" clipRule="evenodd" />
          </svg>
          Can't Find Your Answer?
        </h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Have more questions? Connect with our community forum to ask questions, share experiences, and get support from fellow UPSC aspirants and experienced mentors.
        </p>
      </div>
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

// Strategy Article Popup Component
function StrategyPopup({ selectedArticle, onClose }: { selectedArticle: Article | null, onClose: () => void }) {

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (selectedArticle !== null) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [selectedArticle, onClose]);

  if (selectedArticle === null) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9999] flex items-center justify-center p-2 sm:p-3 animate-fadeIn"
      onClick={onClose}
      style={{ paddingTop: '80px', paddingBottom: '20px' }}
    >
      <div 
        className="bg-white dark:bg-gray-900 rounded-xl max-w-2xl w-full shadow-2xl border-2 border-orange-500 animate-slideUp relative"
        onClick={(e) => e.stopPropagation()}
        style={{ maxHeight: 'calc(100vh - 100px)' }}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 z-20 w-9 h-9 bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-lg transition-all duration-300 hover:rotate-90 hover:scale-110 flex items-center justify-center"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="overflow-y-auto custom-scrollbar" style={{ maxHeight: 'calc(100vh - 100px)' }}>
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 text-white rounded-t-xl">
            <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-semibold mb-2">
              {selectedArticle.category}
            </span>
            <h3 className="text-xl font-bold mb-2">
              {selectedArticle.title}
            </h3>
            <div className="flex items-center text-sm">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold mr-2">
                {selectedArticle.author.charAt(0)}
              </div>
              <div>
                <div className="font-medium">{selectedArticle.author}</div>
                <div className="text-xs opacity-90">{selectedArticle.date} • {selectedArticle.readTime}</div>
              </div>
            </div>
          </div>

          <div className="p-6">
            {selectedArticle.excerpt && (
              <div className="bg-orange-50 dark:bg-orange-900/10 rounded-lg p-4 mb-6 border-l-4 border-orange-500">
                <p className="text-gray-700 dark:text-gray-300 font-medium italic">
                  {selectedArticle.excerpt}
                </p>
              </div>
            )}
            <div className="prose max-w-none">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {selectedArticle.content}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Faculty Column Popup Component  
function FacultyColumnPopup({ selectedColumn, onClose }: { selectedColumn: Column | null, onClose: () => void }) {

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (selectedColumn !== null) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [selectedColumn, onClose]);

  if (selectedColumn === null) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9999] flex items-center justify-center p-2 sm:p-3 animate-fadeIn"
      onClick={onClose}
      style={{ paddingTop: '80px', paddingBottom: '20px' }}
    >
      <div 
        className="bg-white dark:bg-gray-900 rounded-xl max-w-2xl w-full shadow-2xl border-2 border-orange-500 animate-slideUp relative"
        onClick={(e) => e.stopPropagation()}
        style={{ maxHeight: 'calc(100vh - 100px)' }}
        role="dialog"
        aria-modal="true"
        aria-label={selectedColumn.title}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 z-20 w-9 h-9 bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-lg transition-all duration-300 hover:rotate-90 hover:scale-110 flex items-center justify-center"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="overflow-y-auto custom-scrollbar" style={{ maxHeight: 'calc(100vh - 100px)' }}>
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 text-white rounded-t-xl">
            <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-semibold mb-2">
              {selectedColumn.category}
            </span>
            <h3 className="text-xl font-bold mb-2 leading-tight">
              {selectedColumn.title}
            </h3>
            <div className="flex items-center text-sm">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold mr-2">
                {selectedColumn.author.charAt(0)}
              </div>
              <div>
                <div className="font-medium">{selectedColumn.author}</div>
                <div className="text-xs opacity-90">{selectedColumn.date}</div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              {selectedColumn.content}
            </p>
            {selectedColumn.topics && selectedColumn.topics.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Key Topics Covered:</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedColumn.topics.map((topic, i) => (
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
  );
}