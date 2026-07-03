import { marqueeImages } from './data';

export function Marquee() {
  return <section className="mt-16 mb-16 w-full overflow-hidden md:mt-20" aria-label="Project previews"><div className="animate-design-marquee flex w-max">{[...marqueeImages, ...marqueeImages].map((src, i) => <img key={`${src}-${i}`} src={src} alt="Creative project preview" className="mx-3 h-[280px] rounded-2xl object-cover shadow-lg md:h-[500px]" />)}</div></section>;
}
