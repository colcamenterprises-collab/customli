import { useMemo, useState } from 'react';

type ServiceType = 'design' | 'development' | 'both';
type Timeline = 'regular' | 'fast' | 'rush';

type RadioOption<T extends string> = {
  label: string;
  value: T;
  price?: string;
};

const serviceOptions: RadioOption<ServiceType>[] = [
  { label: 'Only Design', value: 'design' },
  { label: 'Only Development', value: 'development' },
  { label: 'Design + Development', value: 'both' },
];

const timelineOptions: RadioOption<Timeline>[] = [
  { label: 'Within 7 Days', value: 'rush', price: '+$100/pages' },
  { label: 'Within 14 Days', value: 'fast', price: '+$25/pages' },
  { label: 'Regular Speed (Based on discussion)', value: 'regular', price: 'no extra cost' },
];

const formatPrice = (value: number) => `$${value.toLocaleString()}`;

function getBasePricing(serviceType: ServiceType) {
  if (serviceType === 'design') return { base: 399, perPage: 100 };
  if (serviceType === 'development') return { base: 199, perPage: 100 };
  return { base: 499, perPage: 200 };
}

function CustomRadio<T extends string>({ name, option, checked, onChange }: { name: string; option: RadioOption<T>; checked: boolean; onChange: (value: T) => void }) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl px-1 py-2 text-white/80 transition-colors focus-within:outline focus-within:outline-2 focus-within:outline-offset-4 focus-within:outline-[#FF5656]">
      <span className="flex items-center gap-3">
        <input type="radio" name={name} value={option.value} checked={checked} onChange={() => onChange(option.value)} className="sr-only" />
        <span className={`flex w-5 h-5 items-center justify-center rounded-full border-2 ${checked ? 'border-[#FF5656]' : 'border-white/30'}`} aria-hidden="true">
          {checked ? <span className="w-2 h-2 rounded-full bg-[#FF5656]" /> : null}
        </span>
        <span className="text-sm sm:text-base">{option.label}</span>
      </span>
      {option.price ? <span className="shrink-0 text-xs sm:text-sm text-white/50">{option.price}</span> : null}
    </label>
  );
}

function CustomCheckbox({ checked, label, price, onChange }: { checked: boolean; label: string; price: string; onChange: (checked: boolean) => void }) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl px-1 py-2 text-white/80 transition-colors focus-within:outline focus-within:outline-2 focus-within:outline-offset-4 focus-within:outline-[#FF5656]">
      <span className="flex items-center gap-3">
        <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="sr-only" />
        <span className={`flex w-5 h-5 items-center justify-center rounded border-2 ${checked ? 'border-[#FF5656] bg-[#FF5656]' : 'border-white/30 bg-transparent'}`} aria-hidden="true">
          {checked ? (
            <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 10.5 8 14l8-8" />
            </svg>
          ) : null}
        </span>
        <span className="text-sm sm:text-base">{label}</span>
      </span>
      <span className="shrink-0 text-xs sm:text-sm text-white/50">{price}</span>
    </label>
  );
}

