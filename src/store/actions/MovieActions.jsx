export { removemovie } from "../reducer/MovieSlice";
import axios from "../../utils/axios";
import { loadmovie } from "../reducer/MovieSlice";

export const asyncloadmovie = (id) => async (dispatch, getState) => {
  try {
    const details = await axios.get(`/movie/${id}`);
    const external_ids = await axios.get(`/movie/${id}/external_ids`);
    const recommendations = await axios.get(`/movie/${id}/recommendations`);
    const similar = await axios.get(`/movie/${id}/similar`);
    const watchProviders = await axios.get(`/movie/${id}/watch/providers`);
    const video = await axios.get(`/movie/${id}/videos`);

    let combinedData = {
      details: details.data,
      external_ids: external_ids.data,
      recommendations: recommendations.data.results,
      similar: similar.data.results,
      watchProviders: watchProviders.data.results.IN,
      video: video.data.results.find((f) => f.type === "Trailer"),
    };
    dispatch(loadmovie(combinedData))
    console.log(combinedData);
  } catch (error) {
    console.log("Error:", error);
  }
};
