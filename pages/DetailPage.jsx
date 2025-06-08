// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchMovieDetail } from "../src/reduxMovie/movieSlice";
// import { useParams } from "react-router-dom";

// const DetailPage = () => {
//   const { movieId } = useParams();
//   const dispatch = useDispatch();

//   const { detail, cast, status } = useSelector((state) => state.movies);

//   useEffect(() => {
//     if (movieId) {
//       dispatch(fetchMovieDetail(movieId));
//     }
//   }, [dispatch, movieId]);

//   if (status === "loading")
//     return <p className="p-6 text-center text-white text-lg">Loading...</p>;
//   if (status === "failed")
//     return (
//       <p className="p-6 text-center text-red-500 text-lg">
//         Something went wrong.
//       </p>
//     );
//   if (!detail) return null;

//   const date = new Date(detail.release_date);
//   const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
//   const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//   const dayName = days[date.getDay()];
//   const monthName = months[date.getMonth()];
//   const presentDate = date.getDate();
//   const year = date.getFullYear();

//   return (
//     <div className="bg-black text-white">
//       {/* Top section */}
//       <div className="flex flex-col rounded-2xl border border-gray-700 md:flex-row h-auto md:h-[450px] max-w-7xl mx-auto">
        
//         {/* Left: Info and Overview */}
//         <div className="w-full md:w-1/2 px-6 py-3  flex flex-col justify-between">
//           <div className="flex flex-col md:flex-row gap-8 md:gap-6 items-start">
//             {/* Poster */}
//             <img
//               src={`https://image.tmdb.org/t/p/w500${detail.poster_path}`}
//               alt={detail.title}
//               className="rounded-lg shadow-xl w-40 md:w-48 transition-transform duration-300 ease-in-out hover:scale-95"
//             />

//             {/* Info */}
//             <div className="space-y-4">
//               <h1 className="text-3xl sm:text-4xl font-extrabold drop-shadow-lg">{detail.title}</h1>

//               <div className="bg-blue-600 px-3 py-1 rounded-full font-semibold drop-shadow w-max">
//                 Rating : {detail.vote_average.toFixed(1)}
//               </div>

//               <div className="flex gap-4 flex-wrap">
//                 <div className="bg-gray-800 px-3 py-1 rounded-full font-semibold drop-shadow w-max">
//                   {detail.runtime} min
//                 </div>
//                 {detail.genres.map((genre) => (
//                   <span
//                     key={genre.id}
//                     className="bg-indigo-700 px-3 py-1 rounded-full text-xs sm:text-sm font-medium drop-shadow"
//                   >
//                     {genre.name}
//                   </span>
//                 ))}
//               </div>

//               <div className="text-gray-400 italic">
//                 Release date : {dayName} {monthName} {presentDate}, {year}
//               </div>
//             </div>
//           </div>

//           {/* Overview */}
//           <div className="mt-2">
//             <h2 className="text-2xl font-semibold mb-2 drop-shadow">Overview</h2>
//             <p className="text-gray-300 leading-relaxed">{detail.overview}</p>
//           </div>
//         </div>

//         {/* Right: Background Image */}
//         <div
//           className="w-full md:w-1/2 rounded-2xl h-[300px] md:h-auto bg-no-repeat bg-right bg-cover relative"
//           style={{
//             backgroundImage: `url(https://image.tmdb.org/t/p/original${detail.backdrop_path})`,
//           }}
//         >
//           <div className="absolute bg-black bg-opacity-40" />
//         </div>
//       </div>

//       {/* Cast Section */}
//       <section className="max-w-7xl mx-auto px-6 mt-12 pb-12">
//         <h2 className="text-3xl font-bold mb-6 drop-shadow">Cast</h2>
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
//           {cast.slice(0, 10).map((actor) => (
//             <div key={actor.cast_id} className="text-center">
//               <img
//                 src={
//                   actor.profile_path
//                     ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
//                     : "https://via.placeholder.com/200x300?text=No+Image"
//                 }
//                 alt={actor.name}
//                 className="rounded-lg shadow-md mx-auto w-full h-auto object-cover"
//               />
//               <p className="mt-3 font-semibold text-white">{actor.name}</p>
//               <p className="text-sm text-gray-400 italic">as {actor.character}</p>
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default DetailPage;





import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieDetail } from "../src/reduxMovie/movieSlice";
import { useParams } from "react-router-dom";

