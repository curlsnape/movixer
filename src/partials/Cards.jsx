import React from "react";
import { Link } from "react-router-dom";
import noimage from '../../public/noimage.webp'
function Cards({ data ,title}) {
  
  return (
    <div className="w-full h-full px-10 bg-[#1F1E24] py-14 flex justify-center flex-wrap gap-10">
      {data.map((c, i) => (
        <Link to={`/${c.media_type|| title}/details/${c.id}`}
          className=" w-[30vh] relative"
          key={i}
        >
          <img
            className="h-[35vh] w-full object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)]"
            src={ c.backdrop_path || c.poster_path || c.profile_path ?`https://image.tmdb.org/t/p/original/${
              c.backdrop_path || c.poster_path || c.profile_path
            }`:noimage}
            alt=""
          />
          <h1 className="font-semibold text-base mt-2 text-zinc-300 text-center">
            {" "}
            {c.title || c.original_name || c.original_title || c.name}
          </h1>{" "}
          {c.vote_average && (
            <div className="w-[6vh] h-[6vh] absolute right-[-8%] bottom-[28%] bg-yellow-600 text-sm flex justify-center items-center text-white rounded-full font-semibold">
              {(c.vote_average * 10).toFixed()}
              <sup>%</sup>
            </div>
          )}
        </Link>
      ))}
    </div>
  );
}

export default Cards;
