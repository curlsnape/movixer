export { removeperson } from "../reducer/PeopleSlice";
import axios from "../../utils/axios";
import { loadperson } from "../reducer/PeopleSlice";


export const asyncloadperson = (id) => async (dispatch, getState) => {
  try {
    const details = await axios.get(`/person/${id}`);
    const external_ids = await axios.get(`/person/${id}/external_ids`);
    const combined_credits = await axios.get(`/person/${id}/combined_credits`)
    const tv_credits = await axios.get(`/person/${id}/tv_credits`)
    const movie_credits = await axios.get(`/person/${id}/movie_credits`)

    let combinedData = {
      details: details.data,
      external_ids: external_ids.data,
      combined_credits: combined_credits.data,
      tv_credits: tv_credits.data,
      movie_credits: movie_credits.data,

     
    };
    dispatch(loadperson(combinedData))
    console.log(combinedData);
  } catch (error) {
    console.log("Error:", error);
  }
};
