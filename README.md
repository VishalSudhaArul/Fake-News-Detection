# 📰 AI Fake News Detection System

An AI-powered web application that detects whether a news headline or article is **Real or Fake** using **Machine Learning** and **Natural Language Processing (NLP)**.

The system analyzes text patterns learned from multiple real-world datasets and provides predictions along with confidence scores and analytics.


This project develops an intelligent system that detects fake news using Machine Learning and Natural Language Processing techniques. The system analyzes textual news content and classifies it as real or fake based on trained models. By using algorithms such as Logistic Regression and Naive Bayes, the system helps reduce misinformation and improves information reliability.
---

# 🚀 Live Demo

🌐 Frontend (Vercel)
https://fake-news-detection-six-psi.vercel.app

⚙️ Backend API (Render)
https://fake-news-detection-2-j5mr.onrender.com

---

# 🧠 Features

### 🔎 News Text Detection

Users can paste a news headline or article to analyze if it is **Real or Fake**.

### 🌐 News URL Detection

Paste a news article URL and the system will extract content and analyze it automatically.

### 📊 Prediction Analytics

A pie chart visualizes how many predictions were **Real vs Fake**.

### 📜 Prediction History

Displays previously checked news with their results.

### 📈 Confidence Score

Shows how confident the AI model is about its prediction.

### 🧪 Example Testing

Buttons to instantly test **Real News** and **Fake News** examples.

### ⚡ Hybrid Detection System

Combines:

* Machine Learning prediction
* Rule-based fake headline detection

This improves prediction accuracy.

---

# 🧠 Machine Learning Model

The fake news detection model was trained using **multiple datasets**:

* Fake.csv
* True.csv
* WELFake Dataset
* LIAR Dataset
* FakeNewsNet Dataset

### ML Techniques Used

* TF-IDF Vectorization
* Logistic Regression / Scikit-Learn Model
* NLP Text Cleaning
* Pattern-based Fake News Detection

---

# 🏗️ System Architecture

User
↓
React Frontend (Vercel)
↓
Flask API Backend (Render)
↓
Machine Learning Model
↓
Prediction Result

---

The model predicts fake news based on patterns learned from training datasets. However, predictions may vary when articles come from different writing styles or when incomplete text is extracted from websites.


# 🛠️ Tech Stack

### Frontend

* React (Vite)
* Chart.js
* Axios
* CSS

### Backend

* Python
* Flask
* Flask-CORS
* Scikit-Learn
* Pandas
* BeautifulSoup

### Deployment

* Vercel (Frontend)
* Render (Backend)

---

# 📂 Project Structure

```
Fake-News-Detection
│
├── Backend
│   ├── app.py
│   ├── train_model.py
│   ├── train_bert_model.py
│   ├── model.pkl
│   └── vectorizer.pkl
│
├── Frontend
│   ├── src
│   │   ├── components
│   │   │   └── NewsDetector.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│
├── dataset
│   ├── Fake.csv
│   ├── True.csv
│   ├── WELFake_Dataset.csv
│   └── liar_dataset.tsv
│
└── README.md
```

---

# ⚙️ Installation

## 1️⃣ Clone the Repository

```
git clone https://github.com/VishalSudhaArul/Fake-News-Detection.git
cd Fake-News-Detection
```

---

## 2️⃣ Backend Setup

```
cd Backend
pip install -r requirements.txt
python app.py
```

Backend will run on:

```
http://127.0.0.1:5000
```

---

## 3️⃣ Frontend Setup

```
cd Frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

# 📊 Example Predictions

Example Fake News:

```
Breaking: Scientists discover a secret planet hidden behind the sun.
```

Example Real News:

```
The Indian government announced a new education policy for rural schools.
```

---

# ⚠️ Disclaimer

This system detects fake news based on **writing patterns learned from datasets**.
It does not verify factual accuracy in real time.

---

 
# ⚠️ Disclaimer Important Limitation of Your AI

* Your model is a text classifier, not a fact-checking system.
* The model detects fake news based on linguistic patterns learned from datasets. It does not verify factual correctness, but identifies writing styles commonly associated with fake or       real news.
* The system detects fake news based on linguistic patterns learned from datasets. It performs best when analyzing full news headlines or article content rather than short factual            statements
* The system detects fake news based on linguistic patterns learned from datasets. It does not perform factual verification, so logically incorrect statements may still appear as real if     their writing style resembles legitimate news.
* The system combines machine learning fake-news detection with a heuristic credibility scoring engine that analyzes suspicious linguistic patterns.



# 👨‍💻 Author

Vishal Sudha Arul

GitHub
https://github.com/VishalSudhaArul

---

# ⭐ Future Improvements

* BERT-based deep learning model
* Real-time fact-check API integration
* Source credibility analysis
* AI explanation for predictions
* Multilingual fake news detection

---

