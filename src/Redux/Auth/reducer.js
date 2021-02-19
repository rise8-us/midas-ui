import { createSlice } from '@reduxjs/toolkit'
import { requestFetchInitUser } from '../Info/actions'

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
        [requestFetchInitUser.fulfilled]: (state, action) => {
            state.user = action.payload
            state.isAdmin = Boolean(action.payload.roles.toString(2) & 1)
        }
    }
})

export default authSlice.reducer
