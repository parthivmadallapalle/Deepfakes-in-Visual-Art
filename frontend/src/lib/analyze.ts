export interface DetectionResult {
  prediction: 'AI-Generated' | 'Human-Created';
  confidence: number;
  confidenceLevel: 'Low / Uncertain' | 'Medium' | 'High';
  features: Record<string, number>;
  explanation: string;
  technicalDetails: {
    inputSize: string;
    processingTime: string;
    layerActivations: { layer: string; activation: number }[];
    rawScore: number;
  };
}

interface BackendResponse {
  prediction: 'AI-Generated' | 'Human-Created';
  confidence: number;
  confidence_level: 'Low / Uncertain' | 'Medium' | 'High';
  score: number;
  processing_time: number;
  filename: string;
  model: string;
  input_size: string;
  timestamp: string;
  error?: string;
}

export async function analyzeImage(
  file: File,
  onProgress?: (stage: string) => void,
): Promise<DetectionResult> {
  onProgress?.('Loading image');

  const formData = new FormData();
  formData.append('image', file);

  onProgress?.('Preprocessing');

 const response = await fetch(`${import.meta.env.VITE_API_URL}/api/predict`, {
    method: 'POST',
    body: formData,
  });

  const data = (await response.json()) as BackendResponse;

  if (!response.ok) {
    throw new Error(data.error || 'Unable to analyze image');
  }

  onProgress?.('Convolution');
  await new Promise((resolve) => setTimeout(resolve, 150));
  onProgress?.('Pooling');
  await new Promise((resolve) => setTimeout(resolve, 150));
  onProgress?.('Classification');

  const confidence = Number(data.confidence);
  const prediction = data.prediction;
  const confidenceLevel = data.confidence_level;

  const explanation = prediction === 'AI-Generated'
    ? `The trained CNN classified this artwork as AI-generated with ${confidence.toFixed(2)}% confidence.`
    : `The trained CNN classified this artwork as human-created with ${confidence.toFixed(2)}% confidence.`;

  return {
    prediction,
    confidence,
    confidenceLevel,
    features: {},
    explanation,
    technicalDetails: {
      inputSize: data.input_size,
      processingTime: `${Number(data.processing_time).toFixed(2)} s`,
      layerActivations: [],
      rawScore: Number(data.score),
    },
  };
}
