import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "../partials/TopNav";

import axios from "../utils/axios";
import Cards from "../partials/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";


function People() {
  const navigate = useNavigate();
  const [category, setcategory] = useState("popular");
  const [people, setpeople] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  document.title = "Movixer | Tv Shows " + category.toUpperCase();
  const getusers = async () => {
    try {
      const { data } = await axios.get(`/person/${category}?page=${page}`);
      // setpeople(data.results);
      if (data.results.length > 0) {
        setpeople((prev) => [...prev, ...data.results]);
        setpage(page + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log("error:", error);
    }
  };
  const refreshHandler = () => {
    if (people.length === 0) {
      getusers();
    } else {
      setpage(1);
      setpeople([]);
      getusers();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);
  return people.length > 0 ? (
    <div className=" w-screen  h-screen ">
      <div className="px-[3%] w-full h-[10vh] justify-between flex items-center">
        <h1 className="font-semibold w-[20%] text-zinc-400  text-2xl">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line mr-5 font-medium hover:text-[#6556CD]  "
          ></i>
          People{" "}
          <small className="font-semibold text-sm text-zinc-600">
            ({category.toUpperCase()})
          </small>
        </h1>
        <div className="w-[80%] flex items-center  ">
          <TopNav />

          <div className="w-[2%]"></div>
          
        </div>
      </div>
      <InfiniteScroll
        dataLength={people.length}
        next={getusers}
        hasMore={hasMore}
        loader={<h1>loading...</h1>}
      >
        <Cards data={people} title='person' />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
}

export default People