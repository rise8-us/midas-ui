import { createSlice } from '@reduxjs/toolkit'
import { setStateFromArray } from 'Utilities/reduxHelpers'
import * as actions from './actions'

const releaseSlice = createSlice({
    name: 'releases',
    initialState: { },
    reducers: { },
    extraReducers: {
        [actions.requestCreateRelease.fulfilled]: (state, action) => {
            state[action.payload.id] = action.payload
        },
        [actions.requestUpdateRelease.fulfilled]: (state, action) => {
            state[action.payload.id] = action.payload
        },
        [actions.requestDeleteRelease.fulfilled]: (state, action) => {
            delete state[action.payload.id]
        },
        [actions.requestSearchReleases.fulfilled]: (state, action) => {
            setStateFromArray(state, action.payload)
        },
    }
})

export default releaseSlice.reducer