import { createSlice } from '@reduxjs/toolkit'
import * as actions from './actions'

const objectiveSlice = createSlice({
    name: 'objectives',
    initialState: {},
    reducers: { },
    extraReducers: {
        [actions.requestFetchObjectives.fulfilled]: (state, action) => {
            action.payload.forEach(objective => state[objective.id] = objective)
        },
        [actions.requestCreateObjective.fulfilled]: (state, action) => {
            state[action.payload.id] = action.payload
        },
        [actions.requestUpdateObjective.fulfilled]: (state, action) => {
            state[action.payload.id] = action.payload
        },
    }
})

export default objectiveSlice.reducer