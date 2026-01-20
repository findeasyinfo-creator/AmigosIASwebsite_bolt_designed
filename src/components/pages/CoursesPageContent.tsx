'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useDetailedCourses } from '@/hooks/useDetailedCourses';
import { useSiteSettings } from '@/hooks/useSiteSettings';

export default function CoursesPageContent() {
  const { courses, loading, source } = useDetailedCourses();
  const { settings } = useSiteSettings();
  const [activeTab, setActiveTab] = useState('all');
  const [selectedCourse, setSelectedCourse] = useState<string | number | null>(null);

  // Show data source indicator in console
  React.useEffect(() => {
    if (!loading) {
      console.log(`📚 Courses loaded from: ${source === 'api' ? 'API ✅' : 'Static Data ⚠️'}`);
    }
  }, [loading, source]);

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
          <div className="sticky top-[72px] md:top-[119px] z-30 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-4 mb-8 -mt-2 shadow-md">
            <div className="max-w-7xl mx-auto overflow-x-auto">
              <div className="flex space-x-2 pb-2">
                {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveTab(category.id)}
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

      {/* Course Detail Popup */}
      {selectedCourse !== null && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeCoursePopup}
        >
          <div 
            className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-yellow-500 dark:border-yellow-600"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Course Details</h3>
              <button
                onClick={closeCoursePopup}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-3xl leading-none"
              >
                ×
              </button>
            </div>
            {courses.find(c => c.id === selectedCourse) && (
              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-6 mb-6">
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 bg-gradient-to-br from-orange-100 to-yellow-100 dark:from-orange-900/30 dark:to-yellow-900/30 rounded-2xl p-6 flex items-center justify-center">
                      <img 
                        src={courses.find(c => c.id === selectedCourse)!.icon} 
                        alt={courses.find(c => c.id === selectedCourse)!.title}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                      {courses.find(c => c.id === selectedCourse)!.title}
                    </h4>
                    <div className="flex flex-wrap gap-4 mb-4">
                      <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full text-sm font-medium">
                        {courses.find(c => c.id === selectedCourse)!.duration}
                      </span>
                      <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded-full text-sm font-semibold border border-yellow-500 dark:border-yellow-600">
                        Online/Offline
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      <strong>Start Date:</strong> {courses.find(c => c.id === selectedCourse)!.startDate}
                    </p>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mb-6">
                  <h5 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">About This Course</h5>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    {courses.find(c => c.id === selectedCourse)!.fullDescription}
                  </p>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mb-6">
                  <h5 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">What You'll Get</h5>
                  <div className="features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '12px' }}>
                    {courses.find(c => c.id === selectedCourse)!.features.map((feature, index) => (
                      <div key={index} className="feature-item flex items-start text-gray-700 dark:text-gray-300" style={{ opacity: 1, visibility: 'visible' }}>
                        <svg
                          className="w-5 h-5 text-orange-500 mr-2 flex-shrink-0 mt-0.5"
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
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h5 className="text-xl font-semibold text-gray-900 dark:text-white">Payment Information</h5>
                    <span className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                      {courses.find(c => c.id === selectedCourse)?.fees}
                    </span>
                  </div>
                  
                  <div className="payment-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '24px' }}>
                    {/* Bank Details */}
                    <div className="bank-details-card bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-gray-700 dark:to-gray-600" style={{ padding: '20px', borderRadius: '12px', border: '2px solid #fed7aa' }}>
                      <h6 className="font-semibold text-lg mb-3 text-gray-900 dark:text-white flex items-center">
                        <svg className="w-5 h-5 mr-2 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"/>
                          <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd"/>
                        </svg>
                        Bank Details
                      </h6>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="font-semibold text-gray-700 dark:text-gray-300">Account Name:</span>
                          <p className="text-gray-900 dark:text-white">{courses.find(c => c.id === selectedCourse)?.bankDetails?.accountName || 'Amigos IAS Academy'}</p>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700 dark:text-gray-300">Account Number:</span>
                          <p className="text-gray-900 dark:text-white font-mono">{courses.find(c => c.id === selectedCourse)?.bankDetails?.accountNumber || '1234567890'}</p>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700 dark:text-gray-300">IFSC Code:</span>
                          <p className="text-gray-900 dark:text-white font-mono">{courses.find(c => c.id === selectedCourse)?.bankDetails?.ifsc || 'SBIN0001234'}</p>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700 dark:text-gray-300">Bank Name:</span>
                          <p className="text-gray-900 dark:text-white">{courses.find(c => c.id === selectedCourse)?.bankDetails?.bankName || 'State Bank of India'}</p>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700 dark:text-gray-300">Branch:</span>
                          <p className="text-gray-900 dark:text-white">{courses.find(c => c.id === selectedCourse)?.bankDetails?.branch || 'Hyderabad Main Branch'}</p>
                        </div>
                      </div>
                    </div>

                    {/* UPI Payment */}
                    <div className="upi-payment-card bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-600" style={{ padding: '20px', borderRadius: '12px', border: '2px solid #e9d5ff' }}>
                      <h6 className="font-semibold text-lg mb-3 text-gray-900 dark:text-white flex items-center">
                        <svg className="w-5 h-5 mr-2 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
                        </svg>
                        {settings?.coursesQrCode ? 'Scan to Pay' : 'UPI Payment'}
                      </h6>
                      {settings?.coursesQrCode && (
                        <p className="text-xs text-purple-600 dark:text-purple-400 text-center mb-2 font-medium">
                          Unified Payment QR for All Courses
                        </p>
                      )}
                      <div className="text-center">
                        <div className="bg-white p-3 rounded-lg inline-block mb-3 shadow-md">
                          <img 
                            src={settings?.coursesQrCode || courses.find(c => c.id === selectedCourse)?.bankDetails?.qrCode || 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=amigosias@sbi&pn=AmigosIAS'}
                            alt="UPI QR Code"
                            className="w-40 h-40 object-contain"
                          />
                        </div>
                        <div className="text-sm">
                          <span className="font-semibold text-gray-700 dark:text-gray-300">UPI ID:</span>
                          <p className="text-gray-900 dark:text-white font-mono text-base mt-1">{courses.find(c => c.id === selectedCourse)?.bankDetails?.upiId || 'amigosias@sbi'}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Acknowledgement Note */}
                  <div className="mt-6 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-400 dark:border-yellow-600 rounded-lg p-4">
                    <div className="flex items-start">
                      <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                      </svg>
                      <div>
                        <p className="font-semibold text-yellow-900 dark:text-yellow-100 mb-1">Important:</p>
                        <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                          Please send the payment acknowledgement/screenshot to WhatsApp: <span className="font-bold">{settings?.phone || '+91 98765 43210'}</span> or Email: <span className="font-bold">{settings?.email || 'payments@amigosias.com'}</span> with your name and course details for confirmation.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      href="/contact"
                      className="flex-1 text-center bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-150"
                    >
                      Contact Us for More Info
                    </Link>
                    <button
                      onClick={closeCoursePopup}
                      className="flex-1 text-center bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-150"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}