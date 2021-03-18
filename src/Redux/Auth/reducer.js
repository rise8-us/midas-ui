import { createSlice } from '@reduxjs/toolkit'
import { requestFetchInit } from '../Init/actions'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: {
            roles: 0
        },
        isAdmin: false
    },
    reducers: { },
    extraReducers: {
        [requestFetchInit.fulfilled]: (state, action) => {
            state.user = action.payload.userLoggedIn
            state.isAdmin = Boolean(action.payload.userLoggedIn.roles.toString(2) & 1)
        }
    }
})

export default authSlice.reducer
