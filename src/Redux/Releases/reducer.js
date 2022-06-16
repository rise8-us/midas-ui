import { createSlice } from '@reduxjs/toolkit'
import { setStateFromArray } from 'Utilities/reduxHelpers'
import * as actions from './actions'

const releaseSlice = createSlice({
    name: 'releases',
    initialState: { },
    reducers: { },
    extraReducers: {
        [actions.requestSearchReleases.fulfilled]: (state, action) => setStateFromArray(state, action.payload),
        [actions.fetchReleasesByProductId.fulfilled]: (state, action) => setStateFromArray(state, action.payload),
    }
})

export default releaseSlice.reducer