import { createSlice } from '@reduxjs/toolkit'
import { setStateFromArray } from 'Utilities/reduxHelpers'
import * as actions from './actions'

const personnelSlice = createSlice({
    name: 'personnel',
    initialState: {},
    reducers: {},
    extraReducers: {
        [actions.requestFetchAllPersonnel.fulfilled]: (state, action) => setStateFromArray(state, action.payload)
    }
})

export default personnelSlice.reducer