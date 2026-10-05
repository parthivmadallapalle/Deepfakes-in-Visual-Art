# AI Art Detector — Bolt UI + Real CNN

This project keeps the Bolt-generated React interface and connects its detector to the real Flask/TensorFlow CNN backend.

## Project structure

```text
project/
├── frontend/
└── backend/
    ├── app.py
    ├── predict.py
    └── model/ai_art_detector.keras
```

## 1. Backend

Use the existing Python virtual environment from the original AI Art Detector project so TensorFlow is available.

```powershell
cd "P:\coding.c\c programes\ai-art-detector"
.\venv\Scripts\Activate.ps1
cd "P:\coding.c\c programes\ai-art-detector-bolt-integrated\project\backend"
python app.py
```

The API runs at `http://127.0.0.1:5000`.

## 2. Frontend

Open a second PowerShell window:

```powershell
cd "P:\coding.c\c programes\ai-art-detector-bolt-integrated\project\frontend"
npm install
npm run dev
```

Open the URL printed by Vite, normally `http://localhost:5173`.

The Vite development server proxies `/api/*` to Flask on port 5000.

## Verified integration

- Real TensorFlow CNN model: `ai_art_detector.keras`
- Input size: `128 × 128 × 3`
- Trainable parameters: `3,304,769`
- Test accuracy: `91.7%`
- Test set: `2,000` images
- `/api/predict` verified with HTTP 200
- Human artwork test verified
- AI-generated artwork test verified
- Download Result verified
