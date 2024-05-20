import React from "react";
import { Link } from "react-router-dom";

function SideNav() {
  return (
    <div className="w-[20%] h-full border-r border-zinc-500 p-10 ">
      <h1 className="text-3xl text-white">
        <i className="ri-tv-fill text-[#6556CD] mr-2"></i>
        <span className="font-semibold">Movixer.</span>
      </h1>
      <nav className="flex flex-col mt-5 mb-5">
        <h1 className="font-medium text-2xl text-white my-5">Explore Now</h1>
        <Link to='/trending' className="text-zinc-400 py-5 hover:px-5 hover:bg-purple-700 hover:text-white rounded-xl font-medium duration-500 text-xl">
          <i className="ri-fire-fill text-orange-400"></i> Trending
        </Link>
        <Link to="/popular" className="text-zinc-400 py-5 hover:px-5  duration-500 hover:bg-purple-700 hover:text-white rounded-xl font-medium text-xl">
          <i className="ri-sparkling-fill text-yellow-300 mr-1"></i> Popular
        </Link>
        <Link to="/movie" className="text-zinc-400 py-5 hover:px-5  duration-500 hover:bg-purple-700 hover:text-white rounded-xl font-medium text-xl">
          <i className="ri-movie-2-fill mr-2 text-white"></i>Movies
        </Link>
        <Link to="/tv" className="text-zinc-400 py-5 hover:px-5 duration-500  hover:bg-purple-700 hover:text-white rounded-xl font-medium text-xl">
          {" "}
          <i className="ri-tv-2-fill text-blue-500 mr-2"></i>Tv Shows
        </Link>
        <Link to="/person" className="text-zinc-400 py-5 hover:px-5 duration-500  hover:bg-purple-700 hover:text-white rounded-xl font-medium text-xl">
          <i className="ri-team-fill text-indigo-900 mr-1"></i> Celebrities
        </Link>
      </nav>
      <hr className="border-none h-[1px] bg-zinc-500" />
      <nav className="flex flex-col mt-5 mb-5">
        <h1 className="font-semibold text-xl text-white my-5">
          More Information
        </h1>
        <Link className="text-zinc-400 py-5 hover:px-5 hover:bg-purple-800 hover:text-white rounded-xl font-medium duration-300 text-xl">
          <i className="ri-information-fill text-blue-200"></i> About
        </Link>
        <Link className="text-zinc-400 py-5 hover:px-5  duration-300 hover:bg-purple-800 hover:text-white rounded-xl font-medium text-xl">
          <i className="ri-phone-fill text-blue-500"></i> Contact Us
        </Link>
      </nav>
    </div>
  );
}

export default SideNav;
