import { createSlice } from '@reduxjs/toolkit'
import { setStateFromArray } from 'Utilities/reduxHelpers'
import * as actions from './actions'

const targetsSlice = createSlice({
    name: 'targets',
    initialState: {},
    reducers: {},
    extraReducers: {
        [actions.requestSearchTargets.fulfilled]: (state, action) => setStateFromArray(state, action.payload),
        [actions.requestCreateTarget.fulfilled]: (state, action) => {
            state[action.payload.id] = action.payload
        },
        [actions.requestUpdateTarget.fulfilled]: (state, action) => {
            state[action.payload.id] = action.payload
        },
        [actions.requestDeleteTarget.fulfilled]: (state, action) => {
            delete state[action.payload.id]
        }
    }
})

export default targetsSlice.reducer