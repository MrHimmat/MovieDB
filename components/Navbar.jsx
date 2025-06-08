import { NavLink } from "react-router-dom";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchMovies } from "../src/reduxMovie/movieSlice";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  const handleSearch = () => {
    if (query.trim()) {
      dispatch(fetchMovies({ type: "search", query }));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <nav className="flex flex-col md:flex-row items-center justify-around p-4 bg-gray-900 text-white gap-4">
      <div className="text-3xl font-bold cursor-pointer">
        <Link to="/">
            MovieDb
        </Link>
      </div>

      <ul className="flex flex-col md:flex-row gap-4 md:gap-7 text-2xl md:text-base items-center">
        <li>
          <NavLink to="/" className="hover:text-yellow-300">
            Popular
          </NavLink>
        </li>
        <li>
          <NavLink to="/toprated" className="hover:text-yellow-300">
            Top Rated
          </NavLink>
        </li>
        <li>
          <NavLink to="/upcoming" className="hover:text-yellow-300">
            Upcoming
          </NavLink>
        </li>
      </ul>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Movie Name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress}
          className="px-3 py-1 rounded-md text-white bg-transparent border border-gray-400 focus:border-yellow-500 w-40 md:w-64"
        />
        <button
          onClick={handleSearch}
          className="bg-yellow-500 cursor-pointer hover:bg-yellow-600 text-black px-4 py-1 rounded-md"
        >
          Search
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
