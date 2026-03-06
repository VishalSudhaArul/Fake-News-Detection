from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import re

app = Flask(__name__)
CORS(app)

# Load ML model
model = joblib.load("model.pkl")
vectorizer = joblib.load("vectorizer.pkl")


# -----------------------------
# FACT CHECK HEURISTIC
# -----------------------------

suspicious_words = [
    "secret",
    "shocking",
    "breaking",
    "you won't believe",
    "miracle",
    "experiment proves",
    "government hiding",
    "conspiracy",
    "hidden truth",
    "doctors hate",
    "scientists prove",
    "cure instantly"
]


def credibility_check(text):

    score = 100
    text_lower = text.lower()

    for word in suspicious_words:
        if word in text_lower:
            score -= 15

    # penalize excessive exclamation
    if "!!!" in text:
        score -= 10

    # penalize random gibberish
    if re.search(r"[a-z]{6,}[0-9]{3,}", text_lower):
        score -= 10

    score = max(score, 0)

    return score


# -----------------------------
# ML PREDICTION
# -----------------------------

def predict_news(text):

    vector = vectorizer.transform([text])

    prediction = model.predict(vector)[0]

    probability = model.predict_proba(vector)[0]

    confidence = max(probability) * 100

    if prediction == 1:
        label = "Real News"
    else:
        label = "Fake News"

    credibility = credibility_check(text)

    return label, round(confidence,2), credibility


# -----------------------------
# API ROUTE
# -----------------------------

@app.route("/predict", methods=["POST"])
def predict():

    data = request.json
    text = data.get("text","")

    if text == "":
        return jsonify({"error":"No text provided"})

    label, confidence, credibility = predict_news(text)

    return jsonify({
        "prediction": label,
        "confidence": confidence,
        "credibility": credibility
    })


# -----------------------------

if __name__ == "__main__":
    app.run(debug=True)