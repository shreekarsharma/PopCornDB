import { Route, Routes } from "react-router-dom";

import Home from "./Home";
import MoviesList from "./MoviesList";
import TVShowsList from "./TVShowsList";
import PeopleList from "./PeopleList";
import Movie from "./Movie";
import TVShow from "./TVShow";
import Person from "./Person";
import Search from "./Search";
import TVShowSeasons from "./TVShowSeasons";

const Main = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/movies/:type/:page" element={<MoviesList />}></Route>
        <Route path="/movie/:id" element={<Movie />}></Route>
        <Route path="/tvshow/:type/:page" element={<TVShowsList />}></Route>
        <Route path="/tv/:id" element={<TVShow />}></Route>
        <Route path="/people/:page" element={<PeopleList />}></Route>
        <Route path="/person/:id" element={<Person />}></Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="/tv/:id/seasons/:totalSeasons" element={<TVShowSeasons />}></Route>
      </Routes>
    </div>
  );
};

export default Main;
