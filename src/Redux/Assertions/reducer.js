import { createSlice } from '@reduxjs/toolkit'
import * as actions from './actions'

const addChildren = (state, assertion) => {
    state[assertion.id] = {
        ...assertion,
        children: Object.values(assertion.children).map(child => child.id)
    }
    assertion.children.forEach(child => addChildren(state, child))
}

const assertionSlice = createSlice({
    name: 'assertions',
    initialState: {},
    reducers: { },
    extraReducers: {
        [actions.requestSearchAssertions.fulfilled]: (state, action) => {
            action.payload.forEach(assertion =>
                state[assertion.id] = {
                    ...assertion,
                    children: Object.values(assertion.children).map(child => child.id)
                }
            )
        },
        [actions.requestCreateAssertion.fulfilled]: (state, action) => addChildren(state, action.payload),
        [actions.requestUpdateAssertion.fulfilled]: (state, action) => addChildren(state, action.payload),
        [actions.requestDeleteAssertion.fulfilled]: (state, action) => { delete state[action.payload.id] }
    }
})

export default assertionSlice.reducer