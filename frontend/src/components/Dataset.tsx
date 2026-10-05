import { Database, User, Cpu, Images, CheckSquare, TestTube } from 'lucide-react';

const THUMBNAILS = [
  'https://images.pexels.com/photos/16397772/pexels-photo-16397772.jpeg?auto=compress&cs=tinysrgb&h=300&w=300',
  'https://images.pexels.com/photos/4208443/pexels-photo-4208443.jpeg?auto=compress&cs=tinysrgb&h=300&w=300',
  'https://images.pexels.com/photos/30157673/pexels-photo-30157673.jpeg?auto=compress&cs=tinysrgb&h=300&w=300',
  'https://images.pexels.com/photos/1537335/pexels-photo-1537335.jpeg?auto=compress&cs=tinysrgb&h=300&w=300',
  'https://images.pexels.com/photos/8659276/pexels-photo-8659276.jpeg?auto=compress&cs=tinysrgb&h=300&w=300',
  'https://images.pexels.com/photos/28921194/pexels-photo-28921194.jpeg?auto=compress&cs=tinysrgb&h=300&w=300',
  'https://images.pexels.com/photos/10022926/pexels-photo-10022926.jpeg?auto=compress&cs=tinysrgb&h=300&w=300',
  'https://images.pexels.com/photos/16397723/pexels-photo-16397723.jpeg?auto=compress&cs=tinysrgb&h=300&w=300',
];

const SPLIT_DATA = [
  { label: 'Training Images', value: '8,000', percent: 66.67, icon: Images },
  { label: 'Validation Images', value: '2,000', percent: 16.67, icon: CheckSquare },
  { label: 'Testing Images', value: '2,000', percent: 16.67, icon: TestTube },
];

export default function Dataset() {
  return (
    <section id="dataset" className="relative py-20 lg:py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink-900/40 to-transparent" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-14 text-center">
          <span className="font-mono text-xs uppercase tracking-widest text-teal-400">
            Training Data
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink-50 sm:text-4xl">
            Dataset Overview
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-ink-400">
            The model uses 12,000 labeled images: 8,000 for training, 2,000 for validation,
            and 2,000 for testing, with balanced Human and AI classes in each split.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left: counts */}
          <div className="lg:col-span-2 space-y-6">
            {/* Human vs AI cards */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="group rounded-2xl border border-teal-500/20 bg-teal-500/5 p-6 transition-all hover:border-teal-500/40">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/15">
                    <User className="h-5 w-5 text-teal-400" />
                  </div>
                  <span className="text-sm font-medium text-ink-300">Human-Created</span>
                </div>
                <p className="font-display text-4xl font-bold text-teal-400">4,000</p>
                <p className="mt-1 text-xs text-ink-400">artwork images</p>
              </div>
              <div className="group rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6 transition-all hover:border-amber-500/40">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/15">
                    <Cpu className="h-5 w-5 text-amber-400" />
                  </div>
                  <span className="text-sm font-medium text-ink-300">AI-Generated</span>
                </div>
                <p className="font-display text-4xl font-bold text-amber-400">4,000</p>
                <p className="mt-1 text-xs text-ink-400">artwork images</p>
              </div>
            </div>

            {/* Split distribution */}
            <div className="rounded-2xl border border-ink-700 bg-ink-850/40 p-6">
              <div className="flex items-center gap-2 mb-5">
                <Database className="h-5 w-5 text-teal-400" />
                <h3 className="font-display text-lg font-semibold text-ink-50">
                  Dataset Split
                </h3>
              </div>
              <div className="space-y-4">
                {SPLIT_DATA.map((d) => (
                  <div key={d.label}>
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="flex items-center gap-2 text-sm text-ink-300">
                        <d.icon className="h-4 w-4 text-ink-500" />
                        {d.label}
                      </span>
                      <span className="font-display text-lg font-bold text-ink-50">
                        {d.value}
                      </span>
                    </div>
                    <div className="relative h-2 overflow-hidden rounded-full bg-ink-800">
                      <div
                        className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-teal-600 to-teal-400 transition-all duration-700"
                        style={{ width: `${d.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              {/* Distribution bar */}
              <div className="mt-6 pt-5 border-t border-ink-700/50">
                <p className="mb-2 font-mono text-xs uppercase tracking-wider text-ink-400">
                  Human vs AI Distribution
                </p>
                <div className="flex h-8 overflow-hidden rounded-lg">
                  <div className="flex items-center justify-center bg-gradient-to-r from-teal-600 to-teal-500 text-xs font-semibold text-ink-950" style={{ width: '50%' }}>
                    50% Human
                  </div>
                  <div className="flex items-center justify-center bg-gradient-to-r from-amber-500 to-amber-400 text-xs font-semibold text-ink-950" style={{ width: '50%' }}>
                    50% AI
                  </div>
                </div>
                <p className="mt-2 text-xs text-ink-500">
                  Each split contains an equal number of Human and AI images.
                </p>
              </div>
            </div>
          </div>

          {/* Right: thumbnails */}
          <div className="rounded-2xl border border-ink-700 bg-ink-850/40 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Images className="h-5 w-5 text-teal-400" />
              <h3 className="font-display text-lg font-semibold text-ink-50">
                Visual Examples
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              {THUMBNAILS.map((src, i) => (
                <div
                  key={i}
                  className="group relative aspect-square overflow-hidden rounded-lg border border-ink-700"
                >
                  <img
                    src={src}
                    alt={`Sample ${i + 1}`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-ink-950/0 transition-colors group-hover:bg-ink-950/30" />
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-ink-500">
              Illustrative artwork examples; these images are not part of the training dataset.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
