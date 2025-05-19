import React from "react";
import '../App.css';

function UserReviews({ reviewsData }) { 
  return (
    <section className="reviewsSection">  
      <h2 className="reviewsTitle">User Reviews and Predictions</h2>  
      <div className="reviewsContainer" role="list">  
        {reviewsData && reviewsData.length > 0 ? (
            reviewsData.map((review, index) => (
                <div key={index} className="reviewCard" role="listitem" tabIndex="0">
                    {/* Display review content, sentiment, and star rating */}
                    <p>{review.text}</p>
                    <p>Sentiment: {review.sentiment}</p>
                    <p>Rating: {review.star_rating} / 5</p>
                </div>
            ))
        ) : (
            <p>No reviews to display yet. Enter a movie link to analyze!</p>
        )}

        <button className="nextButton" aria-label="Next reviews">  
          <span className="sr-only">➨</span>
          <i className="tiTiChevronRight" aria-hidden="true" /> 
        </button>
      </div>
      <div className="pagination">  
        <button className="paginationDot" aria-label="Page 1" />  
        <button className="paginationDot" aria-label="Page 2" />  
        <button className="paginationDot" aria-label="Page 3" />  
      </div>
    </section>
  );
}

export default UserReviews;