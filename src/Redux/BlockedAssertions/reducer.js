import { createSlice } from '@reduxjs/toolkit'
import * as actions from './actions'

const blockedAssertionsSlice = createSlice({
    name: 'blockedAssertions',
    initialState: [],
    reducers: { },
    extraReducers: {
        [actions.requestFetchAllBlockedAssertions.fulfilled]: (_state, action) => action.payload ?? []
    }
})

export default blockedAssertionsSlice.reducer