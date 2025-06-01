import { BrowserRouter as Router } from "react-router-dom";
import { createContext } from "react";
import Main from "./components/Main";
import Navbar from "./components/Navbar";
export const TmdbConfigContext = createContext();
const App = () => {
  const tmdbConfig = {
    baseURL: `https://api.themoviedb.org/3/`,
    options: {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Y2U4MDNjZmMxNmIxYjE5YzExYmNhMmNiMjAxYjJmOSIsIm5iZiI6MTc0NzQ3OTA4OC4yMTIsInN1YiI6IjY4Mjg2YTMwOWQ1NzJlZmVjNjBiY2U3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mze7j6e-ZIfzHoPlnsKnnNSL16CFP-ZWO8xhOenWzL0",
      },
    },
  };
  return (
    <TmdbConfigContext.Provider value ={tmdbConfig}>
      <Router>
        <Navbar />
        <Main/>
      </Router>
    </TmdbConfigContext.Provider>
  );
};

export default App;
