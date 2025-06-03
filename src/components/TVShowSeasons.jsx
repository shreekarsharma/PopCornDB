import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { TmdbConfigContext } from "../App";
import noPoster from "../assets/poster.png";
const TVShowSeasons = () => {
  const { id, totalSeasons } = useParams();
  const [seasons, setSeasons] = useState([]);
  const { baseURL, options } = useContext(TmdbConfigContext);
  useEffect(() => {
    const fetchAllSeasons = async () => {
      try {
        const urls = [];
        const total = Number(totalSeasons);
        for (let index = 1; index <= total; index++) {
          const seasonURL = `${baseURL}tv/${id}/season/${index}?language=en-US`;
          urls.push(seasonURL);
        }
        const fetchPromises = urls.map((url) => {
          return fetch(url, options).then((res) => {
            return res.json();
          });
        });
        const allSeasonsData = await Promise.all(fetchPromises);
        setSeasons(allSeasonsData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAllSeasons();
  }, [id, totalSeasons, baseURL, options]);

  return (
    <div className="p-10 grid grid-cols-1 gap-10">
      {seasons.map((season) => {
        return (
          <div
            className="card lg:card-side bg-base-100 shadow-lg border"
            key={season.id}
          >
            <div className="card-body">
              <h2 className="card-title text-3xl">{season.name}</h2>
              <p className="text-xl">{season.overview}</p>
              <p className="font-medium text-xl">Episodes List:</p>
              {season.episodes?.map((episode) => {
                console.log(episode);

                return (
                  <div
                    className="card bg-base-100 w-full shadow-xl border lg:flex-row mb-5"
                    key={episode.id}
                  >
                    <figure className="lg:flex-4/12">
                      <img
                        src={
                          episode.still_path
                            ? `https://image.tmdb.org/t/p/original${episode.still_path}`
                            : noPoster
                        }
                        alt="Shoes"
                      />
                    </figure>
                    <div className="card-body lg:flex-8/12">
                      <h2 className="card-title text-lg"><span>{episode.season_number}x{episode.episode_number}: </span>{episode.name}</h2>
                      <p className="italic font-medium text-base">
                        {dayjs(episode.air_date).format("MMMM D, YYYY")}
                      </p>
                      {episode.runtime > 0 && (
                      <p className="text-base">
                        <span className="font-medium">Runtime: </span>
                        {episode.runtime}m
                      </p>
                      )}
                      <p className="text-base">{episode.overview}</p>
                      <p className="text-base">
                        <span className="font-medium">TMDB Score: </span>
                        {Math.floor(episode.vote_average * 10)}% (
                        {new Intl.NumberFormat("en-US").format(
                          episode.vote_count
                        )}
                        )
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TVShowSeasons;
