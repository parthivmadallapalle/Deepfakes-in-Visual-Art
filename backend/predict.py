import tensorflow as tf
import numpy as np
from PIL import Image

MODEL_PATH = "model/ai_art_detector.keras"
IMAGE_SIZE = (128, 128)

model = tf.keras.models.load_model(MODEL_PATH)

image_path = input("Enter image path: ")

image = Image.open(image_path).convert("RGB")
image = image.resize(IMAGE_SIZE)

image_array = np.array(image, dtype=np.float32) / 255.0
image_array = np.expand_dims(image_array, axis=0)

prediction = float(model.predict(image_array, verbose=0)[0][0])

if prediction >= 0.5:
    result = "AI-Generated"
    confidence = prediction * 100
else:
    result = "Human-Created"
    confidence = (1 - prediction) * 100

if confidence >= 90:
    confidence_level = "High"
elif confidence >= 70:
    confidence_level = "Moderate"
else:
    confidence_level = "Low / Uncertain"

print()
print("================================")
print("       AI ART DETECTOR")
print("================================")
print("Prediction:", result)
print("Confidence:", f"{confidence:.2f}%")
print("Confidence Level:", confidence_level)
print("================================")