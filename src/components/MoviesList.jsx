import { useParams } from "react-router-dom";
import useFetchData from "../hooks/useFetchData";
import { TmdbConfigContext } from "../App";
import { useContext } from "react";
import noPoster from "../assets/poster.png";

const MoviesList = () => {
  const { type } = useParams();
  const { baseURL, options } = useContext(TmdbConfigContext);
  const endPoints = {
    "top-rated": `${baseURL}movie/top_rated?language=en-US&page=1`,
    popular: `${baseURL}movie/popular?language=en-US&page=1`,
    upcoming: `${baseURL}movie/upcoming?language=en-US&page=1`,
    "now-playing": `${baseURL}movie/now_playing?language=en-US&page=1`,
  };
  const data = useFetchData(endPoints[type], options);
  const headingMap = {
    popular: "Popular Movies",
    "top-rated": "Top Rated Movies",
    upcoming: "Upcoming Movies",
    "now-playing": "Now Playing Movies",
  };
  return (
    <>
      <h1 className="pl-10 pt-10 text-3xl font-medium">{headingMap[type]}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 p-10">
        {data?.data?.results?.map((movie) => {
          return (
            <div className="card bg-base-100 w-96 shadow-sm" key={movie.id}>
              <figure>
                <img
                className="w-100"
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                      : noPoster
                  }
                  alt="Shoes"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{movie.title}</h2>
                <p>
                  {movie.overview}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MoviesList;
