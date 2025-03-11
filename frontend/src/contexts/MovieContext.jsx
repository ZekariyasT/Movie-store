/* eslint-disable react-refresh/only-export-components */
import {
  useState,
  useContext,
  useEffect,
  createContext,
  useCallback,
} from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    const storedFavs = localStorage.getItem("favorites");
    if (storedFavs) setFavorites(JSON.parse(storedFavs));
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }, [favorites]);

  const addToFavorites = useCallback((movie) => {
    setFavorites((prev) => [...prev, movie]);
  }, []);
  const removeFromFavorites = useCallback((movieId) => {
    setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
  }, []);
  const isFavorite = useCallback(
    (movieId) => {
      return favorites.some((movie) => movie.id === movieId);
    },
    [favorites]
  );
  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
};
