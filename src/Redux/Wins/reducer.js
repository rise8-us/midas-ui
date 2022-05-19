import { createSlice } from '@reduxjs/toolkit'
import { setStateFromArray } from 'Utilities/reduxHelpers'
import * as actions from './actions'

const winsSlice = createSlice({
    name: 'wins',
    initialState: {},
    reducers: {},
    extraReducers: {
        [actions.requestSearchWins.fulfilled]: (state, action) => setStateFromArray(state, action.payload),
        [actions.requestCreateWin.fulfilled]: (state, action) => {
            state[action.payload.id] = action.payload
        },
        [actions.requestUpdateWin.fulfilled]: (state, action) => {
            state[action.payload.id] = action.payload
        },
        [actions.requestDeleteWin.fulfilled]: (state, action) => {
            delete state[action.payload.id]
        }
    }
})

export default winsSlice.reducer