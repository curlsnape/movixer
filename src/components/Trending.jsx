import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "../partials/TopNav";
import DropDown from "../partials/DropDown";
import axios from "../utils/axios";
import Cards from "../partials/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";
function Trending() {
  
  const navigate = useNavigate();
  const [category, setcategory] = useState("all");
  const [duration, setduration] = useState("day");
  const [trending, settrending] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  document.title = "Movixer | Trending "+category.toUpperCase();
  const getTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/${duration}?page=${page}`);
      // settrending(data.results);
      if (data.results.length > 0) {
        settrending((prev) => [...prev, ...data.results]);
        setpage(page + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log("error:", error);
    }
  };
  const refreshHandler = () => {
    if (trending.length === 0) {
      getTrending();
    } else {
      setpage(1);
      settrending([]);
      getTrending();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category, duration]);
  return trending.length > 0 ? (
    <div className=" w-screen  h-screen ">
      <div className="px-[3%] w-full h-[10vh] mt-3 justify-between flex items-center">
        <h1 className="font-semibold w-[20%] text-zinc-400  text-xl">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line mr-5 font-medium hover:text-[#6556CD]  "
          ></i>
          Trending <small className="font-semibold text-xs text-zinc-600">({category.toUpperCase()})</small>
        </h1>
        <div className="w-[80%] flex items-center  ">
          <TopNav />
          <DropDown
            title="CATEGORY"
            options={["tv", "all", "movie"]}
            func={(e) => setcategory(e.target.value)}
          />
          <div className="w-[2%]"></div>
          <DropDown
            title="DURATION"
            options={["week", "day"]}
            func={(e) => setduration(e.target.value)}
          />
        </div>
      </div>
      <InfiniteScroll 
      dataLength={trending.length}
      next={getTrending}
      hasMore={hasMore}
      loader={<h1>loading...</h1>}
      >
        <Cards data={trending} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
}

export default Trending;
