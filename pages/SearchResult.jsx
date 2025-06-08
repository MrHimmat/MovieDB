import React from "react";

const SearchResult = ({ movies = [], status, query }) => {
  if (status === "loading") {
    return <p>Loading results...</p>;
  }

  if (status === "failed") {
    return <p className="text-red-500">Error fetching results. Please try again.</p>;
  }

  if (movies.length === 0 && query && status === "succeeded") {
    return <p>No movies found for "{query}"</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {movies.map((movie) => (
        <div key={movie.id} className="bg-white rounded shadow p-2">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-auto rounded object-cover"
            loading="lazy"
          />
          <h2 className="mt-2 text-sm font-semibold">{movie.title}</h2>
          <p>Rating: {movie.vote_average.toFixed(1)}</p>
        </div>
      ))}
    </div>
  );
};

export default SearchResult;
