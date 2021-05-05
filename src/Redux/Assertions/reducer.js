import { createSlice } from '@reduxjs/toolkit'
import * as actions from './actions'

const assertionSlice = createSlice({
    name: 'assertions',
    initialState: {},
    reducers: { },
    extraReducers: {
        [actions.requestFetchAssertions.fulfilled]: (state, action) => {
            action.payload.forEach(assertion => state[assertion.id] = assertion)
        },
        [actions.requestCreateAssertion.fulfilled]: (state, action) => {
            state[action.payload.id] = action.payload
        },
        [actions.requestUpdateAssertion.fulfilled]: (state, action) => {
            state[action.payload.id] = action.payload
        },
    }
})

export default assertionSlice.reducer