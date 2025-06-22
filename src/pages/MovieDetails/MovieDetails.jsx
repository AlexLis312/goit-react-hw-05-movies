import { Link, Outlet, useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchMovieById } from "../../movieAPI";
import "./MovieDetails.styled.css";

const MovieDetails = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const backLink = location.state?.from || "/";

  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovie = async () => {
      try {
        setError(null);
        const data = await fetchMovieById(movieId);
        setMovie(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch movie details");
      }
    };

    getMovie();
  }, [movieId]);

  if (error) {
    return <p className="movie-error">{error} </p>;
  }

  if (!movie) {
    return <p>Loading...</p>;
  }

  const genreNames = movie.genres
    ? movie.genres.map((g) => g.name).join(", ")
    : "No genres available";

  const year = movie.release_date ? movie.release_date.slice(0, 4) : "N/A";
  const userScore =
    movie.vote_average !== undefined && movie.vote_average !== null
      ? `${Math.round(movie.vote_average * 10)}%`
      : "N/A";
  return (
    <div className="movie-details">
      <Link to={backLink} className="movie-back">
        ⬅ Go Back
      </Link>

      <h1 className="movie-title">
        {movie.title || movie.name} <span>{year}</span>
      </h1>
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "https://via.placeholder.com/500x750?text=No+Image"
        }
        alt={movie.name || movie.title}
        className="movie-img"
      />

      <div className="movie-info">
        <p>User Score: {userScore}</p>
        <p>
          Overview: <br /> {movie.overview}
        </p>
        <p>
          Genres: <br />
          {genreNames}
        </p>
      </div>

      <nav className="movie-nav">
        <Link to="cast">Cast</Link> <Link to="reviews">Reviews</Link>
      </nav>

      <Outlet />
    </div>
  );
};
export default MovieDetails;
