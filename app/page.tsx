import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import MicSection from "./components/MicSection";
import ConnectorSection from "./components/ConnectorSection";
import FullProductSection from "./components/FullProductSection";
import SpecsSection from "./components/SpecsSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <MicSection />
        <ConnectorSection />
        <FullProductSection />
        <SpecsSection />
      </main>
      <Footer />
    </>
  );
}