const DetailPage = () => {
  const { movieId } = useParams();
  const dispatch = useDispatch();

  const { detail, cast, status } = useSelector((state) => state.movies);
  const [readMore, setReadMore] = useState(false);

  useEffect(() => {
    if (movieId) {
      dispatch(fetchMovieDetail(movieId));
    }
  }, [dispatch, movieId]);

  if (status === "loading")
    return <p className="p-6 text-center text-white text-lg">Loading...</p>;
  if (status === "failed")
    return (
      <p className="p-6 text-center text-red-500 text-lg">
        Something went wrong.
      </p>
    );
  if (!detail) return null;

  const date = new Date(detail.release_date);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const dayName = days[date.getDay()];
  const monthName = months[date.getMonth()];
  const presentDate = date.getDate();
  const year = date.getFullYear();

  // Helper for overview text with read more toggle
  const overviewLimit = 100;
  const isLongOverview = detail.overview.length > overviewLimit;
  const displayedOverview =
    readMore || !isLongOverview
      ? detail.overview
      : detail.overview.slice(0, overviewLimit) + "...";

  return (
    <div className="bg-black text-white min-h-screen px-4 sm:px-6 md:px-8 lg:px-12 py-8">
      {/* Card Container */}
      <div className="flex flex-col md:flex-row rounded-2xl border border-gray-700 max-w-7xl mx-auto overflow-hidden shadow-lg bg-gray-900">
        {/* Left: Info and Overview */}
        <div className="w-full md:w-1/2 px-6 py-6 flex flex-col justify-between">
          <div className="flex flex-col md:flex-row gap-8 md:gap-6 items-start">
            {/* Poster */}
            <img
              src={`https://image.tmdb.org/t/p/w500${detail.poster_path}`}
              alt={detail.title}
              className="rounded-lg shadow-xl w-36 sm:w-40 md:w-48 transition-transform duration-300 ease-in-out hover:scale-105"
            />

            {/* Info */}
            <div className="space-y-4 flex-1">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold drop-shadow-lg">
                {detail.title}
              </h1>

              <div className="bg-blue-600 px-3 py-1 rounded-full font-semibold drop-shadow w-max inline-block">
                Rating : {detail.vote_average.toFixed(1)}
              </div>

              <div className="flex gap-4 flex-wrap">
                <div className="bg-gray-800 px-3 py-1 rounded-full font-semibold drop-shadow w-max">
                  {detail.runtime} min
                </div>
                {detail.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="bg-indigo-700 px-3 py-1 rounded-full text-xs sm:text-sm font-medium drop-shadow"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              <div className="text-gray-400 italic text-sm sm:text-base">
                Release date : {dayName} {monthName} {presentDate}, {year}
              </div>
            </div>
          </div>

          {/* Overview */}
          <div className="mt-6">
            <h2 className="text-xl sm:text-2xl font-semibold mb-2 drop-shadow">
              Overview
            </h2>
            <p className="text-gray-300 leading-relaxed whitespace-pre-line">
              {displayedOverview}
              {isLongOverview && (
                <button
                  onClick={() => setReadMore(!readMore)}
                  className="ml-2 text-blue-400 underline focus:outline-none"
                  aria-label={readMore ? "Read less" : "Read more"}
                >
                  {readMore ? "Read Less" : "Read More"}
                </button>
              )}
            </p>
          </div>
        </div>

        {/* Right: Background Image */}
        <div
          className="w-full md:w-1/2 h-64 sm:h-80 md:h-auto rounded-b-2xl md:rounded-l-none md:rounded-r-2xl bg-no-repeat bg-right bg-cover relative"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${detail.backdrop_path})`,
          }}
        >
          <div className="absolute bg-black bg-opacity-40" />
        </div>
      </div>

      {/* Cast Section */}
      <section className="max-w-7xl mx-auto px-2 sm:px-6 md:px-8 mt-12 pb-12">
        <h2 className="text-3xl font-bold mb-6 drop-shadow">Cast</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {cast.slice(0, 10).map((actor) => (
            <div key={actor.cast_id} className="text-center">
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                    : "https://via.placeholder.com/200x300?text=No+Image"
                }
                alt={actor.name}
                className="rounded-lg shadow-md mx-auto w-full h-auto object-cover"
              />
              <p className="mt-3 font-semibold text-white">{actor.name}</p>
              <p className="text-sm text-gray-400 italic">as {actor.character}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DetailPage;
