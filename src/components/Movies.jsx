import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "../partials/TopNav";
import DropDown from "../partials/DropDown";
import axios from "../utils/axios";
import Cards from "../partials/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";
function Movies() {
    const navigate = useNavigate();
  const [category, setcategory] = useState("now_playing");
  const [movie, setmovie] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  document.title = "Movixer | Movies " + category.toUpperCase();
  const getmovie = async () => {
    try {
      const { data } = await axios.get(`/movie/${category}?page=${page}`);
      // setmovie(data.results);
      if (data.results.length > 0) {
        setmovie((prev) => [...prev, ...data.results]);
        setpage(page + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log("error:", error);
    }
  };
  const refreshHandler = () => {
    if (movie.length === 0) {
      getmovie();
    } else {
      setpage(1);
      setmovie([]);
      getmovie();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);
  return movie.length > 0 ? (
    <div className=" w-screen  h-screen ">
      <div className="px-[3%] w-full mt-3 h-[10vh] justify-between flex items-center">
        <h1 className="font-semibold w-[20%] text-zinc-400  text-xl">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line mr-5 font-medium hover:text-[#6556CD]  "
          ></i>
          Movies{" "}
          <small className="font-semibold text-xs text-zinc-600">
           ({category.toUpperCase()})
          </small>
        </h1>
        <div className="w-[80%] flex items-center  ">
          <TopNav />
          <DropDown
            title="CATEGORY"
            options={["popular", "top_rated","upcoming","now_playing"]}
            func={(e) => setcategory(e.target.value)}
          />
          <div className="w-[2%]"></div>
          
        </div>
      </div>
      <InfiniteScroll
        dataLength={movie.length}
        next={getmovie}
        hasMore={hasMore}
        loader={<h1>loading...</h1>}
      >
        <Cards data={movie} title='movie' />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
}

export default Movies