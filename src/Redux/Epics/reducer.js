import { createSlice } from '@reduxjs/toolkit'
import { setStateFromArray } from 'Utilities/reduxHelpers'
import * as actions from './actions'

const epicSlice = createSlice({
    name: 'epics',
    initialState: { },
    reducers: { },
    extraReducers: {
        [actions.requestFetchEpicsByProductId.fulfilled]: (state, action) => {
            setStateFromArray(state, action.payload)
        },
        [actions.requestSyncEpicsByProductId.fulfilled]: (state, action) => {
            setStateFromArray(state, action.payload)
        },
        [actions.requestHideEpic.fulfilled]: (state, action) => {
            state[action.payload.id] = action.payload
        },
    }
})

export default epicSlice.reducer