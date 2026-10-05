import { ScanEye, AlertTriangle, Lightbulb, Eye } from 'lucide-react';

const CARDS = [
  {
    icon: ScanEye,
    title: 'What This Project Does',
    body: 'AI Art Detector uses a trained convolutional neural network to classify images as either human-created artwork or AI-generated imagery. By analyzing pixel-level features like edge patterns, texture distribution, color coherence, and gradient smoothness, the model identifies statistical signatures that distinguish the two origins.',
  },
  {
    icon: Eye,
    title: 'Why AI Art Detection Matters',
    body: 'As generative AI tools become increasingly accessible, distinguishing authentic human creativity from AI-generated content has significant implications for art authentication, copyright enforcement, marketplace integrity, and trust in visual media. This project contributes to the growing field of AI forensics and digital content verification.',
  },
  {
    icon: Lightbulb,
    title: 'How CNN Classification Works',
    body: 'Convolutional Neural Networks excel at image classification by learning hierarchical features through stacked layers. Early layers detect edges and simple textures; deeper layers recognize complex patterns and structures. The model was trained on 12,000 labeled images and learns to map visual features to a binary outcome — human or AI — through CNN-based classification.',
  },
  {
    icon: AlertTriangle,
    title: 'Limitations',
    body: 'No detection model is perfect. This system achieves 91.7% accuracy, meaning approximately 1 in 12 images may be misclassified. Highly stylized AI art that mimics human techniques can evade detection, while abstract human art with smooth gradients may trigger false positives. The model should be used as a screening tool, not a definitive judge. Results are most reliable on images similar to the training distribution.',
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-20 lg:py-28">
      <div className="absolute inset-0 grid-pattern opacity-15" />
      <div className="absolute bottom-1/3 left-0 h-[300px] w-[400px] rounded-full bg-teal-500/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-14 text-center">
          <span className="font-mono text-xs uppercase tracking-widest text-teal-400">
            About
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink-50 sm:text-4xl">
            About the Project
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {CARDS.map((card) => (
            <div
              key={card.title}
              className="group rounded-2xl border border-ink-700 bg-ink-850/40 p-7 transition-all hover:border-teal-500/30 hover:bg-ink-800/50"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500/20 to-teal-600/10 border border-teal-500/20 transition-transform group-hover:scale-110">
                <card.icon className="h-6 w-6 text-teal-400" />
              </div>
              <h3 className="font-display text-lg font-semibold text-ink-50 mb-3">
                {card.title}
              </h3>
              <p className="text-sm leading-relaxed text-ink-400">
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
