import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="navbar bg-sky-700 shadow-sm sticky top-0 z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-sky-700 rounded-box z-1 mt-3 w-52 p-2 shadow gap-3 w-screen"
          >
            <li className="font-medium">
              <details>
                <summary className="text-base">Movies</summary>
                <ul className="p-2 bg-sky-700">
                  <li>
                    <Link to="/movies/popular" className="text-base">Popular</Link>
                  </li>
                  <li>
                    <Link to="/movies/now-playing" className="text-base">Now Playing</Link>
                  </li>
                  <li>
                    <Link to="/movies/upcoming" className="text-base">Upcoming</Link>
                  </li>
                  <li>
                    <Link to="/movies/top-rated" className="text-base">Top Rated</Link>
                  </li>
                </ul>
              </details>
            </li>
            <li className="font-medium">
              <details>
                <summary className="text-base">TV Shows</summary>
                <ul className="p-2 bg-sky-700">
                  <li>
                    <Link to="/tv/popular" className="text-base">Popular</Link>
                  </li>
                  <li>
                    <Link to="/tv/airing-today" className="text-base">Airing Today</Link>
                  </li>
                  <li>
                    <Link to="/tv/on-the-air" className="text-base">On TV</Link>
                  </li>
                  <li>
                    <Link to="/tv/top-rated" className="text-base">Top Rated</Link>
                  </li>
                </ul>
              </details>
            </li>
            <li className="font-medium">
              <details>
                <summary className="text-base">People</summary>
                <ul className="p-2 bg-sky-700">
                  <li>
                    <Link to="/person" className="text-base">Popular</Link>
                  </li>
                </ul>
              </details>
            </li>
            <li className="font-medium gap-2">
              <input
                type="text"
                placeholder="Search Movie, TV Show, Person"
                className="input w-full focus:outline-sky-950 bg-sky-200 text-sky-950 text-base font-medium"
              />
              <button className="btn btn-outline hover:bg-sky-950 text-base">
                Search
              </button>
            </li>
          </ul>
        </div>
        <Link className="btn btn-ghost text-xl" to="/">
          PopCornDB
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li className="font-medium">
            <details>
              <summary>Movies</summary>
              <ul className="p-2 bg-sky-700">
                <li>
                  <Link to="/movies/popular">Popular</Link>
                </li>
                <li>
                  <Link to="/movies/now-playing">Now Playing</Link>
                </li>
                <li>
                  <Link to="/movies/upcoming">Upcoming</Link>
                </li>
                <li>
                  <Link to="/movies/top-rated">Top Rated</Link>
                </li>
              </ul>
            </details>
          </li>
          <li className="font-medium">
            <details>
              <summary>TV Shows</summary>
              <ul className="p-2 bg-sky-700">
                <li>
                  <Link to="/tv/popular">Popular</Link>
                </li>
                <li>
                  <Link to="/tv/airing-today">Airing Today</Link>
                </li>
                <li>
                  <Link to="/tv/on-the-air">On TV</Link>
                </li>
                <li>
                  <Link to="/tv/top-rated">Top Rated</Link>
                </li>
              </ul>
            </details>
          </li>
          <li className="font-medium">
            <details>
              <summary>People</summary>
              <ul className="p-2 bg-sky-700">
                <li>
                  <Link to="/person">Popular</Link>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
      <div className="navbar-end gap-2 hidden lg:flex">
        <input
          type="text"
          placeholder="Search Movie, TV Show, Person"
          className="input w-100 focus:outline-sky-950 bg-sky-200 text-sky-950 text-base font-medium"
        />
        <button className="btn btn-outline hover:bg-sky-950">Search</button>
      </div>
    </div>
  );
};

export default Navbar;
