import { createSlice } from '@reduxjs/toolkit'

const pageAccessSlice = createSlice({
    name: 'pageAccess',
    initialState: {
        portfolios: { }
    },
    reducers: {
        setPortfolioPagePermission: (state, action) => {
            const { id, permissions } = action.payload

            if (id > 0) state.portfolios[id] = permissions
        },
    },
    extraReducers: {}
})

export const { setPortfolioPagePermission } = pageAccessSlice.actions

export default pageAccessSlice.reducer