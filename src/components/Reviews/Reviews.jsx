import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchMovieReviews } from "../../movieAPI.js";
import "./Reviews.styled.css";

const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getReview = async () => {
      try {
        setError(null);
        const data = await fetchMovieReviews(movieId);
        setReviews(data.results);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch movie review");
      }
    };

    getReview();
  }, [movieId]);

  if (error) {
    return <p className="reviews-error">{error} </p>;
  }

  return (
    <ul className="reviews-list">
      {reviews.map((review) => (
        <li key={review.id} className="reviews-item">
          <p className="reviews-author">
            <strong>{review.author}</strong>
          </p>
          <p>{review.content}</p>
        </li>
      ))}
    </ul>
  );
};
export default Reviews;
