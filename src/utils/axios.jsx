import axios from "axios";

export const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOGRlNTE4ZGM0OGM0NzY4YjYyZTE2YmU4NWNkOTdjMiIsInN1YiI6IjY2M2NlMWQ2YWMwOGFhZDdhODFlZTkxYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QWBsyJQqnPtOV131pprfFl0qZ0IsLgmbpbI8E-eo80w",
  },
});

export default instance