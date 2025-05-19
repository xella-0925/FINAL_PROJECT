import React from "react";
import styles from "./src/App.css"; 

function UserReviews() {
  return (
    <section className={styles.reviewsSection}>
      <h2 className={styles.reviewsTitle}>User Reviews and Predictions</h2>
      <div className={styles.reviewsContainer} role="list">
        <div className={styles.reviewCard} role="listitem" tabIndex="0" />
        <div className={styles.reviewCard2} role="listitem" tabIndex="0" />
        <div className={styles.reviewCard3} role="listitem" tabIndex="0" />
        <div className={styles.reviewCard4} role="listitem" tabIndex="0" />
        <button className={styles.nextButton} aria-label="Next reviews">
          <span className="sr-only">Next reviews</span>
          <i className={styles.tiTiChevronRight} aria-hidden="true" />
        </button>
      </div>
      <div className={styles.pagination}>
        <button className={styles.paginationDot} aria-label="Page 1" />
        <button className={styles.paginationDot} aria-label="Page 2" />
        <button className={styles.paginationDot} aria-label="Page 3" />
      </div>
    </section>
  );
}

export default UserReviews;
