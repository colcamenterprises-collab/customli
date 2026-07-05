import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

const HEADING_TEXT = 'Unlock Top Marketing Talent You Thought Was Out of Reach -- Now Just One Click Away!';
const DARK_CHARACTER_COUNT = 67;

const logoUrls = [
  'https://polo-pecan-73837341.figma.site/_assets/v11/1e7b0e6fcc016cd28aec5c68990118b8c54c35a5.svg',
  'https://polo-pecan-73837341.figma.site/_assets/v11/3eac03c183db2ae080d910159211c14843398b61.svg',
  'https://polo-pecan-73837341.figma.site/_assets/v11/17705a4c0023a0e5a99154dfb10582adbbf4260b.svg',
  'https://polo-pecan-73837341.figma.site/_assets/v11/0e5f442b09dc5c248e3e60d40a65505fb1887228.svg',
  'https://polo-pecan-73837341.figma.site/_assets/v11/63f99030ceb459e3c9ab9e429cfa2353491d3816.svg',
];

const avatars = [
  ['https://polo-pecan-73837341.figma.site/_assets/v11/aa51718fb3af3637e6d666b6543fc27a175fada6.png', 270, 177, 58, 'square-sm', 'purple'],
  ['https://polo-pecan-73837341.figma.site/_assets/v11/ca755f7f93c1126fb8bdbf99ab364a33aa9ab272.png', 60, 251, 58, 'round', 'yellow'],
  ['https://polo-pecan-73837341.figma.site/_assets/v11/dc01064c7093dcc32674876ee3cf5e41c4a485c6.png', 180, 251, 78, 'round', 'pink'],
  ['https://polo-pecan-73837341.figma.site/_assets/v11/d5470a58b02388336141575048720f19a50de832.png', 300, 251, 58, 'square-sm', 'blue'],
  ['https://polo-pecan-73837341.figma.site/_assets/v11/018736aa5d0275c4ce56cfebaf2ae3007d81ca1e.png', 130, 325, 88, 'round', 'pink'],
  ['https://polo-pecan-73837341.figma.site/_assets/v11/c76d8a0b99676de31c014344bfaf75bad090758d.png', 30, 399, 58, 'round', 'purple'],
  ['https://polo-pecan-73837341.figma.site/_assets/v11/7b1b5f039de7b54cc9913e96c1923c3b15a157fa.png', 95, 399, 88, 'square-lg', 'orange'],
  ['https://polo-pecan-73837341.figma.site/_assets/v11/9ae171d8895199349755c43fbff00e122221a027.png', 220, 399, 88, 'square-lg', 'pink'],
  ['https://polo-pecan-73837341.figma.site/_assets/v11/926c9eb7b4bc1df846fa0e39f0b0dc3fefd80671.png', 320, 399, 58, 'round', 'purple'],
] as const;

function useCountUp(target: number, duration: number, delay: number) {
  const [value, setValue] = useState(0);
  const frameRef = useRef(0);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(target * eased));
        if (progress < 1) frameRef.current = requestAnimationFrame(tick);
      };
      frameRef.current = requestAnimationFrame(tick);
    }, delay);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(frameRef.current);
    };
  }, [delay, duration, target]);

  return value;
}

function TypewriterHeading({ onComplete }: { onComplete: () => void }) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    let interval = 0;
    const startTimeout = window.setTimeout(() => {
      interval = window.setInterval(() => {
        setVisibleCount((count) => {
          const nextCount = Math.min(count + 1, HEADING_TEXT.length);

          if (nextCount === HEADING_TEXT.length) {
            window.clearInterval(interval);
            setIsTyping(false);
            onCompleteRef.current();
          }

          return nextCount;
        });
      }, 35);
    }, 400);

    return () => {
      window.clearTimeout(startTimeout);
      window.clearInterval(interval);
    };
  }, []);

  const visible = HEADING_TEXT.slice(0, visibleCount);
  return (
    <h1 className="marketeam-heading" aria-label={HEADING_TEXT}>
      <span className="marketeam-heading-dark">{visible.slice(0, DARK_CHARACTER_COUNT)}</span>
      <span className="marketeam-heading-light">{visible.slice(DARK_CHARACTER_COUNT)}</span>
      {isTyping && <span className="marketeam-type-cursor" aria-hidden="true" />}
    </h1>
  );
}

