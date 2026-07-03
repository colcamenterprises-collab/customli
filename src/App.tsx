import { useEffect, useRef } from 'react';
import { BottomNav } from './components/BottomNav';
import { CopyrightBar } from './components/CopyrightBar';
import { Footer } from './components/Footer';
import { Marquee } from './components/Marquee';
import { PartnerSection } from './components/PartnerSection';
import { PricingSection } from './components/PricingSection';
import { ProjectsSection } from './components/ProjectsSection';
import { TestimonialCarousel } from './components/TestimonialCarousel';
import { TestimonialSection } from './components/TestimonialSection';

const logos = ['Vortex', 'Nimbus', 'Prysma', 'Cirrus', 'Kynder', 'Halcyn'];
const heroVideoSrc =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_065045_c44942da-53c6-4804-b734-f9e07fc22e08.mp4';

export function App() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return undefined;
    }

    let frameId = 0;
    let replayTimeout = 0;
    let stopped = false;

    const renderOpacity = () => {
      if (stopped) return;
      const duration = Number.isFinite(video.duration) ? video.duration : 0;
      const current = video.currentTime;
      let opacity = 1;

      if (current < 0.5) {
        opacity = Math.max(0, current / 0.5);
      } else if (duration > 0 && duration - current < 0.5) {
        opacity = Math.max(0, (duration - current) / 0.5);
      }

      video.style.opacity = String(opacity);
      frameId = requestAnimationFrame(renderOpacity);
    };

    const playFromStart = () => {
      video.currentTime = 0;
      video.style.opacity = '0';
      void video.play();
    };

    const handleEnded = () => {
      video.style.opacity = '0';
      replayTimeout = window.setTimeout(playFromStart, 100);
    };

    const handlePlay = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(renderOpacity);
    };

    video.addEventListener('ended', handleEnded);
    video.addEventListener('play', handlePlay);
    playFromStart();

    return () => {
      stopped = true;
      cancelAnimationFrame(frameId);
      clearTimeout(replayTimeout);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('play', handlePlay);
    };
  }, []);

  return (
    <main className="page-shell">
      <video ref={videoRef} id="hero-video" className="hero-video" src={heroVideoSrc} muted playsInline preload="auto" />
      <div className="hero-stack">
        <section className="hero-section" aria-label="Power AI hero">
          <nav className="navbar" aria-label="Primary navigation">
            <a className="brand" href="#" aria-label="Customli home">
              <span className="brand-logo-text">Customli</span>
            </a>
            <div className="nav-center">
              <button className="nav-button" type="button">
                Features{' '}
                <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
              <button className="nav-button" type="button">Solutions</button>
              <button className="nav-button" type="button">Plans</button>
              <button className="nav-button" type="button">
                Learning{' '}
                <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
            </div>
            <button className="button hero-secondary signup-button" type="button">Sign Up</button>
          </nav>
          <div className="navbar-divider" />
          <div className="hero-content-wrap">
            <div className="blurred-shape" aria-hidden="true" />
            <div className="hero-copy">
              <h1 className="headline">Power <span>AI</span></h1>
              <p className="subtitle">The most powerful AI ever deployed<br />in talent acquisition</p>
              <button className="button hero-secondary cta-button" type="button">Schedule a Consult</button>
            </div>
          </div>
          <div className="logo-marquee-section" aria-label="Customer brands">
            <div className="logo-marquee-container">
              <p className="marquee-kicker">Relied on by brands<br />across the globe</p>
              <div className="marquee-window">
                <div id="marquee-track" className="marquee-track">
                  {[...logos, ...logos].map((name, index) => (
                    <div className="logo-item" key={`${name}-${index}`}>
                      <span className="liquid-glass logo-icon" aria-hidden="true">{name[0]}</span>
                      <span>{name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="studio-content">
        <Marquee />
        <TestimonialSection />
        <PricingSection />
        <TestimonialCarousel />
        <ProjectsSection />
        <PartnerSection />
        <Footer />
        <CopyrightBar />
      </div>
      <BottomNav />
    </main>
  );
}
