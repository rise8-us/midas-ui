import { createSlice } from '@reduxjs/toolkit'
import * as actions from './actions'

const productSlice = createSlice({
    name: 'products',
    initialState: {},
    reducers: { },
    extraReducers: {
        [actions.requestFetchAllProducts.fulfilled]: (state, action) => {
            action.payload.forEach(product => {
                state[product.id] = product
            })
        },
        [actions.requestCreateProduct.fulfilled]: (state, action) => {
            state[action.payload.id] = action.payload
        },
        [actions.requestUpdateProduct.fulfilled]: (state, action) => {
            state[action.payload.id] = action.payload
        },
        [actions.requestArchiveProduct.fulfilled]: (state, action) => {
            state[action.payload.id] = action.payload
        },
        [actions.requestSearchProduct.fulfilled]: (state, action) => {
            action.payload.forEach(product => {
                state[product.id] = product
            })
        },
    }
})

export default productSlice.reducer