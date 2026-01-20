import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollAnimations from '@/components/ScrollAnimations'
import CurrentAffairsPageContent from '@/components/pages/CurrentAffairsPageContent'
import FloatingButtons from '@/components/FloatingButtons'

export const metadata = {
  title: 'Current Affairs - Amigos IAS',
  description: 'Stay updated with latest current affairs for UPSC preparation',
}

export default function CurrentAffairsPage() {
  return (
    <>
      <ScrollAnimations />
      <Header />
      <CurrentAffairsPageContent />
      <Footer />
      <FloatingButtons />
    </>
  )
}