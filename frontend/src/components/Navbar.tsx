import { useEffect, useState } from 'react';
import { ScanEye, Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Dataset', href: '#dataset' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Model', href: '#model' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-strong shadow-lg shadow-black/30' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-18">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2.5 group">
            <div className="relative">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 glow-teal-sm transition-transform group-hover:scale-105">
                <ScanEye className="h-5 w-5 text-ink-950" strokeWidth={2.5} />
              </div>
              <div className="absolute inset-0 rounded-xl bg-teal-400/30 animate-pulse-ring" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display text-base font-bold tracking-tight text-ink-50">
                AI Art Detector
              </span>
              <span className="font-mono text-[10px] text-teal-400">CNN v1.0</span>
            </div>
          </a>

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-ink-300 transition-colors hover:text-ink-50 group"
              >
                {link.label}
                <span className="absolute inset-x-4 bottom-1 h-px bg-teal-400 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#detector"
              className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 px-5 py-2.5 text-sm font-semibold text-ink-950 transition-all hover:from-teal-300 hover:to-teal-500 hover:glow-teal-sm active:scale-95"
            >
              Try Now
            </a>
            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden flex h-10 w-10 items-center justify-center rounded-lg text-ink-200 hover:bg-ink-800 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden glass-strong border-t border-ink-700/40 animate-fade-in">
            <div className="flex flex-col gap-1 py-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-sm font-medium text-ink-200 hover:text-teal-400 hover:bg-ink-800/50 rounded-lg transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#detector"
                onClick={() => setMobileOpen(false)}
                className="mx-4 mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 px-5 py-3 text-sm font-semibold text-ink-950"
              >
                Try Now
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
