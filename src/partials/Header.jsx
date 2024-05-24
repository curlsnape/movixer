import React from "react";
import { Link } from "react-router-dom";

function Header({ data }) {
  // console.log(data);
  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.1),rgba(0,0,0,.4),rgba(0,0,0,.8)), url( https://image.tmdb.org/t/p/original/${
          data.backdrop_path || data.profile_path
        })`,
        backgroundPosition: `top:40%`,
        backgroundSize: `cover`,
      }}
      className="w-[90%] ml-[5%] flex flex-col justify-end items-start px-[5%] py-5 h-[53vh] "
    >
      <h1 className="font-bold w-[50%] text-2xl mb-3 text-white">
        {data.title || data.original_name || data.original_title || data.name}
      </h1>
      <p className="text-white text-xs font-medium w-[70%]">
        {data.overview.slice(0, 204)}...
        <Link to={`/${data.media_type}/details/${data.id}`} className="text-blue-400">more</Link>
      </p>
      <p className="text-white flex font-medium text-xs mt-2 gap-5">
        <span>
          <i className="ri-calendar-fill text-yellow-500 mr-2"></i>
          {data.release_date || data.first_air_date}
        </span>
        <span className="uppercase">
          <i className="ri-album-fill mr-2 text-yellow-400"></i>
          {data.media_type}
        </span>
      </p>
      <Link to={`${data.media_type}/details/${data.id}/trailer`}
        style={{
          background: `linear-gradient(rgba(0,0,0,0.2),rgba(150,0,0,0.5),rgba(250,0,0,.8))`,
        }}
        className=" text-white px-4 py-2 text-xs mt-2 font-medium shadow-md rounded"
      >
        Watch Trailer
      </Link>
    </div>
  );
}

export default Header;
