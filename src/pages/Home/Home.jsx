import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchTrendingMovies } from "../../movieAPI";
import "./Home.styled.css";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTrendingMovies = async () => {
      try {
        const trendingMovies = await fetchTrendingMovies();
        setMovies(trendingMovies);
      } catch (err) {
        setError("Failed to fetch trending movies");
      }
    };

    getTrendingMovies();
  }, []);

  return (
    <div className="home-wrapper">
      <h1 className="home-title">Trending today</h1>
      {error && <p className="home-error">Error: {error}</p>}
      <ul className="home-movie-list">
        {movies.map((movie) => (
          <li key={movie.id} className="home-movie-item">
            <Link to={`/movies/${movie.id}`} className="home-movie-link">
              {movie.title || movie.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
