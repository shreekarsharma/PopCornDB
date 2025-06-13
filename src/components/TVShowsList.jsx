import dayjs from "dayjs";
import { Link, useParams, useNavigate } from "react-router-dom";
import useFetchData from "../hooks/useFetchData";
import { TmdbConfigContext } from "../App";
import { useContext, useEffect, useState } from "react";
import noPoster from "../assets/poster.png";

const TVShowsList = () => {
  const navigate = useNavigate();
  const { type, page } = useParams();
  const [pageNumber, setPageNumber] = useState(Number(page) || 1);
  const { baseURL, options } = useContext(TmdbConfigContext);
  const endPoints = {
    "top-rated": `${baseURL}tv/top_rated?language=en-US&page=${pageNumber}`,
    popular: `${baseURL}tv/popular?language=en-US&page=${pageNumber}`,
    "on-the-air": `${baseURL}tv/on_the_air?language=en-US&page=${pageNumber}`,
    "airing-today": `${baseURL}tv/airing_today?language=en-US&page=${pageNumber}`,
  };
  const data = useFetchData(endPoints[type], options);

  const headingMap = {
    popular: "Popular TV Shows",
    "top-rated": "Top Rated TV Shows",
    "airing-today": "TV Shows Airing Today",
    "on-the-air": "Currently Airing TV Shows",
  };
  useEffect(() => {
    if (pageNumber !== 1) {
      setPageNumber(1);
      navigate(`/${type}/1`, { replace: true });
    }
  }, [type]);
  useEffect(() => {
    if (Number(page) !== pageNumber) {
      navigate(`/tvshow/${type}/${pageNumber}`);
    }
  }, [pageNumber, navigate, type, page]);
  return (
    <div className="p-5">
      <h1 className="text-2xl sm:text-3xl font-medium mb-10 text-center sm:text-left">{headingMap[type]}</h1>
      <div className="flex flex-wrap gap-10 justify-center">
        {data?.data?.results?.map((tvshow) => {
          return (
            <Link to={`/tv/${tvshow.id}`} key={tvshow.id}>
              <div
                className="card w-50 shadow-lg border border-gray-300"
                key={tvshow.id}
              >
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
                  <p>{dayjs(tvshow.first_air_date).format("MMMM D, YYYY")}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="join grid grid-cols-2 w-50 my-10 mx-auto">
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

export default TVShowsList;
