'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ResultsPage() {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedRankRange, setSelectedRankRange] = useState('all');

  const toppers = [
    {
      name: 'Rahul Mehta',
      rank: 24,
      year: 2024,
      service: 'IAS',
      rollNumber: 'RN12345',
      testimonial: 'Amigos IAS provided me with the perfect environment and guidance. The faculty support was exceptional.',
      course: 'UPSC Prep+ Foundation Course',
    },
    {
      name: 'Sneha Patel',
      rank: 156,
      year: 2024,
      service: 'IAS',
      rollNumber: 'RN23456',
      testimonial: 'The test series and answer writing practice helped me immensely in clearing the examination.',
      course: 'Prelims + Mains Combined',
    },
    {
      name: 'Arjun Singh',
      rank: 89,
      year: 2023,
      service: 'IAS',
      rollNumber: 'RN34567',
      testimonial: 'Comprehensive study material and dedicated faculty made all the difference in my preparation.',
      course: 'UPSC Prep+ Foundation Course',
    },
    {
      name: 'Priya Sharma',
      rank: 234,
      year: 2023,
      service: 'IFS',
      rollNumber: 'RN45678',
      testimonial: 'The current affairs module was particularly helpful. Thank you Amigos IAS!',
      course: 'Weekend Batch',
    },
    {
      name: 'Vikram Kumar',
      rank: 67,
      year: 2023,
      service: 'IAS',
      rollNumber: 'RN56789',
      testimonial: 'Expert guidance and regular mock tests prepared me well for the actual examination.',
      course: 'UPSC Prep+ Foundation Course',
    },
    {
      name: 'Anjali Gupta',
      rank: 198,
      year: 2022,
      service: 'IPS',
      rollNumber: 'RN67890',
      testimonial: 'The interview preparation sessions were invaluable in building my confidence.',
      course: 'Interview Guidance Program',
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
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-primary-navy to-secondary-blue text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Our Results</h1>
          <p className="text-xl text-gray-200">
            Celebrating the success of our students who achieved their UPSC dreams
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="card p-6 text-center">
            <div className="text-4xl font-bold text-primary-orange mb-2">500+</div>
            <div className="text-gray-600">Total Selections</div>
          </div>
          <div className="card p-6 text-center">
            <div className="text-4xl font-bold text-secondary-green mb-2">50+</div>
            <div className="text-gray-600">Top 100 Ranks</div>
          </div>
          <div className="card p-6 text-center">
            <div className="text-4xl font-bold text-primary-navy mb-2">250+</div>
            <div className="text-gray-600">IAS Officers</div>
          </div>
          <div className="card p-6 text-center">
            <div className="text-4xl font-bold text-secondary-blue mb-2">15+</div>
            <div className="text-gray-600">Years Legacy</div>
          </div>
        </div>

        <div className="card p-6 mb-8">
          <h2 className="text-2xl font-bold text-primary-navy mb-6">Filter Toppers</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Year</label>
              <div className="flex gap-2">
                {years.map((year) => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                      selectedYear === year
                        ? 'bg-primary-navy text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Rank Range</label>
              <select
                value={selectedRankRange}
                onChange={(e) => setSelectedRankRange(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary-navy focus:outline-none"
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

        <div className="mb-4 text-gray-600">
          Showing {filteredToppers.length} toppers from {selectedYear}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredToppers.map((topper, index) => (
            <div key={index} className="card p-6 hover:scale-[1.02] transition-transform duration-300">
              <div className="text-center mb-4">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary-red via-primary-orange to-primary-yellow flex items-center justify-center text-white text-5xl font-bold">
                  {topper.name.charAt(0)}
                </div>
                <h3 className="text-xl font-semibold text-primary-navy mb-1">
                  {topper.name}
                </h3>
                <div className="inline-block px-4 py-2 bg-primary-navy text-white rounded-full font-bold text-2xl mb-2">
                  AIR {topper.rank}
                </div>
                <div className="text-sm text-gray-600">
                  {topper.service} • {topper.year}
                </div>
              </div>

              <div className="border-t pt-4 mt-4">
                <div className="flex items-start mb-3">
                  <svg className="w-5 h-5 text-primary-orange mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <p className="text-sm text-gray-600 italic">{topper.testimonial}</p>
                </div>
                <div className="text-xs text-gray-500 mb-3">
                  Roll: {topper.rollNumber}
                </div>
                <Link
                  href="/admissions"
                  className="block text-center btn-primary text-sm"
                >
                  Enroll in {topper.course}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredToppers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-4">No toppers found for the selected filters.</p>
            <button
              onClick={() => {
                setSelectedYear('2024');
                setSelectedRankRange('all');
              }}
              className="btn-secondary"
            >
              Reset Filters
            </button>
          </div>
        )}

        <div className="mt-12 card p-8 bg-gradient-to-br from-slate-800 to-slate-900 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Be the Next Success Story</h2>
          <p className="text-xl mb-6 text-gray-200">
            Join Amigos IAS and start your journey towards UPSC success
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/admissions" className="btn-primary">
              Enroll Now
            </Link>
            <Link href="/contact" className="btn-outline border-white text-white hover:bg-white hover:text-primary-navy">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
