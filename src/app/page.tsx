import Header from '@/components/Header'
import Marquee from '@/components/Marquee'
import Hero from '@/components/Hero'
import Trusted from '@/components/Trusted'
import Courses from '@/components/Courses'
import Faculty from '@/components/Faculty'
import Testimonials from '@/components/Testimonials'
import Demo from '@/components/Demo'
import Footer from '@/components/Footer'
import ScrollAnimations from '@/components/ScrollAnimations'

export default function Home() {
  return (
    <>
      <ScrollAnimations />
      <Header />
      <Marquee />
      <Hero />
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
      <Footer />
    </>
  )
}
