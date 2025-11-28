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
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tab Navigation */}
          <div className="mb-8 overflow-x-auto">
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {materials.map((material, index) => (
        <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-600">
          <div className="flex items-start justify-between mb-4">
            <div className="w-16 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-full text-xs font-medium">
              {material.subject}
            </span>
          </div>
          <h3 className="text-lg font-semibold mb-2">{material.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{material.pages} • {material.year}</p>
          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 text-sm">
            Download PDF
          </button>
        </div>
      ))}
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
    { year: 2024, stage: 'Prelims', title: 'General Studies Paper I', stats: '100 Questions • 2.5 MB' },
    { year: 2024, stage: 'Mains', title: 'Essay Paper', stats: '2 Questions • 1.2 MB' },
    { year: 2023, stage: 'Prelims', title: 'General Studies Paper I', stats: '100 Questions • 2.4 MB' },
  ];

  return (
    <div id="pyq" className="py-8" aria-labelledby="pyq-heading">
      <h2 id="pyq-heading" className="text-2xl font-bold mb-8 text-center text-gray-900 dark:text-white">Previous Year Papers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {papers.map((p, i) => (
          <div key={`${p.year}-${p.stage}-${i}`} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border focus-within:ring-2 focus-within:ring-orange-500" role="group" aria-label={`${p.year} ${p.stage} ${p.title}`}>
            <div className="flex items-center justify-between mb-4">
              <span className="bg-orange-500 text-white px-4 py-2 rounded-lg font-bold" aria-label={`Year ${p.year}`}>{p.year}</span>
              <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm" aria-label={`Stage ${p.stage}`}>{p.stage}</span>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{p.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{p.stats}</p>
            <div className="flex gap-2">
              <button className="flex-1 bg-orange-500 text-white py-2 px-4 rounded-lg font-medium" aria-label={`Download ${p.title}`}>Download</button>
              <button className="flex-1 border border-orange-500 text-orange-500 py-2 px-4 rounded-lg font-medium" aria-label={`View ${p.title}`}>View</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function VideosTab() {
  const videos = [
    { title: 'Introduction to Indian Polity', duration: '45:30', faculty: 'Dr. Amit Verma', views: '12.5K', theme: 'from-blue-500 to-purple-600' },
    { title: 'Economic Survey 2025', duration: '38:15', faculty: 'Ms. Priya Singh', views: '8.2K', theme: 'from-green-500 to-teal-600' },
    { title: 'Modern Indian History', duration: '52:40', faculty: 'Dr. Rajesh Kumar', views: '15.3K', theme: 'from-orange-500 to-red-600' },
  ];

  return (
    <div id="videos" className="py-8" aria-labelledby="videos-heading">
      <h2 id="videos-heading" className="text-2xl font-bold mb-8 text-center text-gray-900 dark:text-white">Video Lectures</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((v, i) => (
          <div key={`${v.title}-${i}`} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border focus-within:ring-2 focus-within:ring-orange-500" role="group" aria-label={`${v.title} video`}>
            <div className={`h-48 bg-gradient-to-br ${v.theme} flex items-center justify-center relative`}>
              <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-orange-600 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
              </div>
              <span className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-sm" aria-label={`Duration ${v.duration}`}>{v.duration}</span>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{v.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3" aria-label={`Faculty ${v.faculty} • ${v.views} views`}>{v.faculty} • {v.views} views</p>
              <button className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg font-medium" aria-label={`Watch ${v.title} now`}>Watch Now</button>
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