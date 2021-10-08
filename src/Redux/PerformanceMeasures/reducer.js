import { createSlice } from '@reduxjs/toolkit'
import { setStateFromArray } from 'Utilities/reduxHelpers'
import * as actions from './actions'

const performanceMeasureSlice = createSlice({
    name: 'performanceMeasures',
    initialState: { },
    reducers: { },
    extraReducers: {
        [actions.requestCreatePerformanceMeasure.fulfilled]: (state, action) => {
            state[action.payload.id] = action.payload
        },
        [actions.requestUpdatePerformanceMeasure.fulfilled]: (state, action) => {
            state[action.payload.id] = action.payload
        },
        [actions.requestDeletePerformanceMeasure.fulfilled]: (state, action) => {
            delete state[action.payload.id]
        },
        [actions.requestUpdatePerformanceMeasuresBulk.fulfilled]: (state, action) => {
            setStateFromArray(state, action.payload)
        },
        [actions.requestSearchPerformanceMeasures.fulfilled]: (state, action) => {
            setStateFromArray(state, action.payload)
        },
    }
})

export default performanceMeasureSlice.reducer