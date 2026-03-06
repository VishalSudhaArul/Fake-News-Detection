import React, { useState } from "react";
import "./NewsDetector.css";

const API_URL = "https://fake-news-detection-2-j5mr.onrender.com";

function NewsDetector() {

  const [text, setText] = useState("");
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [confidence, setConfidence] = useState(null);
  const [history, setHistory] = useState([]);

  // Detect Text
  const detectText = async () => {

    if (!text.trim()) return;

    try {

      const res = await fetch(`${API_URL}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();

      setResult(data.result);
      setConfidence(data.confidence);

      setHistory([
        {
          text: text.substring(0, 80),
          result: data.result,
        },
        ...history,
      ]);

    } catch (err) {
      console.error(err);
    }
  };

  // Detect URL
  const detectURL = async () => {

    if (!url.trim()) return;

    try {

      const res = await fetch(`${API_URL}/predict-url`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      setResult(data.result);
      setConfidence(data.confidence);

      setHistory([
        {
          text: url,
          result: data.result,
        },
        ...history,
      ]);

    } catch (err) {
      console.error(err);
    }
  };

  // Example Real News
  const exampleReal = () => {

    const sample =
      "The Indian government announced a new education policy aimed at improving rural school infrastructure and digital learning.";

    setText(sample);
  };

  // Example Fake News
  const exampleFake = () => {

    const sample =
      "Breaking: Scientists discover a secret planet hidden behind the sun that NASA kept secret for decades.";

    setText(sample);
  };

  const clearAll = () => {
    setText("");
    setUrl("");
    setResult(null);
    setConfidence(null);
  };

  return (
    <div className="container">

      <div className="left">

        <h1>AI Fake News Detector</h1>

        <p>
          Analyze news text or article links using machine learning
        </p>

        <hr />

        <h3>Check News Text</h3>

        <textarea
          placeholder="Paste news headline or article..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="buttons">

          <button className="primary" onClick={detectText}>
            Detect News
          </button>

          <button className="secondary" onClick={clearAll}>
            Clear
          </button>

        </div>

        <div className="examples">

          <button className="exampleReal" onClick={exampleReal}>
            Try Real News Example
          </button>

          <button className="exampleFake" onClick={exampleFake}>
            Try Fake News Example
          </button>

        </div>

        <hr />

        <h3>Check News URL</h3>

        <input
          placeholder="Paste article URL..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <button className="urlBtn" onClick={detectURL}>
          Detect URL
        </button>

        {result && (
          <div className="resultBox">

            <h2
              style={{
                color: result === "Real News" ? "green" : "red",
              }}
            >
              {result}
            </h2>

            <p>Confidence: {confidence}%</p>

          </div>
        )}

        <p className="note">
          Note: This system predicts fake news based on writing patterns and may not verify factual correctness.
        </p>

      </div>

      <div className="right">

        <h3>Prediction Analytics</h3>

        <hr />

        <h3>History</h3>

        {history.length === 0 ? (
          <p>No history yet</p>
        ) : (
          history.map((item, index) => (
            <div key={index} className="historyItem">

              <p>{item.text}</p>

              <span
                style={{
                  color:
                    item.result === "Real News" ? "green" : "red",
                }}
              >
                {item.result}
              </span>

            </div>
          ))
        )}

      </div>

    </div>
  );
}

export default NewsDetector;