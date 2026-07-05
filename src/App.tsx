import { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { BenefitsSection } from './components/BenefitsSection';
import { CtaFooter } from './components/CtaFooter';
import { GlowingFeatureCards } from './components/GlowingFeatureCards';
import { ProjectEstimationCalculator } from './components/ProjectEstimationCalculator';

const logos = ['Vortex', 'Nimbus', 'Prysma', 'Cirrus', 'Kynder', 'Halcyn'];
const heroVideoSrc =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_065045_c44942da-53c6-4804-b734-f9e07fc22e08.mp4';

function Hero() {
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
    <section className="hero-section" aria-label="Power AI hero">
      <video ref={videoRef} className="hero-video" src={heroVideoSrc} muted playsInline preload="auto" />
      <div className="hero-layer">
        <nav className="navbar" aria-label="Primary navigation">
          <a className="brand" href="#" aria-label="Customli home">
            <span className="brand-logo-text">Customli</span>
          </a>
          <div className="nav-center">
            <button className="nav-button" type="button">
              Features <ChevronDown aria-hidden="true" size={16} strokeWidth={1.8} />
            </button>
            <button className="nav-button" type="button">Solutions</button>
            <button className="nav-button" type="button">Plans</button>
            <button className="nav-button" type="button">
              Learning <ChevronDown aria-hidden="true" size={16} strokeWidth={1.8} />
            </button>
          </div>
          <button className="liquid-glass hero-secondary signup-button" type="button">Sign Up</button>
        </nav>
        <div className="navbar-divider" />
        <div className="hero-content-wrap">
          <div className="blurred-shape" aria-hidden="true" />
          <div className="hero-copy">
            <h1 className="headline">Power <span>AI</span></h1>
            <p className="subtitle">The most powerful AI ever deployed<br />in talent acquisition</p>
            <button className="liquid-glass hero-secondary cta-button" type="button">Schedule a Consult</button>
          </div>
        </div>
        <div className="logo-marquee-section" aria-label="Customer brands">
          <div className="logo-marquee-container">
            <p className="marquee-kicker">Relied on by brands<br />across the globe</p>
            <div className="marquee-window">
              <div className="marquee-track">
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
      </div>
    </section>
  );
}

export function App() {
  return (
    <main className="page-shell">
      <Hero />
      <div className="studio-content">
        <BenefitsSection />
        <ProjectEstimationCalculator />
        <GlowingFeatureCards />
        <CtaFooter />
      </div>
    </main>
  );
}
