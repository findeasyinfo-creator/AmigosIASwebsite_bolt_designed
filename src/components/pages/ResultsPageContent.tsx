'use client'
import React, { useState } from 'react';
import Link from 'next/link';

export default function ResultsPageContent() {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedRankRange, setSelectedRankRange] = useState('all');
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);

  const parseYouTubeId = (url: string): string | null => {
    try {
      const u = new URL(url);
      if (u.hostname === 'youtu.be') return u.pathname.slice(1) || null;
      if (u.hostname.includes('youtube.com')) {
        const v = u.searchParams.get('v');
        if (v) return v;
        const parts = u.pathname.split('/');
        const idx = parts.findIndex((p) => p === 'embed');
        if (idx >= 0 && parts[idx + 1]) return parts[idx + 1];
      }
      return null;
    } catch {
      return null;
    }
  };

  const toppers = [
    {
      name: 'Rahul Mehta',
      rank: 24,
      year: 2024,
      service: 'IAS',
      rollNumber: 'RN12345',
      testimonial: 'Amigos IAS provided me with the perfect environment and guidance. The faculty support was exceptional.',
      course: 'UPSC Prep+ Foundation Course',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      videoThumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=450&fit=crop',
      journeyMonths: 15,
      attempt: '2nd',
    },
    {
      name: 'Sneha Patel',
      rank: 156,
      year: 2024,
      service: 'IAS',
      rollNumber: 'RN23456',
      testimonial: 'The test series and answer writing practice helped me immensely in clearing the examination.',
      course: 'Prelims + Mains Combined',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      videoThumbnail: 'https://images.unsplash.com/photo-1494790108755-2616c2c52c8b?w=800&h=450&fit=crop',
      journeyMonths: 12,
      attempt: '1st',
    },
    {
      name: 'Arjun Singh',
      rank: 89,
      year: 2023,
      service: 'IAS',
      rollNumber: 'RN34567',
      testimonial: 'Comprehensive study material and dedicated faculty made all the difference in my preparation.',
      course: 'UPSC Prep+ Foundation Course',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      videoThumbnail: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=450&fit=crop',
      journeyMonths: 20,
      attempt: '1st',
    },
    {
      name: 'Priya Sharma',
      rank: 45,
      year: 2023,
      service: 'IFS',
      rollNumber: 'RN45678',
      testimonial: 'The current affairs module was particularly helpful. Thank you Amigos IAS!',
      course: 'Weekend Batch',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      videoThumbnail: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&h=450&fit=crop',
      journeyMonths: 18,
      attempt: '1st',
    },
    {
      name: 'Vikram Kumar',
      rank: 67,
      year: 2023,
      service: 'IAS',
      rollNumber: 'RN56789',
      testimonial: 'Expert guidance and regular mock tests prepared me well for the actual examination.',
      course: 'UPSC Prep+ Foundation Course',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      videoThumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=450&fit=crop',
      journeyMonths: 22,
      attempt: '3rd',
    },
    {
      name: 'Anjali Gupta',
      rank: 198,
      year: 2022,
      service: 'IPS',
      rollNumber: 'RN67890',
      testimonial: 'The interview preparation sessions were invaluable in building my confidence.',
      course: 'Interview Guidance Program',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      videoThumbnail: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=450&fit=crop',
      journeyMonths: 16,
      attempt: '2nd',
    },
  ];

  const years = ['2024', '2023', '2022'];
  const rankRanges = [
    { value: 'all', label: 'All Ranks' },
    { value: '1-50', label: 'Top 50' },
    { value: '51-100', label: '51-100' },
    { value: '101-200', label: '101-200' },
    { value: '200+', label: '200+' },
  ];

  const filteredToppers = toppers.filter(topper => {
    if (topper.year.toString() !== selectedYear) return false;

    if (selectedRankRange !== 'all') {
      if (selectedRankRange === '1-50' && topper.rank > 50) return false;
      if (selectedRankRange === '51-100' && (topper.rank < 51 || topper.rank > 100)) return false;
      if (selectedRankRange === '101-200' && (topper.rank < 101 || topper.rank > 200)) return false;
      if (selectedRankRange === '200+' && topper.rank < 200) return false;
    }

    return true;
  });

  return (
    <div>
      {/* Hero Section */}
      <section className="py-16 hero-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white">Results & Success Stories</h1>
          <p className="text-xl text-gray-700 dark:text-gray-300">
            Celebrating the success of our students who achieved their UPSC dreams
          </p>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg text-center">
              <div className="text-4xl font-bold text-orange-500 mb-2">500+</div>
              <div className="text-gray-600 dark:text-gray-400">Total Selections</div>
            </div>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg text-center">
              <div className="text-4xl font-bold text-yellow-500 mb-2">50+</div>
              <div className="text-gray-600 dark:text-gray-400">Top 100 Ranks</div>
            </div>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">250+</div>
              <div className="text-gray-600 dark:text-gray-400">IAS Officers</div>
            </div>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg text-center">
              <div className="text-4xl font-bold text-yellow-600 mb-2">15+</div>
              <div className="text-gray-600 dark:text-gray-400">Years Legacy</div>
            </div>
          </div>

          {/* Filter Section */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg mb-8">
            <h2 className="text-2xl font-bold mb-6">Filter Toppers</h2>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select Year</label>
                <div className="flex gap-2">
                  {years.map((year) => (
                    <button
                      key={year}
                      onClick={() => setSelectedYear(year)}
                      className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                        selectedYear === year
                          ? 'bg-orange-500 text-white shadow-lg'
                          : 'bg-gradient-to-br from-amber-100 to-orange-100 text-gray-800 hover:from-amber-200 hover:to-orange-200 shadow-md'
                      }`}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Rank Range</label>
                <select
                  value={selectedRankRange}
                  onChange={(e) => setSelectedRankRange(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-orange-500 focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  {rankRanges.map((range) => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-4 text-gray-600 dark:text-gray-400">
            Showing {filteredToppers.length} toppers from {selectedYear}
          </div>

          {/* Toppers Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredToppers.map((topper, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  {/* Left Side - Video */}
                  <div className="md:w-1/2 bg-gray-900 relative">
                    {playingVideo === index ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${parseYouTubeId(topper.videoUrl)}?autoplay=1&enablejsapi=1&modestbranding=1&rel=0`}
                        title={`${topper.name} success story`}
                        allow="autoplay; encrypted-media; picture-in-picture"
                        allowFullScreen
                        className="w-full h-64 md:h-full"
                      />
                    ) : (
                      <div className="relative w-full h-64 md:h-full group cursor-pointer" onClick={() => setPlayingVideo(index)}>
                        <img 
                          src={topper.videoThumbnail} 
                          alt={`${topper.name} video`} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                          <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                            <svg className="w-8 h-8 text-orange-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                        <div className="absolute bottom-3 left-3 bg-black/70 text-white px-2.5 py-1 rounded-full text-xs">
                          Success Story
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Side - Info */}
                  <div className="md:w-1/2 p-6 flex flex-col justify-between" style={{ background: 'linear-gradient(135deg, #FFE0B2 0%, #FFCC80 50%, #FFB74D 100%)' }}>
                    {/* AIR Badge */}
                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-lg font-bold text-lg text-center mb-4">
                      AIR {topper.rank}
                    </div>

                    {/* Name */}
                    <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                      {topper.name}
                    </h3>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      <div className="bg-white/80 rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold text-orange-600">{topper.journeyMonths}</div>
                        <div className="text-xs text-gray-600 font-semibold">Months</div>
                        <div className="text-xs text-gray-500">JOURNEY</div>
                      </div>
                      <div className="bg-white/80 rounded-lg p-4 text-center flex flex-col justify-center">
                        <div className="text-xl font-bold text-orange-600 leading-tight mb-2">AIR {topper.rank}</div>
                        <div className="text-xs text-gray-600 font-semibold">FINAL RANK</div>
                      </div>
                      <div className="bg-white/80 rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold text-orange-600">{topper.attempt}</div>
                        <div className="text-xs text-gray-600 font-semibold">ATTEMPT</div>
                      </div>
                    </div>

                    {/* Service and Year */}
                    <div className="text-center mb-4">
                      <span className="bg-white/80 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {topper.service} • {topper.year}
                      </span>
                    </div>

                    {/* Testimonial */}
                    <div className="bg-white/60 rounded-lg p-4 mb-4">
                      <p className="text-sm text-gray-700 italic text-center leading-relaxed">
                        "{topper.testimonial}"
                      </p>
                    </div>

                    {/* CTA Button */}
                    <Link
                      href="/contact"
                      className="block text-center bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
                    >
                      Start Your Journey
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results Message */}
          {filteredToppers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">No toppers found for the selected filters.</p>
              <button
                onClick={() => {
                  setSelectedYear('2024');
                  setSelectedRankRange('all');
                }}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* Call to Action Section */}
          <div className="mt-12 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl p-8 text-white text-center shadow-lg">
            <h2 className="text-3xl font-bold mb-4">Be the Next Success Story</h2>
            <p className="text-xl mb-6 text-orange-100">
              Join Amigos IAS and start your journey towards UPSC success
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="bg-white text-orange-500 hover:bg-orange-50 font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
                Enroll Now
              </Link>
              <Link href="/contact" className="border-2 border-white text-white hover:bg-white hover:text-orange-500 font-semibold py-3 px-8 rounded-lg transition-all duration-200">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}