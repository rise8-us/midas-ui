import { createSlice } from '@reduxjs/toolkit'
import { setStateFromArray } from 'Utilities/reduxHelpers'
import * as actions from './actions'

const roadmapSlice = createSlice({
    name: 'roadmaps',
    initialState: { },
    reducers: { },
    extraReducers: {
        [actions.requestFetchRoadmapsByProductId.fulfilled]: (state, action) => {
            setStateFromArray(state, action.payload)
        },
        [actions.requestCreateRoadmap.fulfilled]: (state, action) => {
            state[action.payload.id] = action.payload
        },
        [actions.requestUpdateRoadmap.fulfilled]: (state, action) => {
            state[action.payload.id] = action.payload
        },
        [actions.requestDeleteRoadmap.fulfilled]: (state, action) => {
            delete state[action.payload.id]
        }
    }
})

export default roadmapSlice.reducer