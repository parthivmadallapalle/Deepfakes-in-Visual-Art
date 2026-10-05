import { useState, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Detector from '@/components/Detector';
import HowItWorks from '@/components/HowItWorks';
import Dataset from '@/components/Dataset';
import Model from '@/components/Model';
import Performance from '@/components/Performance';
import About from '@/components/About';
import Footer from '@/components/Footer';

function App() {
  const [pendingFile, setPendingFile] = useState<File | null>(null);

  const handleHeroFile = useCallback((file: File) => {
    setPendingFile(file);
    // Smooth scroll to detector section
    setTimeout(() => {
      document.getElementById('detector')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }, []);

  const handleFileConsumed = useCallback(() => {
    setPendingFile(null);
  }, []);

  return (
    <div className="min-h-screen bg-ink-950 text-ink-100 overflow-x-hidden">
      <Navbar />
      <main>
        <Hero onFileSelect={handleHeroFile} />
        <Detector externalFile={pendingFile} onFileConsumed={handleFileConsumed} />
        <HowItWorks />
        <Dataset />
        <Model />
        <Performance />
        <About />
      </main>
      <Footer />
    </div>
  );
}

export default App;
