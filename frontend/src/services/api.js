const API_KEY = "d0fade7cfd4647a912a6e6f218a69e1c";
const BASE_URL = "https://api.themoviedb.org/3";

// export const getPopularMovies = async () => {
//   const response = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}`);
//   const data = response.json();
//   return data.results;
// };

export const getPopularMovies = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    );

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Popular Movies:", data.results); // Log the results

    return data.results; // Return the movies array
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return [];
  }
};

export const searchMovies = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}`
  );
  const data = response.json();
  console.log(data);
  return data.results;
};
