import { configureStore } from '@reduxjs/toolkit'
import  userAuthReducer  from '../slices/userAuth'
import userLoadingReduser from '../slices/userLoading';


export const store = configureStore({
    reducer: {
        userAuth: userAuthReducer,
        userLoading: userLoadingReduser 
    },
})

export default store;