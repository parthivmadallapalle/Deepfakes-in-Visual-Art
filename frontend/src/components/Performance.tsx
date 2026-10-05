import { TrendingUp, Grid2x2, Crosshair, Target, Activity } from 'lucide-react';

const TRAIN_ACC = [0.7535, 0.8211, 0.8611, 0.8852, 0.9013, 0.9262, 0.9316, 0.9441, 0.9609, 0.9657];
const VAL_ACC = [0.7950, 0.8440, 0.8610, 0.8690, 0.8850, 0.9180, 0.9135, 0.8640, 0.8795, 0.9155];

const METRICS = [
  { label: 'Precision', value: 0.917, icon: Crosshair },
  { label: 'Recall', value: 0.917, icon: Target },
  { label: 'F1-Score', value: 0.917, icon: Activity },
  { label: 'Test Accuracy', value: 0.917, icon: TrendingUp },
];

const CONFUSION = {
  truePositive: 917,
  falseNegative: 83,
  falsePositive: 83,
  trueNegative: 917,
};

export default function Performance() {
  return (
    <section id="performance" className="relative py-20 lg:py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink-900/40 to-transparent" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-14 text-center">
          <span className="font-mono text-xs uppercase tracking-widest text-teal-400">
            Evaluation
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink-50 sm:text-4xl">
            Model Performance
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-ink-400">
            Training accuracy over 10 epochs and evaluation results on the held-out
            test set of 2,000 images.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-2xl border border-ink-700 bg-ink-850/40 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-display text-lg font-semibold text-ink-50">Training Accuracy</h3>
                <p className="mt-1 text-xs text-ink-500">Training vs validation accuracy across 10 epochs</p>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1.5 text-ink-300">
                  <span className="h-2 w-2 rounded-full bg-teal-400" /> Training
                </span>
                <span className="flex items-center gap-1.5 text-ink-300">
                  <span className="h-2 w-2 rounded-full bg-amber-400" /> Validation
                </span>
              </div>
            </div>
            <LineChart
              series1={TRAIN_ACC}
              series2={VAL_ACC}
              yMin={0.7}
              yMax={1.0}
              yLabel="Accuracy"
              formatY={(v) => `${(v * 100).toFixed(0)}%`}
            />
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-ink-700 bg-ink-800/40 p-4">
                <p className="font-mono text-xs uppercase tracking-wider text-ink-500">Final Training Accuracy</p>
                <p className="mt-1 font-display text-2xl font-bold text-teal-400">96.57%</p>
              </div>
              <div className="rounded-xl border border-ink-700 bg-ink-800/40 p-4">
                <p className="font-mono text-xs uppercase tracking-wider text-ink-500">Test Loss</p>
                <p className="mt-1 font-display text-2xl font-bold text-ink-50">0.2522</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-ink-700 bg-ink-850/40 p-6">
            <div className="flex items-center gap-2 mb-5">
              <Grid2x2 className="h-5 w-5 text-teal-400" />
              <h3 className="font-display text-lg font-semibold text-ink-50">Confusion Matrix</h3>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-[auto_1fr_1fr] gap-1">
                <div />
                <div className="flex items-center justify-center pb-2 text-xs font-medium text-ink-400">Pred: Human</div>
                <div className="flex items-center justify-center pb-2 text-xs font-medium text-ink-400">Pred: AI</div>
                <div className="flex items-center justify-center pr-2 text-xs font-medium text-ink-400">Actual: Human</div>
                <MatrixCell value={CONFUSION.trueNegative} label="TN" good />
                <MatrixCell value={CONFUSION.falsePositive} label="FP" />
                <div className="flex items-center justify-center pr-2 text-xs font-medium text-ink-400">Actual: AI</div>
                <MatrixCell value={CONFUSION.falseNegative} label="FN" />
                <MatrixCell value={CONFUSION.truePositive} label="TP" good />
              </div>
              <p className="text-xs text-ink-500">Total test samples: 2,000</p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {METRICS.map((m) => (
            <div key={m.label} className="group rounded-2xl border border-ink-700 bg-ink-850/40 p-6 transition-all hover:border-teal-500/40 hover:bg-ink-800/50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/15">
                  <m.icon className="h-5 w-5 text-teal-400" />
                </div>
                <TrendingUp className="h-4 w-4 text-teal-500/50" />
              </div>
              <p className="font-mono text-xs uppercase tracking-wider text-ink-400">{m.label}</p>
              <p className="font-display text-3xl font-bold text-ink-50 mt-1">{(m.value * 100).toFixed(1)}%</p>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-ink-800">
                <div className="h-full rounded-full bg-gradient-to-r from-teal-600 to-teal-400 transition-all duration-700" style={{ width: `${m.value * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MatrixCell({ value, label, good = false }: { value: number; label: string; good?: boolean }) {
  return (
    <div className={`flex aspect-square items-center justify-center rounded-lg ${good ? 'bg-teal-500/20 border border-teal-500/30' : 'bg-red-500/15 border border-red-500/20'}`}>
      <div className="text-center">
        <p className={`font-display text-2xl font-bold ${good ? 'text-teal-400' : 'text-red-400'}`}>{value}</p>
        <p className={`font-mono text-[10px] ${good ? 'text-teal-300/70' : 'text-red-300/70'}`}>{label}</p>
      </div>
    </div>
  );
}

function LineChart({
  series1,
  series2,
  yMin,
  yMax,
  yLabel,
  formatY,
}: {
  series1: number[];
  series2: number[];
  yMin: number;
  yMax: number;
  yLabel: string;
  formatY: (v: number) => string;
}) {
  const W = 600;
  const H = 280;
  const padL = 50;
  const padR = 20;
  const padT = 20;
  const padB = 36;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;
  const xStep = plotW / (series1.length - 1);
  const yScale = (v: number) => padT + plotH - ((v - yMin) / (yMax - yMin)) * plotH;
  const xScale = (i: number) => padL + i * xStep;
  const toPath = (data: number[]) => data.map((v, i) => `${i === 0 ? 'M' : 'L'} ${xScale(i).toFixed(1)} ${yScale(v).toFixed(1)}`).join(' ');
  const toArea = (data: number[]) => `${toPath(data)} L ${xScale(data.length - 1).toFixed(1)} ${padT + plotH} L ${xScale(0).toFixed(1)} ${padT + plotH} Z`;
  const yTicks = 5;
  const yTickVals = Array.from({ length: yTicks + 1 }, (_, i) => yMin + ((yMax - yMin) / yTicks) * i);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="grad-teal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#34d3a6" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#34d3a6" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="grad-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fbbf44" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#fbbf44" stopOpacity="0" />
        </linearGradient>
      </defs>
      {yTickVals.map((v, i) => {
        const y = yScale(v);
        return (
          <g key={i}>
            <line x1={padL} y1={y} x2={W - padR} y2={y} stroke="#1b2127" strokeWidth="1" />
            <text x={padL - 8} y={y + 4} textAnchor="end" fontSize="10" fill="#4a5560" fontFamily="JetBrains Mono, monospace">{formatY(v)}</text>
          </g>
        );
      })}
      {[0, 2, 4, 6, 8, 9].map((epoch) => (
        <text key={epoch} x={xScale(epoch)} y={H - padB + 18} textAnchor="middle" fontSize="10" fill="#4a5560" fontFamily="JetBrains Mono, monospace">{epoch + 1}</text>
      ))}
      <text x={W / 2} y={H - 4} textAnchor="middle" fontSize="10" fill="#6b7782" fontFamily="JetBrains Mono, monospace">Epoch</text>
      <text x={14} y={H / 2} textAnchor="middle" fontSize="10" fill="#6b7782" fontFamily="JetBrains Mono, monospace" transform={`rotate(-90 14 ${H / 2})`}>{yLabel}</text>
      <path d={toArea(series1)} fill="url(#grad-teal)" />
      <path d={toArea(series2)} fill="url(#grad-amber)" />
      <path d={toPath(series1)} fill="none" stroke="#34d3a6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d={toPath(series2)} fill="none" stroke="#fbbf44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4 3" />
      <circle cx={xScale(series1.length - 1)} cy={yScale(series1[series1.length - 1])} r="3.5" fill="#34d3a6" />
      <circle cx={xScale(series2.length - 1)} cy={yScale(series2[series2.length - 1])} r="3.5" fill="#fbbf44" />
    </svg>
  );
}
