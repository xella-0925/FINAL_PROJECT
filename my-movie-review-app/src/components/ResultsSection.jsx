import React from "react";
import '../App.css';

function ResultsSection() { 
  return (
    <section className="resultsSection">  
      <h2 className="resultTitle">  
        The movie you chose is <strong className="highlight">movie name</strong>!  
      </h2>
      <p className="resultSentiment">  
        Its overall sentiment is <strong className="highlight">sentiment</strong>.  
      </p>
      <p className="resultSummary">  
        (Summary here) "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>
      <div className="starsContainer">
        <h3 className="starsTitle">Total Stars</h3>
        <div className="starsDisplay" aria-label={`${averageStarRating} out of 5 stars`}>
            {Array.from({ length: 5 }, (_, i) => (
                <span key={i}>{i < averageStarRating ? '★' : '☆'}</span>
            ))}
        </div>
      </div>
    </section>
  );
}

export default ResultsSection;