import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  info:null
}

export const SliceTv = createSlice({
    name:"tv",
    initialState,
    reducers: {
        loadtv:(state,action)=>{
            state.info = action.payload
        },
        removetv:(state,action)=>{
            state.info = null
        }
    }
})

export const { loadtv, removetv} = SliceTv.actions

export default SliceTv.reducer