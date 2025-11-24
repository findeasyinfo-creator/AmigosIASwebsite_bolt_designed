import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollAnimations from '@/components/ScrollAnimations'
import FacultyPageContent from '@/components/pages/FacultyPageContent'
import FloatingButtons from '@/components/FloatingButtons'

export const metadata = {
  title: 'Faculty - Amigos IAS',
  description: 'Meet our experienced faculty members at Amigos IAS',
}

export default function FacultyPage() {
  return (
    <>
      <ScrollAnimations />
      <Header />
      <FacultyPageContent />
      <Footer />
      <FloatingButtons />
    </>
  )
}