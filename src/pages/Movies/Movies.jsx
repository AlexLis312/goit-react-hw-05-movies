import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { fetchMovieByQuery } from "../../movieAPI";
import "./Movies.styled.css";

const Movies = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();

  const handleChange = (event) => {
    setQuery(event.currentTarget.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (query.trim() === "") {
      setError("Please enter a search term.");
      return;
    }

    try {
      setError(null);
      setResult([]);
      const data = await fetchMovieByQuery(query);
      setResult(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch search movies");
    }
  };

  return (
    <div className="movies-wrapper">
      <form className="movies-form" onSubmit={handleSubmit}>
        <input className="movies-input" type="text" value={query} onChange={handleChange} />
        <button className="movies-button" type="submit">
          Search
        </button>
      </form>

      {error && <p className="movies-error">{error}</p>}

      <ul className="movies-list">
        {result.map((movie) => (
          <li key={movie.id} className="movies-item">
            <Link
              to={`/movies/${movie.id}`}
              state={{ from: location, type: "movie" }}
              className="movies-link"
            >
              {movie.title || movie.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Movies;