function MarketeamButton({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span className="marketeam-btn-border-wrap">
      <button className={`marketeam-pill-button ${className}`} type="button">{children}</button>
    </span>
  );
}

function MarketeamCircles() {
  const specialists = useCountUp(20, 2000, 1200);
  return (
    <div className="marketeam-circles" aria-label="Marketing specialists network visualization">
      <div className="marketeam-orbit marketeam-orbit-1 marketeam-spin-left-30" />
      <div className="marketeam-orbit marketeam-orbit-2 marketeam-spin-right-40" />
      <div className="marketeam-orbit marketeam-orbit-3 marketeam-spin-right-50" />
      <div className="marketeam-orbit marketeam-orbit-4 marketeam-spin-left-60" />
      <div className="marketeam-center-card">
        <strong>{specialists}k+</strong>
        <span>Specialists</span>
      </div>
      {avatars.map(([url, angle, radius, size, shape, glow], index) => (
        <img
          alt=""
          aria-hidden="true"
          className={`marketeam-avatar marketeam-avatar-${shape} marketeam-glow-${glow}`}
          key={url}
          src={url}
          style={{
            '--marketeam-angle': `${angle}deg`,
            '--marketeam-radius': `${radius}px`,
            '--marketeam-size': `${size}px`,
            '--marketeam-delay': `${0.6 + index * 0.2125}s`,
            '--marketeam-avatar-rotate': `calc(-1 * ${angle}deg)`,
          } as CSSProperties}
        />
      ))}
    </div>
  );
}

function MarketeamTicker() {
  const repeatedLogos = Array.from({ length: 4 }, () => logoUrls).flat();
  return (
    <div className="marketeam-logo-ticker" aria-label="Partner logos">
      <div className="marketeam-logo-track">
        {repeatedLogos.map((url, index) => (
          <img alt="Partner logo" className="marketeam-logo" key={`${url}-${index}`} src={url} />
        ))}
      </div>
    </div>
  );
}

export function MarketeamHero() {
  const [typingComplete, setTypingComplete] = useState(false);

  return (
    <section className="marketeam-hero" aria-label="Marketeam talent hero">
      <header className="marketeam-header marketeam-fade-down">
        <div className="marketeam-header-left">
          <a className="marketeam-logo-link" href="#" aria-label="Marketeam home">
            <img src="https://polo-pecan-73837341.figma.site/_assets/v11/17ae538989a509947a8de3892c644664895e69b1.png" alt="Marketeam" />
          </a>
          <nav className="marketeam-nav" aria-label="Marketeam navigation">
            {['Your Team', 'Solutions', 'Blog', 'Pricing'].map((item) => <a href="#" key={item}>{item}</a>)}
          </nav>
        </div>
        <div className="marketeam-header-actions">
          <a className="marketeam-login" href="#">Log In</a>
          <MarketeamButton>Join Now</MarketeamButton>
        </div>
      </header>

      <div className="marketeam-main">
        <div className="marketeam-copy marketeam-fade-up">
          <TypewriterHeading onComplete={() => setTypingComplete(true)} />
          <div className={`marketeam-start-wrap ${typingComplete ? 'marketeam-visible' : ''}`}>
            <MarketeamButton className="marketeam-start-button">
              <span>Start Project</span>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M6.75 3.75L12 9L6.75 14.25" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </MarketeamButton>
          </div>
          <div className={`marketeam-cursor-badge ${typingComplete ? 'marketeam-visible' : ''}`} aria-hidden="true">
            <svg width="34" height="42" viewBox="0 0 34 42" fill="none"><path d="M2 2L31 24.5L17.5 27L12 40L2 2Z" fill="#A068FF" stroke="white" strokeWidth="2" /></svg>
            <span>David</span>
          </div>
        </div>
        <div className="marketeam-scale-in"><MarketeamCircles /></div>
      </div>

      <div className="marketeam-delayed-fade-up"><MarketeamTicker /></div>
    </section>
  );
}
