import { createSlice } from '@reduxjs/toolkit'
import * as actions from './actions'

const applicationSlice = createSlice({
    name: 'applications',
    initialState: {},
    reducers: { },
    extraReducers: {
        [actions.requestFetchAllApplications.fulfilled]: (state, action) => {
            action.payload.forEach(Application => {
                state[Application.id] = Application
            })
        },
        [actions.requestCreateApplication.fulfilled]: (state, action) => {
            state[action.payload.id] = action.payload
        },
        [actions.requestUpdateApplication.fulfilled]: (state, action) => {
            state[action.payload.id] = action.payload
        },
        [actions.requestArchiveApplication.fulfilled]: (state, action) => {
            state[action.payload.id] = action.payload
        }
    }
})

export default applicationSlice.reducer