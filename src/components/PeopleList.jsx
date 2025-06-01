import useFetchData from "../hooks/useFetchData";
import { TmdbConfigContext } from "../App";
import { useContext } from "react";
import noPhoto from "../assets/photo.png";

const PeopleList = () => {
  const { baseURL, options } = useContext(TmdbConfigContext);
  const PeopleURL = `${baseURL}person/popular?language=en-US&page=1`;
  const data = useFetchData(PeopleURL, options);

  return (
    <>
      <h1 className="pl-10 pt-10 text-3xl font-medium">Popular People</h1>
      <div className="grid grid-cols-4 gap-1 p-10">
        {data?.data?.results?.map((person) => {
          return (
            <div className="card bg-base-100 w-96 shadow-sm" key={person.id}>
              <figure>
                <img
                  className="w-100"
                  src={
                    person.profile_path
                      ? `https://image.tmdb.org/t/p/original${person.profile_path}`
                      : noPhoto
                  }
                  alt="Shoes"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{person.name}</h2>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default PeopleList;
