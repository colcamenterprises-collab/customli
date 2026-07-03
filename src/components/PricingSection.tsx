import { useInViewAnimation } from '../hooks/useInViewAnimation';
import { Button } from './Button';

export function PricingSection() {
  const { ref, isInView } = useInViewAnimation<HTMLElement>();
  const anim = isInView ? 'animate-fade-in-up' : 'opacity-0';
  return <section ref={ref} id="services" className="w-full px-6 py-12"><div className="ml-auto grid gap-8 md:max-w-4xl md:grid-cols-2 md:justify-end"><article className={`${anim} rounded-[40px] bg-[#051A24] py-10 pl-10 pr-10 text-[#E0EBF0] shadow-inner md:pr-24`} style={{ animationDelay: '0.1s' }}><h2 className="text-[22px] font-medium text-[#F6FCFF]">Monthly Partnership</h2><p className="mt-5 leading-relaxed">A dedicated creative design team.<br />You work directly with Viktor.</p><p className="mt-10 text-2xl text-[#F6FCFF]">$5,000</p><p className="text-sm">Monthly</p><div className="mt-8 flex flex-wrap gap-3"><Button href="https://halaskastudio.com/./book">Start a chat</Button><Button href="https://halaskastudio.com/./book" variant="secondary">How it works</Button></div></article><article className={`${anim} rounded-[40px] bg-white py-10 pl-10 pr-10 text-[#051A24] shadow-card md:pr-24`} style={{ animationDelay: '0.2s' }}><h2 className="text-[22px] font-medium">Custom Project</h2><p className="mt-5 leading-relaxed text-[#051A24]/70">Fixed scope, fixed timeline.<br />Same team, same standards.</p><p className="mt-10 text-2xl text-[#0D212C]">$5,000</p><p className="text-sm text-[#051A24]/70">Minimum</p><div className="mt-8"><Button variant="tertiary">Start a chat</Button></div></article></div></section>;
}
