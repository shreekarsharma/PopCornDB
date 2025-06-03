import { useContext, useState } from "react";
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
  const handleSearch = () => {
    if (!inputValue.trim() || !selectValue) {
      alert("Please fill out all fields!");
      return;
    }
    const keyword = encodeURIComponent(inputValue);
    const movieSearchURL = `${baseURL}search/${selectValue}?query=${keyword}&include_adult=false&language=en-US&page=1`;
    fetch(movieSearchURL, options)
      .then((res) => res.json())
      .then((data) => {
        setSearchResults(data);
        if (data.results.length < 1) {
          setNotFoundMessage("404 Not Found");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
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
      ) : (
        <h1 className="text-center text-red-600 text-3xl font-bold">{notFoundMessage}</h1>
      )}
    </>
  );
};

export default Search;
