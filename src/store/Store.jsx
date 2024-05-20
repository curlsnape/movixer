import { configureStore } from "@reduxjs/toolkit";
import MovieReducer from "./reducer/MovieSlice";
import  peopleReducer from "./reducer/PeopleSlice";
import tvReducer from "./reducer/SliceTv"




export const store =configureStore({
reducer:{
    movie:MovieReducer,
    people:peopleReducer,
    tv:tvReducer
}
})