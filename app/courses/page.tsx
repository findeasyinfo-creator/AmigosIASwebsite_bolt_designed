'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function CoursesPage() {
  const [activeTab, setActiveTab] = useState('all');

  const courses = [
    {
      id: 1,
      title: 'UPSC Prep+ Foundation Course',
      category: 'foundation',
      duration: '12 Months',
      fees: '₹80,000',
      startDate: 'January 2026',
      description: 'Comprehensive foundation course covering entire UPSC syllabus with integrated current affairs',
      features: ['Complete Syllabus Coverage', 'Daily Current Affairs', 'Test Series', 'Study Materials', 'Doubt Clearing Sessions'],
    },
    {
      id: 2,
      title: 'Prelims Intensive Program',
      category: 'prelims',
      duration: '6 Months',
      fees: '₹45,000',
      startDate: 'December 2025',
      description: 'Focused preparation for UPSC Prelims with comprehensive test series and analysis',
      features: ['Subject-wise Classes', '50+ Mock Tests', 'Performance Analysis', 'Revision Classes', 'Previous Year Papers'],
    },
    {
      id: 3,
      title: 'Mains Answer Writing Program',
      category: 'mains',
      duration: '4 Months',
      fees: '₹35,000',
      startDate: 'February 2026',
      description: 'Master the art of answer writing with expert guidance and regular evaluation',
      features: ['Answer Writing Practice', 'Expert Evaluation', 'Model Answers', 'Weekly Tests', 'Personalized Feedback'],
    },
    {
      id: 4,
      title: 'Interview Guidance Program',
      category: 'interview',
      duration: '2 Months',
      fees: '₹25,000',
      startDate: 'March 2026',
      description: 'Comprehensive personality development and mock interview sessions',
      features: ['Mock Interviews', 'Panel Discussions', 'Current Affairs Focus', 'Communication Skills', 'Body Language Training'],
    },
    {
      id: 5,
      title: 'Optional Subject: History',
      category: 'optional',
      duration: '8 Months',
      fees: '₹40,000',
      startDate: 'January 2026',
      description: 'In-depth coverage of History optional with answer writing practice',
      features: ['Complete Syllabus', 'Answer Writing', 'Study Materials', 'Test Series', 'Previous Year Analysis'],
    },
    {
      id: 6,
      title: 'Weekend Batch - Working Professionals',
      category: 'weekend',
      duration: '12 Months',
      fees: '₹75,000',
      startDate: 'January 2026',
      description: 'Flexible weekend classes designed for working professionals',
      features: ['Saturday & Sunday Classes', 'Online Recordings', 'Flexible Schedule', 'Complete Coverage', 'Test Series'],
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-primary-navy to-secondary-blue text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Our Courses</h1>
          <p className="text-xl text-gray-200">
            Choose the right program to accelerate your UPSC preparation journey
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 overflow-x-auto">
          <div className="flex space-x-2 pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`px-6 py-2 rounded-full font-medium whitespace-nowrap transition-all duration-200 ${
                  activeTab === category.id
                    ? 'bg-primary-navy text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <div key={course.id} className="card p-6 flex flex-col hover:scale-[1.02] transition-transform duration-300">
              <div className="mb-4">
                <div className="inline-block px-3 py-1 bg-primary-gold/10 text-primary-gold rounded-full text-sm font-medium mb-3">
                  {course.duration}
                </div>
                <h3 className="text-2xl font-semibold text-primary-navy mb-3">
                  {course.title}
                </h3>
                <p className="text-gray-600 mb-4">{course.description}</p>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-primary-navy mb-2">Key Features:</h4>
                <ul className="space-y-2">
                  {course.features.map((feature, index) => (
                    <li key={index} className="flex items-start text-sm text-gray-600">
                      <svg
                        className="w-5 h-5 text-secondary-green mr-2 flex-shrink-0"
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
                <div className="flex items-center text-sm text-gray-600 mb-3">
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
                <div className="text-3xl font-bold text-primary-navy mb-4">
                  {course.fees}
                </div>
                <div className="flex flex-col space-y-2">
                  <Link
                    href={`/courses/${course.id}`}
                    className="text-center btn-primary"
                  >
                    View Details
                  </Link>
                  <Link
                    href="/admissions"
                    className="text-center btn-outline"
                  >
                    Enroll Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
