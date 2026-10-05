import { Upload, Crop, BrainCircuit, Flag } from 'lucide-react';

const STEPS = [
  {
    icon: Upload,
    step: '01',
    title: 'Upload Image',
    desc: 'Your artwork is accepted in PNG, JPG, JPEG, WEBP, or BMP format. Drag-and-drop or browse to select any image for analysis.',
  },
  {
    icon: Crop,
    step: '02',
    title: 'Preprocess',
    desc: 'The image is center-cropped to a square and resized to 128×128 pixels — the exact input dimensions the CNN was trained on. Pixel values are normalized to match the training distribution.',
  },
  {
    icon: BrainCircuit,
    step: '03',
    title: 'CNN Analysis',
    desc: 'The preprocessed image passes through two convolutional blocks (32 and 64 filters), max-pooling layers, a flatten layer, and two dense layers with dropout — extracting features like edge density, texture, and color patterns.',
  },
  {
    icon: Flag,
    step: '04',
    title: 'Prediction',
    desc: 'A final sigmoid neuron outputs a probability score between 0 and 1. Values above 0.5 classify the artwork as AI-generated; below 0.5 as human-created, with the confidence percentage derived from the output.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-20 lg:py-28">
      <div className="absolute inset-0 grid-pattern opacity-15" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-14 text-center">
          <span className="font-mono text-xs uppercase tracking-widest text-teal-400">
            Pipeline
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink-50 sm:text-4xl">
            How It Works
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-ink-400">
            Every image follows a four-stage detection pipeline, from raw upload
            to final classification.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <div
              key={s.step}
              className="group relative rounded-2xl border border-ink-700 bg-ink-850/40 p-6 transition-all duration-300 hover:border-teal-500/40 hover:bg-ink-800/50"
            >
              {/* Connector line */}
              {i < STEPS.length - 1 && (
                <div className="absolute top-12 -right-3 hidden h-px w-6 bg-gradient-to-r from-teal-500/40 to-transparent lg:block" />
              )}

              <div className="flex items-center justify-between mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500/20 to-teal-600/10 border border-teal-500/20 transition-transform group-hover:scale-110">
                  <s.icon className="h-6 w-6 text-teal-400" />
                </div>
                <span className="font-display text-3xl font-bold text-ink-800 group-hover:text-ink-700 transition-colors">
                  {s.step}
                </span>
              </div>

              <h3 className="font-display text-lg font-semibold text-ink-50 mb-2">
                {s.title}
              </h3>
              <p className="text-sm leading-relaxed text-ink-400">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
