import React from "react";
import styles from "../App.css"; 

function ResultsSection() {
  return (
    <section className={styles.resultsSection}>
      <h2 className={styles.resultTitle}>
        The movie you chose is <strong className={styles.highlight}>movie name</strong>!
      </h2>
      <p className={styles.resultSentiment}>
        Its overall sentiment is <strong className={styles.highlight}>sentiment</strong>.
      </p>
      <p className={styles.resultSummary}>
        (Summary here) "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>
      <div className={styles.starsContainer}>
        <h3 className={styles.starsTitle}>Total Stars</h3>
        <div className={styles.starsDisplay} aria-label="0 out of 5 stars">☆☆☆☆☆</div>
      </div>
    </section>
  );
}

export default ResultsSection;
