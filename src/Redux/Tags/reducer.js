import { createSlice } from '@reduxjs/toolkit'
import * as actions from './actions'

const tagsSlice = createSlice({
    name: 'tags',
    initialState: {},
    reducers: {},
    extraReducers: {
        [actions.requestFetchAllTags.fulfilled]: (state, action) => {
            action.payload.forEach(tag => {
                state[tag.id] = tag
            })
        },
        [actions.requestCreateTag.fulfilled]: (state, action) => {
            state[action.payload.id] = action.payload
        },
        [actions.requestUpdateTag.fulfilled]: (state, action) => {
            state[action.payload.id] = action.payload
        },
        [actions.requestDeleteTag.fulfilled]: (state, action) => {
            state = delete state[action.payload.id]
        }
    }
})

export default tagsSlice.reducer