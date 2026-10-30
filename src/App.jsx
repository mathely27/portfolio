import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import FooterRuler from './components/FooterRuler';
import SlideHome from './slides/SlideHome';
import SlideProjects from './slides/SlideProjects';
import SlideContact from './slides/SlideContact';

export default function App() {
  const [activeSlide, setActiveSlide] = useState(1); // Default to project section (02 Projects) like reference!
  const totalSlides = 3;

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === 'd') {
        setActiveSlide((curr) => Math.min(totalSlides - 1, curr + 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'a') {
        setActiveSlide((curr) => Math.max(0, curr - 1));
      } else if (e.key === '1') {
        setActiveSlide(0);
      } else if (e.key === '2') {
        setActiveSlide(1);
      } else if (e.key === '3') {
        setActiveSlide(2);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [totalSlides]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-canvas text-[#0f0f12] font-sans select-none">
      {/* Top Navbar */}
      <Navbar activeSlide={activeSlide} setActiveSlide={setActiveSlide} />

      {/* Main Viewport Stage */}
      <main className="main-stage">
        {activeSlide === 0 && (
          <SlideHome
            onExploreProjects={() => setActiveSlide(1)}
            onGoToContact={() => setActiveSlide(2)}
          />
        )}

        {activeSlide === 1 && (
          <SlideProjects />
        )}

        {activeSlide === 2 && (
          <SlideContact />
        )}
      </main>

      {/* Bottom Industrial Ruler & Footer */}
      <FooterRuler />
    </div>
  );
}
