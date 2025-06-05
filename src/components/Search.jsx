import { useContext, useEffect, useState } from "react";
import { TmdbConfigContext } from "../App";
import noPoster from "../assets/poster.png";
import noPhoto from "../assets/photo.png";
import { Link } from "react-router-dom";

const Search = () => {
  const [notFoundMessage, setNotFoundMessage] = useState();
  const [inputValue, setInputValue] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [searchResults, setSearchResults] = useState("");
  const { baseURL, options } = useContext(TmdbConfigContext);
  const [pageNumber, setPageNumber] = useState(0);
  const [searchQuery, setSearchQuery] = useState({ keyword: "", category: "" });
  const handleSearch = () => {
    if (!inputValue.trim() || !selectValue) {
      alert("Please fill out all fields!");
      return;
    }
    setPageNumber(1);
    setSearchQuery({ keyword: inputValue.trim(), category: selectValue });
  };
  useEffect(() => {
    if (!searchQuery.keyword || !searchQuery.category) return;
    const keyword = encodeURIComponent(searchQuery.keyword);
    const movieSearchURL = `${baseURL}search/${searchQuery.category}?query=${keyword}&include_adult=false&language=en-US&page=${pageNumber}`;
    fetch(movieSearchURL, options)
      .then((res) => res.json())
      .then((data) => {
        setSearchResults(data);
        if (!data.results || data.results.length === 0) {
          setNotFoundMessage("404 Not Found");
        } else {
          setNotFoundMessage("");
        }
      })
      .catch((err) => {
        console.error(err);
        setNotFoundMessage("Error fetching data");
      });
  }, [searchQuery, pageNumber, baseURL, options]);
  return (
    <>
      <div className="flex items-center gap-2 py-10 justify-center">
        <input
          type="text"
          className="input"
          placeholder="Keyword"
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
        <select
          value={selectValue}
          className="select"
          onChange={(e) => {
            setSelectValue(e.target.value);
          }}
        >
          <option value="" disabled>
            Pick a category
          </option>
          <option value="movie">Movie</option>
          <option value="tv">TV Show</option>
          <option value="person">Person</option>
        </select>
        <button className="btn btn-neutral" onClick={handleSearch}>
          Search
        </button>
      </div>
      {searchResults?.results?.length ? (
        <>
          <div className="flex flex-wrap gap-10 justify-center">
            {searchResults?.results?.map((result) => {
              const imagePath = result.poster_path || result.profile_path;
              const imageURL = imagePath
                ? `https://image.tmdb.org/t/p/original${imagePath}`
                : selectValue === "person"
                ? noPhoto
                : noPoster;
              return (
                <Link to={`/${selectValue}/${result.id}`} key={result.id}>
                  <div className="card w-50 shadow-lg border border-gray-300">
                    <figure>
                      <img
                        className="w-100"
                        src={imageURL}
                        alt={result.title || result.name}
                      />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title">
                        {result.title || result.name}
                      </h2>
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
        </>
      ) : (
        <h1 className="text-center text-red-600 text-3xl font-bold">
          {notFoundMessage}
        </h1>
      )}
    </>
  );
};

export default Search;
