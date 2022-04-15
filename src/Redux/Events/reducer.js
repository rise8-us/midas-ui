import { createSlice } from '@reduxjs/toolkit'
import { setStateFromArray } from 'Utilities/reduxHelpers'
import * as actions from './actions'

const eventsSlice = createSlice({
    name: 'events',
    initialState: {},
    reducers: {},
    extraReducers: {
        [actions.requestSearchEvents.fulfilled]: (state, action) => setStateFromArray(state, action.payload),
        [actions.requestCreateEvent.fulfilled]: (state, action) => {
            state[action.payload.id] = action.payload
        },
        [actions.requestUpdateEvent.fulfilled]: (state, action) => {
            state[action.payload.id] = action.payload
        },
        [actions.requestDeleteEvent.fulfilled]: (state, action) => {
            delete state[action.payload.id]
        }
    }
})

export default eventsSlice.reducer