import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import noimage from "../../public/noimage.webp";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Loading from "./Loading";
import HorizontalCards from "../partials/HorizontalCards";
import { asyncloadtv, removetv } from "../store/actions/TvActions";

function TvDetails() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { info } = useSelector((state) => state.tv);
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncloadtv(id));
    return () => {
      dispatch(removetv());
    };
  }, [id]);
  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.1),rgba(0,0,0,.4),rgba(0,0,0,.8)), url( https://image.tmdb.org/t/p/original/${info.details.backdrop_path})`,
        backgroundPosition: `top:40%`,
        backgroundSize: `cover`,
      }}
      className="w-screen min-h-[195vh] relative px-[10%]"
    >
      <nav className="text-lg flex gap-8 h-[8vh] items-center text-zinc-400">
        <Link>
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line mr-5 font-medium hover:text-[#6556CD]  "
          ></i>
        </Link>
        <a target="_black" href={info.details.homepage}>
          <i className="ri-external-link-line"></i>
        </a>
        <a
          href={`https://www.wikidata.org/wiki/${info.external_ids.wikidata_id}`}
        >
          <i className="ri-earth-fill"></i>
        </a>
        <a href={`https://www.imdb.com/title/${info.external_ids.imdb_id}`}>
          <div className="font-black text-sm tracking-tight text-black flex justify-center items-center h-6 w-14 rounded-md bg-yellow-400">
            IMDb
          </div>
        </a>
      </nav>

      <div className="w-full flex">
        <img
          className="object-cover w-fit  shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] h-[50vh] ml-[4%] mt-[2%] "
          src={`https://image.tmdb.org/t/p/original/${
            info.details.poster_path || info.details.backdrop_path
          }`}
          alt=""
        />
        <div className="ml-[7%] mt-[1.5%]">
          <h1 className=" text-white font-semibold text-2xl">
            {info.details.title ||
              info.details.original_name ||
              info.details.original_title ||
              info.details.name}
            <small className="text-xl font-semibold text-zinc-200">
              ({info.details.first_air_date.split("-")[0]})
            </small>
          </h1>

          <div className="flex gap-5 font-medium mt-3   text-white text-sm items-center">
            {info.details.vote_average && (
              <div className="w-[6vh] h-[6vh]  bg-yellow-500 text-sm flex justify-center items-center text-white rounded-full font-semibold">
                {(info.details.vote_average * 10).toFixed()}
                <sup>%</sup>
              </div>
            )}{" "}
            <h1 className="text-base">User Score</h1>
            <h1 className="text-base">{info.details.genres.map((j) => j.name)}</h1>
            <h1 className="text-base">{info.details.first_air_date}</h1>
          </div>
          <h1 className="text-base mt-5 font-medium text-zinc-200 ">
            <span className="text-base font-semibold">Episodes : </span>{" "}
            {info.details.number_of_episodes}
          </h1>
          <h1 className="text-base mt-1 font-medium text-zinc-200 ">
            <span className="text-base font-semibold">Seasons : </span>{" "}
            {info.details.number_of_seasons}
          </h1>
          <h1 className="text-base mt-1 mb-2 font-medium text-white">
            Status :<span className=" ml-2 text-base">{info.details.status}</span>
          </h1>
          <h1 className="text-white font-semibold text-xl">Overview</h1>
          <h1 className="text-white text-sm font-medium mb-5 mt-2">
            {info.details.overview}
          </h1>
          <Link
            to={`${pathname}/trailer`}
            style={{
              background: `linear-gradient(rgba(25,2,255,0.2),rgba(0,150,200,0.5),rgba(20,200,255,.8))`,
            }}
            className=" text-white px-4 py-2  text-sm mt-2 font-medium shadow-md rounded"
          >
            Watch Trailer
          </Link>
        </div>
      </div>

      <div className="w-[80%] mb-[3%]">
        <div className=" ml-[5%] mt-5 flex items-center">
          {info.watchProviders && info.watchProviders.flatrate && (
            <h1 className="text-white font-medium text-xs">Flatrate Links :</h1>
          )}
          {info.watchProviders &&
            info.watchProviders.flatrate &&
            info.watchProviders.flatrate.map((x) => (
              <img
                title={x.provider_name}
                className="w-[5vh] h-[5vh] ml-5 object-cover"
                src={`https://image.tmdb.org/t/p/original/${x.logo_path}`}
              ></img>
            ))}
        </div>
        <div className=" ml-[5%] mt-5 flex items-center gap-5">
          {info.watchProviders && info.watchProviders.rent && (
            <h1 className="text-white font-medium text-xs">Rent Links : </h1>
          )}
          {info.watchProviders &&
            info.watchProviders.rent &&
            info.watchProviders.rent.map((x) => (
              <img
                title={x.provider_name}
                className="w-[5vh] h-[5vh] object-cover"
                src={`https://image.tmdb.org/t/p/original/${x.logo_path}`}
              ></img>
            ))}
        </div>
        <div className=" ml-[5%] mt-5 flex gap-5">
          {info.watchProviders && info.watchProviders.buy && (
            <h1 className="text-white font-medium text-xs">Buy Links :</h1>
          )}

          {info.watchProviders &&
            info.watchProviders.buy &&
            info.watchProviders.buy.map((x) => (
              <img
                title={x.provider_name}
                className="w-[5vh] h-[5vh] object-cover"
                src={`https://image.tmdb.org/t/p/original/${x.logo_path}`}
              ></img>
            ))}
        </div>
      </div>

      <h1 className=" text-xl font-semibold text-zinc-300 ml-[4%] mb-5">
        Recommendations
      </h1>

      <HorizontalCards
        data={
          info.recommendations.length > 0 ? info.recommendations : info.similar
        }
      />
      <hr className="border-none bg-zinc-500 mt-2 h-[1.5px]" />
      <div className="w-full h-[2%]"></div>
      <h1 className=" text-xl font-semibold text-zinc-300 mb-3 ml-[4%] ">
        Seasons
      </h1>
      <div className="w-full  px-5  flex gap-5 overflow-y-hidden">
        {info.details.seasons.map((s, i) => (
          <div className="min-w-[16%]">
            <img
              className="h-[37vh] w-full rounded-sm object-cover object-center shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)]"
              src={
                s.poster_path
                  ? `https://image.tmdb.org/t/p/original/${s.poster_path}`
                  : noimage
              }
              alt=""
            />
            <h1 className="font-semibold text-lg mt-2 mb-3 text-zinc-300 text-center">
              {s.name}
            </h1>
          </div>
        ))}
      </div>

      <Outlet />
    </div>
  ) : (
    <Loading />
  );
}

export default TvDetails;
