import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import useFetchData from "../hooks/useFetchData";
import { TmdbConfigContext } from "../App";
import noPoster from "../assets/poster.png";
import noPhoto from "../assets/photo.png";
dayjs.extend(duration);
const Person = () => {
  const { id } = useParams();
  const { baseURL, options } = useContext(TmdbConfigContext);
  const personURL = `${baseURL}person/${id}?language=en-US`;
  const personMovieCreditsURL = `${baseURL}person/${id}/movie_credits?language=en-US`;
  const personTVShowCreditsURL = `${baseURL}person/${id}/tv_credits?language=en-US`;
  const person = useFetchData(personURL, options);
  const personMovieCredits = useFetchData(personMovieCreditsURL, options);
  const personTVShowCredits = useFetchData(personTVShowCreditsURL, options);

  return (
    <>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row gap-20">
          <img
            src={
              person?.data?.profile_path
                ? `https://image.tmdb.org/t/p/original${person?.data?.profile_path}`
                : noPhoto
            }
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold mb-5">{person?.data?.name}</h1>
            <p className="">
              <span className="font-medium">Birthday: </span>
              {dayjs(person?.data?.birthday).format("MMMM D, YYYY")}
            </p>
            <p className="">
              <span className="font-medium">Place of Birth: </span>
              {person?.data?.place_of_birth}
            </p>
            <p className="py-6">{person?.data?.biography}</p>
          </div>
        </div>
      </div>
      {personMovieCredits?.data?.cast?.length > 0 && (
        <div className="m-10">
          <h1 className=" mb-5 text-2xl font-bold">Movies — As Cast</h1>
          <div className="carousel gap-5">
            {personMovieCredits?.data?.cast.map((person) => {
              return (
                <div className="carousel-item relative" key={person.credit_id}>
                  <Link to={`/movie/${person.id}`}>
                    <img
                      className="w-41"
                      src={
                        person.poster_path
                          ? `https://image.tmdb.org/t/p/original${person.poster_path}`
                          : noPoster
                      }
                      alt={person.name}
                    />
                    <h1 className="absolute bg-black  w-full bottom-0 text-center py-1 font-medium">
                      <span className="block text-white">
                        {person.character}
                      </span>
                    </h1>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {personTVShowCredits?.data?.cast?.length > 0 && (
        <div className="m-10">
          <h1 className=" mb-5 text-2xl font-bold">TV Shows — As Cast</h1>
          <div className="carousel gap-5">
            {personTVShowCredits?.data?.cast.map((person) => {
              return (
                <div className="carousel-item relative" key={person.credit_id}>
                  <Link to={`/tv/${person.id}`}>
                    <img
                      className="w-41"
                      src={
                        person.poster_path
                          ? `https://image.tmdb.org/t/p/original${person.poster_path}`
                          : noPoster
                      }
                      alt={person.name}
                    />
                    <h1 className="absolute bg-black  w-full bottom-0 text-center py-1 font-medium">
                      <span className="block text-white">
                        {person.character}
                      </span>
                    </h1>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {personMovieCredits?.data?.crew?.length > 0 && (
        <div className="m-10">
          <h1 className=" mb-5 text-2xl font-bold">Movies — As Crew</h1>
          <div className="carousel gap-5">
            {personMovieCredits?.data?.crew.map((person) => {
              return (
                <div className="carousel-item relative" key={person.credit_id}>
                  <Link to={`/movie/${person.id}`}>
                    <img
                      className="w-41"
                      src={
                        person.poster_path
                          ? `https://image.tmdb.org/t/p/original${person.poster_path}`
                          : noPoster
                      }
                      alt={person.name}
                    />
                    <h1 className="absolute bg-black  w-full bottom-0 text-center py-1 font-medium">
                      <span className="block text-white">{person.job}</span>
                    </h1>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {personTVShowCredits?.data?.crew?.length > 0 && (
        <div className="m-10">
          <h1 className=" mb-5 text-2xl font-bold">TV Shows — As Crew</h1>
          <div className="carousel gap-5">
            {personTVShowCredits?.data?.crew.map((person) => {
              return (
                <div className="carousel-item relative" key={person.credit_id}>
                  <Link to={`/tv/${person.id}`}>
                    <img
                      className="w-41"
                      src={
                        person.poster_path
                          ? `https://image.tmdb.org/t/p/original${person.poster_path}`
                          : noPoster
                      }
                      alt={person.name}
                    />
                    <h1 className="absolute bg-black  w-full bottom-0 text-center py-1 font-medium">
                      <span className="block text-white">
                        {person.job}
                      </span>
                    </h1>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Person;
