import React from "react";
import styles from "../App.css";

function MovieLinkInput({ movieLink, setMovieLink, onAnalyze, isAnalyzing }) {
  return (
    <section className={styles.inputSection}>
      <div className={styles.inputContainer}>
        <label htmlFor="movieLink" className={styles.inputLabel}>Movie Link</label>
        <input
          type="text"
          id="movieLink"
          className={styles.input}
          value={movieLink}
          onChange={(e) => setMovieLink(e.target.value)}
          aria-label="Enter movie review link"
          placeholder="Paste movie review link here"
        />
      </div>
      <button
        className={styles.analyzeButton}
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
