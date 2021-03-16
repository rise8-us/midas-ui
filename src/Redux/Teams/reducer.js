import { createSlice } from '@reduxjs/toolkit'
import * as actions from './actions'

const teamSlice = createSlice({
    name: 'teams',
    initialState: { },
    reducers: { },
    extraReducers: {
        [actions.requestFetchAllTeams.fulfilled]: (state, action) => {
            action.payload.forEach(team => {
                state[team.id] = team
            })
        },
        [actions.requestCreateTeam.fulfilled]: (state, action) => {
            state[action.payload.id] = action.payload
        },
        [actions.requestUpdateTeam.fulfilled]: (state, action) => {
            state[action.payload.id] = action.payload
        }
    }
})

export default teamSlice.reducer