from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from tensorflow.keras.models import load_model
from PIL import Image
import numpy as np
import time
from pathlib import Path
from io import BytesIO
from datetime import datetime

BASE_DIR = Path(__file__).resolve().parent
MODEL_PATH = BASE_DIR / "model" / "ai_art_detector.keras"

app = Flask(__name__)
CORS(app)
app.config["MAX_CONTENT_LENGTH"] = 15 * 1024 * 1024

model = None

def get_model():
    global model
    if model is None:
        if not MODEL_PATH.exists():
            raise FileNotFoundError(f"Model not found: {MODEL_PATH}")
        model = load_model(MODEL_PATH)
    return model

def preprocess(image):
    image = image.convert("RGB").resize((128, 128))
    arr = np.asarray(image, dtype=np.float32) / 255.0
    return np.expand_dims(arr, axis=0)

@app.get("/")
def home():
    return jsonify({
        "status": "online",
        "service": "AI Art Detector Backend"
    })

@app.post("/api/predict")
def predict():
    started = time.perf_counter()

    if "image" not in request.files:
        return jsonify({"error": "No image uploaded."}), 400

    file = request.files["image"]
    if not file.filename:
        return jsonify({"error": "Please choose an image."}), 400

    try:
        image = Image.open(file.stream)
        batch = preprocess(image)
        score = float(get_model().predict(batch, verbose=0)[0][0])

        is_ai = score >= 0.5
        confidence = score if is_ai else 1.0 - score

        if confidence >= 0.80:
            confidence_level = "High"
        elif confidence >= 0.65:
            confidence_level = "Medium"
        else:
            confidence_level = "Low / Uncertain"

        elapsed = round(time.perf_counter() - started, 2)

        return jsonify({
            "prediction": "AI-Generated" if is_ai else "Human-Created",
            "confidence": round(confidence * 100, 2),
            "confidence_level": confidence_level,
            "score": round(score, 6),
            "processing_time": elapsed,
            "filename": file.filename,
            "model": "CNN (Convolutional Neural Network)",
            "input_size": "128 × 128 × 3",
            "timestamp": datetime.now().strftime("%d %b %Y, %I:%M %p")
        })
    except Exception as e:
        return jsonify({"error": f"Could not analyze image: {e}"}), 500

@app.post("/api/report")
def report():
    data = request.get_json(force=True)
    lines = [
        "AI ART DETECTOR",
        "==============================",
        f"Filename: {data.get('filename', '-')}",
        f"Prediction: {data.get('prediction', '-')}",
        f"Confidence: {data.get('confidence', '-')}%",
        f"Confidence Level: {data.get('confidence_level', '-')}",
        f"Model: {data.get('model', 'CNN (Convolutional Neural Network)')}",
        f"Input Size: {data.get('input_size', '128 × 128 × 3')}",
        f"Processing Time: {data.get('processing_time', '-')} seconds",
        f"Analyzed: {data.get('timestamp', '-')}",
        "",
        "This result is produced by the trained CNN model and should",
        "be interpreted together with the confidence level."
    ]
    return send_file(
        BytesIO(("\n".join(lines)).encode("utf-8")),
        mimetype="text/plain",
        as_attachment=True,
        download_name="ai-art-detection-result.txt"
    )

@app.errorhandler(413)
def too_large(_):
    return jsonify({"error": "Image is too large. Maximum size is 15 MB."}), 413

if __name__ == "__main__":
    import os
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))