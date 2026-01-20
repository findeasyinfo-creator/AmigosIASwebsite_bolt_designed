import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollAnimations from '@/components/ScrollAnimations'
import ResourcesPageContent from '@/components/pages/ResourcesPageContent'
import FloatingButtons from '@/components/FloatingButtons'

export const metadata = {
  title: 'Resources & Blog - Amigos IAS',
  description: 'Access study materials, resources, and insights for UPSC preparation',
}

export default function ResourcesPage() {
  return (
    <>
      <ScrollAnimations />
      <Header />
      <ResourcesPageContent />
      <Footer />
      <FloatingButtons />
    </>
  )
}