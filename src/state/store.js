import {configureStore} from '@reduxjs/toolkit'
import loginReducer from './user'
import movieReducer from './movie'

const store = configureStore({
    reducer:{
        login : loginReducer,
        movie: movieReducer,
    }
})

export default store