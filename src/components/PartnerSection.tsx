import { MouseEvent, useRef, useState } from 'react';
import { Button } from './Button';
import { marqueeImages } from './data';

type Trail = { id: number; x: number; y: number; src: string; rotate: number };
export function PartnerSection() {
  const [trails, setTrails] = useState<Trail[]>([]); const last = useRef(0); const id = useRef(0);
  const move = (event: MouseEvent<HTMLDivElement>) => { const now = Date.now(); if (now - last.current < 80) return; last.current = now; const rect = event.currentTarget.getBoundingClientRect(); const item = { id: id.current++, x: event.clientX - rect.left, y: event.clientY - rect.top, src: marqueeImages[id.current % marqueeImages.length], rotate: Math.random() * 20 - 10 }; setTrails((v) => [...v, item]); window.setTimeout(() => setTrails((v) => v.filter((t) => t.id !== item.id)), 1000); };
  return <section className="w-full px-6 py-12"><div onMouseMove={move} className="relative mx-auto overflow-hidden rounded-[40px] bg-white py-48 text-center shadow-secondary"><h2 className="font-mondwest mb-12 text-[48px] text-[#0D212C] md:text-[64px] lg:text-[80px]">Partner with us</h2><Button className="gap-3"><img src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=160" alt="Viktor" className="h-10 w-10 rounded-full object-cover" />Start chat with Viktor</Button>{trails.map((t) => <img key={t.id} src={t.src} alt="" className="pointer-events-none absolute h-24 w-32 animate-trail-fade rounded-xl object-cover shadow-lg" style={{ left: t.x - 64, top: t.y - 48, transform: `rotate(${t.rotate}deg)` }} />)}</div></section>;
}
