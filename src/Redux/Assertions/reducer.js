import { createSlice } from '@reduxjs/toolkit'
import { setAssertionComment } from 'Redux/AppSettings/reducer'
import { addChildren } from 'Utilities/reduxHelpers'
import * as actions from './actions'

const assertionSlice = createSlice({
    name: 'assertions',
    initialState: {},
    reducers: { },
    extraReducers: {
        [actions.requestSearchAssertions.fulfilled]: (state, action) => {
            action.payload.forEach(assertion => addChildren(state, assertion))
        },
        [actions.requestCreateAssertion.fulfilled]: (state, action) => addChildren(state, action.payload),
        [actions.requestUpdateAssertion.fulfilled]: (state, action) => addChildren(state, action.payload),
        [actions.requestDeleteAssertion.fulfilled]: (state, action) => {
            setAssertionComment({ assertionId: null, deletedAssertionId: action.payload.id })
            delete state[action.payload.id]
        },
        [actions.requestFetchAllBlockedAssertions.fulfilled]: (state, action) => {
            action.payload.forEach(assertion => addChildren(state, assertion))
        }
    }
})

export default assertionSlice.reducer