export function ProjectEstimationCalculator() {
  const [serviceType, setServiceType] = useState<ServiceType>('both');
  const [pages, setPages] = useState(5);
  const [needContent, setNeedContent] = useState(false);
  const [needSEO, setNeedSEO] = useState(false);
  const [timeline, setTimeline] = useState<Timeline>('regular');

  const costs = useMemo(() => {
    const { base, perPage } = getBasePricing(serviceType);
    let customli = base + (pages - 1) * perPage;

    if (needContent) customli += pages * 50;
    if (needSEO) customli += pages * 50;
    if (timeline === 'rush') customli += pages * 100;
    if (timeline === 'fast') customli += pages * 25;

    const agencyPerPage = serviceType === 'both' ? 1000 : 400;
    const freelancerPerPage = serviceType === 'both' ? 500 : 200;

    return {
      customli,
      agency: 8000 + (pages - 1) * agencyPerPage,
      freelancer: 3000 + (pages - 1) * freelancerPerPage,
    };
  }, [needContent, needSEO, pages, serviceType, timeline]);

  const rangeProgress = ((pages - 1) / 29) * 100;

  return (
    <section id="calculator-section" className="bg-black py-16 md:py-28 px-4 md:px-16 text-white">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 md:mb-16 text-center">
          <p className="text-white/50 text-xs md:text-sm uppercase tracking-widest font-mono">Try project estimation calculator</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal text-white mt-4">Get premium website within your budget</h2>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden gap-0 bg-black">
          <div className="bg-[#0D0D0D] p-8 lg:p-12 divide-y divide-[#1E1E1E]">
            <fieldset className="pb-8">
              <legend className="mb-5 text-lg font-normal text-white">What kind of service do you need?</legend>
              <div className="space-y-2">
                {serviceOptions.map((option) => <CustomRadio key={option.value} name="service-type" option={option} checked={serviceType === option.value} onChange={setServiceType} />)}
              </div>
            </fieldset>

            <div className="py-8">
              <label htmlFor="page-range" className="mb-6 block text-lg font-normal text-white">
                Number of Pages: <span className="text-[#FF5656]">{pages}</span>
              </label>
              <input
                id="page-range"
                type="range"
                min="1"
                max="30"
                step="1"
                value={pages}
                onChange={(event) => setPages(Number(event.target.value))}
                className="customli-range w-full"
                style={{ background: `linear-gradient(to right, #FF5656 0%, #FF5656 ${rangeProgress}%, #1E1E1E ${rangeProgress}%, #1E1E1E 100%)` }}
              />
              <div className="mt-3 flex justify-between text-sm text-white/50"><span>1</span><span>30</span></div>
            </div>

            <div className="py-8 space-y-2">
              <CustomCheckbox checked={needContent} onChange={setNeedContent} label="I will need help with content" price="+$50/pages" />
              <CustomCheckbox checked={needSEO} onChange={setNeedSEO} label="I want to optimize my website for SEO" price="+$50/pages" />
            </div>

            <fieldset className="pt-8">
              <legend className="mb-5 text-lg font-normal text-white">How fast do you need this?</legend>
              <div className="space-y-2">
                {timelineOptions.map((option) => <CustomRadio key={option.value} name="timeline" option={option} checked={timeline === option.value} onChange={setTimeline} />)}
              </div>
            </fieldset>
          </div>

          <aside className="p-8 lg:p-12 border border-white/10 lg:rounded-r-2xl min-h-[718px] bg-black">
            <h2 className="text-2xl md:text-3xl font-normal text-white">Estimated Cost</h2>
            <p className="mt-4 max-w-xl text-sm md:text-base leading-relaxed text-white/60">Compare typical agency and freelancer pricing against a lean Customli website build.</p>

            <div className="mt-8 space-y-4">
              <div className="rounded-2xl p-6 space-y-3 bg-white/[0.04]">
                <h3 className="text-sm uppercase tracking-wide text-white/60">Typical Agency charges minimum</h3>
                <p className="text-4xl font-bold text-white">{formatPrice(costs.agency)}</p>
                <p className="text-sm text-white/50">+ Too much extra time &amp; additional cost</p>
              </div>

              <div className="rounded-2xl p-6 space-y-3 bg-white/[0.04]">
                <h3 className="text-sm uppercase tracking-wide text-white/60">Regular Freelancer charges minimum</h3>
                <p className="text-4xl font-bold text-white">{formatPrice(costs.freelancer)}</p>
                <p className="text-sm text-white/50">+ Too much headache &amp; back-and-forth</p>
              </div>

              <div className="rounded-2xl p-6 space-y-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white">
                <h3 className="text-sm uppercase tracking-wide text-white/80">With Customli</h3>
                <p className="text-5xl font-bold">{formatPrice(costs.customli)}</p>
                <p className="text-sm text-white/85">Save your money, time &amp; headache</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
