import { createSlice } from '@reduxjs/toolkit'
import { setStateFromArray } from '../../Utilities/reduxHelpers'
import * as actions from './actions'

const teamSlice = createSlice({
    name: 'teams',
    initialState: { },
    reducers: { },
    extraReducers: {
        [actions.requestFetchAllTeams.fulfilled]: (state, action) => setStateFromArray(state, action.payload),
        [actions.requestCreateTeam.fulfilled]: (state, action) => {
            state[action.payload.id] = action.payload
        },
        [actions.requestUpdateTeam.fulfilled]: (state, action) => {
            state[action.payload.id] = action.payload
        }
    }
})

export default teamSlice.reducer