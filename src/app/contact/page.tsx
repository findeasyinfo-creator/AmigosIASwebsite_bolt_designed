import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollAnimations from '@/components/ScrollAnimations'
import ContactPageContent from '@/components/pages/ContactPageContent'

export const metadata = {
  title: 'Contact Us - Amigos IAS',
  description: 'Get in touch with Amigos IAS for admissions and inquiries',
}

export default function ContactPage() {
  return (
    <>
      <ScrollAnimations />
      <Header />
      <ContactPageContent />
      <Footer />
    </>
  )
}