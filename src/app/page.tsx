import Header from '@/components/Header'
import Marquee from '@/components/Marquee'
import Hero from '@/components/Hero'
import Stats from '@/components/Stats'
import Trusted from '@/components/Trusted'
import Courses from '@/components/Courses'
import Faculty from '@/components/Faculty'
import Testimonials from '@/components/Testimonials'
import Demo from '@/components/Demo'
import LatestCurrentAffairs from '@/components/LatestCurrentAffairs'
import Footer from '@/components/Footer'
import ScrollAnimations from '@/components/ScrollAnimations'
import FloatingButtons from '@/components/FloatingButtons'

export default function Home() {
  return (
    <div style={{ width: '100%', maxWidth: '100vw', overflowX: 'hidden' }}>
      <ScrollAnimations />
      <Header />
      <Marquee />
      <Hero />
      {/* Removed divider between Hero and Stats */}
      <Stats />
      <div className="section-divider" />
      <Trusted />
      <div className="section-divider" />
      <Courses />
      <div className="section-divider" />
      <Faculty />
      <div className="section-divider" />
      <Testimonials />
      <div className="section-divider" />
      <Demo />
      <div className="section-divider" />
      <LatestCurrentAffairs />
      <Footer />
      <FloatingButtons />
    </div>
  )
}
