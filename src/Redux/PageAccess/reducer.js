import { createSlice } from '@reduxjs/toolkit'

const pageAccessSlice = createSlice({
    name: 'pageAccess',
    initialState: {
        capabilities: {
            edit: false
        },
        portfolios: { }
    },
    reducers: {
        setCapabilityPagePermission: (state, action) => {
            const { permission, value } = action.payload

            state.capabilities[permission] = value
        },
        setPortfolioPagePermission: (state, action) => {
            const { id, permissions } = action.payload

            if (id > 0) state.portfolios[id] = permissions
        },
    },
    extraReducers: {}
})

export const { setCapabilityPagePermission, setPortfolioPagePermission } = pageAccessSlice.actions

export default pageAccessSlice.reducer