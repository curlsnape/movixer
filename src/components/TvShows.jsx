import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "../partials/TopNav";
import DropDown from "../partials/DropDown";
import axios from "../utils/axios";
import Cards from "../partials/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

function TvShows() {
  const navigate = useNavigate();
  const [category, setcategory] = useState("on_the_air");
  const [tv, settv] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  document.title = "Movixer | Tv Shows " + category.toUpperCase();
  const gettvshows = async () => {
    try {
      const { data } = await axios.get(`/tv/${category}?page=${page}`);
      // settv(data.results);
      if (data.results.length > 0) {
        settv((prev) => [...prev, ...data.results]);
        setpage(page + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log("error:", error);
    }
  };
  const refreshHandler = () => {
    if (tv.length === 0) {
      gettvshows();
    } else {
      setpage(1);
      settv([]);
      gettvshows();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);
  return tv.length > 0 ? (
    <div className=" w-screen  h-screen ">
      <div className="px-[3%] w-full h-[10vh] justify-between mt-3 flex items-center">
        <h1 className="font-semibold w-[20%] text-zinc-400  text-xl">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line mr-5 font-medium hover:text-[#6556CD]  "
          ></i>
          TV {" "}
          <small className="font-semibold text-xs text-zinc-600">
            ({category.toUpperCase()})
          </small>
        </h1>
        <div className="w-[80%] flex items-center  ">
          <TopNav />
          <DropDown
            title="CATEGORY"
            options={["popular", "top_rated","on_the_air","airing_today"]}
            func={(e) => setcategory(e.target.value)}
          />
          <div className="w-[2%]"></div>
          
        </div>
      </div>
      <InfiniteScroll
        dataLength={tv.length}
        next={gettvshows}
        hasMore={hasMore}
        loader={<h1>loading...</h1>}
      >
        <Cards data={tv} title='tv' />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
}

export default TvShows