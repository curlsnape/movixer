import React from "react";
import { Link } from "react-router-dom";
import noimage from '../../public/noimage.webp'

function HorizontalCards({ data }) {
  return (
    <div className="w-full h-[39vh] px-5  flex gap-5 overflow-y-hidden">
      {data.length>0?data.map((card, i) => (
        <Link  to={`/${card.media_type}/details/${card.id}`} 
          key={i}
          className="min-w-[18%] rounded-md overflow-hidden mb-5  bg-zinc-900"
        >
          <img
            className="h-[50%] w-full object-cover"
            src={card.backdrop_path ? `https://image.tmdb.org/t/p/original/${
              card.backdrop_path || card.poster_path
            }`:noimage}
            alt=""
          />
          <div className="px-2 py-1 h-[50%] text-white overflow-y-auto ">
            {" "}
            <h1 className="font-bold mt-1 text-sm w-full ">
              {card.title ||
                card.original_name ||
                card.original_title ||
                card.name}
            </h1>
            <p className="mt-1 text-xs font-light ">
              {card.overview.slice(0, 40)}...
              <Link className="text-zinc-500">more</Link>
            </p>
          </div>
        </Link>
      )):<h1 className="text-5xl font-semibold text-white">No Recommendations Available</h1>}
    </div>
  );
}

export default HorizontalCards;
