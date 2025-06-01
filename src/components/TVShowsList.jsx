import { useParams } from "react-router-dom";
import useFetchData from "../hooks/useFetchData";
import { TmdbConfigContext } from "../App";
import { useContext } from "react";
import noPoster from "../assets/poster.png";

const TVShowsList = () => {
  const { type } = useParams();
  const { baseURL, options } = useContext(TmdbConfigContext);
  const endPoints = {
    "top-rated": `${baseURL}tv/top_rated?language=en-US&page=1`,
    popular: `${baseURL}tv/popular?language=en-US&page=1`,
    "on-the-air": `${baseURL}tv/on_the_air?language=en-US&page=1`,
    "airing-today": `${baseURL}tv/airing_today?language=en-US&page=1`,
  };
  const data = useFetchData(endPoints[type], options);
  const headingMap = {
    popular: "Popular TV Shows",
    "top-rated": "Top Rated TV Shows",
    "airing-today": "TV Shows Airing Today",
    "on-the-air": "Currently Airing TV Shows",
  };
  return (
    <>
      <h1 className="pl-10 pt-10 text-3xl font-medium">{headingMap[type]}</h1>
      <div className="grid grid-cols-4 gap-1 p-10">
        {data?.data?.results?.map((tvshow) => {
          return (
            <div className="card bg-base-100 w-96 shadow-sm" key={tvshow.id}>
              <figure>
                <img
                  className="w-100"
                  src={
                    tvshow.poster_path
                      ? `https://image.tmdb.org/t/p/original${tvshow.poster_path}`
                      : noPoster
                  }
                  alt="Shoes"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{tvshow.title}</h2>
                <p>{tvshow.overview}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default TVShowsList;
