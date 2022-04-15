import { createSlice } from '@reduxjs/toolkit'
import { setStateFromArray } from 'Utilities/reduxHelpers'
import * as actions from './actions'

const milestonesSlice = createSlice({
    name: 'milestones',
    initialState: {},
    reducers: {},
    extraReducers: {
        [actions.requestSearchMilestones.fulfilled]: (state, action) => setStateFromArray(state, action.payload),
        [actions.requestCreateMilestone.fulfilled]: (state, action) => {
            state[action.payload.id] = action.payload
        },
        [actions.requestUpdateMilestone.fulfilled]: (state, action) => {
            state[action.payload.id] = action.payload
        },
        [actions.requestDeleteMilestone.fulfilled]: (state, action) => {
            delete state[action.payload.id]
        }
    }
})

export default milestonesSlice.reducer