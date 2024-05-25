import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadperson, removeperson } from "../store/actions/PersonActions";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Loading from "./Loading";
import HorizontalCards from "../partials/HorizontalCards";
import DropDown from "../partials/DropDown";

function PeopleDetails() {
  const [category, setcategory] = useState("movie");
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { info } = useSelector((state) => state.people);
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncloadperson(id));
    return () => {
      dispatch(removeperson());
    };
  }, [id]);
  return info ? (
    <div className="w-screen h-screen bg-[#1F1E24]  ">
      <nav className="text-lg h-[8vh] py-10 px-32 text-zinc-400">
        <Link>
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line mr-5 font-medium hover:text-[#6556CD]  "
          ></i>
        </Link>
      </nav>
      <div className="w-full h-[170vh] px-[15%] bg-[#1F1E24] flex gap-10">
        <div className="w-[20%]">
          <img
            className="object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] h-[35vh] object-[center_top]  mt-[2%] "
            src={`https://image.tmdb.org/t/p/original/${info.details.profile_path}`}
            alt=""
          />
          <hr className="border-none bg-zinc-500 mt-5 h-[1.5px]" />
          <div className="text-sm text-white mt-3 flex gap-5 justify-center">
            <a
              className="hover:text-sky-300"
              target="_black"
              href={`https://www.facebook.com/${info.external_ids.facebook_id}`}
            >
              <i class="ri-facebook-circle-fill"></i>
            </a>
            <a target="_blank"
              className="hover:text-sky-300"
              href={`https://www.instagram.com/${info.external_ids.instagram_id}`}
            >
              <i class="ri-instagram-fill"></i>
            </a>
            <a target="_blank"
              className="hover:text-sky-300"
              href={`https://www.twitter.com/${info.external_ids.twitter_id}`}
            >
              <i class="ri-twitter-fill"></i>
            </a>
            <a target="_blank"
              className="hover:text-sky-300"
              href={`https://www.wikidata.org/wiki/${info.external_ids.wikidata_id}`}
            >
              <i className="ri-earth-fill"></i>
            </a>
          </div>
          <h1 className="text-lg font-medium my-5 text-zinc-400">
            Person's Info
          </h1>
          <h1 className="text-sm text-zinc-500  font-semibold">Known for</h1>
          <h1 className="text-xs font-medium text-zinc-500 ">
            {info.details.known_for_department}
          </h1>
          <h1 className="text-sm text-zinc-500  font-semibold mt-3">
            Birthdate
          </h1>
          <h1 className="text-xs font-medium text-zinc-500 ">
            {info.details.birthday}
          </h1>
          {info.details.deathday === null ? (
            ""
          ) : (
            <>
              <h1 className="text-sm text-zinc-500  font-semibold mt-3">
                Death Date
              </h1>
              <h1 className="text-xs font-medium text-zinc-500 ">
                {info.details.deathday}
              </h1>
            </>
          )}
          <h1 className="text-sm text-zinc-500  font-semibold mt-3">
            Birthplace
          </h1>
          <h1 className="text-xs font-medium text-zinc-500 ">
            {info.details.place_of_birth && info.details.place_of_birth}
          </h1>
          <h1 className="text-sm text-zinc-500  font-semibold mt-3">Gender</h1>
          <h1 className="text-xs font-medium text-zinc-500 ">
            {info.details.gender === 2 ? "Male" : "Female"}
          </h1>
        </div>
        <div className="w-[80%] flex flex-col">
          <h1 className="text-2xl text-zinc-400 font-semibold">
            {info.details.name}
          </h1>
          <h1 className="text-sm font-semibold mt-5 text-zinc-300">
            Biography
          </h1>
          <h1 className="text-xs text-zinc-500 mt-2 font-medium">
            {info.details.biography}
          </h1>

          <h1 className="text-zinc-400 mt-5 mb-3 font-semibold text-lg">
            Starred in
          </h1>
          <HorizontalCards data={info.combined_credits.cast} />
          <div className="flex mt-5 items-center justify-between py-3">
            <h1 className="text-xs text-zinc-300">Works</h1>
            <DropDown
              title="category"
              options={["movie", "tv"]}
              func={(e) => setcategory(e.target.value)}
            />
          </div>
          <div className="w-full list-disc text-zinc-400 text-2xl h-[50vh] shadow-xl p-3 shadow-[rgba(0,0,0,0.5)] overflow-y-auto overflow-x-hidden">
            
              {info[category + "_credits"].cast.map((k, i) => (
                <li className="p-5">
                <Link to={`/${category}/details/${k.id}`} className="">
                  <span className="inline-block">
                    <h1 className="font-bold mt-1 text-lg w-full ">
                      {k.title || k.original_name || k.original_title || k.name}
                    </h1>
                  </span>
                  <span className="block text-base font-medium ml-8">{k.character && `character : ${k.character}`} </span>
                </Link>
                </li>
              ))}
              
           
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default PeopleDetails;
