'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPageContent() {
  return (
    <div>
      <HeroSection />
      <DirectorMessageSection />
      <FacultySection />
    </div>
  );
}

function HeroSection() {
  return (
      <section className="py-16 hero-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white">About Amigos IAS</h1>
        <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl">
          Building excellence in UPSC preparation with dedication, expertise, and proven results
        </p>
      </div>
    </section>
  );
}

function DirectorMessageSection() {
  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8 text-center">Director's Message</h2>
        
        <div className="bg-white/95 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-shrink-0 mx-auto md:mx-0">
              <div className="relative w-48 h-48">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-400 via-orange-500 to-yellow-600 p-1 shadow-2xl">
                  <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 p-1">
                    <div className="w-full h-full rounded-full overflow-hidden ring-2 ring-yellow-400/50 shadow-inner">
                      <Image
                        src="https://randomuser.me/api/portraits/men/46.jpg"
                        alt="Dr. Rajesh Kumar - Director"
                        width={192}
                        height={192}
                        className="w-full h-full object-cover"
                        priority
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-2">Dr. Rajesh Kumar</h3>
              <p className="text-orange-500 dark:text-yellow-400 mb-4">Founder & Director</p>
              <div className="text-gray-700 dark:text-gray-300 space-y-4 leading-relaxed">
                <p>
                  Dear Aspirants,
                </p>
                <p>
                  For over 15 years, Amigos IAS has been at the forefront of UPSC preparation, guiding thousands of
                  students toward their dream of serving the nation. Our journey has been marked by consistent results,
                  innovative teaching methods, and an unwavering commitment to student success.
                </p>
                <p>
                  <strong>Our Vision:</strong> To be the most trusted and result-oriented UPSC coaching academy, empowering aspirants with knowledge,
                  guidance, and values necessary to serve the nation with distinction.
                </p>
                <p>
                  <strong>Our Mission:</strong> To provide comprehensive, accessible, and personalized UPSC preparation through innovative teaching
                  methodologies, experienced faculty, and continuous mentorship.
                </p>
                <p>
                  <strong>Our Values:</strong> We stand for Excellence in our teaching standards, Integrity in all our practices, 
                  Innovation in our methodologies, and Empowerment of every aspirant to become confident leaders.
                </p>
                <p>
                  We believe that every aspirant has the potential to excel. Our role is to provide the right guidance,
                  resources, and environment to help you realize that potential. With our experienced faculty, comprehensive
                  study materials, and personalized mentorship, we ensure that you are fully prepared for every stage of
                  the UPSC examination.
                </p>
                <p className="font-semibold">
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
  const [selectedFaculty, setSelectedFaculty] = useState<number | null>(null);
  
  const faculty = [
    {
      name: 'Dr. Rajesh Kumar',
      subject: 'History & Culture',
      experience: '15+ Years',
      qualifications: 'PhD in History, MA History',
      achievements: 'Mentored 200+ Toppers',
      image: 'https://randomuser.me/api/portraits/men/46.jpg',
      fullBio: 'Dr. Rajesh Kumar is a distinguished historian with over 15 years of experience in UPSC coaching. His innovative teaching methods and deep understanding of historical patterns have helped hundreds of students crack the UPSC exam. He has authored multiple books on Indian History and Culture, and his lectures are known for their clarity and comprehensive coverage of the syllabus.',
    },
    {
      name: 'Prof. Anjali Sharma',
      subject: 'Geography & Environment',
      experience: '12+ Years',
      qualifications: 'MA Geography, M.Phil',
      achievements: 'Published Author',
      image: 'https://randomuser.me/api/portraits/women/68.jpg',
      fullBio: 'Prof. Anjali Sharma brings 12 years of expertise in teaching Geography and Environmental Studies. Her approach combines theoretical knowledge with current environmental challenges, making complex concepts easy to understand. She has published several research papers on climate change and sustainable development, which adds immense value to her teaching methodology.',
    },
    {
      name: 'Dr. Amit Verma',
      subject: 'Polity & Governance',
      experience: '18+ Years',
      qualifications: 'PhD in Political Science',
      achievements: 'Former Civil Servant',
      image: 'https://randomuser.me/api/portraits/men/54.jpg',
      fullBio: 'Dr. Amit Verma, a former IAS officer, brings real-world governance experience to the classroom. With 18 years of teaching experience, he provides unique insights into the functioning of Indian polity and administration. His practical approach helps students understand constitutional provisions in the context of contemporary governance challenges.',
    },
    {
      name: 'Ms. Priya Singh',
      subject: 'Economy & Development',
      experience: '10+ Years',
      qualifications: 'MA Economics, NET',
      achievements: 'Expert in Economic Analysis',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      fullBio: 'Ms. Priya Singh specializes in Indian Economy and Development issues. Her teaching style simplifies complex economic concepts and relates them to current affairs. With 10 years of experience, she has developed a unique framework for understanding economic policies and their implications, which has been highly appreciated by students.',
    },
    {
      name: 'Dr. Suresh Patel',
      subject: 'Science & Technology',
      experience: '14+ Years',
      qualifications: 'PhD in Physics',
      achievements: 'Research Publications',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      fullBio: 'Dr. Suresh Patel is a renowned physicist who has made Science and Technology accessible to UPSC aspirants. His 14 years of teaching experience includes making complex scientific concepts relevant to current affairs and policy-making. His research work in renewable energy and space technology adds contemporary relevance to his teaching.',
    },
    {
      name: 'Prof. Meera Reddy',
      subject: 'Ethics & Integrity',
      experience: '11+ Years',
      qualifications: 'MA Philosophy, M.Phil',
      achievements: 'Ethics Training Expert',
      image: 'https://randomuser.me/api/portraits/women/65.jpg',
      fullBio: 'Prof. Meera Reddy is a specialist in Ethics, Integrity, and Aptitude. With 11 years of experience, she has developed a comprehensive approach to ethics education that goes beyond textbook knowledge. Her case study-based teaching method helps students develop a strong ethical foundation and critical thinking skills essential for civil services.',
    },
  ];

  const closeFacultyPopup = () => {
    setSelectedFaculty(null);
  };

  return (
    <section id="faculty" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-4 text-center">Our Expert Faculty</h2>
        <p className="text-lg text-gray-700 dark:text-gray-400 text-center mb-12 max-w-3xl mx-auto">
          Learn from experienced educators who have dedicated their careers to UPSC coaching
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {faculty.map((member, index) => (
            <div key={index} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
              <div className="relative w-full h-64 bg-gradient-to-br from-orange-500 to-yellow-500">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">
                  {member.name}
                </h3>
                <p className="text-orange-600 dark:text-yellow-400 font-medium mb-3">{member.subject}</p>
                <div className="space-y-2 text-sm text-gray-700 dark:text-gray-400 mb-4">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-orange-500 dark:text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5z" />
                    </svg>
                    {member.experience}
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-orange-500 dark:text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                    </svg>
                    {member.qualifications}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedFaculty(index)}
                  className="w-full bg-orange-500 hover:bg-orange-600 dark:bg-yellow-500 dark:hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Faculty Detail Popup */}
      {selectedFaculty !== null && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeFacultyPopup}
        >
          <div 
            className="bg-white dark:bg-gray-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Faculty Profile</h3>
              <button
                onClick={closeFacultyPopup}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-3xl leading-none"
              >
                ×
              </button>
            </div>
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-6 mb-6">
                <div className="flex-shrink-0">
                  <img 
                    src={faculty[selectedFaculty].image} 
                    alt={faculty[selectedFaculty].name}
                    className="w-48 h-48 rounded-lg object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{faculty[selectedFaculty].name}</h4>
                  <p className="text-orange-600 dark:text-yellow-400 font-semibold text-lg mb-4">{faculty[selectedFaculty].subject}</p>
                  <div className="space-y-2 text-gray-700 dark:text-gray-300">
                    <p><strong>Experience:</strong> {faculty[selectedFaculty].experience}</p>
                    <p><strong>Qualifications:</strong> {faculty[selectedFaculty].qualifications}</p>
                    <p><strong>Achievements:</strong> {faculty[selectedFaculty].achievements}</p>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h5 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">About</h5>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {faculty[selectedFaculty].fullBio}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* Our Journey section removed as requested */