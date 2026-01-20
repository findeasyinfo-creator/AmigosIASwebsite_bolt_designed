'use client'
import React, { useState } from 'react';
import { useYouTubeAutoPause } from '@/hooks/useYouTubeAutoPause';
import { useDetailedFaculty } from '@/hooks/useDetailedFaculty';

function parseYouTubeId(url: string): string | null {
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
}

export default function FacultyPageContent() {
  const { faculty: facultyMembers, loading, source } = useDetailedFaculty();
  const [selectedFaculty, setSelectedFaculty] = useState<number | null>(null);
  const [playingCard, setPlayingCard] = useState<number | null>(null);
  const [sparkles, setSparkles] = useState<Array<{ id: number; card: number; x: number; y: number; dx: number; dy: number }>>([]);

  // Show data source indicator in console
  React.useEffect(() => {
    if (!loading) {
      console.log(`👨‍🏫 Faculty loaded from: ${source === 'api' ? 'API ✅' : 'Static Data ⚠️'}`);
    }
  }, [loading, source]);

  // Setup auto-pause for videos
  const faculty0 = useYouTubeAutoPause(
    playingCard === 0 ? parseYouTubeId(facultyMembers[0].videoUrl) : null,
    'faculty-video-0'
  );
  const faculty1 = useYouTubeAutoPause(
    playingCard === 1 ? parseYouTubeId(facultyMembers[1].videoUrl) : null,
    'faculty-video-1'
  );
  const faculty2 = useYouTubeAutoPause(
    playingCard === 2 ? parseYouTubeId(facultyMembers[2].videoUrl) : null,
    'faculty-video-2'
  );
  const faculty3 = useYouTubeAutoPause(
    playingCard === 3 ? parseYouTubeId(facultyMembers[3].videoUrl) : null,
    'faculty-video-3'
  );
  const faculty4 = useYouTubeAutoPause(
    playingCard === 4 ? parseYouTubeId(facultyMembers[4].videoUrl) : null,
    'faculty-video-4'
  );
  const faculty5 = useYouTubeAutoPause(
    playingCard === 5 ? parseYouTubeId(facultyMembers[5].videoUrl) : null,
    'faculty-video-5'
  );

  const facultyRefs = [faculty0, faculty1, faculty2, faculty3, faculty4, faculty5];

  const handleCardClick = (index: number, e: React.MouseEvent<HTMLDivElement>) => {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const count = 14;
    const created: Array<{ id:number; card:number; x:number; y:number; dx:number; dy:number }> = [];
    const base = Math.random() * Math.PI * 2;
    for (let i = 0; i < count; i++) {
      const angle = base + (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
      const dist = 70 + Math.random() * 90;
      created.push({
        id: Date.now() + i + Math.floor(Math.random() * 1000),
        card: index,
        x,
        y,
        dx: Math.cos(angle) * dist,
        dy: Math.sin(angle) * dist,
      });
    }
    setSparkles((prev) => [...prev, ...created]);
    setTimeout(() => {
      setSparkles((prev) => prev.filter((s) => !created.some((c) => c.id === s.id)));
    }, 800);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="py-16 hero-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white">Our Expert Faculty</h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Learn from India's top UPSC educators with decades of combined experience and proven track records of success
          </p>
        </div>
      </section>

      {/* Faculty Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facultyMembers.map((faculty, index) => (
              <div key={index} className="group relative">
                <div 
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-[1.02] relative overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-600"
                  onClick={(e) => handleCardClick(index, e)}
                >
                  {/* Video Section */}
                  <div className="relative mb-6 rounded-xl overflow-hidden bg-gradient-to-br from-orange-500 to-red-500 p-1">
                    <div className="bg-black rounded-lg overflow-hidden aspect-video" ref={facultyRefs[index]?.containerRef}>
                      {playingCard === index ? (
                        <iframe
                          id={`faculty-video-${index}`}
                          src={`https://www.youtube.com/embed/${parseYouTubeId(faculty.videoUrl)}?autoplay=1&enablejsapi=1&modestbranding=1&rel=0`}
                          title={`${faculty.name} video`}
                          allow="autoplay; encrypted-media; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full"
                        />
                      ) : (
                        <div className="relative w-full h-full">
                          <img 
                            src={faculty.videoThumbnail} 
                            alt={`${faculty.name} video`} 
                            className="w-full h-full object-cover"
                          />
                          <button 
                            type="button"
                            className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors group"
                            aria-label={`Play ${faculty.name}'s video`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setPlayingCard(index);
                            }}
                          >
                            <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                              <span className="text-orange-600 text-2xl ml-1">▶</span>
                            </div>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Faculty Info */}
                  <div className="flex items-start space-x-4 mb-4">
                    <img 
                      src={faculty.photo} 
                      alt={faculty.name} 
                      className="w-16 h-16 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-1">{faculty.name}</h3>
                      <p className="text-orange-600 dark:text-orange-400 font-semibold mb-1">{faculty.subject}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{faculty.experience}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Qualification</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{faculty.qualification}</p>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Specialization</h4>
                      <div className="flex flex-wrap gap-1">
                        {faculty.specialization.map((spec, idx) => (
                          <span key={idx} className="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-xs rounded-full">
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFaculty(selectedFaculty === index ? null : index);
                    }}
                    className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 text-sm"
                  >
                    {selectedFaculty === index ? 'Show Less' : 'Learn More'}
                  </button>

                  {/* Expanded Details */}
                  {selectedFaculty === index && (
                    <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg space-y-3">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Key Achievements</h4>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          {faculty.achievements.map((achievement, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="text-orange-500 mr-2">•</span>
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="border-t pt-3">
                        <blockquote className="text-sm italic text-gray-600 dark:text-gray-400">
                          "{faculty.quote}"
                        </blockquote>
                      </div>
                    </div>
                  )}

                  {/* Sparkle Animation */}
                  <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                    {sparkles.filter(s => s.card === index).map(s => (
                      <span
                        key={s.id}
                        className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-ping"
                        style={{ 
                          left: s.x, 
                          top: s.y, 
                          transform: `translate(${s.dx}px, ${s.dy}px)`,
                          animationDuration: '0.8s'
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Faculty Section */}
      <section className="py-16 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-gray-800 dark:to-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Why Choose Our Faculty?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our educators bring unparalleled expertise and proven methodologies to your UPSC preparation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: '🎓',
                title: 'Proven Expertise',
                description: 'Decades of combined teaching experience with deep subject knowledge'
              },
              {
                icon: '📊',
                title: 'Track Record',
                description: '1000+ successful candidates mentored to achieve their UPSC dreams'
              },
              {
                icon: '🎯',
                title: 'Personalized Approach',
                description: 'Individual attention and customized study plans for each student'
              },
              {
                icon: '📚',
                title: 'Updated Content',
                description: 'Latest syllabus coverage with current affairs integration'
              }
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold mb-4">Ready to Learn from the Best?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Join our comprehensive UPSC preparation program and get mentored by India's top educators
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
                Book Free Demo Class
              </button>
              <button className="border-2 border-orange-500 text-orange-600 dark:text-orange-400 hover:bg-orange-500 hover:text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200">
                View Course Details
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}