import { createSlice } from '@reduxjs/toolkit'
import { setStateFromArray } from '../../Utilities/reduxHelpers'
import * as actions from './actions'

const sourceControlSlice = createSlice({
    name: 'sourceControls',
    initialState: { },
    reducers: { },
    extraReducers: {
        [actions.requestFetchAllSourceControls.fulfilled]: (state, action) => setStateFromArray(state, action.payload),
        [actions.requestCreateSourceControl.fulfilled]: (state, action) => {
            state[action.payload.id] = action.payload
        },
        [actions.requestUpdateSourceControl.fulfilled]: (state, action) => {
            state[action.payload.id] = action.payload
        }
    }
})

export default sourceControlSlice.reducer