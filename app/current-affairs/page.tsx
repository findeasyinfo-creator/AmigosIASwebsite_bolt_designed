'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function CurrentAffairsPage() {
  const [selectedDate, setSelectedDate] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedPaper, setSelectedPaper] = useState('all');

  const articles = [
    {
      id: 1,
      title: 'India-US Relations: Strategic Partnership in 2025',
      date: '2025-11-01',
      subject: 'International Relations',
      paper: 'GS-II',
      summary:
        'Comprehensive analysis of bilateral trade agreements and defense cooperation between India and the United States.',
      topics: ['Diplomacy', 'Trade', 'Defense'],
    },
    {
      id: 2,
      title: 'Climate Change and Agricultural Impact',
      date: '2025-10-28',
      subject: 'Environment',
      paper: 'GS-III',
      summary:
        'Understanding the effects of changing weather patterns on Indian agriculture and food security.',
      topics: ['Climate', 'Agriculture', 'Food Security'],
    },
    {
      id: 3,
      title: 'Digital India Initiative: Progress and Challenges',
      date: '2025-10-25',
      subject: 'Governance',
      paper: 'GS-II',
      summary:
        'Evaluation of digital infrastructure development and its impact on public service delivery.',
      topics: ['Technology', 'E-Governance', 'Digital India'],
    },
    {
      id: 4,
      title: 'Economic Reforms and Growth Trajectory',
      date: '2025-10-20',
      subject: 'Economy',
      paper: 'GS-III',
      summary:
        'Analysis of recent economic policy changes and their implications for sustainable growth.',
      topics: ['GDP', 'Policy', 'Development'],
    },
    {
      id: 5,
      title: 'Constitutional Amendment: Latest Developments',
      date: '2025-10-15',
      subject: 'Polity',
      paper: 'GS-II',
      summary:
        'Detailed examination of proposed constitutional amendments and their significance.',
      topics: ['Constitution', 'Legislature', 'Amendment'],
    },
    {
      id: 6,
      title: 'Space Exploration: ISRO Achievements',
      date: '2025-10-10',
      subject: 'Science & Technology',
      paper: 'GS-III',
      summary:
        "India's space program milestones and future missions in planetary exploration.",
      topics: ['ISRO', 'Space', 'Technology'],
    },
  ];

  const subjects = ['all', 'Polity', 'Economy', 'International Relations', 'Environment', 'Governance', 'Science & Technology'];
  const papers = ['all', 'GS-I', 'GS-II', 'GS-III', 'GS-IV'];

  const filteredArticles = articles.filter((article) => {
    if (selectedSubject !== 'all' && article.subject !== selectedSubject) return false;
    if (selectedPaper !== 'all' && article.paper !== selectedPaper) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary-navy text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Current Affairs</h1>
          <p className="text-xl text-gray-200">
            Stay updated with comprehensive analysis of current events for UPSC preparation
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-lg font-semibold text-primary-navy mb-4">Filter Articles</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary-navy focus:outline-none"
              >
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject === 'all' ? 'All Subjects' : subject}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                UPSC Paper
              </label>
              <select
                value={selectedPaper}
                onChange={(e) => setSelectedPaper(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary-navy focus:outline-none"
              >
                {papers.map((paper) => (
                  <option key={paper} value={paper}>
                    {paper === 'all' ? 'All Papers' : paper}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date Range
              </label>
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary-navy focus:outline-none"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
          </div>

          {(selectedSubject !== 'all' || selectedPaper !== 'all' || selectedDate !== 'all') && (
            <button
              onClick={() => {
                setSelectedSubject('all');
                setSelectedPaper('all');
                setSelectedDate('all');
              }}
              className="mt-4 text-sm text-primary-gold hover:underline"
            >
              Clear All Filters
            </button>
          )}
        </div>

        <div className="mb-4 text-gray-600">
          Showing {filteredArticles.length} of {articles.length} articles
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredArticles.map((article) => (
            <div key={article.id} className="card p-6 hover:scale-[1.02] transition-transform duration-200">
              <div className="flex items-start justify-between mb-3">
                <div className="inline-block px-3 py-1 bg-primary-gold/10 text-primary-gold rounded-full text-sm font-medium">
                  {article.paper}
                </div>
                <div className="text-sm text-gray-500">{article.date}</div>
              </div>

              <h3 className="text-xl font-semibold text-primary-navy mb-2 hover:text-primary-gold transition-colors">
                <Link href={`/current-affairs/${article.id}`}>{article.title}</Link>
              </h3>

              <p className="text-gray-600 mb-4 line-clamp-2">{article.summary}</p>

              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {article.topics.map((topic, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                    >
                      {topic}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/current-affairs/${article.id}`}
                  className="text-primary-navy hover:text-primary-gold font-medium text-sm flex items-center"
                >
                  Read More
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center text-sm text-gray-600">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                    />
                  </svg>
                  Subject: {article.subject}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No articles found matching your filters.</p>
            <button
              onClick={() => {
                setSelectedSubject('all');
                setSelectedPaper('all');
                setSelectedDate('all');
              }}
              className="mt-4 btn-secondary"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
