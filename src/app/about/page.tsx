import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollAnimations from '@/components/ScrollAnimations'
import AboutPageContent from '@/components/pages/AboutPageContent'
import FloatingButtons from '@/components/FloatingButtons'

export const metadata = {
  title: 'About Us - Amigos IAS',
  description: 'Learn more about Amigos IAS - Premier UPSC Coaching Academy',
}

export default function AboutPage() {
  return (
    <>
      <ScrollAnimations />
      <Header />
      <AboutPageContent />
      <Footer />
      <FloatingButtons />
    </>
  )
}
