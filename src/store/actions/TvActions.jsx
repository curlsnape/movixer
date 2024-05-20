export { removetv } from "../reducer/SliceTv";
import axios from "../../utils/axios";
import { loadtv } from "../reducer/SliceTv";




export const asyncloadtv = (id) => async (dispatch, getState) => {
  try {
    const details = await axios.get(`/tv/${id}`);
    const external_ids = await axios.get(`/tv/${id}/external_ids`);
    const recommendations = await axios.get(`/tv/${id}/recommendations`);
    const similar = await axios.get(`/tv/${id}/similar`);
    const watchProviders = await axios.get(`/tv/${id}/watch/providers`);
    const video = await axios.get(`/tv/${id}/videos`);

    let combinedData = {
      details: details.data,
      external_ids: external_ids.data,
      recommendations: recommendations.data.results,
      similar: similar.data.results,
      watchProviders: watchProviders.data.results.IN,
      video: video.data.results.find((f) => f.type === "Trailer"),
    };
    dispatch(loadtv(combinedData))
    console.log(combinedData);
  } catch (error) {
    console.log("Error:", error);
  }
};
