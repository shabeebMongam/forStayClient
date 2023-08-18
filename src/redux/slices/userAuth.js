import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userName: '',
    userToken : '',
}

export const userSlice = createSlice({
    name: 'userAuth',
    initialState,
    reducers: {
        addUserDetailes: (state,actions) => {
            // console.log(actions.payload);
            const newItem = actions.payload;
            state.userName = newItem.userName
            state.userToken = newItem.userToken
        },
      
    },
})

// Action creators are generated for each case reducer function
export const { addUserDetailes } = userSlice.actions

export default userSlice.reducer