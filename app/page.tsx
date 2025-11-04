import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="w-full">
      <HeroSection />
      <WhyChooseSection />
      <CoursesSection />
      <FacultySection />
      <TestimonialsSection />
      <AnnouncementsSection />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 text-white py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary-orange/20 to-primary-red/20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Your UPSC Journey <br />
            <span className="text-primary-yellow">Starts Here</span>
          </h1>
          <p className="text-xl sm:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
            Excellence in Education, Commitment to Success
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link href="/admissions" className="btn-primary">
              Join Now
            </Link>
            <Link href="/contact" className="btn-secondary">
              Enquire
            </Link>
            <Link
              href="/resources"
              className="btn-outline border-white text-white hover:bg-white hover:text-primary-navy"
            >
              Download Brochure
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-16">
            <StatCard number="500+" label="Selections" />
            <StatCard number="50+" label="Top 100 Ranks" />
            <StatCard number="15+" label="Years Experience" />
            <StatCard number="10,000+" label="Students Trained" />
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="bg-white/98 rounded-xl p-6 hover:bg-white transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 border border-gray-100">
      <div className="text-3xl font-bold text-primary-orange mb-2">{number}</div>
      <div className="text-sm text-primary-navy font-semibold">{label}</div>
    </div>
  );
}

