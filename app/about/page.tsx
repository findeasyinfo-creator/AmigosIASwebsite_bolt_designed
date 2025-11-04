import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <VisionMissionSection />
      <DirectorMessageSection />
      <FacultySection />
      <TimelineSection />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-primary-navy to-secondary-blue text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">About Amigos IAS</h1>
        <p className="text-xl text-gray-200 max-w-3xl">
          Building excellence in UPSC preparation with dedication, expertise, and proven results
        </p>
      </div>
    </section>
  );
}

function VisionMissionSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="card p-8">
            <div className="text-primary-orange mb-4">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-primary-navy mb-4">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              To be the most trusted and result-oriented UPSC coaching academy, empowering aspirants with knowledge,
              guidance, and values necessary to serve the nation with distinction.
            </p>
          </div>

          <div className="card p-8">
            <div className="text-secondary-green mb-4">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-primary-navy mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              To provide comprehensive, accessible, and personalized UPSC preparation through innovative teaching
              methodologies, experienced faculty, and continuous mentorship.
            </p>
          </div>
        </div>

        <div className="mt-12 card p-8">
          <h2 className="text-3xl font-bold text-primary-navy mb-6 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { title: 'Excellence', description: 'Commitment to highest standards' },
              { title: 'Integrity', description: 'Honesty in all our practices' },
              { title: 'Innovation', description: 'Modern teaching methodologies' },
              { title: 'Empowerment', description: 'Building confident leaders' },
            ].map((value, index) => (
              <div key={index} className="text-center">
                <h3 className="text-xl font-semibold text-primary-navy mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function DirectorMessageSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-primary-navy mb-8 text-center">Director's Message</h2>
        <div className="card p-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-shrink-0">
              <div className="w-48 h-48 rounded-full bg-gradient-to-br from-primary-orange to-primary-red flex items-center justify-center text-white text-6xl font-bold">
                R
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-primary-navy mb-2">Dr. Rajesh Kumar</h3>
              <p className="text-primary-orange mb-4">Founder & Director</p>
              <div className="text-gray-600 space-y-4 leading-relaxed">
                <p>
                  Dear Aspirants,
                </p>
                <p>
                  For over 15 years, Amigos IAS has been at the forefront of UPSC preparation, guiding thousands of
                  students toward their dream of serving the nation. Our journey has been marked by consistent results,
                  innovative teaching methods, and an unwavering commitment to student success.
                </p>
                <p>
                  We believe that every aspirant has the potential to excel. Our role is to provide the right guidance,
                  resources, and environment to help you realize that potential. With our experienced faculty, comprehensive
                  study materials, and personalized mentorship, we ensure that you are fully prepared for every stage of
                  the UPSC examination.
                </p>
                <p className="font-semibold text-primary-navy">
                  Wishing you success in your UPSC journey!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FacultySection() {
  const faculty = [
    {
      name: 'Dr. Rajesh Kumar',
      subject: 'History & Culture',
      experience: '15+ Years',
      qualifications: 'PhD in History, MA History',
      achievements: 'Mentored 200+ Toppers',
    },
    {
      name: 'Prof. Anjali Sharma',
      subject: 'Geography & Environment',
      experience: '12+ Years',
      qualifications: 'MA Geography, M.Phil',
      achievements: 'Published Author',
    },
    {
      name: 'Dr. Amit Verma',
      subject: 'Polity & Governance',
      experience: '18+ Years',
      qualifications: 'PhD in Political Science',
      achievements: 'Former Civil Servant',
    },
    {
      name: 'Ms. Priya Singh',
      subject: 'Economy & Development',
      experience: '10+ Years',
      qualifications: 'MA Economics, NET',
      achievements: 'Expert in Economic Analysis',
    },
    {
      name: 'Dr. Suresh Patel',
      subject: 'Science & Technology',
      experience: '14+ Years',
      qualifications: 'PhD in Physics',
      achievements: 'Research Publications',
    },
    {
      name: 'Prof. Meera Reddy',
      subject: 'Ethics & Integrity',
      experience: '11+ Years',
      qualifications: 'MA Philosophy, M.Phil',
      achievements: 'Ethics Training Expert',
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-primary-navy mb-4 text-center">Our Expert Faculty</h2>
        <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
          Learn from experienced educators who have dedicated their careers to UPSC coaching
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {faculty.map((member, index) => (
            <div key={index} className="card p-6 hover:scale-[1.02] transition-transform duration-300">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary-orange to-primary-red flex items-center justify-center text-white text-5xl font-bold">
                {member.name.charAt(0)}
              </div>
              <h3 className="text-xl font-semibold text-primary-navy mb-1 text-center">
                {member.name}
              </h3>
              <p className="text-primary-orange font-medium mb-3 text-center">{member.subject}</p>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-secondary-green" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5z" />
                  </svg>
                  {member.experience}
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-secondary-green" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>
                  {member.qualifications}
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-secondary-green" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {member.achievements}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineSection() {
  const milestones = [
    { year: '2010', event: 'Amigos IAS Academy founded', description: 'Started with a vision to provide quality UPSC coaching' },
    { year: '2012', event: 'First 100 selections', description: 'Achieved significant milestone in student success' },
    { year: '2015', event: 'Expanded to multiple centers', description: 'Opened new branches to reach more aspirants' },
    { year: '2018', event: 'Launched online platform', description: 'Made quality education accessible nationwide' },
    { year: '2020', event: '500+ total selections', description: 'Continued excellence in results' },
    { year: '2024', event: '15 years of excellence', description: 'Celebrating a legacy of success and innovation' },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-primary-navy mb-12 text-center">Our Journey</h2>
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary-orange"></div>
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="relative pl-20">
                <div className="absolute left-0 w-16 h-16 bg-primary-navy rounded-full flex items-center justify-center text-white font-bold">
                  {milestone.year}
                </div>
                <div className="card p-6">
                  <h3 className="text-xl font-semibold text-primary-navy mb-2">{milestone.event}</h3>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
