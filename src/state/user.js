import {createAction, createReducer} from '@reduxjs/toolkit'

export const setLogin = createAction("LOGEANDO")

 const loginReducer = createReducer([],{
    [setLogin]: (state, action)=> {
        console.log("redux setLogin", action)
        return action.payload
    }
})

export default loginReducer