import { useCallback, useEffect, useRef, useState } from 'react';
import {
  UploadCloud,
  FileImage,
  Image as ImageIcon,
  Loader2,
  Sparkles,
  CheckCircle2,
  XCircle,
  Download,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Cpu,
  Layers,
  Activity,
} from 'lucide-react';
import { analyzeImage, type DetectionResult } from '@/lib/analyze';

type Phase = 'idle' | 'preview' | 'analyzing' | 'result' | 'error';

interface DetectorProps {
  externalFile: File | null;
  onFileConsumed: () => void;
}

const ACCEPTED = '.png, .jpg, .jpeg, .webp, .bmp';
const FORMATS = ['PNG', 'JPG', 'JPEG', 'WEBP', 'BMP'];

export default function Detector({ externalFile, onFileConsumed }: DetectorProps) {
  const [phase, setPhase] = useState<Phase>('idle');
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [progressStage, setProgressStage] = useState('');
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [showTechnical, setShowTechnical] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle file coming from Hero section
  useEffect(() => {
    if (externalFile) {
      handleFile(externalFile);
      onFileConsumed();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalFile]);

  const handleFile = useCallback((f: File) => {
    if (!f.type.startsWith('image/')) return;
    setFile(f);
    setPreviewUrl(URL.createObjectURL(f));
    setResult(null);
    setPhase('preview');
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const f = e.dataTransfer.files?.[0];
      if (f) handleFile(f);
    },
    [handleFile],
  );

  const runAnalysis = useCallback(async () => {
    if (!file) return;
    setPhase('analyzing');
    setProgressStage('Initializing');
    try {
      const res = await analyzeImage(file, (stage) => setProgressStage(stage));
      setResult(res);
      setPhase('result');
    } catch (err) {
      console.error(err);
      setPhase('error');
    }
  }, [file]);

  const reset = useCallback(() => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(null);
    setPreviewUrl(null);
    setResult(null);
    setShowTechnical(false);
    setPhase('idle');
  }, [previewUrl]);

  const downloadResult = useCallback(() => {
    if (!result || !file) return;
    const report = {
      aiArtDetector: {
        model: 'CNN v1.0',
        inputSize: '128 × 128 × 3',
        parameters: '3,304,769',
        testAccuracy: '91.7%',
      },
      filename: file.name,
      timestamp: new Date().toISOString(),
      prediction: result.prediction,
      confidence: `${result.confidence}%`,
      confidenceLevel: result.confidenceLevel,
      explanation: result.explanation,
      features: result.features,
      technicalDetails: result.technicalDetails,
    };
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `detection-report-${file.name.replace(/\.[^.]+$/, '')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [result, file]);

  return (
    <section id="detector" className="relative py-20 lg:py-28">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-1/2 left-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-500/5 blur-[120px]" />

      <div className="relative mx-auto max-w-5xl px-5 lg:px-8">
        {/* Section header */}
        <div className="mb-10 text-center">
          <span className="font-mono text-xs uppercase tracking-widest text-teal-400">
            Detection Engine
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink-50 sm:text-4xl">
            Analyze Your Artwork
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-ink-400">
            Upload an image to run it through our CNN model. Get a real prediction
            with confidence score and technical breakdown.
          </p>
        </div>

        {/* Main panel */}
        <div className="glass-strong rounded-3xl p-6 shadow-2xl shadow-black/40 lg:p-8">
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPTED}
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
              e.target.value = '';
            }}
          />

          {/* IDLE: Drop zone */}
          {phase === 'idle' && (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => inputRef.current?.click()}
              className={`group relative flex min-h-[320px] cursor-pointer flex-col items-center justify-center gap-5 rounded-2xl border-2 border-dashed transition-all duration-300 ${
                dragOver
                  ? 'border-teal-400 bg-teal-500/5 glow-teal-sm'
                  : 'border-ink-600 hover:border-teal-500/50 hover:bg-ink-800/30'
              }`}
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-teal-500/20 to-teal-600/10 border border-teal-500/20 transition-transform duration-300 group-hover:scale-110">
                <UploadCloud className="h-10 w-10 text-teal-400" strokeWidth={1.5} />
              </div>
              <div className="text-center">
                <p className="font-display text-lg font-semibold text-ink-100">
                  Drag & drop your artwork here
                </p>
                <p className="mt-1 text-sm text-ink-400">or click to browse files</p>
              </div>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 px-5 py-2.5 text-sm font-semibold text-ink-950 transition-all hover:from-teal-300 hover:to-teal-500 active:scale-95"
              >
                <FileImage className="h-4 w-4" />
                Choose Image
              </button>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {FORMATS.map((fmt) => (
                  <span
                    key={fmt}
                    className="rounded-md bg-ink-800 px-2.5 py-1 font-mono text-xs text-ink-400"
                  >
                    {fmt}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* PREVIEW: Before analysis */}
          {phase === 'preview' && previewUrl && file && (
            <div className="animate-scale-in flex flex-col items-center gap-6">
              <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-ink-700">
                <img src={previewUrl} alt="Preview" className="w-full object-contain max-h-[400px]" />
                <div className="absolute left-4 top-4 h-6 w-6 border-l-2 border-t-2 border-teal-400/60 rounded-tl-lg" />
                <div className="absolute right-4 top-4 h-6 w-6 border-r-2 border-t-2 border-teal-400/60 rounded-tr-lg" />
                <div className="absolute bottom-4 left-4 h-6 w-6 border-l-2 border-b-2 border-teal-400/60 rounded-bl-lg" />
                <div className="absolute bottom-4 right-4 h-6 w-6 border-r-2 border-b-2 border-teal-400/60 rounded-br-lg" />
              </div>
              <div className="flex items-center gap-2 text-sm text-ink-300">
                <ImageIcon className="h-4 w-4 text-teal-400" />
                <span className="font-mono text-ink-200">{file.name}</span>
                <span className="text-ink-500">·</span>
                <span className="text-ink-400">{(file.size / 1024).toFixed(0)} KB</span>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={runAnalysis}
                  className="inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 px-6 py-3.5 text-sm font-semibold text-ink-950 transition-all hover:from-teal-300 hover:to-teal-500 hover:glow-teal-sm active:scale-95"
                >
                  <Sparkles className="h-5 w-5" />
                  Analyze Image
                </button>
                <button
                  onClick={reset}
                  className="inline-flex items-center gap-2 rounded-xl border border-ink-600 px-5 py-3.5 text-sm font-medium text-ink-300 transition-colors hover:border-ink-500 hover:text-ink-100"
                >
                  <RotateCcw className="h-4 w-4" />
                  Remove
                </button>
              </div>
            </div>
          )}

          {/* ANALYZING: Loading state */}
          {phase === 'analyzing' && previewUrl && (
            <div className="animate-fade-in flex flex-col items-center gap-8 py-8">
              <div className="relative">
                <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-ink-700">
                  <img src={previewUrl} alt="Analyzing" className="w-full object-contain max-h-[300px] opacity-60" />
                  {/* Scan line */}
                  <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div
                      className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-teal-400 to-transparent"
                      style={{ boxShadow: '0 0 20px rgba(52,211,166,0.8)', animation: 'scanLine 2s ease-in-out infinite' }}
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-ink-950/80 backdrop-blur">
                      <Loader2 className="h-8 w-8 animate-spin text-teal-400" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <p className="font-display text-lg font-semibold text-ink-50">
                  {progressStage}
                </p>
                <p className="mt-1 font-mono text-xs text-teal-400">
                  CNN processing in progress...
                </p>
              </div>

              {/* Pipeline progress */}
              <div className="w-full max-w-md space-y-2">
                {[
                  'Load & resize to 128×128',
                  'Conv2D edge detection',
                  'MaxPool feature reduction',
                  'Dense feature classification',
                  'Sigmoid classification',
                ].map((step, i) => {
                  const stages = ['Loading image', 'Preprocessing', 'Convolution', 'Pooling', 'Classification'];
                  const activeIdx = stages.findIndex((s) => progressStage.startsWith(s));
                  const done = i < activeIdx;
                  const active = i === activeIdx;
                  return (
                    <div
                      key={step}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                        active ? 'bg-teal-500/10' : ''
                      }`}
                    >
                      <div className={`flex h-5 w-5 items-center justify-center rounded-full transition-colors ${
                        done ? 'bg-teal-500' : active ? 'bg-teal-500/30' : 'bg-ink-800'
                      }`}>
                        {done ? (
                          <CheckCircle2 className="h-3.5 w-3.5 text-ink-950" />
                        ) : active ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin text-teal-400" />
                        ) : (
                          <span className="h-1.5 w-1.5 rounded-full bg-ink-600" />
                        )}
                      </div>
                      <span className={`text-sm transition-colors ${
                        done ? 'text-ink-300' : active ? 'text-teal-300' : 'text-ink-500'
                      }`}>
                        {step}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* RESULT */}
          {phase === 'result' && result && previewUrl && file && (
            <ResultDisplay
              result={result}
              previewUrl={previewUrl}
              filename={file.name}
              showTechnical={showTechnical}
              onToggleTechnical={() => setShowTechnical((v) => !v)}
              onReset={reset}
              onDownload={downloadResult}
            />
          )}

          {/* ERROR */}
          {phase === 'error' && (
            <div className="flex flex-col items-center gap-4 py-12 text-center">
              <XCircle className="h-12 w-12 text-red-400" />
              <p className="font-display text-lg text-ink-100">Could not analyze this image</p>
              <p className="text-sm text-ink-400">The file may be corrupted or in an unsupported format.</p>
              <button
                onClick={reset}
                className="inline-flex items-center gap-2 rounded-xl border border-ink-600 px-5 py-2.5 text-sm text-ink-200 hover:border-ink-500"
              >
                <RotateCcw className="h-4 w-4" /> Try Again
              </button>
            </div>
          )}

          <style>{`
            @keyframes scanLine {
              0%, 100% { top: 5%; }
              50% { top: 95%; }
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}

/* ── Result Display ─────────────────────────────────────── */

function ResultDisplay({
  result,
  previewUrl,
  filename,
  showTechnical,
  onToggleTechnical,
  onReset,
  onDownload,
}: {
  result: DetectionResult;
  previewUrl: string;
  filename: string;
  showTechnical: boolean;
  onToggleTechnical: () => void;
  onReset: () => void;
  onDownload: () => void;
}) {
  const isAI = result.prediction === 'AI-Generated';
  const accentColor = isAI ? 'amber' : 'teal';

  return (
    <div className="animate-scale-in">
      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:gap-8">
        {/* Left: image */}
        <div className="relative overflow-hidden rounded-2xl border border-ink-700">
          <img src={previewUrl} alt={filename} className="w-full object-contain max-h-[400px]" />
          <div className="absolute left-3 top-3 h-5 w-5 border-l-2 border-t-2 border-teal-400/60 rounded-tl-md" />
          <div className="absolute right-3 top-3 h-5 w-5 border-r-2 border-t-2 border-teal-400/60 rounded-tr-md" />
          <div className="absolute bottom-3 left-3 h-5 w-5 border-l-2 border-b-2 border-teal-400/60 rounded-bl-md" />
          <div className="absolute bottom-3 right-3 h-5 w-5 border-r-2 border-b-2 border-teal-400/60 rounded-br-md" />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink-950 to-transparent p-4">
            <p className="truncate font-mono text-xs text-ink-300">{filename}</p>
          </div>
        </div>

        {/* Right: results */}
        <div className="flex flex-col gap-5">
          {/* Prediction badge */}
          <div className={`rounded-2xl border p-5 ${
            isAI ? 'border-amber-500/30 bg-amber-500/5' : 'border-teal-500/30 bg-teal-500/5'
          }`}>
            <div className="flex items-start gap-4">
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                isAI ? 'bg-amber-500/15' : 'bg-teal-500/15'
              }`}>
                {isAI ? (
                  <Cpu className="h-6 w-6 text-amber-400" />
                ) : (
                  <CheckCircle2 className="h-6 w-6 text-teal-400" />
                )}
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-ink-400">
                  Prediction
                </p>
                <p className={`font-display text-2xl font-bold ${
                  isAI ? 'text-amber-400' : 'text-teal-400'
                }`}>
                  {result.prediction}
                </p>
              </div>
            </div>
          </div>

          {/* Confidence */}
          <div className="rounded-2xl border border-ink-700 bg-ink-850/50 p-5">
            <div className="mb-2 flex items-end justify-between">
              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-ink-400">
                  Confidence
                </p>
                <p className="font-display text-3xl font-bold text-ink-50">
                  {result.confidence}%
                </p>
              </div>
              <span className={`rounded-lg px-3 py-1 text-xs font-semibold ${
                result.confidenceLevel === 'Very High' || result.confidenceLevel === 'High'
                  ? 'bg-teal-500/15 text-teal-300'
                  : result.confidenceLevel === 'Moderate'
                  ? 'bg-amber-500/15 text-amber-300'
                  : 'bg-ink-700 text-ink-300'
              }`}>
                {result.confidenceLevel}
              </span>
            </div>
            {/* Progress bar */}
            <div className="relative h-2.5 overflow-hidden rounded-full bg-ink-800">
              <div
                className={`absolute inset-y-0 left-0 rounded-full transition-all duration-1000 ease-out ${
                  isAI
                    ? 'bg-gradient-to-r from-amber-500 to-amber-400'
                    : 'bg-gradient-to-r from-teal-600 to-teal-400'
                }`}
                style={{ width: `${result.confidence}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse" />
              </div>
            </div>
            <div className="mt-1.5 flex justify-between font-mono text-[10px] text-ink-500">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Explanation */}
          <div className="rounded-2xl border border-ink-700 bg-ink-850/50 p-5">
            <p className="font-mono text-xs uppercase tracking-wider text-ink-400 mb-2">
              Analysis Summary
            </p>
            <p className="text-sm leading-relaxed text-ink-200">
              {result.explanation}
            </p>
          </div>

          {/* Technical details toggle */}
          <button
            onClick={onToggleTechnical}
            className="flex items-center justify-between rounded-xl border border-ink-700 bg-ink-850/50 px-5 py-3 text-sm font-medium text-ink-200 transition-colors hover:border-ink-600"
          >
            <span className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-teal-400" />
              Technical Details
            </span>
            {showTechnical ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>

          {showTechnical && (
            <div className="animate-fade-in space-y-3 rounded-2xl border border-ink-700 bg-ink-900/60 p-5">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <TechItem label="Input Size" value={result.technicalDetails.inputSize} />
                <TechItem label="Processing Time" value={result.technicalDetails.processingTime} />
                <TechItem label="Raw Score" value={result.technicalDetails.rawScore.toFixed(4)} />
                <TechItem label="Model" value="CNN v1.0" />
              </div>
              <div>
                <p className="mb-2 font-mono text-xs uppercase tracking-wider text-ink-400">
                  Layer Activations
                </p>
                <div className="space-y-2">
                  {result.technicalDetails.layerActivations.map((la) => (
                    <div key={la.layer} className="flex items-center gap-3">
                      <span className="w-48 shrink-0 font-mono text-xs text-ink-400">
                        {la.layer}
                      </span>
                      <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-ink-800">
                        <div
                          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-teal-600 to-teal-400 transition-all duration-700"
                          style={{ width: `${la.activation * 100}%` }}
                        />
                      </div>
                      <span className="w-12 shrink-0 text-right font-mono text-xs text-teal-300">
                        {(la.activation * 100).toFixed(1)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-2 font-mono text-xs uppercase tracking-wider text-ink-400">
                  Extracted Features
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(result.features).map(([key, val]) => (
                    <div key={key} className="flex items-center justify-between rounded-lg bg-ink-800/50 px-3 py-2">
                      <span className="text-xs text-ink-400">{key.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase())}</span>
                      <span className="font-mono text-xs text-teal-300">{(val * 100).toFixed(1)}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              onClick={onReset}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 px-5 py-3 text-sm font-semibold text-ink-950 transition-all hover:from-teal-300 hover:to-teal-500 active:scale-95"
            >
              <RotateCcw className="h-4 w-4" />
              Analyze Another
            </button>
            <button
              onClick={onDownload}
              className="inline-flex items-center gap-2 rounded-xl border border-ink-600 px-5 py-3 text-sm font-medium text-ink-200 transition-colors hover:border-teal-500/50 hover:text-teal-300"
            >
              <Download className="h-4 w-4" />
              Download Result
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function TechItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-ink-800/50 px-3 py-2">
      <p className="font-mono text-[10px] uppercase tracking-wider text-ink-500">{label}</p>
      <p className="font-mono text-sm text-ink-100">{value}</p>
    </div>
  );
}
