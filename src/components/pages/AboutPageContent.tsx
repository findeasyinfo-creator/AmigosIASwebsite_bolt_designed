'use client'
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useDetailedFaculty } from '@/hooks/useDetailedFaculty';

export default function AboutPageContent() {
  return (
    <div>
      <HeroSection />
      <div className="bg-white dark:bg-gray-900">
        <DirectorMessageSection />
        <ChiefAdviserSection />
      </div>
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
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section className="py-20 relative" ref={sectionRef}>
      <style>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes expandHeight {
          from {
            height: 0;
          }
          to {
            height: 380px;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fillCircle1 {
          from {
            stroke-dasharray: 502.4 502.4;
            stroke-dashoffset: 502.4;
          }
          to {
            stroke-dasharray: 502.4 502.4;
            stroke-dashoffset: 0;
          }
        }

        @keyframes fillCircle2 {
          from {
            stroke-dasharray: 502.4 502.4;
            stroke-dashoffset: 502.4;
          }
          to {
            stroke-dasharray: 502.4 502.4;
            stroke-dashoffset: 0;
          }
        }

        .director-image {
          animation: slideInLeft 1s ease-out;
        }

        .director-content {
          animation: slideInRight 1s ease-out;
        }

        .director-content p {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .director-content p:nth-child(1) { animation-delay: 0.1s; }
        .director-content p:nth-child(2) { animation-delay: 0.2s; }
        .director-content p:nth-child(3) { animation-delay: 0.3s; }
        .director-content p:nth-child(4) { animation-delay: 0.4s; }
        .director-content p:nth-child(5) { animation-delay: 0.5s; }

        .orange-bar-divider {
          animation: expandHeight 1s ease-out forwards;
        }

        .circle-progress-1.animate circle:nth-of-type(2) {
          animation: fillCircle1 2s ease-in-out forwards 0.6s;
        }

        .circle-progress-2.animate circle:nth-of-type(2) {
          animation: fillCircle2 2s ease-in-out forwards 0.8s;
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center relative">
          {/* Animated Orange Bar Divider */}
          <div className="hidden lg:block absolute left-1/2 top-0 transform -translate-x-1/2 w-8 bg-orange-500 orange-bar-divider" style={{ height: isVisible ? '380px' : '0px', opacity: isVisible ? 1 : 0 }}></div>

          {/* Left side - Content */}
          <div className="director-content lg:border-l-8 lg:border-orange-500 lg:pl-12">
            <div>
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 dark:text-white mb-6 leading-tight">
                Meet Our<br />Chairman
              </h2>

              <div className="relative w-full max-w-sm mx-auto my-6 lg:hidden">
                <Image
                  src="/assets/director.png"
                  alt="Musku Ramana Reddy - Chairman"
                  width={420}
                  height={520}
                  className="w-full h-auto object-contain"
                  priority
                />
                <div className="absolute bottom-0 left-1/2 w-3/4 h-12 bg-gradient-to-r from-transparent via-black/20 to-transparent blur-xl -translate-x-1/2 transform" />
              </div>

              <h3 className="text-3xl sm:text-4xl font-bold text-orange-500 dark:text-orange-400 mb-3">
                Musku Ramana Reddy
              </h3>

              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed mb-6 max-w-2xl font-medium">
                Amigos IAS is a trusted institution committed to shaping aspirants into future civil servants by upholding the values of Trust, Quality, and Support. More than just a coaching center, Amigos IAS is a transformative space where ambition meets guidance, and preparation meets purpose.
              </p>

              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed mb-6 max-w-2xl">
                We believe that trust is the foundation of every meaningful relationship. At Amigos, we earn this trust through transparency, honesty, and unwavering integrity in every interaction—with students, parents, and the larger aspirant community.
              </p>

              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed mb-6 max-w-2xl">
                Our commitment to quality is reflected in everything we do—from well-researched study materials and innovative teaching methods to experienced faculty and personalized mentoring. Every module is designed to meet the evolving needs of UPSC preparation while fostering deeper understanding and critical thinking.
              </p>

              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed mb-6 max-w-2xl">
                What truly sets us apart is the support we offer beyond the classroom. We recognize that UPSC is not just an academic journey but also a test of emotional strength and resilience. That's why we walk alongside our students, offering constant motivation, personalized care, and mentorship tailored to each individual's unique challenges.
              </p>

              <p className="text-gray-700 dark:text-gray-200 text-sm sm:text-base leading-relaxed mb-10 max-w-2xl font-semibold">
                At Amigos IAS, we go beyond coaching—we nurture potential, instill values, and build confidence. Whether you're just beginning your journey or pushing through the final mile, you'll find a team that believes in your dream as much as you do.
              </p>

              {/* Circular Progress Badges */}
              <div className="flex flex-wrap gap-10">
                <div className={`relative flex items-center justify-center circle-progress-1 ${isVisible ? 'animate' : ''}`}>
                  <svg className="w-32 h-32" viewBox="0 0 180 180">
                    <circle cx="90" cy="90" r="80" fill="none" stroke="#e5e7eb" strokeWidth="16" />
                    <circle cx="90" cy="90" r="80" fill="none" stroke="#1f2937" strokeWidth="16" strokeDasharray="502.4 502.4" strokeDashoffset="502.4" strokeLinecap="round" transform="rotate(-90 90 90)" className="dark:stroke-gray-700" />
                  </svg>
                  <div className="absolute flex items-center justify-center">
                    <span className="text-center font-bold text-gray-900 dark:text-white text-sm">Leadership</span>
                  </div>
                </div>

                <div className={`relative flex items-center justify-center circle-progress-2 ${isVisible ? 'animate' : ''}`}>
                  <svg className="w-32 h-32" viewBox="0 0 180 180">
                    <circle cx="90" cy="90" r="80" fill="none" stroke="#e5e7eb" strokeWidth="16" />
                    <circle cx="90" cy="90" r="80" fill="none" stroke="#1f2937" strokeWidth="16" strokeDasharray="502.4 502.4" strokeDashoffset="502.4" strokeLinecap="round" transform="rotate(-90 90 90)" className="dark:stroke-gray-700" />
                  </svg>
                  <div className="absolute flex items-center justify-center">
                    <span className="text-center font-bold text-gray-900 dark:text-white text-sm">Traction</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Image */}
          <div className="director-image hidden lg:flex items-center justify-start lg:justify-center lg:order-2 lg:-mt-32">
            <div className="relative">
              <Image
                src="/assets/director.png"
                alt="Musku Ramana Reddy - Chairman"
                width={550}
                height={750}
                className="w-full max-w-lg h-auto object-contain relative z-10"
                priority
              />
              {/* Shadow underneath */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-20 bg-gradient-to-r from-transparent via-black/20 to-transparent blur-2xl -z-0"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ChiefAdviserSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section className="pt-10 pb-16 sm:py-20 border-t border-gray-200 dark:border-gray-800 relative" ref={sectionRef}>
      <style>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes expandHeight {
          from {
            height: 0;
          }
          to {
            height: 380px;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fillCircle3 {
          from {
            stroke-dasharray: 502.4 502.4;
            stroke-dashoffset: 502.4;
          }
          to {
            stroke-dasharray: 502.4 502.4;
            stroke-dashoffset: 0;
          }
        }

        @keyframes fillCircle4 {
          from {
            stroke-dasharray: 502.4 502.4;
            stroke-dashoffset: 502.4;
          }
          to {
            stroke-dasharray: 502.4 502.4;
            stroke-dashoffset: 0;
          }
        }

        .adviser-image {
          animation: slideInLeft 1s ease-out;
        }

        .adviser-content {
          animation: slideInRight 1s ease-out;
        }

        .orange-bar-divider {
          animation: expandHeight 1s ease-out forwards;
        }

        .adviser-content p {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }

        .adviser-content p:nth-of-type(1) {
          animation-delay: 0.1s;
        }

        .adviser-content p:nth-of-type(2) {
          animation-delay: 0.2s;
        }

        .adviser-content p:nth-of-type(3) {
          animation-delay: 0.3s;
        }

        .adviser-content p:nth-of-type(4) {
          animation-delay: 0.4s;
        }

        .circle-progress-3.animate circle:nth-of-type(2) {
          animation: fillCircle3 2s ease-in-out forwards 0.6s;
        }

        .circle-progress-4.animate circle:nth-of-type(2) {
          animation: fillCircle4 2s ease-in-out forwards 0.8s;
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center relative">
          {/* Animated Orange Bar Divider */}
          <div className="hidden lg:block absolute right-1/2 top-0 transform translate-x-1/2 w-8 bg-orange-500 orange-bar-divider" style={{ height: isVisible ? '380px' : '0px', opacity: isVisible ? 1 : 0 }}></div>

          {/* Left side - Image */}
          <div className="adviser-image hidden lg:flex items-center justify-center">
            <div className="relative">
              <Image
                src="/assets/advisor.png"
                alt="GHP Raju IPS - Chief Advisor"
                width={550}
                height={750}
                className="w-full max-w-lg h-auto object-contain relative z-10"
              />
              {/* Shadow underneath */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-20 bg-gradient-to-r from-transparent via-black/20 to-transparent blur-2xl -z-0"></div>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="adviser-content lg:border-l-8 lg:border-orange-500 lg:pl-12">
            <div>
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 dark:text-white mb-6 leading-tight">
                Meet Our Chief<br />Advisor
              </h2>

              <div className="relative w-full max-w-sm h-72 sm:h-80 mx-auto mt-2 mb-5 overflow-hidden rounded-xl lg:hidden">
                <Image
                  src="/assets/advisor.png"
                  alt="GHP Raju IPS - Chief Advisor"
                  width={420}
                  height={520}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute bottom-0 left-1/2 w-3/4 h-12 bg-gradient-to-r from-transparent via-black/20 to-transparent blur-xl -translate-x-1/2 transform hidden lg:block" />
              </div>

              <h3 className="text-3xl sm:text-4xl font-bold text-orange-500 dark:text-orange-400 mb-6">
                GHP Raju IPS (Retd)
              </h3>

              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed mb-6 max-w-2xl">
                To every UPSC aspirant walking this extraordinary path—remember that you are preparing not just for an exam, but for a lifetime of service, impact, and purpose. The UPSC journey demands courage, endurance, and unshakeable belief, and yet you choose to rise every single day. That choice itself sets you apart.
              </p>

              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed mb-6 max-w-2xl">
                There will be moments of doubt, stretches of exhaustion, and days when the goal feels distant. But it is in these very moments that true character is forged. Every hour of study, every failure you rise from, every concept you master is building a mind capable of leading a nation and a soul ready to serve its people.
              </p>

              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed mb-6 max-w-2xl">
                At Amigos IAS, we stand firmly by your side—where trust is earned through honesty and dedication, quality is delivered through relentless excellence, and support remains unwavering, no matter how tough the journey becomes. You are not just preparing for an exam; you are preparing to become a beacon of hope for millions.
              </p>

              <p className="text-gray-700 dark:text-gray-200 text-sm sm:text-base leading-relaxed mb-10 max-w-2xl font-semibold">
                Keep moving with discipline. Keep believing with conviction. Keep dreaming with courage. You carry within you the strength to create change, the intellect to solve problems, and the heart to serve India with integrity. Your dream is powerful. And so are you.
              </p>

              {/* Circular Progress Badges */}
              <div className="flex flex-wrap gap-10">
                <div className={`relative flex items-center justify-center circle-progress-3 ${isVisible ? 'animate' : ''}`}>
                  <svg className="w-32 h-32" viewBox="0 0 180 180">
                    <circle cx="90" cy="90" r="80" fill="none" stroke="#e5e7eb" strokeWidth="16" />
                    <circle cx="90" cy="90" r="80" fill="none" stroke="#1f2937" strokeWidth="16" strokeDasharray="502.4 502.4" strokeDashoffset="502.4" strokeLinecap="round" transform="rotate(-90 90 90)" className="dark:stroke-gray-700" />
                  </svg>
                  <div className="absolute flex items-center justify-center">
                    <span className="text-center font-bold text-gray-900 dark:text-white text-sm">Excellence</span>
                  </div>
                </div>

                <div className={`relative flex items-center justify-center circle-progress-4 ${isVisible ? 'animate' : ''}`}>
                  <svg className="w-32 h-32" viewBox="0 0 180 180">
                    <circle cx="90" cy="90" r="80" fill="none" stroke="#e5e7eb" strokeWidth="16" />
                    <circle cx="90" cy="90" r="80" fill="none" stroke="#1f2937" strokeWidth="16" strokeDasharray="502.4 502.4" strokeDashoffset="502.4" strokeLinecap="round" transform="rotate(-90 90 90)" className="dark:stroke-gray-700" />
                  </svg>
                  <div className="absolute flex items-center justify-center">
                    <span className="text-center font-bold text-gray-900 dark:text-white text-sm">Innovation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FacultySection() {
  const { faculty: apiFaculty, loading, source } = useDetailedFaculty();
  const [selectedFaculty, setSelectedFaculty] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  // Show data source indicator in console
  React.useEffect(() => {
    if (!loading) {
      console.log(`👨‍🏫 About Page Faculty loaded from: ${source === 'api' ? 'API ✅' : 'Static Data ⚠️'}`);
    }
  }, [loading, source]);

  // Map API faculty data to match the component's format
  const faculty = apiFaculty.map(member => ({
    name: member.name,
    subject: member.subject,
    experience: member.experience,
    qualifications: member.qualification || 'UPSC Expert',
    achievements: member.achievements?.[0] || 'Experienced Educator',
    image: member.photo,
    fullBio: member.quote || 'An experienced educator dedicated to UPSC coaching excellence.',
  }));

  const openFaculty = (index: number) => {
    setSelectedFaculty(index);
    try {
      window.location.hash = 'faculty-modal';
    } catch {}
    setTimeout(() => {
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      closeBtnRef.current?.focus();
    }, 0);
  };

  const closeFacultyPopup = () => {
    setSelectedFaculty(null);
    try {
      const { pathname, search } = window.location;
      window.history.replaceState(null, '', `${pathname}${search}`);
    } catch {}
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeFacultyPopup();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <section id="faculty" className="py-16 relative" ref={sectionRef}>
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
                  onClick={() => openFaculty(index)}
                  className="w-full bg-orange-500 hover:bg-orange-600 dark:bg-yellow-500 dark:hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedFaculty !== null && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center p-4 overflow-auto"
          aria-modal="true"
          role="dialog"
          id="faculty-modal"
        >
          {/* Full viewport backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={closeFacultyPopup}
          />
          {/* Centered popup card with full visibility */}
          <div className="relative z-50 w-full max-w-2xl my-auto rounded-2xl bg-white dark:bg-gray-800 shadow-2xl border border-orange-200 dark:border-yellow-600 overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white">Faculty Profile</h4>
              <button
                onClick={closeFacultyPopup}
                aria-label="Close"
                className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100 text-3xl leading-none"
                ref={closeBtnRef}
              >
                ×
              </button>
            </div>
            <div className="p-6">
              {selectedFaculty !== null && (
                <div className="flex flex-col md:flex-row gap-6 mb-6">
                  <div className="flex-shrink-0">
                    <img
                      src={faculty[selectedFaculty].image}
                      alt={faculty[selectedFaculty].name}
                      className="w-48 h-48 rounded-lg object-cover shadow-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <h5 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{faculty[selectedFaculty].name}</h5>
                    <p className="text-lg text-orange-600 dark:text-yellow-400 font-semibold mb-3">{faculty[selectedFaculty].subject}</p>
                    <div className="space-y-2 text-gray-700 dark:text-gray-300">
                      <p><strong>Experience:</strong> {faculty[selectedFaculty].experience}</p>
                      <p><strong>Qualifications:</strong> {faculty[selectedFaculty].qualifications}</p>
                      <p><strong>Achievements:</strong> {faculty[selectedFaculty].achievements}</p>
                    </div>
                  </div>
                </div>
              )}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h6 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">About</h6>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
                  {selectedFaculty !== null ? faculty[selectedFaculty].fullBio : ''}
                </p>
              </div>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-4 flex justify-end gap-3 flex-shrink-0 bg-gray-50 dark:bg-gray-900">
              <button
                onClick={closeFacultyPopup}
                className="px-6 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}

/* Our Journey section removed as requested */