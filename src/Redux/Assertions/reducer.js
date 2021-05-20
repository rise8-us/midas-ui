import { createSlice } from '@reduxjs/toolkit'
import * as commentActions from '../Comments/actions'
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
        [commentActions.requestCreateComment.fulfilled]: (state, action) => {
            const assertion = {
                ...state[action.payload.assertionId],
                status: action.payload.text.split('###')[1]
            }
            assertion.commentIds.push(action.payload.id)

            state[assertion.id] = assertion
        },
    }
})

export default assertionSlice.reducer