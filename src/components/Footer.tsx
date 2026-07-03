import { Button } from './Button';
import { ArrowUpRight } from 'lucide-react';

export function Footer() { return <footer id="about" className="mx-auto flex max-w-[1200px] flex-col justify-between gap-10 px-6 py-12 md:flex-row"><Button>Start a chat</Button><div className="flex gap-10 text-[#051A24]"><ArrowUpRight className="h-6 w-6" /><div className="grid grid-cols-2 gap-12"><nav className="flex flex-col gap-3"><a href="#services">Services</a><a href="#work">Work</a><a href="#about">About</a></nav><nav className="flex flex-col gap-3"><a href="https://x.com" target="_blank" rel="noreferrer">x.com</a><a href="https://www.linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a></nav></div></div></footer>; }
