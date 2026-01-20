import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollAnimations from '@/components/ScrollAnimations'
import ResultsPageContent from '@/components/pages/ResultsPageContent'
import FloatingButtons from '@/components/FloatingButtons'

export const metadata = {
  title: 'Results - Amigos IAS',
  description: 'View our successful results and achievements at Amigos IAS',
}

export default function ResultsPage() {
  return (
    <>
      <ScrollAnimations />
      <Header />
      <ResultsPageContent />
      <Footer />
      <FloatingButtons />
    </>
  )
}