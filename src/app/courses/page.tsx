import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollAnimations from '@/components/ScrollAnimations'
import CoursesPageContent from '@/components/pages/CoursesPageContent'
import FloatingButtons from '@/components/FloatingButtons'

export const metadata = {
  title: 'Courses - Amigos IAS',
  description: 'Explore our comprehensive UPSC courses and programs',
}

export default function CoursesPage() {
  return (
    <>
      <ScrollAnimations />
      <Header />
      <CoursesPageContent />
      <Footer />
      <FloatingButtons />
    </>
  )
}