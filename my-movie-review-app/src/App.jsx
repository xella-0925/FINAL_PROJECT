// src/App.jsx
import React, { useState } from 'react';
import './App.css'; // You can style this as needed

function App() {
  const [reviewText, setReviewText] = useState('');
  const [result, setResult] = useState(null); // State to store the prediction result
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [error, setError] = useState(null); // State for error messages

  const handleInputChange = (event) => {
    setReviewText(event.target.value);
    setResult(null); // Clear previous result when text changes
    setError(null); // Clear previous error
  };

  const handleSubmitReview = async () => {
    if (!reviewText.trim()) {
      setError("Please enter a movie review.");
      return;
    }

    setLoading(true);
    setResult(null);
    setError(null);

    try {
      // Make sure this URL matches where your Flask backend is running
      const response = await fetch('http://localhost:5000/predict', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ review: reviewText }),
      });

      if (!response.ok) {
        // Handle non-2xx responses (e.g., 400, 500)
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResult(data); // Store the received data { sentiment, sentiment_score, star_rating }

    } catch (error) {
      console.error('Error fetching sentiment:', error);
      // Display a user-friendly error message
      setError(`Failed to get analysis: ${error.message || error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Movie Review Sentiment Analyzer</h1>

      <textarea
        placeholder="Enter your movie review here..."
        rows="10"
        cols="50"
        value={reviewText}
        onChange={handleInputChange}
        disabled={loading} // Disable textarea while loading
      />

      <br />

      <button onClick={handleSubmitReview} disabled={loading}>
        {loading ? 'Analyzing...' : 'Analyze Review'}
      </button>

      {/* Display error message if present */}
      {error && (
        <div style={{ color: 'red', marginTop: '10px' }}>
          Error: {error}
        </div>
      )}

      {/* Display result if present */}
      {result && (
        <div className="result-container" style={{ marginTop: '20px', border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
          <h2>Analysis Result:</h2>
          <p><strong>Predicted Sentiment:</strong> {result.sentiment}</p>
          {/* Optional: Display score and rating details */}
          {/* <p>Sentiment Score: {result.sentiment_score.toFixed(4)}</p> */}
          <p><strong>Predicted Star Rating:</strong> {result.star_rating} / 5</p>
          {/* You could render star icons here based on result.star_rating */}
        </div>
      )}
    </div>
  );
}

export default App;