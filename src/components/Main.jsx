import { Route, Routes } from "react-router-dom";

import Home from "./Home";
import MoviesList from "./MoviesList";
import TVShowsList from "./TVShowsList";
import PeopleList from "./PeopleList";

const Main = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/movies/:type" element={<MoviesList />}></Route>
        <Route path="/tv/:type" element={<TVShowsList />}></Route>
        <Route path="/person" element={<PeopleList />}></Route>
      </Routes>
    </>
  );
};

export default Main;
