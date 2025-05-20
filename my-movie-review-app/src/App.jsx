// src/App.jsx
"use client";

import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import MovieLinkInput from "./components/MovieLinkInput";
import UserReviews from "./components/UserReviews";
import ResultsSection from "./components/ResultsSection";

function App() {
  const [movieLink, setMovieLink] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    if (!movieLink.trim()) {
      setError("Please enter a movie link.");
      return;
    }

    if (!movieLink.startsWith("https://www.metacritic.com/movie/")) {
      setError("Please enter a valid Metacritic movie user review link.");
      return;
    }
    setIsAnalyzing(true);
    setAnalysisResults(null);
    setError(null);

    try {
      // Make the API call to Flask backend analyze endpoint
      const response = await fetch('http://localhost:5000/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Send the movieLink in the body under the 'url' key
        body: JSON.stringify({ url: movieLink }),
      });

      if (!response.ok) {
        // Handle non-2xx responses (e.g., 400, 500)
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setAnalysisResults(data);

    } catch (error) {
      console.error('Error analyzing movie link:', error);
      // Display a user-friendly error message
      setError(`Failed to analyze link: ${error.message || error}`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // --- Functions to pass data to child components ---
  const getMovieTitle = () => analysisResults?.title || '';
  const getOverallSentiment = () => {
      if (!analysisResults || !analysisResults.reviews || analysisResults.reviews.length === 0) {
          return 'N/A';
      }
      const positiveCount = analysisResults.reviews.filter(review => review.sentiment === 'Positive').length;
      const negativeCount = analysisResults.reviews.filter(review => review.sentiment === 'Negative').length;
      if (positiveCount > negativeCount) return 'Mostly Positive';
      if (negativeCount > positiveCount) return 'Mostly Negative';
      if (positiveCount + negativeCount > 0) return 'Neutral';
      return 'N/A';
  };

  const getAverageStarRating = () => {
      if (!analysisResults || !analysisResults.reviews || analysisResults.reviews.length === 0) {
          return '0'; // Default rating
      }
      const totalStars = analysisResults.reviews.reduce((sum, review) => sum + review.star_rating, 0);
      const average = totalStars / analysisResults.reviews.length;
      return Math.round(average * 10) / 10;
  };


  // --- Pass individual review data to UserReviews ---
  const reviewsForDisplay = analysisResults?.reviews || [];


  return (
    <main className="mainContainer">
      <Header />
      <MovieLinkInput
        movieLink={movieLink}
        setMovieLink={setMovieLink}
        onAnalyze={handleAnalyze}
        isAnalyzing={isAnalyzing}
      />

       {/* Display error message if present */}
       {error && (
            <div style={{ color: 'red', marginTop: '20px', textAlign: 'center', width: '100%' }}>
              Error: {error}
            </div>
        )}

       {/* Show loading indicator */}
       {isAnalyzing && (
           <div style={{ marginTop: '20px', textAlign: 'center', width: '100%' }}>
               Analyzing reviews...
           </div>
       )}


      {!isAnalyzing && !error && analysisResults && (
        <>
          {/* Pass reviews data to UserReviews */}
          <UserReviews reviewsData={reviewsForDisplay} />

          {/* Pass results summary data to ResultsSection */}
          <ResultsSection
              movieTitle={getMovieTitle()}
              overallSentiment={getOverallSentiment()}
              averageStarRating={getAverageStarRating()}
              summaryText={analysisResults?.summary || ""}
          />
        </>
      )}
      
      {!isAnalyzing && !error && !analysisResults && (
          <div style={{ marginTop: '20px', textAlign: 'center', width: '100%' }}>
              Enter a movie link above and click "Analyze" to see reviews and predictions.
          </div>
      )}

    </main>
  );
}

export default App;