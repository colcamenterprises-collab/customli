import type { AnchorHTMLAttributes, PropsWithChildren } from 'react';

type Variant = 'primary' | 'secondary' | 'tertiary';
const styles: Record<Variant, string> = {
  primary: 'bg-[#051A24] text-white shadow-primary inset-highlight',
  secondary: 'bg-white text-[#051A24] shadow-secondary',
  tertiary: 'bg-white text-[#051A24] shadow-tertiary',
};

export function Button({ children, className = '', variant = 'primary', href = '#', ...props }: PropsWithChildren<AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant }>) {
  return <a href={href} className={`inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-medium transition hover:-translate-y-0.5 ${styles[variant]} ${className}`} {...props}>{children}</a>;
}
