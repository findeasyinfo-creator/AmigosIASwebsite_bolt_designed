'use client'
import React, { useState, useEffect, useLayoutEffect } from 'react';
import Link from 'next/link';
import CommunityForum from '@/components/CommunityForum';
import { useResources, Resource } from '@/hooks/useResources';
import { useBlogPosts, BlogPost } from '@/hooks/useBlogPosts';

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

  const [activeTab, setActiveTab] = useState('study-materials');

  // Use useLayoutEffect to sync hash before paint (client-side only)
  useLayoutEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash && validTabIds.includes(hash)) {
      setActiveTab(hash);
    }
  }, []);

  // Sync hash with activeTab whenever it changes
  useEffect(() => {
    window.history.replaceState(null, '', `#${activeTab}`);
  }, [activeTab]);

  // Handle hash navigation when hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash && validTabIds.includes(hash)) {
        setActiveTab(hash);
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
            {activeTab === 'faq' && <FAQTab />}
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
  const { resources, loading } = useResources({ category: 'STUDY_MATERIAL' });

  // Fallback data when no API data
  const fallbackMaterials = [
    { title: 'Indian Polity Complete Notes', subject: 'Polity', year: 2025, pages: '250 pages' },
    { title: 'Modern Indian History', subject: 'History', year: 2025, pages: '180 pages' },
    { title: 'Indian Economy Handbook', subject: 'Economy', year: 2025, pages: '320 pages' },
    { title: 'Geography and Environment', subject: 'Geography', year: 2025, pages: '210 pages' },
    { title: 'International Relations Notes', subject: 'IR', year: 2025, pages: '160 pages' },
    { title: 'Science and Technology', subject: 'Science', year: 2025, pages: '140 pages' },
  ];

  // Convert API resources to material format
  const materials = resources.length > 0
    ? resources.map((r) => ({
        id: r.id,
        title: r.title,
        subject: r.subject,
        year: new Date().getFullYear(),
        pages: r.pages || '',
        fileUrl: r.fileUrl,
        thumbnail: r.thumbnail,
      }))
    : fallbackMaterials;

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-64 rounded-2xl bg-gray-100 dark:bg-gray-800 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
      {materials.map((material, index) => (
        <LazyStudyCard key={material.title + index} material={material} index={index} />
      ))}
    </div>
  );
}

