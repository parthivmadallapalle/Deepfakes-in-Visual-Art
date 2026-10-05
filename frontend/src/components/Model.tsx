import { Cpu, Layers, GitBranch, Zap, Target, Binary } from 'lucide-react';

const LAYERS = [
  { name: 'Conv2D', detail: '32 filters · 3×3 kernel · ReLU', icon: Layers, params: '896' },
  { name: 'MaxPool2D', detail: '2×2 pool size', icon: GitBranch, params: '0' },
  { name: 'Conv2D', detail: '64 filters · 3×3 kernel · ReLU', icon: Layers, params: '18,496' },
  { name: 'MaxPool2D', detail: '2×2 pool size', icon: GitBranch, params: '0' },
  { name: 'Conv2D', detail: '128 filters · 3×3 kernel · ReLU', icon: Layers, params: '73,856' },
  { name: 'MaxPool2D', detail: '2×2 pool size', icon: GitBranch, params: '0' },
  { name: 'Flatten', detail: '14×14×128 → 25,088 units', icon: Zap, params: '0' },
  { name: 'Dense', detail: '128 units · ReLU', icon: Cpu, params: '3,211,392' },
  { name: 'Dropout', detail: 'Regularization', icon: Target, params: '0' },
  { name: 'Dense', detail: '1 unit · Sigmoid', icon: Binary, params: '129' },
];

export default function Model() {
  return (
    <section id="model" className="relative py-20 lg:py-28">
      <div className="absolute inset-0 grid-pattern opacity-15" />
      <div className="absolute top-1/3 right-0 h-[400px] w-[400px] rounded-full bg-teal-500/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-14 text-center">
          <span className="font-mono text-xs uppercase tracking-widest text-teal-400">
            Architecture
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink-50 sm:text-4xl">
            The CNN Model
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-ink-400">
            A custom convolutional neural network designed for binary image
            classification — distinguishing AI-generated art from human-created artwork.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          {/* Left: Layer stack */}
          <div className="rounded-2xl border border-ink-700 bg-ink-850/40 p-6 lg:p-8">
            <h3 className="font-display text-lg font-semibold text-ink-50 mb-1">
              Network Architecture
            </h3>
            <p className="text-sm text-ink-400 mb-6">
              Sequential model — input flows top to bottom through each layer.
            </p>

            <div className="space-y-2">
              {/* Input */}
              <div className="flex items-center gap-3 rounded-xl border border-teal-500/30 bg-teal-500/5 px-4 py-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-500/15">
                  <Binary className="h-5 w-5 text-teal-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-ink-50">Input Layer</p>
                  <p className="font-mono text-xs text-ink-400">128 × 128 × 3</p>
                </div>
              </div>

              <div className="ml-5 h-4 w-px bg-ink-600" />

              {LAYERS.map((layer, i) => (
                <div key={i}>
                  <div className="group flex items-center gap-3 rounded-xl border border-ink-700 bg-ink-800/40 px-4 py-3 transition-all hover:border-teal-500/30 hover:bg-ink-800/70">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink-700">
                      <layer.icon className="h-5 w-5 text-teal-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-ink-50">{layer.name}</p>
                      <p className="font-mono text-xs text-ink-400">{layer.detail}</p>
                    </div>
                    <span className="font-mono text-xs text-ink-500">
                      {layer.params} params
                    </span>
                  </div>
                  {i < LAYERS.length - 1 && <div className="ml-5 h-4 w-px bg-ink-600" />}
                </div>
              ))}

              <div className="ml-5 h-4 w-px bg-ink-600" />

              {/* Output */}
              <div className="flex items-center gap-3 rounded-xl border border-amber-500/30 bg-amber-500/5 px-4 py-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/15">
                  <Target className="h-5 w-5 text-amber-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-ink-50">Output</p>
                  <p className="font-mono text-xs text-ink-400">Binary · Sigmoid</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: specs */}
          <div className="space-y-4">
            <SpecCard
              label="Input Size"
              value="128 × 128"
              sub="RGB image, center-cropped"
              big
            />
            <SpecCard
              label="Total Trainable Parameters"
              value="3,304,769"
              sub="~12.6 MB model size"
              big
              accent
            />
            <SpecCard
              label="Test Accuracy"
              value="91.7%"
              sub="Evaluated on 2,000 test images"
              big
            />
            <div className="rounded-2xl border border-ink-700 bg-ink-850/40 p-6">
              <h4 className="font-display text-sm font-semibold text-ink-50 mb-3">
                Key Design Decisions
              </h4>
              <ul className="space-y-2.5 text-sm text-ink-400">
                <li className="flex gap-2.5">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-400" />
                  Three convolutional blocks capture hierarchical visual features
                </li>
                <li className="flex gap-2.5">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-400" />
                  Dropout regularization is applied before the output layer
                </li>
                <li className="flex gap-2.5">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-400" />
                  Sigmoid output produces a probability for binary classification
                </li>
                <li className="flex gap-2.5">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-400" />
                  Adam optimizer with binary cross-entropy loss
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SpecCard({
  label,
  value,
  sub,
  big,
  accent,
}: {
  label: string;
  value: string;
  sub: string;
  big?: boolean;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-6 transition-all hover:scale-[1.02] ${
        accent
          ? 'border-teal-500/30 bg-teal-500/5 hover:border-teal-500/50'
          : 'border-ink-700 bg-ink-850/40 hover:border-ink-600'
      }`}
    >
      <p className="font-mono text-xs uppercase tracking-wider text-ink-400 mb-1">
        {label}
      </p>
      <p
        className={`font-display font-bold ${
          big ? 'text-3xl' : 'text-2xl'
        } ${accent ? 'text-teal-400' : 'text-ink-50'}`}
      >
        {value}
      </p>
      <p className="mt-1 text-xs text-ink-500">{sub}</p>
    </div>
  );
}
