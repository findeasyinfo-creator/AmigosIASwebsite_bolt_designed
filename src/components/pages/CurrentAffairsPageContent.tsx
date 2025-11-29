"use client"
import React, { useMemo, useState, useEffect } from 'react'

type CAType = 'daily' | 'weekly' | 'monthly'

type CAItem = {
  id: number
  type: CAType
  title: string
  date: string
  subject: string
  paper: string
  summary: string
  fullContent: string
  topics: string[]
  imageUrl?: string
  issue?: string
}

export default function CurrentAffairsPageContent() {
  const todayStr = useMemo(() => new Date().toISOString().slice(0, 10), [])
  const [activeTab, setActiveTab] = useState<CAType>('daily')
  // For Daily: start with 'all' to show all daily items by default
  const [selectedDate, setSelectedDate] = useState<string>('all')
  const [selectedSubject, setSelectedSubject] = useState<string>('all')
  const [selectedPaper, setSelectedPaper] = useState<string>('all')
  const [weeklyRange, setWeeklyRange] = useState<'all' | 'this-week' | 'last-week'>('this-week')
  const [monthlyRange, setMonthlyRange] = useState<'all' | 'this-month' | 'last-month'>('this-month')

  // Admin-managed content (imageUrl provided by admin). Placeholder URLs here.
  const items: CAItem[] = [
    {
      id: 1,
      type: 'daily',
      title: 'India-US Relations: Strategic Partnership in 2025',
      date: '2025-11-01',
      subject: 'International Relations',
      paper: 'GS-II',
      summary:
        'Comprehensive analysis of bilateral trade agreements and defense cooperation between India and the United States.',
      fullContent: 'Detailed coverage of evolving India-US strategic alignment: defence technology sharing (COMCASA / BECA outcomes), Indo-Pacific maritime cooperation, critical technologies, bilateral trade negotiations (agri, digital services), and impact on regional power balance. Includes timeline, key agreements, exam-oriented analytical points and potential mains answer frameworks.',
      topics: ['Diplomacy', 'Trade', 'Defense'],
      imageUrl: '/assets/current-affairs/us-india.jpg',
    },
    {
      id: 2,
      type: 'daily',
      title: 'Climate Change and Agricultural Impact',
      date: '2025-10-28',
      subject: 'Environment',
      paper: 'GS-III',
      summary:
        'Understanding the effects of changing weather patterns on Indian agriculture and food security.',
      fullContent: 'Assessment of changing monsoon variability, heat stress on staple crops (rice/wheat), soil moisture decline, adaptation strategies (micro-irrigation, climate resilient seeds), government schemes (PMKSY, NICRA), policy gaps and integrated mitigation approach relevant for UPSC GS-III answers.',
      topics: ['Climate', 'Agriculture', 'Food Security'],
      imageUrl: '/assets/current-affairs/agri-climate.jpg',
    },
    {
      id: 3,
      type: 'daily',
      title: 'Digital India Initiative: Progress and Challenges',
      date: '2025-10-25',
      subject: 'Governance',
      paper: 'GS-II',
      summary:
        'Evaluation of digital infrastructure development and its impact on public service delivery.',
      fullContent: 'Review of Digital India pillars: broadband highways, universal mobile access, e-Governance reforms, data empowerment & privacy concerns, interoperability challenges, digital divide (rural connectivity), emerging tech stack (India Stack, ONDC) with governance implications and probable ethics case studies.',
      topics: ['Technology', 'E-Governance', 'Digital India'],
      imageUrl: '/assets/current-affairs/digital-india.jpg',
    },
    {
      id: 4,
      type: 'weekly',
      title: 'Economic Reforms and Growth Trajectory',
      date: '2025-11-03',
      subject: 'Economy',
      paper: 'GS-III',
      summary:
        'Analysis of recent economic policy changes and their implications for sustainable growth.',
      fullContent: 'Summary of macro indicators (IIP, PMI, inflation trend), fiscal consolidation path, tax buoyancy, infrastructure capex push, labour & manufacturing reforms, credit deepening, and structural bottlenecks for inclusive growth. Includes mains-ready value addition (charts, keywords, model intro/conclusion).',
      topics: ['GDP', 'Policy', 'Development'],
      imageUrl: '/assets/current-affairs/economy-growth.jpg',
    },
    {
      id: 5,
      type: 'weekly',
      title: 'Constitutional Amendment: Latest Developments',
      date: '2025-11-02',
      subject: 'Polity',
      paper: 'GS-II',
      summary:
        'Detailed examination of proposed constitutional amendments and their significance.',
      fullContent: 'Context of proposed amendment: federal balance adjustments, institutional accountability, impact on fundamental rights, Supreme Court jurisprudence references, committee recommendations and comparative constitutional perspective (e.g., South Africa / Canada). Answer structuring pointers added.',
      topics: ['Constitution', 'Legislature', 'Amendment'],
      imageUrl: '/assets/current-affairs/constitution.jpg',
    },
    {
      id: 6,
      type: 'monthly',
      title: 'Monthly CA Magazine – November 2025',
      date: '2025-11-01',
      subject: 'Compilation',
      paper: 'GS-I/II/III',
      summary:
        'Curated monthly magazine covering key topics across GS papers with editorial analysis.',
      fullContent: 'Magazine highlights: thematic consolidation (Economy slowdown vs recovery signals, IR strategic updates, environmental treaty progress, science-tech innovation milestones). Includes concise revision tables, Prelims MCQ hints, and Mains practice questions with directive alignment.',
      topics: ['Economy', 'IR', 'Environment', 'Sci-Tech'],
      imageUrl: '/assets/current-affairs/monthly-mag.jpg',
      issue: 'November 2025',
    },
    {
      id: 7,
      type: 'daily',
      title: 'Supreme Court Ruling on Environmental Protection',
      date: '2025-11-04',
      subject: 'Environment',
      paper: 'GS-III',
      summary: 'Historic judgment strengthening safeguards and imposing stricter penalties for violations.',
      fullContent: 'Case background, legal principles invoked (Article 21, polluter pays), statutory frameworks (EPA 1986, Forest Conservation), implications for sustainable development doctrine, enforcement challenges and ethical dimensions (intergenerational equity).',
      topics: ['Judiciary', 'Environment', 'Policy'],
      imageUrl: '/assets/current-affairs/judiciary-gavel.jpg',
    },
    {
      id: 8,
      type: 'daily',
      title: 'IMF Revises India’s Growth Projections Upward',
      date: '2025-11-05',
      subject: 'Economy',
      paper: 'GS-III',
      summary: 'Updated forecast citing strong domestic demand and infrastructure investments.',
      fullContent: 'Drivers of upward revision (consumption resilience, infra multiplier, export mix), risks (external shocks, crude volatility), policy stance (RBI balancing inflation & growth), and integration into mains macro answer frameworks.',
      topics: ['IMF', 'GDP', 'Infrastructure'],
      imageUrl: '/assets/current-affairs/imf-growth.jpg',
    },
    {
      id: 9,
      type: 'weekly',
      title: 'Judiciary Weekly Brief – November Week 1',
      date: '2025-11-01',
      subject: 'Judiciary',
      paper: 'GS-II',
      summary: 'Key developments from courts across India with UPSC relevance.',
      fullContent: 'Roundup of notable rulings: fundamental rights expansion, procedural reforms, PIL trends, tribunal efficiency debates, exam relevance tags (GS-II / Ethics case studies).',
      topics: ['Judiciary', 'Rights', 'Case Law'],
      imageUrl: '/assets/current-affairs/judiciary-weekly.jpg',
    },
    {
      id: 10,
      type: 'monthly',
      title: 'Monthly CA Magazine – October 2025',
      date: '2025-10-01',
      subject: 'Compilation',
      paper: 'GS-I/II/III',
      summary: 'Comprehensive coverage of October’s most important topics and analysis.',
      fullContent: 'October digest topics mapped to GS syllabus with quick recall mnemonics, PYQ correlation, and structured enrichment sections for Essay & Ethics linkage.',
      topics: ['Economy', 'IR', 'Polity'],
      imageUrl: '/assets/current-affairs/monthly-oct.jpg',
      issue: 'October 2025',
    },
    {
      id: 11,
      type: 'weekly',
      title: 'Weekly Economy Roundup – Current Week',
      date: todayStr, // place in current week for demo
      subject: 'Economy',
      paper: 'GS-III',
      summary: 'Major economic indicators and policy updates from the current week.',
      fullContent: 'Current week macro snapshot: inflation trajectory, banking credit surge, infra project sanctions, external sector signals and revision pointers for Prelims dynamic sections.',
      topics: ['Inflation', 'Fiscal', 'Markets'],
      imageUrl: '/assets/current-affairs/weekly-economy.jpg',
    },
  ];

  // Subject → sample image mapping (AI-style placeholders / to be replaced by admin)
  // Subject-based image mapping function for consistent rendering
  const getSubjectImage = (subject: string): string => {
    const imageMap: Record<string, string> = {
      'International Relations': 'https://images.unsplash.com/photo-1526666923127-b2970f64b422?w=800&h=450&fit=crop&q=80',
      'Environment': 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=450&fit=crop&q=80',
      'Governance': 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=450&fit=crop&q=80',
      'Economy': 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=450&fit=crop&q=80',
      'Polity': 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800&h=450&fit=crop&q=80',
      'Science & Technology': 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=450&fit=crop&q=80',
      'Compilation': 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&h=450&fit=crop&q=80',
      'Judiciary': 'https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=800&h=450&fit=crop&q=80'
    }
    return imageMap[subject] || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=450&fit=crop&q=80'
  }
  const subjects = ['all', 'Polity', 'Economy', 'International Relations', 'Environment', 'Governance', 'Science & Technology', 'Compilation']
  const papers = ['all', 'GS-I', 'GS-II', 'GS-III', 'GS-IV', 'GS-I/II/III']

  // Date helpers for weekly/monthly filtering
  const today = useMemo(() => {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    return d
  }, [])

  const weekStart = (d: Date) => {
    const date = new Date(d)
    const day = date.getDay() // 0 Sun .. 6 Sat
    const diff = day === 0 ? 6 : day - 1 // make Monday start
    date.setDate(date.getDate() - diff)
    date.setHours(0, 0, 0, 0)
    return date
  }
  const currentWeekStart = weekStart(today)
  const currentWeekEnd = new Date(currentWeekStart)
  currentWeekEnd.setDate(currentWeekEnd.getDate() + 6)
  const lastWeekStart = new Date(currentWeekStart)
  lastWeekStart.setDate(lastWeekStart.getDate() - 7)
  const lastWeekEnd = new Date(lastWeekStart)
  lastWeekEnd.setDate(lastWeekEnd.getDate() + 6)

  const filteredItems = items.filter((item) => {
    if (item.type !== activeTab) return false
    if (selectedSubject !== 'all' && item.subject !== selectedSubject) return false
    if (selectedPaper !== 'all' && item.paper !== selectedPaper) return false
    if (activeTab === 'daily' && selectedDate && selectedDate !== 'all' && item.date !== selectedDate) return false

    if (activeTab === 'weekly' && weeklyRange !== 'all') {
      const d = new Date(item.date)
      d.setHours(0, 0, 0, 0)
      const inThisWeek = d >= currentWeekStart && d <= currentWeekEnd
      const inLastWeek = d >= lastWeekStart && d <= lastWeekEnd
      if (weeklyRange === 'this-week' && !inThisWeek) return false
      if (weeklyRange === 'last-week' && !inLastWeek) return false
    }
    if (activeTab === 'monthly' && monthlyRange !== 'all') {
      const d = new Date(item.date)
      const month = d.getMonth()
      const year = d.getFullYear()
      const currentMonth = today.getMonth()
      const currentYear = today.getFullYear()
      const lastMonthDate = new Date(currentYear, currentMonth - 1, 1)
      const lastMonth = lastMonthDate.getMonth()
      const lastMonthYear = lastMonthDate.getFullYear()
      if (monthlyRange === 'this-month' && !(month === currentMonth && year === currentYear)) return false
      if (monthlyRange === 'last-month' && !(month === lastMonth && year === lastMonthYear)) return false
    }
    return true
  })

  const [selectedItemId, setSelectedItemId] = useState<number | null>(null)
  const selectedItem = selectedItemId != null ? items.find(i => i.id === selectedItemId) : null

  // Close on ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedItemId(null)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <div>
      {/* Hero Section */}
      <section className="py-16 hero-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white">Current Affairs</h1>
          <p className="text-xl text-gray-700 dark:text-gray-300">
            Stay updated with comprehensive analysis of current events for UPSC preparation
          </p>
        </div>
      </section>

      {/* Tabs, Filters and Content */}
      <section className="py-8 current-affairs-section" data-section="current-affairs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main tabs */}
          <div className="sticky top-[72px] md:top-[119px] z-30 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-4 mb-6 -mt-2 shadow-md">
            <div className="max-w-7xl mx-auto">
              <div className="flex gap-3 overflow-x-auto pb-2">
                {([
                { id: 'daily', name: 'Daily CA' },
                { id: 'weekly', name: 'Weekly CA' },
                { id: 'monthly', name: 'Monthly Magazines' },
              ] as { id: CAType; name: string }[]).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id)
                    // Reset date for weekly/monthly
                    if (tab.id !== 'daily') setSelectedDate('all')
                    if (tab.id === 'weekly') setWeeklyRange('this-week')
                    if (tab.id === 'monthly') setMonthlyRange('this-month')
                  }}
                  className={`px-6 py-2 rounded-full font-semibold whitespace-nowrap transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-orange-500 text-white shadow-lg'
                      : 'bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 hover:bg-orange-100 dark:hover:bg-orange-900/30 border border-orange-200 dark:border-orange-700'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
              </div>
            </div>
          </div>

          {/* Dependent filters */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4">Filters</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject</label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-orange-200 dark:border-orange-800 rounded-lg focus:border-orange-500 focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  {subjects.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject === 'all' ? 'All Subjects' : subject}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">UPSC Paper</label>
                <select
                  value={selectedPaper}
                  onChange={(e) => setSelectedPaper(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-orange-200 dark:border-orange-800 rounded-lg focus:border-orange-500 focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  {papers.map((paper) => (
                    <option key={paper} value={paper}>
                      {paper === 'all' ? 'All Papers' : paper}
                    </option>
                  ))}
                </select>
              </div>

              {activeTab === 'daily' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date</label>
                  <input
                    type="date"
                    value={selectedDate === 'all' ? '' : selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value === '' ? 'all' : e.target.value)}
                    className="w-full px-4 py-2 border-2 border-orange-200 dark:border-orange-800 rounded-lg focus:border-orange-500 focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={() => setSelectedDate('all')}
                    className="mt-2 px-3 py-1 rounded-md bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/50 text-xs font-medium transition-colors"
                  >Show All Dates</button>
                </div>
              )}
              {activeTab === 'weekly' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Week Range</label>
                  <select
                    value={weeklyRange}
                    onChange={(e) => setWeeklyRange(e.target.value as any)}
                    className="w-full px-4 py-2 border-2 border-orange-200 dark:border-orange-800 rounded-lg focus:border-orange-500 focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="this-week">This Week</option>
                    <option value="last-week">Last Week</option>
                    <option value="all">All Weeks</option>
                  </select>
                </div>
              )}
              {activeTab === 'monthly' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Month Range</label>
                  <select
                    value={monthlyRange}
                    onChange={(e) => setMonthlyRange(e.target.value as any)}
                    className="w-full px-4 py-2 border-2 border-orange-200 dark:border-orange-800 rounded-lg focus:border-orange-500 focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="this-month">This Month</option>
                    <option value="last-month">Last Month</option>
                    <option value="all">All Months</option>
                  </select>
                </div>
              )}
            </div>

            {(selectedSubject !== 'all' || selectedPaper !== 'all' || (activeTab === 'daily' && selectedDate !== 'all') || (activeTab === 'weekly' && weeklyRange !== 'all') || (activeTab === 'monthly' && monthlyRange !== 'all')) && (
              <button
                onClick={() => {
                  setSelectedSubject('all')
                  setSelectedPaper('all')
                  setSelectedDate(activeTab === 'daily' ? todayStr : 'all')
                  if (activeTab === 'weekly') setWeeklyRange('this-week')
                  if (activeTab === 'monthly') setMonthlyRange('this-month')
                }}
                className="mt-4 px-4 py-2 rounded-lg bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 hover:bg-orange-200 dark:hover:bg-orange-900/50 text-sm font-medium transition-colors"
              >
                Clear All Filters
              </button>
            )}
          </div>

          {/* Results Count */}
          <div className="mb-4 text-gray-600 dark:text-gray-400">
            Showing {filteredItems.length} of {items.filter(i => i.type === activeTab).length} {activeTab === 'monthly' ? 'magazines' : 'articles'}
          </div>

          {/* Cards Grid - compact design */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 items-stretch">
            {filteredItems.map((item) => (
              <div key={item.id} className="bg-white/95 dark:bg-gray-800/90 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col">
                {/* Top image - compact 16:9 aspect */}
                <div className="w-full aspect-video bg-gradient-to-br from-amber-50 to-orange-50 dark:from-orange-900/20 dark:to-orange-800/20 overflow-hidden">
                  <img
                    src={getSubjectImage(item.subject)}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="inline-block px-2.5 py-1 bg-amber-200 dark:bg-orange-900/40 text-gray-900 dark:text-orange-100 rounded-full text-xs font-medium">
                      {item.paper}
                    </div>
                    <div className="text-xs px-2.5 py-1 bg-amber-100 dark:bg-orange-900/30 text-gray-900 dark:text-orange-100 rounded-full whitespace-nowrap">{item.date}</div>
                  </div>

                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white line-clamp-2">
                    <button
                      type="button"
                      onClick={() => setSelectedItemId(item.id)}
                      className="text-left hover:text-orange-600 focus:outline-none"
                    >{item.title}</button>
                  </h3>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">{item.summary}</p>

                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex flex-wrap gap-1.5">
                      {item.topics.slice(0, 3).map((topic, index) => (
                        <span key={index} className="px-2 py-0.5 bg-gradient-to-br from-amber-100 to-orange-100 text-gray-800 rounded text-xs">
                          {topic}
                        </span>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedItemId(item.id)}
                      className="text-orange-500 hover:text-orange-600 font-medium text-xs flex items-center whitespace-nowrap shrink-0"
                    >
                      Read
                      <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>

                  <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-600 mt-auto">
                    <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                      <div className="flex items-center truncate">
                        <svg className="w-3.5 h-3.5 mr-1.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                        <span className="truncate">{item.subject}</span>
                      </div>
                      <div className="text-xs bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 px-2 py-0.5 rounded-full font-medium shrink-0">
                        {activeTab === 'daily' ? 'Daily' : activeTab === 'weekly' ? 'Weekly' : 'Monthly'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results Message */}
          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 text-lg">No articles found matching your filters.</p>
              <button
                onClick={() => {
                  setSelectedSubject('all')
                  setSelectedPaper('all')
                  setSelectedDate(activeTab === 'daily' ? todayStr : 'all')
                }}
                className="mt-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* Modal Popup */}
          {selectedItem && (
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start md:items-center justify-center p-4"
              onClick={() => setSelectedItemId(null)}
            >
              <div
                className="bg-white dark:bg-gray-800 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="ca-modal-title"
              >
                <div className="relative h-48 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-orange-900/20 dark:to-orange-800/20 overflow-hidden">
                  <img
                    src={getSubjectImage(selectedItem.subject)}
                    alt={selectedItem.title}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => setSelectedItemId(null)}
                    className="absolute top-3 right-3 bg-orange-500 hover:bg-orange-600 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
                    aria-label="Close"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="p-6 overflow-y-auto">
                  <div className="flex items-start justify-between mb-4 gap-4">
                    <div>
                      <h2 id="ca-modal-title" className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{selectedItem.title}</h2>
                      <div className="flex flex-wrap gap-2 mb-2 text-sm text-gray-600 dark:text-gray-400">
                        <span className="px-3 py-1 bg-amber-200 dark:bg-orange-900/40 text-gray-900 dark:text-orange-100 rounded-full font-medium">{selectedItem.paper}</span>
                        <span className="px-3 py-1 bg-amber-100 dark:bg-orange-900/30 text-gray-900 dark:text-orange-100 rounded-full">{selectedItem.date}</span>
                        <span className="px-3 py-1 bg-amber-100 dark:bg-orange-900/30 text-gray-900 dark:text-orange-100 rounded-full">{selectedItem.subject}</span>
                        <span className="px-3 py-1 bg-amber-100 dark:bg-orange-900/30 text-gray-900 dark:text-orange-100 rounded-full">{selectedItem.type === 'daily' ? 'Daily CA' : selectedItem.type === 'weekly' ? 'Weekly CA' : selectedItem.issue || 'Monthly'}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 whitespace-pre-line">{selectedItem.fullContent}</p>
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Key Topics</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.topics.map((t, i) => (
                        <span key={i} className="px-2 py-1 bg-gradient-to-br from-amber-100 to-orange-100 text-gray-800 rounded text-xs shadow-sm">{t}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={() => setSelectedItemId(null)}
                      className="px-5 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow"
                    >Close</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}