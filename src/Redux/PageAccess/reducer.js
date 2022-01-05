import { createSlice } from '@reduxjs/toolkit'

const pageAccessSlice = createSlice({
    name: 'pageAccess',
    initialState: {
        'capabilities': {
            edit: false
        }
    },
    reducers: {
        setCapabilityPagePermission: (state, action) => {
            const { permission, value } = action.payload

            state.capabilities[permission] = value
        },
    },
    extraReducers: {}
})

export const { setCapabilityPagePermission } = pageAccessSlice.actions

export default pageAccessSlice.reducer