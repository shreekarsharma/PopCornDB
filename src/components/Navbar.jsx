import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  return (
    <div className="navbar bg-sky-50 shadow-sm sticky top-0 z-50">
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
            className="menu menu-sm dropdown-content bg-sky-50 rounded-box z-1 mt-3 p-2 shadow gap-3 w-95"
          >
            <li className="font-medium">
              <details>
                <summary className="text-base">Movies</summary>
                <ul className="p-2 bg-sky-700">
                  <li>
                    <Link to="/movies/popular/1" className="text-base">
                      Popular
                    </Link>
                  </li>
                  <li>
                    <Link to="/movies/now-playing/1" className="text-base">
                      Now Playing
                    </Link>
                  </li>
                  <li>
                    <Link to="/movies/upcoming/1" className="text-base">
                      Upcoming
                    </Link>
                  </li>
                  <li>
                    <Link to="/movies/top-rated/1" className="text-base">
                      Top Rated
                    </Link>
                  </li>
                </ul>
              </details>
            </li>
            <li className="font-medium">
              <details>
                <summary className="text-base">TV Shows</summary>
                <ul className="p-2 bg-sky-50">
                  <li>
                    <Link to="/tvshow/popular/1" className="text-base">
                      Popular
                    </Link>
                  </li>
                  <li>
                    <Link to="/tvshow/airing-today/1" className="text-base">
                      Airing Today
                    </Link>
                  </li>
                  <li>
                    <Link to="/tvshow/on-the-air/1" className="text-base">
                      On TV
                    </Link>
                  </li>
                  <li>
                    <Link to="/tvshow/top-rated/1" className="text-base">
                      Top Rated
                    </Link>
                  </li>
                </ul>
              </details>
            </li>
            <li className="font-medium">
              <details>
                <summary className="text-base">People</summary>
                <ul className="p-2 bg-sky-50">
                  <li>
                    <Link to="/people/1" className="text-base">
                      Popular
                    </Link>
                  </li>
                </ul>
              </details>
            </li>
            <li className="font-medium">
              <Link to="/search" className="text-base"><FontAwesomeIcon icon={faMagnifyingGlass} className="text-xl" /></Link>
            </li>
          </ul>
        </div>
        <Link className="btn btn-ghost text-xl" to="/">
          <FontAwesomeIcon icon={faFilm} />
          PopCornDB
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li className="font-medium">
            <details>
              <summary className="text-base">Movies</summary>
              <ul className="p-2 bg-sky-50">
                <li>
                  <Link to="/movies/popular/1" className="text-base">
                    Popular
                  </Link>
                </li>
                <li>
                  <Link to="/movies/now-playing/1" className="text-base">
                    Now Playing
                  </Link>
                </li>
                <li>
                  <Link to="/movies/upcoming/1" className="text-base">
                    Upcoming
                  </Link>
                </li>
                <li>
                  <Link to="/movies/top-rated/1" className="text-base">
                    Top Rated
                  </Link>
                </li>
              </ul>
            </details>
          </li>
          <li className="font-medium">
            <details>
              <summary className="text-base">TV Shows</summary>
              <ul className="p-2 bg-sky-50">
                <li>
                  <Link to="/tvshow/popular/1" className="text-base">
                    Popular
                  </Link>
                </li>
                <li>
                  <Link to="/tvshow/airing-today/1" className="text-base">
                    Airing Today
                  </Link>
                </li>
                <li>
                  <Link to="/tvshow/on-the-air/1" className="text-base">
                    On TV
                  </Link>
                </li>
                <li>
                  <Link to="/tvshow/top-rated/1" className="text-base">
                    Top Rated
                  </Link>
                </li>
              </ul>
            </details>
          </li>
          <li className="font-medium">
            <details>
              <summary className="text-base">People</summary>
              <ul className="p-2 bg-sky-50">
                <li>
                  <Link to="/people/1" className="text-base">
                    Popular
                  </Link>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
      <div className="navbar-end hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li className="font-medium">
            <Link to="/search" className="text-base"><FontAwesomeIcon icon={faMagnifyingGlass} className="text-xl" /></Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
