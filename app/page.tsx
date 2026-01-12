import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import StatsSection from '@/components/StatsSection'
import AboutSection from '@/components/AboutSection'
import RecommendCases from '@/components/RecommendCases'
import OnlineSection from '@/components/OnlineSection'
import PointsSection from '@/components/PointsSection'
import FAQSection from '@/components/FAQSection'
import ConsultationForm from '@/components/ConsultationForm'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <RecommendCases />
      <OnlineSection />
      <PointsSection />
      <FAQSection />
      <ConsultationForm />
      <Footer />
    </main>
  )
}
