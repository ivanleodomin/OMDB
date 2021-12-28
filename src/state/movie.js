import {createAction, createReducer} from '@reduxjs/toolkit'

export const setMovie = createAction("MOVIE")

 const loginReducer = createReducer([],{
    [setMovie]: (state, action)=> {
        console.log("redux setMovie", action)
        return action.payload
    }
})

export default loginReducer