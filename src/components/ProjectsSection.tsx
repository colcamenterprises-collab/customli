import { useInViewAnimation } from '../hooks/useInViewAnimation';

const projects = [
  ['evr', 'From idea to millions raised for a web3 AI product', 'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif'],
  ['Automation Machines', 'Streamlining industrial automation processes', 'https://motionsites.ai/assets/hero-automation-machines-preview-DlTveRIN.gif'],
  ['xPortfolio', 'Modern portfolio management platform', 'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif'],
];
function Project({ project }: { project: string[] }) { const { ref, isInView } = useInViewAnimation<HTMLElement>(); return <article ref={ref} className={`${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}><div className="ml-20 md:ml-28"><h3 className="font-mondwest text-2xl font-semibold text-[#051A24] md:text-3xl">{project[0]}</h3><p className="mt-2 text-sm text-[#051A24]/70 md:text-base">{project[1]}</p></div><img src={project[2]} alt={`${project[0]} project`} className="mt-6 w-full rounded-2xl object-cover shadow-lg" /></article>; }
export function ProjectsSection() { return <section id="work" className="mx-auto flex max-w-[1200px] flex-col gap-16 px-6 py-12 md:gap-20">{projects.map((project) => <Project key={project[0]} project={project} />)}</section>; }
