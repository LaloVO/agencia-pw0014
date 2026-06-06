import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/home/HeroSection';
import PhilosophySection from '@/components/home/PhilosophySection';
import PropertiesSection from '@/components/home/PropertiesSection';
import AgentsSection from '@/components/home/AgentsSection';
import AIFeatureSection from '@/components/home/AIFeatureSection';
import SmartSearchCTA from '@/components/home/SmartSearchCTA';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Asesor Demo | Asesor Inmobiliario - Propiedades de Lujo en México</title>
        <meta
          name="description"
          content="Descubre propiedades de lujo y preventas residenciales exclusivas en México con la curaduría y asesoría inmobiliaria de alta gama de Asesor Demo."
        />
      </Helmet>

      <Navbar />

      <main>
        <HeroSection />
        <PhilosophySection />
        <PropertiesSection />
        <AIFeatureSection />
        <SmartSearchCTA />
        <AgentsSection />
      </main>

      <Footer />
    </>
  );
};

export default Index;
