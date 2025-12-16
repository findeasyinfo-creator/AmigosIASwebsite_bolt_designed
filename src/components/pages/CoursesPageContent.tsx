'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function CoursesPageContent() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);

  const courses = [
    {
      id: 1,
      title: 'UPSC Prep+ Foundation Course',
      category: 'foundation',
      duration: '12 Months',
      fees: '₹80,000',
      startDate: 'January 2026',
      icon: 'https://cdn-icons-png.flaticon.com/512/3050/3050318.png',
      description: 'Comprehensive foundation course covering entire UPSC syllabus with integrated current affairs',
      fullDescription: 'Our flagship Foundation Course is meticulously designed to build a strong conceptual foundation for UPSC aspirants. This comprehensive 12-month program covers the entire UPSC syllabus across all papers, with integrated current affairs analysis. The course includes daily classes by expert faculty, comprehensive study materials, regular assessments, and personalized mentoring sessions. We focus on building analytical skills, answer writing techniques, and examination strategies from the ground up.',
      features: ['Complete Syllabus Coverage', 'Daily Current Affairs', 'Test Series', 'Study Materials', 'Doubt Clearing Sessions', 'Personal Mentorship', 'Online Portal Access'],
      bankDetails: {
        accountName: 'Amigos IAS Academy',
        accountNumber: '1234567890',
        ifsc: 'SBIN0001234',
        bankName: 'State Bank of India',
        branch: 'Hyderabad Main Branch',
        upiId: 'amigosias@sbi',
        qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=amigosias@sbi&pn=AmigosIAS'
      },
    },
    {
      id: 2,
      title: 'Prelims Intensive Program',
      category: 'prelims',
      duration: '6 Months',
      fees: '₹45,000',
      startDate: 'December 2025',
      icon: 'https://cdn-icons-png.flaticon.com/512/3976/3976625.png',
      description: 'Focused preparation for UPSC Prelims with comprehensive test series and analysis',
      fullDescription: 'The Prelims Intensive Program is specifically crafted for aspirants targeting the UPSC Preliminary examination. This 6-month rigorous program focuses on building accuracy, speed, and strategic thinking required for clearing Prelims. The course includes subject-wise detailed coverage, 50+ full-length mock tests, daily practice questions, current affairs integration, and detailed performance analysis. Our expert faculty provides proven strategies for effective time management and intelligent guessing techniques.',
      features: ['Subject-wise Classes', '50+ Mock Tests', 'Performance Analysis', 'Revision Classes', 'Previous Year Papers', 'Strategy Sessions', 'Daily Practice Questions'],
      bankDetails: {
        accountName: 'Amigos IAS Academy',
        accountNumber: '1234567890',
        ifsc: 'SBIN0001234',
        bankName: 'State Bank of India',
        branch: 'Hyderabad Main Branch',
        upiId: 'amigosias@sbi',
        qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=amigosias@sbi&pn=AmigosIAS'
      },
    },
    {
      id: 3,
      title: 'Mains Answer Writing Program',
      category: 'mains',
      duration: '4 Months',
      fees: '₹35,000',
      startDate: 'February 2026',
      icon: 'https://cdn-icons-png.flaticon.com/512/2706/2706962.png',
      description: 'Master the art of answer writing with expert guidance and regular evaluation',
      fullDescription: 'Transform your preparation with our specialized Mains Answer Writing Program. This intensive 4-month course is designed to help you master the art of structured, analytical, and high-scoring answer writing. The program includes daily answer writing practice, expert evaluation with detailed feedback, exposure to diverse question patterns, model answer discussions, and personalized guidance on improving writing style. We focus on developing multi-dimensional thinking, contemporary relevance, and presentation skills.',
      features: ['Answer Writing Practice', 'Expert Evaluation', 'Model Answers', 'Weekly Tests', 'Personalized Feedback', 'Diagram & Flowchart Training', 'Time Management Skills'],
      bankDetails: {
        accountName: 'Amigos IAS Academy',
        accountNumber: '1234567890',
        ifsc: 'SBIN0001234',
        bankName: 'State Bank of India',
        branch: 'Hyderabad Main Branch',
        upiId: 'amigosias@sbi',
        qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=amigosias@sbi&pn=AmigosIAS'
      },
    },
    {
      id: 4,
      title: 'Interview Guidance Program',
      category: 'interview',
      duration: '2 Months',
      fees: '₹25,000',
      startDate: 'March 2026',
      icon: 'https://cdn-icons-png.flaticon.com/512/3043/3043994.png',
      description: 'Comprehensive personality development and mock interview sessions',
      fullDescription: 'Our Interview Guidance Program prepares you for the final and most critical stage of UPSC examination. This comprehensive 2-month program includes multiple mock interviews with retired civil servants and subject experts, personality development workshops, current affairs discussions, communication skills enhancement, and body language training. We conduct panel discussions, situation-based assessments, and provide individual feedback sessions to build confidence and polish your personality for the UPSC interview board.',
      features: ['Mock Interviews', 'Panel Discussions', 'Current Affairs Focus', 'Communication Skills', 'Body Language Training', 'DAF Analysis', 'Confidence Building Workshops'],
      bankDetails: {
        accountName: 'Amigos IAS Academy',
        accountNumber: '1234567890',
        ifsc: 'SBIN0001234',
        bankName: 'State Bank of India',
        branch: 'Hyderabad Main Branch',
        upiId: 'amigosias@sbi',
        qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=amigosias@sbi&pn=AmigosIAS'
      },
    },
    {
      id: 5,
      title: 'Optional Subject: History',
      category: 'optional',
      duration: '8 Months',
      fees: '₹40,000',
      startDate: 'January 2026',
      icon: 'https://cdn-icons-png.flaticon.com/512/3079/3079508.png',
      description: 'In-depth coverage of History optional with answer writing practice',
      fullDescription: 'Our History Optional program offers comprehensive coverage of both ancient, medieval, and modern Indian history along with world history. This 8-month intensive course is taught by renowned historians with proven track records. The program includes detailed topic-wise classes, answer writing practice, regular tests, previous year question analysis, and continuous evaluation. We provide extensive study materials, maps, timeline charts, and thematic analysis to help you build a strong conceptual understanding and scoring ability.',
      features: ['Complete Syllabus', 'Answer Writing', 'Study Materials', 'Test Series', 'Previous Year Analysis', 'Map Practice', 'Timeline & Events', 'Thematic Approach'],
      bankDetails: {
        accountName: 'Amigos IAS Academy',
        accountNumber: '1234567890',
        ifsc: 'SBIN0001234',
        bankName: 'State Bank of India',
        branch: 'Hyderabad Main Branch',
        upiId: 'amigosias@sbi',
        qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=amigosias@sbi&pn=AmigosIAS'
      },
    },
    {
      id: 6,
      title: 'Weekend Batch - Working Professionals',
      category: 'weekend',
      duration: '12 Months',
      fees: '₹75,000',
      startDate: 'January 2026',
      icon: 'https://cdn-icons-png.flaticon.com/512/3050/3050318.png',
      description: 'Flexible weekend classes designed for working professionals',
      fullDescription: 'Specially designed for working professionals and college students, our Weekend Batch provides comprehensive UPSC preparation without compromising your current commitments. This 12-month program runs on Saturdays and Sundays with flexible timings. All sessions are recorded and made available online for revision. The course covers the complete UPSC syllabus, includes test series, current affairs classes, and doubt-clearing sessions. We provide condensed yet comprehensive coverage optimized for time-constrained aspirants.',
      features: ['Saturday & Sunday Classes', 'Online Recordings', 'Flexible Schedule', 'Complete Coverage', 'Test Series', 'Current Affairs Updates', 'Mobile App Access', 'Study Materials'],
      bankDetails: {
        accountName: 'Amigos IAS Academy',
        accountNumber: '1234567890',
        ifsc: 'SBIN0001234',
        bankName: 'State Bank of India',
        branch: 'Hyderabad Main Branch',
        upiId: 'amigosias@sbi',
        qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=amigosias@sbi&pn=AmigosIAS'
      },
    },
  ];

  const categories = [
    { id: 'all', name: 'All Courses' },
    { id: 'foundation', name: 'Foundation' },
    { id: 'prelims', name: 'Prelims' },
    { id: 'mains', name: 'Mains' },
    { id: 'interview', name: 'Interview' },
    { id: 'optional', name: 'Optional Subjects' },
    { id: 'weekend', name: 'Weekend Courses' },
  ];

  const filteredCourses = activeTab === 'all'
    ? courses
    : courses.filter(course => course.category === activeTab);

  const closeCoursePopup = () => {
    setSelectedCourse(null);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="py-16 hero-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white">Our Courses</h1>
          <p className="text-xl text-gray-700 dark:text-gray-300">
            Choose the right program to accelerate your UPSC preparation journey
          </p>
        </div>
      </section>

      {/* Course Categories and Listings */}
      <section className="py-8 courses-section" data-section="courses">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Tabs */}
          <div className="sticky top-[72px] md:top-[119px] z-30 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md py-4 mb-8 -mt-2 shadow-md overflow-visible">
            <div className="w-full overflow-x-auto overflow-y-visible px-4 sm:px-6 lg:px-8">
              <div className="flex space-x-2 pb-2 min-w-max overflow-visible">
                {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setActiveTab(category.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`px-6 py-2 rounded-full font-medium whitespace-nowrap transition-all duration-150 ${
                    activeTab === category.id
                      ? 'bg-orange-500 text-white shadow-lg'
                      : 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:bg-orange-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {category.name}
                </button>
              ))}
              </div>
            </div>
          </div>

          {/* Course Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <div key={course.id} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 flex flex-col border-2 border-yellow-500 dark:border-yellow-600">
                {/* Duration Badge - Top Left with Golden Background */}
                <div className="relative">
                  <div className="absolute top-4 left-4 z-10 px-3 py-1.5 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-gray-900 rounded-lg text-sm font-bold shadow-lg border border-yellow-600">
                    ⏱ {course.duration}
                  </div>
                  {/* Icon Section */}
                  <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-12 flex items-center justify-center">
                    <img 
                      src={course.icon} 
                      alt={course.title}
                      className="w-24 h-24 object-contain brightness-0 invert"
                      style={{ filter: 'brightness(0) invert(1)' }}
                    />
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-2xl font-semibold mb-3">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{course.description}</p>

                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Key Features:</h4>
                    <ul className="space-y-2">
                      {course.features.slice(0, 5).map((feature, index) => (
                        <li key={index} className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                          <svg
                            className="w-5 h-5 text-orange-500 mr-2 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-3">
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
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      Starts: {course.startDate}
                    </div>
                    <div className="flex gap-2 mb-4">
                      <span className="px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 rounded-lg text-sm font-semibold border-2 border-orange-500 dark:border-orange-600 flex items-center">
                        <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                        </svg>
                        Online
                      </span>
                      <span className="px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded-lg text-sm font-semibold border-2 border-yellow-500 dark:border-yellow-600 flex items-center">
                        <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                        </svg>
                        Offline
                      </span>
                    </div>
                    <button
                      onClick={() => setSelectedCourse(course.id)}
                      className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl"
                    >
                      View Details & Enroll
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Detail Popup - Compact & Simple Design */}
      {selectedCourse !== null && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9999] flex items-center justify-center p-2 sm:p-3 animate-fadeIn"
          onClick={closeCoursePopup}
          style={{ paddingTop: '80px', paddingBottom: '20px' }}
        >
          <div 
            className="bg-white dark:bg-gray-900 rounded-xl max-w-2xl w-full shadow-2xl border-2 border-orange-500 animate-slideUp relative"
            onClick={(e) => e.stopPropagation()}
            style={{ maxHeight: 'calc(100vh - 100px)' }}
          >
            {/* X Close Button */}
            <button
              onClick={closeCoursePopup}
              className="absolute top-2 right-2 z-20 w-9 h-9 bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-lg transition-all duration-300 hover:rotate-90 hover:scale-110 flex items-center justify-center"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Scrollable Content */}
            <div className="overflow-y-auto custom-scrollbar" style={{ maxHeight: 'calc(100vh - 100px)' }}>
              {/* Compact Header */}
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 text-white rounded-t-xl">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white/20 rounded-lg p-2.5 flex items-center justify-center flex-shrink-0">
                    <img 
                      src={courses.find(c => c.id === selectedCourse)!.icon} 
                      alt={courses.find(c => c.id === selectedCourse)!.title}
                      className="w-full h-full object-contain brightness-0 invert"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl font-bold mb-2 leading-tight">
                      {courses.find(c => c.id === selectedCourse)!.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="px-2.5 py-1 bg-white/20 rounded-full font-medium">
                        ⏱ {courses.find(c => c.id === selectedCourse)!.duration}
                      </span>
                      <span className="px-2.5 py-1 bg-white/20 rounded-full font-medium">
                        📅 {courses.find(c => c.id === selectedCourse)!.startDate}
                      </span>
                      <span className="px-2.5 py-1 bg-white rounded-full text-orange-600 font-bold">
                        💰 {courses.find(c => c.id === selectedCourse)!.fees}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="p-4 space-y-4">
                {/* About Section */}
                <div className="bg-orange-50 dark:bg-orange-900/10 rounded-lg p-4 border-l-4 border-orange-500">
                  <h5 className="text-base sm:text-lg font-bold mb-2 text-gray-900 dark:text-white flex items-center gap-2">
                    <span className="text-lg sm:text-xl">📚</span>
                    About This Course
                  </h5>
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    {courses.find(c => c.id === selectedCourse)!.fullDescription}
                  </p>
                </div>

                {/* Features */}
                <div>
                  <h5 className="text-base sm:text-lg font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
                    <span className="text-lg sm:text-xl">✅</span>
                    What You'll Get
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {courses.find(c => c.id === selectedCourse)!.features.map((feature, index) => (
                      <div key={index} className="flex items-start bg-gray-50 dark:bg-gray-800/50 rounded-md p-2.5 text-sm">
                        <span className="text-orange-500 mr-2 flex-shrink-0 font-bold">✓</span>
                        <span className="text-gray-800 dark:text-gray-200">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment Section */}
                <div className="bg-purple-50 dark:bg-purple-900/10 rounded-lg p-4 border border-purple-300 dark:border-purple-700/30">
                  <h5 className="text-base sm:text-lg font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
                    <span className="text-lg sm:text-xl">💳</span>
                    Payment Information
                  </h5>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Bank Details */}
                    <div className="bg-white dark:bg-gray-800/30 p-3 rounded-lg border border-orange-200 dark:border-orange-700/30">
                      <h6 className="font-bold text-sm mb-2 text-gray-900 dark:text-white flex items-center gap-1.5">
                        <span>🏦</span>
                        Bank Transfer
                      </h6>
                      <div className="space-y-2 text-xs">
                        <div className="bg-orange-50 dark:bg-gray-700/30 p-2 rounded">
                          <span className="text-gray-600 dark:text-gray-400 block text-[10px] mb-0.5">Account Name</span>
                          <p className="text-gray-900 dark:text-white font-medium">{courses.find(c => c.id === selectedCourse)!.bankDetails.accountName}</p>
                        </div>
                        <div className="bg-orange-50 dark:bg-gray-700/30 p-2 rounded">
                          <span className="text-gray-600 dark:text-gray-400 block text-[10px] mb-0.5">Account Number</span>
                          <p className="text-gray-900 dark:text-white font-mono font-bold">{courses.find(c => c.id === selectedCourse)!.bankDetails.accountNumber}</p>
                        </div>
                        <div className="bg-orange-50 dark:bg-gray-700/30 p-2 rounded">
                          <span className="text-gray-600 dark:text-gray-400 block text-[10px] mb-0.5">IFSC Code</span>
                          <p className="text-gray-900 dark:text-white font-mono font-bold">{courses.find(c => c.id === selectedCourse)!.bankDetails.ifsc}</p>
                        </div>
                        <div className="bg-orange-50 dark:bg-gray-700/30 p-2 rounded">
                          <span className="text-gray-600 dark:text-gray-400 block text-[10px] mb-0.5">Bank & Branch</span>
                          <p className="text-gray-900 dark:text-white font-medium">{courses.find(c => c.id === selectedCourse)!.bankDetails.bankName}, {courses.find(c => c.id === selectedCourse)!.bankDetails.branch}</p>
                        </div>
                      </div>
                    </div>

                    {/* UPI Payment */}
                    <div className="bg-white dark:bg-gray-800/30 p-3 rounded-lg border border-purple-200 dark:border-purple-700/30">
                      <h6 className="font-bold text-sm mb-2 text-gray-900 dark:text-white flex items-center gap-1.5">
                        <span>📱</span>
                        UPI Payment
                      </h6>
                      <div className="text-center">
                        <div className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-gray-700/30 dark:to-gray-600/30 p-2 rounded-lg inline-block mb-2">
                          <img 
                            src={courses.find(c => c.id === selectedCourse)!.bankDetails.qrCode}
                            alt="UPI QR Code"
                            className="w-24 h-24 rounded"
                          />
                        </div>
                        <div className="bg-purple-50 dark:bg-gray-700/30 p-2 rounded">
                          <span className="text-gray-600 dark:text-gray-400 block text-[10px] mb-0.5">UPI ID</span>
                          <p className="text-gray-900 dark:text-white font-mono font-bold text-xs">{courses.find(c => c.id === selectedCourse)!.bankDetails.upiId}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Note */}
                  <div className="mt-3 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-400 dark:border-yellow-600/30 rounded-lg p-3">
                    <div className="flex items-start gap-2 text-xs">
                      <span className="text-yellow-600 dark:text-yellow-400 text-base flex-shrink-0">⚠️</span>
                      <div>
                        <p className="font-bold text-yellow-900 dark:text-yellow-100 mb-1">Payment Confirmation</p>
                        <p className="text-yellow-800 dark:text-yellow-200">
                          Send payment screenshot to:
                          <span className="inline-flex items-center ml-1 bg-white/60 dark:bg-gray-800/30 px-2 py-1 rounded text-[10px]">
                            <span className="mr-1">📞</span>
                            <span className="font-bold">+91 98765 43210</span>
                          </span>
                          <span className="mx-1">or</span>
                          <span className="inline-flex items-center bg-white/60 dark:bg-gray-800/30 px-2 py-1 rounded text-[10px]">
                            <span className="mr-1">✉️</span>
                            <span className="font-bold">payments@amigosias.com</span>
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                  <Link
                    href="/contact"
                    className="flex-1 text-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 px-4 rounded-lg transition-all text-sm"
                  >
                    📧 Contact Us
                  </Link>
                  <button
                    onClick={closeCoursePopup}
                    className="flex-1 text-center bg-gray-200 hover:bg-gray-300 dark:bg-gray-700/50 dark:hover:bg-gray-600/50 text-gray-800 dark:text-white font-bold py-2.5 px-4 rounded-lg transition-all text-sm"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}