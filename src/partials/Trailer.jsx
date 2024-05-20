import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NotFound from "../components/NotFound";

function Trailer() {
  const navigate=useNavigate()
  const { pathname } = useLocation();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytvideo = useSelector((state) => state[category].info.video);

  return  (
    <div className="w-screen h-screen flex justify-center items-center absolute top-0 left-0 bg-[rgba(0,0,0,0.8)] ">
      <Link>
        <i
          onClick={() => navigate(-1)}
          className="ri-close-fill mr-5 text-3xl text-white absolute top-[5%] right-[8%] font-medium hover:text-[#6556CD]  "
        ></i>
      </Link>
 {ytvideo? <ReactPlayer controls
       height={500}
       width={1000}
      url={`https://www.youtube.com/watch?v=${ytvideo.key}`} />:<NotFound/> } 
      
    
    </div>
  );
}

export default Trailer;