function WhyChooseSection() {
  const benefits = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
      title: 'Comprehensive Curriculum',
      description: 'Complete coverage of UPSC syllabus with updated study materials',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      title: 'Expert Faculty',
      description: 'Learn from experienced educators with proven track records',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: 'Proven Results',
      description: 'Consistent track record of producing UPSC toppers',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: 'Regular Updates',
      description: 'Daily current affairs and latest exam pattern analysis',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      ),
      title: 'Test Series',
      description: 'Comprehensive test series with detailed performance analysis',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      ),
      title: 'Personalized Guidance',
      description: 'Individual attention and mentorship for every student',
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-navy mb-4">
            Why Choose Amigos IAS?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We provide comprehensive preparation with a proven methodology that has helped
            hundreds achieve their UPSC dreams
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="card p-6 hover:scale-105 transition-transform duration-300"
            >
              <div className="text-primary-orange mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-semibold text-primary-navy mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CoursesSection() {
  const courses = [
    {
      title: 'UPSC Prep+ Foundation',
      description: 'Comprehensive foundation course for UPSC aspirants',
      duration: '12 Months',
      startDate: 'January 2026',
      fees: '₹80,000',
    },
    {
      title: 'Prelims Intensive',
      description: 'Focused preparation for UPSC Prelims examination',
      duration: '6 Months',
      startDate: 'December 2025',
      fees: '₹45,000',
    },
    {
      title: 'Mains Answer Writing',
      description: 'Master the art of answer writing for Mains',
      duration: '4 Months',
      startDate: 'February 2026',
      fees: '₹35,000',
    },
    {
      title: 'Interview Guidance',
      description: 'Personality development and mock interviews',
      duration: '2 Months',
      startDate: 'March 2026',
      fees: '₹25,000',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-navy mb-2">
              Our Courses
            </h2>
            <p className="text-lg text-gray-600">
              Choose the right program for your UPSC journey
            </p>
          </div>
          <Link href="/courses" className="btn-outline hidden md:block">
            View All Courses
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course, index) => (
            <div key={index} className="card p-6 flex flex-col">
              <div className="mb-4">
                <div className="inline-block px-3 py-1 bg-primary-orange/10 text-primary-orange rounded-full text-sm font-medium mb-3">
                  {course.duration}
                </div>
                <h3 className="text-xl font-semibold text-primary-navy mb-2">
                  {course.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{course.description}</p>
              </div>

              <div className="mt-auto space-y-2">
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
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  Starts: {course.startDate}
                </div>
                <div className="text-2xl font-bold text-primary-navy mb-3">
                  {course.fees}
                </div>
                <Link
                  href={`/courses/${index + 1}`}
                  className="block text-center btn-primary w-full"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 md:hidden">
          <Link href="/courses" className="btn-outline">
            View All Courses
          </Link>
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
      image: '/placeholder-faculty.jpg',
    },
    {
      name: 'Prof. Anjali Sharma',
      subject: 'Geography & Environment',
      experience: '12+ Years',
      image: '/placeholder-faculty.jpg',
    },
    {
      name: 'Dr. Amit Verma',
      subject: 'Polity & Governance',
      experience: '18+ Years',
      image: '/placeholder-faculty.jpg',
    },
    {
      name: 'Ms. Priya Singh',
      subject: 'Economy & Development',
      experience: '10+ Years',
      image: '/placeholder-faculty.jpg',
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-navy mb-4">
            Our Expert Faculty
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Learn from the best educators with decades of UPSC coaching experience
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {faculty.map((member, index) => (
            <div
              key={index}
              className="card p-6 text-center hover:scale-105 transition-transform duration-300"
            >
              <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary-orange to-primary-red flex items-center justify-center text-white text-4xl font-bold">
                {member.name.charAt(0)}
              </div>
              <h3 className="text-xl font-semibold text-primary-navy mb-1">
                {member.name}
              </h3>
              <p className="text-primary-orange font-medium mb-2">{member.subject}</p>
              <p className="text-sm text-gray-600">{member.experience}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/about" className="btn-secondary">
            Meet All Faculty
          </Link>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Rahul Mehta',
      rank: 'AIR 24',
      year: '2024',
      quote:
        'The guidance and support from Amigos IAS faculty was instrumental in my success. The structured approach and regular feedback helped me improve consistently.',
    },
    {
      name: 'Sneha Patel',
      rank: 'AIR 156',
      year: '2024',
      quote:
        'The test series and answer writing practice at Amigos IAS gave me the edge I needed. The current affairs module was particularly helpful.',
    },
    {
      name: 'Arjun Singh',
      rank: 'AIR 89',
      year: '2023',
      quote:
        'Excellent faculty, comprehensive study material, and a motivating environment. Amigos IAS truly delivers on its promise of excellence.',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-navy mb-4">
            Success Stories
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from our toppers who achieved their UPSC dreams
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="card p-8">
              <div className="text-primary-orange mb-4">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-gray-600 mb-6 italic">{testimonial.quote}</p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary-green to-secondary-blue flex items-center justify-center text-white font-bold text-lg mr-4">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-primary-navy">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.rank} - {testimonial.year}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/results" className="btn-outline">
            View All Results
          </Link>
        </div>
      </div>
    </section>
  );
}

function AnnouncementsSection() {
  const announcements = [
    {
      title: 'New Batch Starting',
      description: 'UPSC Prep+ Foundation Course - January 2026',
      date: 'December 15, 2025',
      type: 'Batch',
    },
    {
      title: 'Free Demo Class',
      description: 'Register for a free demo class this weekend',
      date: 'Every Saturday',
      type: 'Demo',
    },
    {
      title: 'Interview Workshop',
      description: 'Personality development and mock interview sessions',
      date: 'January 10, 2026',
      type: 'Workshop',
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-primary-navy">
            Latest Announcements
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Stay updated with our latest batches, events, and opportunities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {announcements.map((announcement, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 hover:shadow-2xl transition-all duration-300 border-l-4 border-primary-orange transform hover:-translate-y-1"
            >
              <div className="inline-block px-3 py-1 bg-gradient-to-r from-primary-yellow to-yellow-400 text-primary-navy rounded-full text-sm font-semibold mb-3 shadow-sm">
                {announcement.type}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-primary-navy">{announcement.title}</h3>
              <p className="text-gray-700 mb-4">{announcement.description}</p>
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
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {announcement.date}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/contact"
            className="btn-primary"
          >
            Register Now
          </Link>
        </div>
      </div>
    </section>
  );
}
