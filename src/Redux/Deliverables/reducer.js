import { createSlice } from '@reduxjs/toolkit'
import { addChildren } from 'Utilities/reduxHelpers'
import * as actions from './actions'

const deliverableSlice = createSlice({
    name: 'deliverables',
    initialState: { },
    reducers: { },
    extraReducers: {
        [actions.requestCreateDeliverable.fulfilled]: (state, action) => { addChildren(state, action.payload) },
        [actions.requestUpdateDeliverable.fulfilled]: (state, action) => { addChildren(state, action.payload) },
        [actions.requestArchiveDeliverable.fulfilled]: (state, action) => { addChildren(state, action.payload) },
        [actions.requestDeleteDeliverable.fulfilled]: (state, action) => { delete state[action.payload.id] },
        [actions.requestUpdateDeliverablesBulk.fulfilled]: (state, action) => {
            action.payload.forEach(deliverable => addChildren(state, deliverable))
        },
        [actions.requestFetchDeliverablesByProductId.fulfilled]: (state, action) => {
            action.payload.forEach(deliverable => addChildren(state, deliverable))
        },
        [actions.requestSearchDeliverables.fulfilled]: (state, action) => {
            action.payload.forEach(deliverable => addChildren(state, deliverable))
        },
    }
})

export default deliverableSlice.reducer