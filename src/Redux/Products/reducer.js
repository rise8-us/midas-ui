import { createSlice } from '@reduxjs/toolkit'
import { setStateFromArray } from 'Utilities/reduxHelpers'
import * as actions from './actions'

const productSlice = createSlice({
    name: 'products',
    initialState: {},
    reducers: { },
    extraReducers: {
        [actions.requestFetchAllProducts.fulfilled]: (state, action) => setStateFromArray(state, action.payload),
        [actions.requestCreateProduct.fulfilled]: (state, action) => {
            state[action.payload.id] = action.payload
        },
        [actions.requestUpdateProduct.fulfilled]: (state, action) => {
            state[action.payload.id] = action.payload
        },
        [actions.requestArchiveProduct.fulfilled]: (state, action) => {
            state[action.payload.id] = action.payload
        },
        [actions.requestSearchProduct.fulfilled]: (state, action) => setStateFromArray(state, action.payload),
    }
})

export default productSlice.reducer