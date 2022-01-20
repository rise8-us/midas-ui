import { createSlice } from '@reduxjs/toolkit'
import { setStateFromArray } from 'Utilities/reduxHelpers'
import * as actions from './actions'

const deliverableSlice = createSlice({
    name: 'deliverables',
    initialState: {},
    reducers: { },
    extraReducers: {
        [actions.requestCreateDeliverable.fulfilled]: (state, action) => {
            state[action.payload.id] = action.payload
        },
        [actions.requestUpdateDeliverable.fulfilled]: (state, action) => {
            state[action.payload.id] = action.payload
        },
        [actions.requestArchiveDeliverable.fulfilled]: (state, action) => {
            state[action.payload.id] = action.payload
        },
        [actions.requestDeleteDeliverable.fulfilled]: (state, action) => {
            delete state[action.payload.id]
        },
        [actions.requestUpdateDeliverablesBulk.fulfilled]: (state, action) => {
            setStateFromArray(state, action.payload)
        },
        [actions.requestFetchDeliverablesByProductId.fulfilled]: (state, action) => {
            setStateFromArray(state, action.payload)
        },
        [actions.requestSearchDeliverables.fulfilled]: (state, action) => {
            setStateFromArray(state, action.payload)
        },
    }
})

export default deliverableSlice.reducer