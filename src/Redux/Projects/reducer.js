import { createSlice } from '@reduxjs/toolkit'
import { setStateFromArray } from '../../Utilities/reduxHelpers'
import * as actions from './actions'

const projectSlice = createSlice({
    name: 'projects',
    initialState: { },
    reducers: { },
    extraReducers: {
        [actions.requestFetchAllProjects.fulfilled]: (state, action) => setStateFromArray(state, action.payload),
        [actions.requestCreateProject.fulfilled]: (state, action) => {
            state[action.payload.id] = action.payload
        },
        [actions.requestUpdateProject.fulfilled]: (state, action) => {
            state[action.payload.id] = action.payload
        },
        [actions.requestUpdateJourneyMapById.fulfilled]: (state, action) => {
            state[action.payload.id] = action.payload
        },
        [actions.requestArchiveProject.fulfilled]: (state, action) => {
            state[action.payload.id] = action.payload
        }
    }
})

export default projectSlice.reducer