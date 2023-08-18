import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userLoadingStatus : false
}

export const userLaodingSlice = createSlice({
    name: 'userLoading',
    initialState,
    reducers: {
        startLoading: (state, actions) => {
            state.userLoadingStatus = true
        },
        endLoading : (state)=>{
            state.userLoadingStatus = false
        }

    },
})

// Action creators are generated for each case reducer function
export const { startLoading,endLoading } = userLaodingSlice.actions

export default userLaodingSlice.reducer