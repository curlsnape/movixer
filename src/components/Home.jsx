import React, { useEffect, useState } from "react";
import SideNav from "../partials/SideNav";
import TopNav from "../partials/TopNav";
import Header from "../partials/Header";
import axios from "../utils/axios";
import HorizontalCards from "../partials/HorizontalCards";
import DropDown from "../partials/DropDown";
import Loading from "./Loading";

function Home() {
  document.title = "Movixer | HomePage";
  const [wallpaper, setwallpaper] = useState("");
  const [trending, settrending] = useState(null);
  const [category, setcategory] = useState("all");
  const getWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/week`);
      const randomdata =
        data.results[(Math.random() * data.results.length).toFixed()];
      setwallpaper(randomdata);
    } catch (error) {
      console.log("error:", error);
    }
  };
  const getTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/week`);
      
      settrending(data.results);
    } catch (error) {
      console.log("error:", error);
    }
  };

  // console.log(trending)
  useEffect(() => {
    !wallpaper && getWallpaper();
    getTrending();
  }, [category]);

  return wallpaper && trending ? (
    <>
      <SideNav />
      <div className="w-[80%] overflow-auto overflow-x-hidden h-full ">
        <TopNav />
        <Header data={wallpaper} />
        <div className=" flex justify-between p-5  ">
          <h1 className="text-zinc-300 font-semibold text-3xl mb-5">
            Trending Now 
            <i
              style={{
                background: `linear-gradient(rgba(20,10,0,0.2),rgba(100,25,0,0.5),rgba(200,0,0,0.8))`,
              }}
              className="ri-fire-fill hover:text-orange-400 rounded-full text-orange-500  ml-2"
            ></i>
          </h1>
          <DropDown
            title={"FILTER"}
            options={["all", "tv", "movie"]}
            func={(e) => setcategory(e.target.value)}
          />
        </div>
        <HorizontalCards data={trending} />
      </div>
    </>
  ) : (
    <Loading/>
  );
}

export default Home;
