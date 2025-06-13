import { Link, useParams, useNavigate } from "react-router-dom";
import useFetchData from "../hooks/useFetchData";
import { TmdbConfigContext } from "../App";
import { useContext, useEffect, useState } from "react";
import noPhoto from "../assets/photo.png";

const PeopleList = () => {
  const { page } = useParams();
  const navigate = useNavigate();
  const { baseURL, options } = useContext(TmdbConfigContext);
  const [pageNumber, setPageNumber] = useState(Number(page) || 1);
  const PeopleURL = `${baseURL}person/popular?language=en-US&page=${pageNumber}`;
  const data = useFetchData(PeopleURL, options);
  useEffect(() => {
    if (Number(page) !== pageNumber) {
      navigate(`/people/${pageNumber}`);
    }
  }, [pageNumber, navigate, page]);

  return (
    <div className="p-5">
      <h1 className="text-2xl sm:text-3xl font-medium mb-10 text-center sm:text-left">Popular People</h1>
      <div className="flex flex-wrap gap-10 justify-center">
        {data?.data?.results?.map((person) => {
          return (
            <Link to={`/person/${person.id}`} key={person.id}>
              <div className="card w-50 shadow-lg border border-gray-300">
                <figure>
                  <img
                    className="w-100"
                    src={
                      person.profile_path
                        ? `https://image.tmdb.org/t/p/original${person.profile_path}`
                        : noPhoto
                    }
                    alt={person.name}
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{person.name}</h2>
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

export default PeopleList;
