import { createSlice } from '@reduxjs/toolkit'
import { setStateFromArray } from 'Utilities/reduxHelpers'
import * as actions from './actions'

const measureSlice = createSlice({
    name: 'measures',
    initialState: {},
    reducers: { },
    extraReducers: {
        [actions.requestSearchMeasures.fulfilled]: (state, action) => setStateFromArray(state, action.payload),
        [actions.requestCreateMeasure.fulfilled]: (state, action) => {
            state[action.payload.id] = action.payload
        },
        [actions.requestUpdateMeasure.fulfilled]: (state, action) => {
            state[action.payload.id] = action.payload
        },
        [actions.requestDeleteMeasure.fulfilled]: (state, action) => {
            delete state[action.payload.id]
        }
    }
})

export default measureSlice.reducer