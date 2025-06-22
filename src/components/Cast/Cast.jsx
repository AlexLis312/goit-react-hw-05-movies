import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchMovieCasts } from "../../movieAPI.js";
import "./Cast.styled.css";

const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCast = async () => {
      try {
        setError(null);
        const data = await fetchMovieCasts(movieId);
        setCast(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch movie cast");
      }
    };

    getCast();
  }, [movieId]);

  if (error) {
    return <p className="cast-error">{error} </p>;
  }

  return (
    <ul className="cast-list">
      {cast.map((actor) => (
        <li key={actor.cast_id} className="cast-item">
          <p>
            {actor.name} as {actor.character}
          </p>
          {actor.profile_path && (
            <img
              src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
              alt={actor.name}
              className="cast-img"
            />
          )}
        </li>
      ))}
    </ul>
  );
};
export default Cast;
