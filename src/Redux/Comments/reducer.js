import { createSlice } from '@reduxjs/toolkit'
import * as actions from './actions'

const commentsSlice = createSlice({
    name: 'comments',
    initialState: {},
    reducers: { },
    extraReducers: {
        [actions.requestCreateComment.fulfilled]: (state, action) => {
            state[action.payload.id] = action.payload
        },
        [actions.requestUpdateComment.fulfilled]: (state, action) => {
            state[action.payload.id] = action.payload
        },
        [actions.requestDeleteComment.fulfilled]: (state, action) => {
            delete state[action.payload.id]
        },
        [actions.requestSearchComments.fulfilled]: (state, action) => {
            action.payload.forEach(comment => {
                state[comment.id] = comment
            })
        }
    }
})

export const { requestDeleteComment, requestUpdateComment } = actions

export default commentsSlice.reducer