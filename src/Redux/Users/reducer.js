import { createSlice } from '@reduxjs/toolkit'
import { requestFetchInitUser } from '../Info/actions'
import * as actions from './actions'

const userSlice = createSlice({
    name: 'users',
    initialState: { },
    reducers: { },
    extraReducers: {
        [actions.requestFetchOneUser.fulfilled]: (state, action) => {
            state[action.payload.id] = action.payload
        },
        [actions.requestUpdateUser.fulfilled]: (state, action) => {
            state[action.payload.id] = action.payload
        },
        [actions.requestUpdateUserRoles.fulfilled]: (state, action) => {
            state[action.payload.id] = action.payload
        },
        [requestFetchInitUser.fulfilled]: (state, action) => {
            state[action.payload.id] = action.payload
        }
    }
})

export default userSlice.reducer