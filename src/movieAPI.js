const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "cbeff76988f1a8afa3a2dbf8f4cde34f";

const fetchFromAPI = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}`);
  }

  return response.json();
};

export const fetchTrendingMovies = async () => {
  const data = await fetchFromAPI(`${BASE_URL}/trending/all/day?language=en-US&api_key=${API_KEY}`);

  return data.results;
};

export const fetchMovieByQuery = async (query) => {
  const data = await fetchFromAPI(
    `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}&language=en-US&api_key=${API_KEY}`
  );

  return data.results;
};

export const fetchMovieById = async (id) => {
  const data = await fetchFromAPI(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`);

  return data;
};

export const fetchMovieReviews = async (id) => {
  const data = await fetchFromAPI(
    `${BASE_URL}/movie/${id}/reviews?api_key=${API_KEY}&language=en-US`
  );

  return data;
};

export const fetchMovieCasts = async (id) => {
  const data = await fetchFromAPI(
    `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=en-US`
  );

  return data.cast;
};
