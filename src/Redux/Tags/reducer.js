import { createSlice } from '@reduxjs/toolkit'
import { setStateFromArray } from '../../Utilities/reduxHelpers'
import * as actions from './actions'

const tagsSlice = createSlice({
    name: 'tags',
    initialState: {},
    reducers: {},
    extraReducers: {
        [actions.requestFetchAllTags.fulfilled]: (state, action) => setStateFromArray(state, action.payload),
        [actions.requestCreateTag.fulfilled]: (state, action) => {
            state[action.payload.id] = action.payload
        },
        [actions.requestUpdateTag.fulfilled]: (state, action) => {
            state[action.payload.id] = action.payload
        },
        [actions.requestDeleteTag.fulfilled]: (state, action) => {
            delete state[action.payload.id]
        }
    }
})

export default tagsSlice.reducer