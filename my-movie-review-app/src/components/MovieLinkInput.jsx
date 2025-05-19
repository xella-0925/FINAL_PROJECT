import React from "react";
import '../App.css';

function MovieLinkInput({ movieLink, setMovieLink, onAnalyze, isAnalyzing }) {
  return (
    <section className="inputSection"> 
      <div className="inputContainer">  
        <label htmlFor="movieLink" className="inputLabel">Movie Link</label> 
        <input
          type="text"
          id="movieLink"
          className="input"
          value={movieLink}
          onChange={(e) => setMovieLink(e.target.value)}
          aria-label="Enter movie review link"
          placeholder="Paste movie review link here"
        />
      </div>
      <button
        className="analyzeButton"
        onClick={onAnalyze}
        disabled={isAnalyzing || !movieLink.trim()}
        aria-busy={isAnalyzing}
      >
        {isAnalyzing ? "Analyzing..." : "Analyze"}
      </button>
    </section>
  );
}

export default MovieLinkInput;