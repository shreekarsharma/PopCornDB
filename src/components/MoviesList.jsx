import dayjs from "dayjs";
import { Link, useParams, useNavigate } from "react-router-dom";
import useFetchData from "../hooks/useFetchData";
import { TmdbConfigContext } from "../App";
import { useContext, useEffect, useState } from "react";
import noPoster from "../assets/poster.png";

const MoviesList = () => {
  const { type, page } = useParams();
  const navigate = useNavigate();
  const { baseURL, options } = useContext(TmdbConfigContext);
  const [pageNumber, setPageNumber] = useState(Number(page) || 1);
  const endPoints = {
    "top-rated": `${baseURL}movie/top_rated?language=en-US&page=${pageNumber}`,
    popular: `${baseURL}movie/popular?language=en-US&page=${pageNumber}`,
    upcoming: `${baseURL}movie/upcoming?language=en-US&page=${pageNumber}`,
    "now-playing": `${baseURL}movie/now_playing?language=en-US&page=${pageNumber}`,
  };
  const data = useFetchData(endPoints[type], options);
  const headingMap = {
    popular: "Popular Movies",
    "top-rated": "Top Rated Movies",
    upcoming: "Upcoming Movies",
    "now-playing": "Now Playing Movies",
  };
  useEffect(() => {
    if (pageNumber !== 1) {
      setPageNumber(1);
      navigate(`/${type}/1`, { replace: true });
    }
  }, [type]);
  useEffect(() => {
    if (Number(page) !== pageNumber) {
      navigate(`/movies/${type}/${pageNumber}`);
    }
  }, [pageNumber, navigate, type, page]);
  return (
    <div className="px-5 py-10">
      <h1 className="text-2xl sm:text-3xl font-medium mb-10 text-center sm:text-left">{headingMap[type]}</h1>
      <div className="flex flex-wrap gap-10 justify-center">
        {data?.data?.results?.map((movie) => {
          return (
            <Link to={`/movie/${movie.id}`} key={movie.id}>
              <div
                className="card w-50 shadow-lg border border-gray-300"
                key={movie.id}
              >
                <figure>
                  <img
                    className="w-100"
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                        : noPoster
                    }
                    alt={movie.title}
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{movie.title}</h2>
                  <p>{dayjs(movie.release_date).format("MMMM D, YYYY")}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="join grid grid-cols-2 w-50 mt-10 mx-auto">
        <button
          className="join-item btn btn-outline"
          onClick={() =>
            setPageNumber((pageNumber) => Math.max(1, pageNumber - 1))
          }
          disabled={pageNumber === 1}
        >
          Previous
        </button>
        <button
          className="join-item btn btn-outline"
          onClick={() => setPageNumber((pageNumber) => pageNumber + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MoviesList;
