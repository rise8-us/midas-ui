import { createSlice } from '@reduxjs/toolkit'

const ModifiedAssertionsSlice = createSlice({
    name: 'modifiedAssertions',
    initialState: {},
    reducers: {
        modifyAssertion: (state, action) => {
            state[action.payload.linkKey] = action.payload
        },
        deleteAssertion: (state, action) => {
            delete state[action.payload]
        }
    },
    extraReducers: {}
})

export const { modifyAssertion, deleteAssertion } = ModifiedAssertionsSlice.actions

export default ModifiedAssertionsSlice.reducer