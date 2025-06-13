import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import useFetchData from "../hooks/useFetchData";
import { TmdbConfigContext } from "../App";
import noPoster from "../assets/poster.png";
import noPhoto from "../assets/photo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
dayjs.extend(duration);
const Movie = () => {
  const { id } = useParams();
  const { baseURL, options } = useContext(TmdbConfigContext);
  const movieURL = `${baseURL}movie/${id}?language=en-US`;
  const movieCreditsURL = `${baseURL}movie/${id}/credits?language=en-US`;
  const movieReviewsURL = `${baseURL}movie/${id}/reviews?language=en-US&page=1`;
  const movieRecommendationsURL = `${baseURL}movie/${id}/recommendations?language=en-US&page=1`;
  const movieSimilarURL = `${baseURL}movie/${id}/similar?language=en-US&page=1`;
  const movieImagesURL = `${baseURL}movie/${id}/images`;
  const movieVideosURL = `${baseURL}movie/${id}/videos?language=en-US`;
  const movieWatchProvidersURL = `${baseURL}movie/${id}/watch/providers`;
  const movie = useFetchData(movieURL, options);
  const movieCredits = useFetchData(movieCreditsURL, options);
  const movieReviews = useFetchData(movieReviewsURL, options);
  const movieRecommendations = useFetchData(movieRecommendationsURL, options);
  const movieSimilar = useFetchData(movieSimilarURL, options);
  const movieImages = useFetchData(movieImagesURL, options);
  const movieVideos = useFetchData(movieVideosURL, options);
  const movieWatchProviders = useFetchData(movieWatchProvidersURL, options);

  return (
    <div
      className="h-full p-10"
      style={{
        background: `linear-gradient(to right, rgba(0,0,0,0.75),rgba(0,0,0,0.75)), url(https://image.tmdb.org/t/p/original${movie?.data?.backdrop_path}) no-repeat center center/cover`,
      }}
    >
      <div className="flex flex-col lg:flex-row gap-10 text-white">
        <img
          src={
            movie?.data?.poster_path
              ? `https://image.tmdb.org/t/p/original${movie?.data?.poster_path}`
              : noPoster
          }
          className="w-100 border-white border-5"
        />
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold">
            {movie?.data?.title}{" "}
            <span>({movie?.data?.release_date.slice(0, 4)})</span>
          </h1>
          <div className="flex items-center text-base flex-wrap">
            <p>{movie?.data?.status}</p>
            <FontAwesomeIcon icon={faCircle} className="text-[5px] mx-3" />
            <p>{dayjs(movie?.data?.release_date).format("MMMM D, YYYY")}</p>
            <FontAwesomeIcon icon={faCircle} className="text-[5px] mx-3" />
            <p className="flex gap-1">
              {movie?.data?.genres?.map((genre, index, arr) => {
                {
                  return (
                    <span key={genre.id}>
                      {genre.name}
                      {index < arr.length - 1 && ","}
                    </span>
                  );
                }
              })}
            </p>
            <FontAwesomeIcon icon={faCircle} className="text-[5px] mx-3" />
            <p>
              {dayjs
                .duration(movie?.data?.runtime, "minutes")
                .format("H[h] mm[m]")}
            </p>
          </div>
          <p className="italic text-gray-300 text-xl">{movie?.data?.tagline}</p>
          <p className="text-xl">
            <span className="font-bold">Overview: </span>
            {movie?.data?.overview}
          </p>
          {movie?.data?.budget > 0 && (
            <p className="text-xl">
              <span className="font-bold">Budget: </span>{" "}
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 0,
              }).format(movie?.data?.budget)}
            </p>
          )}
          {movie?.data?.revenue > 0 && (
            <p className="text-xl">
              <span className="font-bold">Revenue: </span>{" "}
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 0,
              }).format(movie?.data?.revenue)}
            </p>
          )}
          <p className="text-xl">
            <span className="font-bold">TMDB Score: </span>
            {Math.floor(movie?.data?.vote_average * 10)}% (
            {new Intl.NumberFormat("en-US").format(movie?.data?.vote_count)})
          </p>
          <div className="text-xl flex flex-col gap-10 mt-5">
            {movieWatchProviders?.data?.results?.IN?.buy?.length > 0 && (
              <p className="flex items-center gap-5">
                <span className="font-bold">Buy on: </span>
                <span className="flex gap-5">
                  {movieWatchProviders?.data?.results?.IN?.buy?.map((item) => {
                    return (
                      <img
                        key={item.id}
                        className="w-10 rounded-xl"
                        src={`https://media.themoviedb.org/t/p/original/${item.logo_path}`}
                      />
                    );
                  })}
                </span>
              </p>
            )}
            {movieWatchProviders?.data?.results?.IN?.flatrate?.length > 0 && (
              <p className="flex items-center gap-5">
                <span className="font-bold">Stream on: </span>
                <span className="flex gap-5">
                  {movieWatchProviders?.data?.results?.IN?.flatrate?.map(
                    (item) => {
                      return (
                        <img
                          key={item.id}
                          className="w-10 rounded-xl"
                          src={`https://media.themoviedb.org/t/p/original/${item.logo_path}`}
                        />
                      );
                    }
                  )}
                </span>
              </p>
            )}
            {movieWatchProviders?.data?.results?.IN?.rent?.length > 0 && (
              <p className="flex items-center gap-5">
                <span className="font-bold">Rent on: </span>
                <span className="flex gap-5">
                  {movieWatchProviders?.data?.results?.IN?.rent?.map((item) => {
                    return (
                      <img
                        key={item.id}
                        className="w-10 rounded-xl"
                        src={`https://media.themoviedb.org/t/p/original/${item.logo_path}`}
                      />
                    );
                  })}
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
      {movieCredits?.data?.cast?.length && (
        <div className="mt-10">
          <h1 className="text-white mb-5 text-2xl font-bold">Cast</h1>
          <div className="carousel gap-5 w-full">
            {movieCredits?.data?.cast?.map((person) => {
              return (
                <div className="carousel-item relative" key={person.credit_id}>
                  <Link to={`/person/${person.id}`}>
                    <img
                      className="w-41"
                      src={
                        person.profile_path
                          ? `https://image.tmdb.org/t/p/original${person.profile_path}`
                          : noPhoto
                      }
                      alt={person.name}
                    />
                    <h1 className="absolute bg-black text-white w-full bottom-0 text-center py-1 font-medium">
                      <span className="block">{person.name}</span>
                      <span className="block">({person.character})</span>
                    </h1>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {movieCredits?.data?.crew?.length && (
        <div className="mt-10">
          <h1 className="text-white mb-5 text-2xl font-bold">Crew</h1>
          <div className="carousel gap-5 w-full">
            {movieCredits?.data?.crew?.map((person) => {
              return (
                <div className="carousel-item relative" key={person.credit_id}>
                  <Link to={`/person/${person.id}`}>
                    <img
                      className="w-41"
                      src={
                        person.profile_path
                          ? `https://image.tmdb.org/t/p/original${person.profile_path}`
                          : noPhoto
                      }
                      alt={person.name}
                    />
                    <h1 className="absolute bg-black text-white w-full bottom-0 text-center py-1 font-medium">
                      <span className="block">{person.name}</span>
                      <span className="block">({person.job})</span>
                    </h1>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {movieImages?.data?.backdrops?.length && (
        <div className="mt-10">
          <h1 className="text-white mb-5 text-2xl font-bold">Backdrops</h1>
          <div className="carousel gap-5 w-full">
            {movieImages?.data?.backdrops?.map((image) => {
              return (
                <div className="carousel-item relative" key={image.file_path}>
                  <img
                    className="w-100 border-2 border-white"
                    src={
                      image.file_path
                        ? `https://image.tmdb.org/t/p/original${image.file_path}`
                        : noPhoto
                    }
                    alt={image.file_path}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
      {movieImages?.data?.posters?.length && (
        <div className="mt-10">
          <h1 className="text-white mb-5 text-2xl font-bold">Posters</h1>
          <div className="carousel gap-5 w-full">
            {movieImages?.data?.posters?.map((image) => {
              return (
                <div className="carousel-item relative" key={image.file_path}>
                  <img
                    className="w-50 border-2 border-white"
                    src={
                      image.file_path
                        ? `https://image.tmdb.org/t/p/original${image.file_path}`
                        : noPhoto
                    }
                    alt={image.file_path}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
      {movieVideos?.data?.results?.length && (
        <div className="mt-10">
          <h1 className="text-white mb-5 text-2xl font-bold">Videos</h1>
          <div className="carousel gap-5 w-full">
            {movieVideos?.data?.results?.map((video) => {
              return (
                <div className="carousel-item" key={video.id}>
                  <iframe
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${video.key}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {movieReviews?.data?.results?.length && (
        <div className="mt-10">
          <h1 className="text-white mb-5 text-2xl font-bold">Reviews</h1>
          <div className="join join-vertical bg-base-100">
            {movieReviews?.data?.results?.map((review) => {
              return (
                <div
                  className="collapse collapse-arrow join-item border-base-300 border"
                  key={review.id}
                >
                  <input type="radio" name="my-accordion-4" />
                  <div className="collapse-title font-semibold">
                    {review.author}
                  </div>
                  <div className="collapse-content text-sm">
                    {review.content}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {movieRecommendations?.data?.results?.length && (
        <div className="mt-10">
          <h1 className="text-white mb-5 text-2xl font-bold">
            Movie Recommendations
          </h1>
          <div className="carousel gap-5 w-full">
            {movieRecommendations?.data?.results?.map((movie) => {
              return (
                <div className="carousel-item relative" key={movie.id}>
                  <Link to={`/movie/${movie.id}`}>
                    <img
                      className="w-41"
                      src={
                        movie.poster_path
                          ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                          : noPhoto
                      }
                      alt={movie.title}
                    />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {movieSimilar?.data?.results?.length && (
        <div className="mt-10">
          <h1 className="text-white mb-5 text-2xl font-bold">Similar Movies</h1>
          <div className="carousel gap-5 w-full">
            {movieSimilar?.data?.results?.map((movie) => {
              return (
                <div className="carousel-item relative" key={movie.id}>
                  <Link to={`/movie/${movie.id}`}>
                    <img
                      className="w-41"
                      src={
                        movie.poster_path
                          ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                          : noPhoto
                      }
                      alt={movie.title}
                    />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Movie;
