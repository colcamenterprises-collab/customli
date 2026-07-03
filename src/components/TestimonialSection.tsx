import { useEffect, useRef, useState } from 'react';
import { useInViewAnimation } from '../hooks/useInViewAnimation';
import { Quote } from 'lucide-react';

export function TestimonialSection() {
  const { ref, isInView } = useInViewAnimation<HTMLElement>();
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      const node = imgRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      setOffset(Math.max(-200, Math.min(200, (progress - 0.5) * 200)));
    };
    const onScroll = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update); };
    update(); window.addEventListener('scroll', onScroll, { passive: true });
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', onScroll); };
  }, []);
  const anim = isInView ? 'animate-fade-in-up' : 'opacity-0';
  return <section ref={ref} className="mx-auto max-w-2xl px-6 py-12 text-[#0D212C]"><Quote className={`${anim} h-6 w-6 text-slate-900`} style={{ animationDelay: '0.1s' }} /><h2 className={`${anim} mt-6 text-[32px] leading-[1.1] tracking-tight md:text-[40px] lg:text-[44px]`} style={{ animationDelay: '0.2s' }}>I left <span className="font-mondwest">Apple</span> to build the studio I always wanted to work with</h2><p className={`${anim} mt-5 text-sm italic text-[#273C46]`} style={{ animationDelay: '0.3s' }}>Viktor Oddy</p><div className={`${anim} mt-8 flex items-center gap-8 font-medium text-slate-900`} style={{ animationDelay: '0.4s' }}><span className="w-20 text-2xl">Apple</span><span className="w-[83px] text-2xl">IDEO</span><span className="w-[110px] text-2xl">Polygon</span></div><img ref={imgRef} src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260330_103804_7aa5494f-4d5b-432e-9dc7-20715275f143.png&w=1280&q=85" alt="Chris Halaska" className={`${anim} mx-auto mt-10 w-full max-w-xs rounded-2xl shadow-lg`} style={{ animationDelay: '0.5s', transform: `translateY(${offset}px)` }} /></section>;
}
