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
const TVShow = () => {
  const { id } = useParams();
  const { baseURL, options } = useContext(TmdbConfigContext);
  const tvShowURL = `${baseURL}tv/${id}?language=en-US`;
  const tvShowCreditsURL = `${baseURL}tv/${id}/aggregate_credits?language=en-US`;
  const tvShowReviewsURL = `${baseURL}tv/${id}/reviews?language=en-US&page=1`;
  const tvShowRecommendationsURL = `${baseURL}tv/${id}/recommendations?language=en-US&page=1`;
  const tvShowSimilarURL = `${baseURL}tv/${id}/similar?language=en-US&page=1`;
  const tvShowImagesURL = `${baseURL}tv/${id}/images`;
  const tvShowVideosURL = `${baseURL}tv/${id}/videos?language=en-US`;
  const tvShowWatchProvidersURL = `${baseURL}tv/${id}/watch/providers`;
  const tvShow = useFetchData(tvShowURL, options);
  const tvShowCredits = useFetchData(tvShowCreditsURL, options);
  const tvShowReviews = useFetchData(tvShowReviewsURL, options);
  const tvShowRecommendations = useFetchData(tvShowRecommendationsURL, options);
  const tvShowSimilar = useFetchData(tvShowSimilarURL, options);
  const tvShowImages = useFetchData(tvShowImagesURL, options);
  const tvShowVideos = useFetchData(tvShowVideosURL, options);
  const tvShowWatchProviders = useFetchData(tvShowWatchProvidersURL, options);

  return (
    <div
      className="h-full p-10"
      style={{
        background: `linear-gradient(to right, rgba(0,0,0,0.75),rgba(0,0,0,0.75)), url(https://image.tmdb.org/t/p/original${tvShow?.data?.backdrop_path}) no-repeat center center/cover`,
      }}
    >
      <div className="flex flex-col lg:flex-row gap-10 text-white">
        <img
          src={
            tvShow?.data?.poster_path
              ? `https://image.tmdb.org/t/p/original${tvShow?.data?.poster_path}`
              : noPoster
          }
          className="w-100 border-white border-5"
        />
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold">{tvShow?.data?.name} </h1>
          <div className="flex items-center text-base">
            <p>{tvShow?.data?.status}</p>
            <FontAwesomeIcon icon={faCircle} className="text-[5px] mx-3" />
            <p className="flex gap-1">
              {tvShow?.data?.genres?.map((genre, index, arr) => {
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
          </div>
          {tvShow?.data?.tagline && (
            <p className="italic text-gray-300 text-xl">
              {tvShow?.data?.tagline}
            </p>
          )}
          {tvShow?.data?.overview && (<p className="text-xl">
            <span className="font-bold">Overview: </span>
            {tvShow?.data?.overview}
          </p>)}
          {tvShow?.data?.created_by?.length > 0 && (
            <p className="text-xl flex gap-1">
              <span className="font-bold">Created By: </span>
              <span className="flex gap-1">
                {tvShow?.data?.created_by?.map((person, index, arr) => {
                  return (
                    <span key={person.id}>
                      {person.name}
                      {index < arr.length - 1 && ","}
                    </span>
                  );
                })}
              </span>
            </p>
          )}
          <p className="text-xl">
            <span className="font-bold">Total Seasons: </span>
            <span>{tvShow?.data?.number_of_seasons}</span>
          </p>
          <p className="text-xl">
            <span className="font-bold">Total Episodes: </span>
            <span>{tvShow?.data?.number_of_episodes}</span>
          </p>
          <p className="text-xl">
            <span className="font-bold">TMDB Score: </span>
            {Math.floor(tvShow?.data?.vote_average * 10)}% (
            {new Intl.NumberFormat("en-US").format(tvShow?.data?.vote_count)})
          </p>
          <div className="text-xl flex flex-col gap-10 mt-5">
            {tvShowWatchProviders?.data?.results?.IN?.buy?.length > 0 && (
              <p className="flex items-center gap-5">
                <span className="font-bold">Buy on: </span>
                <span className="flex gap-5">
                  {tvShowWatchProviders?.data?.results?.IN?.buy?.map((item) => {
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
            {tvShowWatchProviders?.data?.results?.IN?.flatrate?.length > 0 && (
              <p className="flex items-center gap-5">
                <span className="font-bold">Stream on: </span>
                <span className="flex gap-5">
                  {tvShowWatchProviders?.data?.results?.IN?.flatrate?.map(
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
            {tvShowWatchProviders?.data?.results?.IN?.rent?.length > 0 && (
              <p className="flex items-center gap-5">
                <span className="font-bold">Rent on: </span>
                <span className="flex gap-5">
                  {tvShowWatchProviders?.data?.results?.IN?.rent?.map(
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
          </div>
          <Link
            className="mt-5 font-bold underline"
            to={`/tv/${id}/seasons/${tvShow?.data?.number_of_seasons}`}
          >
            View All Seasons & Episodes
          </Link>
        </div>
      </div>
      {tvShowCredits?.data?.cast?.length > 0 && (
        <div className="mt-10">
          <h1 className="text-white mb-5 text-2xl font-bold">Cast</h1>
          <div className="carousel gap-5">
            {tvShowCredits?.data?.cast?.map((person) => {
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
                      <span className="block">
                        (
                        {person?.roles?.map((role, index, arr) => {
                          {
                            return (
                              <span key={role.id}>
                                {role.character}
                                {index < arr.length - 1 && ","}
                              </span>
                            );
                          }
                        })}
                        )
                      </span>
                    </h1>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {tvShowCredits?.data?.crew?.length > 0 && (
        <div className="mt-10">
          <h1 className="text-white mb-5 text-2xl font-bold">Crew</h1>
          <div className="carousel gap-5">
            {tvShowCredits?.data?.crew?.map((person) => {
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
                      <span className="block">
                        (
                        {person?.jobs?.map((role, index, arr) => {
                          {
                            return (
                              <span key={role.id}>
                                {role.job}
                                {index < arr.length - 1 && ","}
                              </span>
                            );
                          }
                        })}
                        )
                      </span>
                    </h1>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {tvShowImages?.data?.backdrops?.length > 0 && (
        <div className="mt-10">
          <h1 className="text-white mb-5 text-2xl font-bold">Backdrops</h1>
          <div className="carousel gap-5">
            {tvShowImages?.data?.backdrops?.map((image) => {
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
      {tvShowImages?.data?.posters?.length > 0 && (
        <div className="mt-10">
          <h1 className="text-white mb-5 text-2xl font-bold">Posters</h1>
          <div className="carousel gap-5">
            {tvShowImages?.data?.posters?.map((image) => {
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
      {tvShowVideos?.data?.results?.length > 0 && (
        <div className="mt-10">
          <h1 className="text-white mb-5 text-2xl font-bold">Videos</h1>
          <div className="carousel gap-5">
            {tvShowVideos?.data?.results?.map((video) => {
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
      {tvShowReviews?.data?.results?.length > 0 && (
        <div className="mt-10">
          <h1 className="text-white mb-5 text-2xl font-bold">Reviews</h1>
          <div className="join join-vertical bg-base-100">
            {tvShowReviews?.data?.results?.map((review) => {
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
      {tvShowRecommendations?.data?.results?.length > 0 && (
        <div className="mt-10">
          <h1 className="text-white mb-5 text-2xl font-bold">
            TV Shows Recommendations
          </h1>
          <div className="carousel gap-5">
            {tvShowRecommendations?.data?.results?.map((tvShow) => {
              return (
                <div className="carousel-item relative" key={tvShow.id}>
                  <Link to={`/tv/${tvShow.id}`}>
                    <img
                      className="w-41"
                      src={
                        tvShow.poster_path
                          ? `https://image.tmdb.org/t/p/original${tvShow.poster_path}`
                          : noPhoto
                      }
                      alt={tvShow.name}
                    />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {tvShowSimilar?.data?.results?.length > 0 && (
        <div className="mt-10">
          <h1 className="text-white mb-5 text-2xl font-bold">
            Similar TV Shows
          </h1>
          <div className="carousel gap-5">
            {tvShowSimilar?.data?.results?.map((tvShow) => {
              return (
                <div className="carousel-item relative" key={tvShow.id}>
                  <Link to={`/tv/${tvShow.id}`}>
                    <img
                      className="w-41"
                      src={
                        tvShow.poster_path
                          ? `https://image.tmdb.org/t/p/original${tvShow.poster_path}`
                          : noPhoto
                      }
                      alt={tvShow.name}
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

export default TVShow;
