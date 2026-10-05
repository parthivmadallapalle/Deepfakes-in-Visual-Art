import { ScanEye, Github, Twitter, Mail } from 'lucide-react';

const LINKS = {
  Navigation: [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Dataset', href: '#dataset' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Model', href: '#model' },
    { label: 'Try Now', href: '#detector' },
  ],
  Model: [
    { label: 'Architecture', href: '#model' },
    { label: 'Performance', href: '#performance' },
    { label: 'CNN v1.0', href: '#model' },
    { label: '91.7% Accuracy', href: '#performance' },
  ],
  Dataset: [
    { label: 'Overview', href: '#dataset' },
    { label: '8,000 Images', href: '#dataset' },
    { label: 'Human vs AI', href: '#dataset' },
    { label: 'Sample Artwork', href: '#dataset' },
  ],
};

export default function Footer() {
  return (
    <footer className="relative border-t border-ink-800 bg-ink-950">
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8 py-14">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-teal-400 to-teal-600">
                <ScanEye className="h-5 w-5 text-ink-950" strokeWidth={2.5} />
              </div>
              <span className="font-display text-base font-bold text-ink-50">
                AI Art Detector
              </span>
            </div>
            <p className="text-sm leading-relaxed text-ink-400">
              A CNN-powered tool for detecting AI-generated artwork. Upload any image
              and get an instant prediction with confidence analysis — built for
              researchers, artists, and digital content verification.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {[Github, Twitter, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink-700 text-ink-400 transition-all hover:border-teal-500/40 hover:text-teal-400"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([heading, items]) => (
            <div key={heading}>
              <h4 className="font-display text-sm font-semibold text-ink-50 mb-4">
                {heading}
              </h4>
              <ul className="space-y-2.5">
                {items.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-ink-400 transition-colors hover:text-teal-400"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-ink-800 pt-6 sm:flex-row">
          <p className="text-xs text-ink-500">
            © {new Date().getFullYear()} AI Art Detector · CNN-Powered Image Classification Project
          </p>
          <div className="flex items-center gap-4 font-mono text-xs text-ink-500">
            <span>Model: CNN v1.0</span>
            <span className="text-ink-700">·</span>
            <span>3,304,769 params</span>
            <span className="text-ink-700">·</span>
            <span className="text-teal-500">91.7% accuracy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
