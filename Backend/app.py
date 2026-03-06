from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)
CORS(app)

# Load trained model and vectorizer
model = joblib.load("model.pkl")
vectorizer = joblib.load("vectorizer.pkl")


# ---------------------------------
# Function: Extract article text
# ---------------------------------
def extract_text_from_url(url):
    try:
        headers = {
            "User-Agent": "Mozilla/5.0"
        }

        response = requests.get(url, headers=headers, timeout=10)
        soup = BeautifulSoup(response.text, "lxml")

        paragraphs = soup.find_all("p")
        article_text = " ".join([p.get_text() for p in paragraphs])

        if len(article_text) < 200:
            return None

        return article_text

    except Exception as e:
        print("Error extracting article:", e)
        return None


# ---------------------------------
# Home Route
# ---------------------------------
@app.route("/")
def home():
    return jsonify({
        "message": "AI Fake News Detection API Running"
    })


# ---------------------------------
# Predict from Text
# ---------------------------------
@app.route("/predict", methods=["POST"])
def predict():

    data = request.get_json()

    text = data.get("text", "")

    if text.strip() == "":
        return jsonify({
            "prediction": "Invalid Input",
            "confidence": 0
        })

    vectorized = vectorizer.transform([text])
    prediction = model.predict(vectorized)[0]
    probability = model.predict_proba(vectorized)[0]

    confidence = round(max(probability) * 100, 2)

    result = "Real News" if prediction == 1 else "Fake News"

    return jsonify({
        "prediction": result,
        "confidence": confidence
    })


# ---------------------------------
# Predict from URL
# ---------------------------------
@app.route("/predict-url", methods=["POST"])
def predict_url():

    data = request.get_json()
    url = data.get("url")

    if not url:
        return jsonify({
            "prediction": "Invalid URL",
            "confidence": 0
        })

    article_text = extract_text_from_url(url)

    if not article_text:
        return jsonify({
            "prediction": "Unable to fetch article. Try another link.",
            "confidence": 0
        })

    vectorized = vectorizer.transform([article_text])
    prediction = model.predict(vectorized)[0]
    probability = model.predict_proba(vectorized)[0]

    confidence = round(max(probability) * 100, 2)

    result = "Real News" if prediction == 1 else "Fake News"

    return jsonify({
        "prediction": result,
        "confidence": confidence
    })


# ---------------------------------
# Run Server
# ---------------------------------
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)