// Lazy loaded card component using IntersectionObserver
function LazyStudyCard({ material, index }: { material: { title: string; subject: string; year: number; pages: string; fileUrl?: string; thumbnail?: string }; index: number }) {
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

  // Use thumbnail from API if available, otherwise generate
  const imageUrl = material.thumbnail
    ? material.thumbnail
    : index === 0
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
      {material.fileUrl ? (
        <a
          href={material.fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-gradient-to-r from-[#ff6a2b] to-[#ff8347] hover:from-[#ff7a3f] hover:to-[#ff8f57] text-white font-bold py-2 sm:py-2.5 md:py-3.5 px-4 sm:px-5 md:px-6 rounded-full transition-all duration-200 text-xs sm:text-sm md:text-base shadow-[inset_0_3px_8px_rgba(255,255,255,0.5),0_10px_22px_rgba(255,106,43,0.38)] flex items-center justify-center gap-1.5 sm:gap-2"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
          </svg>
          <span className="hidden xs:inline sm:inline">Download PDF</span>
          <span className="xs:hidden sm:hidden">Download</span>
        </a>
      ) : (
        <button className="w-full bg-gradient-to-r from-[#ff6a2b] to-[#ff8347] hover:from-[#ff7a3f] hover:to-[#ff8f57] text-white font-bold py-2 sm:py-2.5 md:py-3.5 px-4 sm:px-5 md:px-6 rounded-full transition-all duration-200 text-xs sm:text-sm md:text-base shadow-[inset_0_3px_8px_rgba(255,255,255,0.5),0_10px_22px_rgba(255,106,43,0.38)] flex items-center justify-center gap-1.5 sm:gap-2 opacity-70 cursor-not-allowed">
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
          </svg>
          <span className="hidden xs:inline sm:inline">Coming Soon</span>
          <span className="xs:hidden sm:hidden">Soon</span>
        </button>
      )}
    </div>
  );
}

function NCERTsTab() {
  const [selectedSubject, setSelectedSubject] = useState('all');
  const { resources, loading } = useResources({ category: 'NCERT' });

  const subjects = [
    { id: 'all', name: 'All Subjects' },
    { id: 'History', name: 'History' },
    { id: 'Geography', name: 'Geography' },
    { id: 'Polity', name: 'Polity' },
    { id: 'Economics', name: 'Economics' },
    { id: 'Science', name: 'Science' },
    { id: 'Environment', name: 'Environment' },
  ];

  // Fallback data
  const fallbackNCERTs = [
    { title: 'NCERT Class 6 - History (Our Pasts - I)', subject: 'History', classLevel: 'Class 6', pages: '186 pages', description: 'Introduction to ancient civilizations', image: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=400&q=80' },
    { title: 'NCERT Class 6 - Geography (The Earth: Our Habitat)', subject: 'Geography', classLevel: 'Class 6', pages: '142 pages', description: 'Understanding Earth', image: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=400&q=80' },
  ];

  // Map API data to display format
  const ncerts = resources.length > 0
    ? resources.map((r) => ({
        id: r.id,
        title: r.title,
        subject: r.subject,
        classLevel: r.classLevel || '',
        pages: r.pages || '',
        description: r.description || '',
        image: r.thumbnail || 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=400&q=80',
        fileUrl: r.fileUrl,
      }))
    : fallbackNCERTs;

  const filteredNCERTs = selectedSubject === 'all'
    ? ncerts
    : ncerts.filter(ncert => ncert.subject.toLowerCase() === selectedSubject.toLowerCase());

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-80 rounded-2xl bg-gray-100 dark:bg-gray-800 animate-pulse" />
        ))}
      </div>
    );
  }

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
                {ncert.classLevel || 'NCERT'}
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
  const { posts, loading } = useBlogPosts({ category: 'STRATEGY' });

  // Fallback data
  const fallbackArticles: Array<{
    id?: string;
    title: string;
    author: string;
    authorImage?: string | null;
    date: string;
    readTime: string;
    excerpt?: string;
    slug: string;
    coverImage?: string | null;
  }> = [
    { title: 'How to Prepare for UPSC Prelims in 6 Months', author: 'Dr. Rajesh Kumar', date: '2025-11-01', readTime: '8 min', slug: '', excerpt: '' },
    { title: 'Answer Writing Strategy for Mains', author: 'Prof. Anjali Sharma', date: '2025-10-28', readTime: '10 min', slug: '', excerpt: '' },
    { title: 'Mastering Current Affairs for UPSC', author: 'Dr. Amit Verma', date: '2025-10-25', readTime: '12 min', slug: '', excerpt: '' },
  ];

  // Map API data to display format
  const articles = posts.length > 0
    ? posts.map((p) => ({
        id: p.id,
        title: p.title,
        author: p.author,
        authorImage: p.authorImage,
        date: p.publishedAt ? new Date(p.publishedAt).toLocaleDateString() : '',
        readTime: p.readTime || '',
        excerpt: p.excerpt,
        slug: p.slug,
        coverImage: p.coverImage,
      }))
    : fallbackArticles;

  if (loading) {
    return (
      <div className="space-y-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-40 rounded-2xl bg-gray-100 dark:bg-gray-800 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {articles.map((article, index) => (
        <div key={article.slug || index} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-semibold hover:text-orange-500 transition-colors cursor-pointer">
              {article.title}
            </h3>
            {article.readTime && (
              <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap ml-4">{article.readTime}</span>
            )}
          </div>
          {'excerpt' in article && article.excerpt && (
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">{article.excerpt}</p>
          )}
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
            {'authorImage' in article && article.authorImage ? (
              <img src={article.authorImage} alt={article.author} className="w-8 h-8 rounded-full mr-3 object-cover" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-semibold mr-3">
                {article.author.charAt(0)}
              </div>
            )}
            <div>
              <div className="font-medium">{article.author}</div>
              <div className="text-xs">{article.date}</div>
            </div>
          </div>
          <Link href={article.slug ? `/blog/${article.slug}` : '#'} className="text-orange-500 hover:text-orange-600 font-medium text-sm flex items-center">
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
  const { resources, loading } = useResources({ category: 'PYQ' });

  const filters = [
    { id: 'all', name: 'All Papers' },
    { id: 'prelims', name: 'Prelims' },
    { id: 'mains', name: 'Mains' },
  ];

  // Fallback data
  const fallbackPapers = [
    { year: '2024', stage: 'Prelims', title: 'General Studies Paper I', fileSize: '2.5 MB', icon: '🧭', stats: '100 Questions • 200 Marks' },
    { year: '2024', stage: 'Prelims', title: 'General Studies Paper II (CSAT)', fileSize: '2.2 MB', icon: '📊', stats: '80 Questions • 200 Marks' },
    { year: '2024', stage: 'Mains', title: 'Essay Paper', fileSize: '1.2 MB', icon: '📄', stats: '2 Essays • 250 Marks' },
  ];

  // Map API data to display format
  const papers = resources.length > 0
    ? resources.map((r) => ({
        id: r.id,
        year: r.year || '',
        stage: r.stage || '',
        title: r.title,
        fileSize: r.fileSize || '',
        fileUrl: r.fileUrl,
        icon: r.stage?.toLowerCase() === 'prelims' ? '🧭' : '📄',
        stats: r.description || r.title,
      }))
    : fallbackPapers;

  const filteredPapers = selectedFilter === 'all'
    ? papers
    : papers.filter(paper => paper.stage?.toLowerCase() === selectedFilter);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-32 rounded-2xl bg-gray-100 dark:bg-gray-800 animate-pulse" />
        ))}
      </div>
    );
  }

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
  const { posts, loading } = useBlogPosts({ category: 'FACULTY_COLUMN' });

  // Fallback data
  type ColumnType = {
    id?: string;
    title: string;
    author: string;
    authorImage?: string | null;
    date: string;
    category: string;
    excerpt: string;
    content: string;
    tags: string[];
    slug?: string;
  };
  const fallbackColumns: ColumnType[] = [
    {
      id: 'fallback-1',
      title: 'Understanding Constitutional Amendments',
      author: 'Dr. Amit Verma',
      date: '2025-11-02',
      category: 'Polity',
      excerpt: 'A comprehensive guide to constitutional amendments and their impact on Indian governance.',
      content: 'Constitutional amendments are crucial for adapting the Constitution to changing times.',
      tags: ['Constitution', 'Polity', 'Amendments']
    },
    {
      id: 'fallback-2',
      title: 'Global Economic Trends and India',
      author: 'Ms. Priya Singh',
      date: '2025-10-30',
      category: 'Economy',
      excerpt: 'Analyzing how global economic shifts impact Indian economy and policy decisions.',
      content: 'The global economy is undergoing significant transformations.',
      tags: ['Economy', 'Global Trade', 'India']
    },
  ];

  // Map API data to display format
  const columns = posts.length > 0
    ? posts.map((p) => ({
        id: p.id,
        title: p.title,
        author: p.author,
        authorImage: p.authorImage,
        date: p.publishedAt ? new Date(p.publishedAt).toLocaleDateString() : '',
        category: p.tags?.[0] || 'General',
        excerpt: p.excerpt,
        content: p.content,
        tags: p.tags || [],
        slug: p.slug,
      }))
    : fallbackColumns;

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

  if (loading) {
    return (
      <div className="space-y-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-48 rounded-2xl bg-gray-100 dark:bg-gray-800 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div id="faculty-columns" className="space-y-6">
      {columns.map((column, index) => (
        <div key={'id' in column ? column.id : index} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
          <span className="inline-block px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-full text-sm font-medium mb-3">
            {column.category}
          </span>
          <h3 className="text-xl font-semibold mb-3 hover:text-orange-500 transition-colors cursor-pointer">
            {column.title}
          </h3>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
            {'authorImage' in column && column.authorImage ? (
              <img src={column.authorImage} alt={column.author} className="w-10 h-10 rounded-full mr-3 object-cover" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-semibold mr-3">
                {column.author.charAt(0)}
              </div>
            )}
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
          {'slug' in column && column.slug ? (
            <Link
              href={`/blog/${column.slug}`}
              className="text-orange-500 hover:text-orange-600 font-medium text-sm flex items-center transition-colors"
            >
              Read More
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ) : (
            <button
              onClick={() => setSelectedColumn(index)}
              className="text-orange-500 hover:text-orange-600 font-medium text-sm flex items-center transition-colors"
            >
              Read More
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
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
                
                {columns[selectedColumn].tags && columns[selectedColumn].tags.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-3">Key Topics Covered:</h3>
                    <div className="flex flex-wrap gap-2">
                      {columns[selectedColumn].tags.map((tag: string, i: number) => (
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