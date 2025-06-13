import { useContext } from "react";
import { TmdbConfigContext } from "../App";
import useFetchData from "../hooks/useFetchData";
import noPoster from "../assets/poster.png";
import noPhoto from "../assets/photo.png";
import { Link } from "react-router-dom";

const Home = () => {
  const { baseURL, options } = useContext(TmdbConfigContext);
  const trending = {
    movies: {
      today: useFetchData(
        `${baseURL}trending/movie/day?language=en-US`,
        options
      ),
      week: useFetchData(
        `${baseURL}trending/movie/week?language=en-US`,
        options
      ),
    },
    tvshows: {
      today: useFetchData(`${baseURL}trending/tv/day?language=en-US`, options),
      week: useFetchData(`${baseURL}trending/tv/week?language=en-US`, options),
    },
    people: {
      today: useFetchData(
        `${baseURL}trending/person/day?language=en-US`,
        options
      ),
      week: useFetchData(
        `${baseURL}trending/person/week?language=en-US`,
        options
      ),
    },
  };

  return (
    <div className="px-5 py-10">
      {/* Trending Movies Carousel */}
      <div>
        <h1 className="text-lg mb-5 font-medium">Trending Movies</h1>
        <div className="tabs tabs-lift">
          <input
            type="radio"
            name="trending_movies_tab"
            className="tab font-medium text-base border-gray-300 checked:border-gray-300"
            aria-label="Today"
            defaultChecked
          />
          <div className="tab-content p-6 border border-gray-300 shadow-sm">
            <div className="carousel rounded-box w-full">
              {trending.movies.today?.data?.results?.map((movie) => {
                return (
                  <div className="carousel-item p-2" key={movie.id}>
                    <Link to={`/movie/${movie.id}`}>
                      <img
                        className="w-50"
                        src={
                          movie.poster_path
                            ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                            : noPoster
                        }
                        alt={movie.title}
                      />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>

          <input
            type="radio"
            name="trending_movies_tab"
            className="tab font-medium text-base border-gray-300 checked:border-gray-300"
            aria-label="This Week"
          />
          <div className="tab-content p-6 border border-gray-300 shadow-sm">
            <div className="carousel rounded-box w-full">
              {trending.movies.week?.data?.results?.map((movie) => {
                return (
                  <div className="carousel-item p-2" key={movie.id}>
                    <Link to={`/movie/${movie.id}`}>
                      <img
                        className="w-50"
                        src={
                          movie.poster_path
                            ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                            : noPoster
                        }
                        alt={movie.title}
                      />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {/* Trending TV Shows Carousel */}
      <div>
        <h1 className="text-lg my-5 font-medium">Trending TV Shows</h1>
        <div className="tabs tabs-lift">
          <input
            type="radio"
            name="trending_tv_shows_tab"
            className="tab font-medium text-base border-gray-300 checked:border-gray-300"
            aria-label="Today"
            defaultChecked
          />
          <div className="tab-content p-6 border border-gray-300 shadow-sm">
            <div className="carousel rounded-box w-full">
              {trending.tvshows.today?.data?.results?.map((tvshow) => {
                return (
                  <div className="carousel-item p-2" key={tvshow.id}>
                    <Link to={`/tv/${tvshow.id}`}>
                      <img
                        className="w-50"
                        src={
                          tvshow.poster_path
                            ? `https://image.tmdb.org/t/p/original${tvshow.poster_path}`
                            : noPoster
                        }
                        alt={tvshow.title}
                      />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>

          <input
            type="radio"
            name="trending_tv_shows_tab"
            className="tab font-medium text-base border-gray-300 checked:border-gray-300"
            aria-label="This Week"
          />
          <div className="tab-content p-6 border border-gray-300 shadow-sm">
            <div className="carousel rounded-box  w-full">
              {trending.tvshows.week?.data?.results?.map((tvshow) => {
                return (
                  <div className="carousel-item p-2" key={tvshow.id}>
                    <Link to={`/tv/${tvshow.id}`}>
                      <img
                        className="w-50"
                        src={
                          tvshow.poster_path
                            ? `https://image.tmdb.org/t/p/original${tvshow.poster_path}`
                            : noPoster
                        }
                        alt={tvshow.title}
                      />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {/* Trending People Carousel */}
      <div>
        <h1 className="text-lg my-5 font-medium">Trending People</h1>
        <div className="tabs tabs-lift">
          <input
            type="radio"
            name="trending_people_tab"
            className="tab font-medium text-base border-gray-300 checked:border-gray-300"
            aria-label="Today"
            defaultChecked
          />
          <div className="tab-content p-6 border border-gray-300 shadow-sm">
            <div className="carousel rounded-box  w-full">
              {trending.people.today?.data?.results?.map((person) => {
                return (
                  <div className="carousel-item p-2" key={person.id}>
                    <Link to={`/person/${person.id}`}>
                      <img
                        className="w-50"
                        src={
                          person.profile_path
                            ? `https://image.tmdb.org/t/p/original${person.profile_path}`
                            : noPhoto
                        }
                        alt={person.name}
                      />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>

          <input
            type="radio"
            name="trending_people_tab"
            className="tab font-medium text-base border-gray-300 checked:border-gray-300"
            aria-label="This Week"
          />
          <div className="tab-content p-6 border border-gray-300 shadow-sm">
            <div className="carousel rounded-box  w-full">
              {trending.people.week?.data?.results?.map((person) => {
                return (
                  <div className="carousel-item p-2" key={person.id}>
                    <Link to={`/person/${person.id}`}>
                      <img
                        className="w-50"
                        src={
                          person.profile_path
                            ? `https://image.tmdb.org/t/p/original${person.profile_path}`
                            : noPhoto
                        }
                        alt={person.name}
                      />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
