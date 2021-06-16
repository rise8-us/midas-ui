import { createSlice } from '@reduxjs/toolkit'
import * as actions from './actions'

const setStateFromArray = (state, response) => {
    response.forEach(product => {
        state[product.id] = product
    })
}

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