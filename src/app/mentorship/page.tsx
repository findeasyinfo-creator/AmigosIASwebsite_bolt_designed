import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollAnimations from '@/components/ScrollAnimations'

export const metadata = {
  title: 'Mentorship Program - Amigos IAS',
  description: 'Personalized mentorship for UPSC aspirants - Coming Soon',
}

export default function MentorshipPage() {
  return (
    <>
      <ScrollAnimations />
      <Header />
      <div className="min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="min-h-[600px] flex items-center justify-center p-8">
            <div className="max-w-3xl w-full relative">
              {/* Gradient background card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-600 via-orange-500 to-red-500 animate-gradient-shift"></div>
                
                {/* Overlay pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px'}}></div>
                </div>
                
                {/* Content */}
                <div className="relative z-10 p-12 text-center text-white">
                  {/* Icon */}
                  <div className="mb-6 flex justify-center">
                    <div className="w-28 h-28 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <svg className="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Title */}
                  <h1 className="text-5xl font-bold mb-4">Mentorship Program</h1>
                  
                  {/* Coming Soon Badge */}
                  <div className="inline-block bg-white/30 backdrop-blur-md px-8 py-3 rounded-full mb-8">
                    <span className="text-xl font-semibold tracking-wide">COMING SOON</span>
                  </div>
                  
                  {/* Description */}
                  <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
                    Get personalized guidance from experienced mentors who have successfully cleared UPSC exams.
                    One-on-one sessions, strategy planning, and continuous support throughout your preparation journey.
                  </p>
                  
                  {/* Features */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                      <div className="text-3xl mb-2">🎯</div>
                      <div className="font-semibold mb-1">Personalized Strategy</div>
                      <div className="text-white/80">Tailored study plans</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                      <div className="text-3xl mb-2">👨‍🏫</div>
                      <div className="font-semibold mb-1">Expert Mentors</div>
                      <div className="text-white/80">UPSC veterans guide you</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                      <div className="text-3xl mb-2">📊</div>
                      <div className="font-semibold mb-1">Progress Tracking</div>
                      <div className="text-white/80">Monitor your growth</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                      <div className="text-3xl mb-2">💪</div>
                      <div className="font-semibold mb-1">Continuous Support</div>
                      <div className="text-white/80">Available when you need</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
