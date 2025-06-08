import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, setPage } from "../src/reduxMovie/movieSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Upcoming = () => {
  const dispatch = useDispatch();
  const { items, status, currentPage, totalPages } = useSelector(
    (state) => state.movies
  );

  useEffect(() => {
    dispatch(fetchMovies({ type: "upcoming", page: currentPage }));
  }, [dispatch, currentPage]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      dispatch(setPage(page));
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Upcoming Movies</h1>

      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Something went wrong. Try again later.</p>}

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {items.map((movie) => (
          <Link
            to={`/movie/${movie.id}`}
            key={movie.id}
            className="bg-white rounded shadow  hover:shadow-lg transition"
          >
            <div key={movie.id} className="bg-white rounded shadow p-2">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-auto rounded"
              />
              <h2 className="mt-2 text-sm font-semibold">{movie.title}</h2>
              <p>Rating : {movie.vote_average}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex justify-center items-center mt-6 gap-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded"
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Upcoming;
