import { createSlice } from '@reduxjs/toolkit'
import { setStateFromArray } from 'Utilities/reduxHelpers'
import * as actions from './actions'

const missionThreadSlice = createSlice({
    name: 'missionThreads',
    initialState: { },
    reducers: { },
    extraReducers: {
        [actions.requestCreateMissionThread.fulfilled]: (state, action) => {
            state[action.payload.id] = action.payload
        },
        [actions.requestUpdateMissionThread.fulfilled]: (state, action) => {
            state[action.payload.id] = action.payload
        },
        [actions.requestDeleteMissionThread.fulfilled]: (state, action) => {
            delete state[action.payload.id]
        },
        [actions.requestSearchMissionThreads.fulfilled]: (state, action) => {
            setStateFromArray(state, action.payload)
        },
    }
})

export default missionThreadSlice.reducer