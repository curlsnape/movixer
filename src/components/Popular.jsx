import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "../partials/TopNav";
import DropDown from "../partials/DropDown";
import axios from "../utils/axios";
import Cards from "../partials/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

function Popular() {
  const navigate = useNavigate();
  const [category, setcategory] = useState("movie");
  const [popular, setpopular] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  document.title = "Movixer | Popular " + category.toUpperCase();
  const getPopular = async () => {
    try {
      const { data } = await axios.get(`/${category}/popular?page=${page}`);
      // setpopular(data.results);
      if (data.results.length > 0) {
        setpopular((prev) => [...prev, ...data.results]);
        setpage(page + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log("error:", error);
    }
  };
  const refreshHandler = () => {
    if (popular.length === 0) {
      getPopular();
    } else {
      setpage(1);
      setpopular([]);
      getPopular();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);
  return popular.length > 0 ? (
    <div className=" w-screen  h-screen ">
      <div className="px-[3%] w-full h-[10vh] justify-between flex items-center">
        <h1 className="font-semibold w-[20%] text-zinc-400  text-2xl">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line mr-5 font-medium hover:text-[#6556CD]  "
          ></i>
          Popular{" "}
          <small className="font-semibold text-sm text-zinc-600">
            ({category.toUpperCase()})
          </small>
        </h1>
        <div className="w-[80%] flex items-center  ">
          <TopNav />
          <DropDown
            title="CATEGORY"
            options={["tv", "all", "movie"]}
            func={(e) => setcategory(e.target.value)}
          />
          <div className="w-[2%]"></div>
          
        </div>
      </div>
      <InfiniteScroll
        dataLength={popular.length}
        next={getPopular}
        hasMore={hasMore}
        loader={<h1>loading...</h1>}
      >
        <Cards data={popular} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
}

export default Popular;
