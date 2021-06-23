import { createSlice } from '@reduxjs/toolkit'
import { setStateFromArray } from '../../Utilities/reduxHelpers'
import { requestFetchInit } from '../Init/actions'
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
        [requestFetchInit.fulfilled]: (state, action) => {
            state[action.payload.userLoggedIn.id] = action.payload.userLoggedIn
        },
        [actions.requestFindUserBy.fulfilled]: (state, action) => setStateFromArray(state, action.payload),
    }
})

export default userSlice.reducer