/** Conjunto mínimo de ícones (stroke), consistentes com o Design System. */
type P = { size?: number; className?: string };
const base = (size: number) => ({ width: size, height: size, viewBox: "0 0 24 24", fill: "none" });

export const IconSearch = ({ size = 18, className }: P) => (
  <svg {...base(size)} className={className} stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
export const IconHeart = ({ size = 18, className }: P) => (
  <svg {...base(size)} className={className} stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" />
  </svg>
);
export const IconLink = ({ size = 18, className }: P) => (
  <svg {...base(size)} className={className} stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" /><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" />
  </svg>
);
export const IconCart = ({ size = 18, className }: P) => (
  <svg {...base(size)} className={className} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.7 13.4A2 2 0 0 0 9.6 16h9.7a2 2 0 0 0 2-1.6L23 6H6" />
  </svg>
);
export const IconDiscord = ({ size = 18, className }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.3 5.3A17 17 0 0 0 15 4l-.2.4a15.6 15.6 0 0 1 3.9 1.3 13 13 0 0 0-11.4 0A15.6 15.6 0 0 1 11.2 4.4L11 4a17 17 0 0 0-4.3 1.3C3.9 9.3 3.1 13.2 3.5 17a17 17 0 0 0 5.2 2.6l.6-1a11 11 0 0 1-1.8-.9l.4-.3a12 12 0 0 0 10.2 0l.4.3a11 11 0 0 1-1.8.9l.6 1A17 17 0 0 0 23 17c.4-4.3-.6-8.2-3.7-11.7ZM9.3 14.7c-.9 0-1.6-.9-1.6-1.9s.7-1.9 1.6-1.9 1.6.9 1.6 1.9-.7 1.9-1.6 1.9Zm5.4 0c-.9 0-1.6-.9-1.6-1.9s.7-1.9 1.6-1.9 1.6.9 1.6 1.9-.7 1.9-1.6 1.9Z" />
  </svg>
);
export const IconGlobe = ({ size = 18, className }: P) => (
  <svg {...base(size)} className={className} stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18A14 14 0 0 1 12 3Z" />
  </svg>
);
export const IconBolt = ({ size = 18, className }: P) => (
  <svg {...base(size)} className={className} stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
    <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
  </svg>
);
export const IconShield = ({ size = 18, className }: P) => (
  <svg {...base(size)} className={className} stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
    <path d="M12 2 4 5v6c0 5 3.4 8.5 8 11 4.6-2.5 8-6 8-11V5l-8-3Z" />
  </svg>
);
export const IconCheck = ({ size = 18, className }: P) => (
  <svg {...base(size)} className={className} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m20 6-11 11-5-5" />
  </svg>
);
