import { createSlice } from '@reduxjs/toolkit'
import * as actions from './actions'

const setStateFromArray = (state, response) => {
    response.forEach(portfolio => {
        state[portfolio.id] = portfolio
    })
}

const portfolioSlice = createSlice({
    name: 'portfolios',
    initialState: {},
    reducers: { },
    extraReducers: {
        [actions.requestFetchAllPortfolios.fulfilled]: (state, action) => setStateFromArray(state, action.payload),
        [actions.requestCreatePortfolio.fulfilled]: (state, action) => {
            state[action.payload.id] = action.payload
        },
        [actions.requestUpdatePortfolio.fulfilled]: (state, action) => {
            state[action.payload.id] = action.payload
        },
        [actions.requestArchivePortfolio.fulfilled]: (state, action) => {
            state[action.payload.id] = action.payload
        },
        [actions.requestSearchPortfolio.fulfilled]: (state, action) => setStateFromArray(state, action.payload),
    }
})

export default portfolioSlice.reducer