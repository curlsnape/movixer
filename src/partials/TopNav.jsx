import axios from "../utils/axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import noimage from '../../public/noimage.webp'
function TopNav() {
  const [query, setquery] = useState("");
  const [search, setsearch] = useState([]);
  const getsearches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setsearch(data.results);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    getsearches();
  }, [query]);

  return (
    <div className="h-[8vh] w-full z-[100] flex relative items-center justify-start pl-[15%]">
      <i className="ri-search-line text-lg text-zinc-400"></i>
      <input
        onChange={(e) => setquery(e.target.value)}
        value={query}
        className="outline-none  mx-10 text-sm text-zinc-300 font-medium w-[50%] border-none bg-transparent  "
        type="text"
        placeholder="Search..."
      />
      {query.length > 0 && (
        <i
          onClick={() => setquery("")}
          className="ri-close-line text-2xl text-red-600"
        ></i>
      )}

      <div className="w-[46%] absolute ml-[3%]  top-[100%] rounded-lg overflow-auto bg-white max-h-[50vh]">
        {search &&
          search.map((s, i) => (
            <Link to={`/${s.media_type}/details/${s.id}`} key={i} className="p-3 gap-7 w-full items-center hover:bg-zinc-200  flex ">
              <img
                className="h-[14vh] w-[14vh] rounded-xl object-cover object-center "
                src={
                  s.backdrop_path || s.profile_path ?
                  ` https://image.tmdb.org/t/p/original/${s.backdrop_path || s.profile_path}`:noimage}
                alt=""
              />
              <span className="text-sm font-black text-gray-600 hover:text-black font-[gilroy] ">
                {s.title || s.original_name || s.original_title || s.name}
              </span>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default TopNav;
