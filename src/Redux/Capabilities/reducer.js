import { createSlice } from '@reduxjs/toolkit'
import { setStateFromArray } from 'Utilities/reduxHelpers'
import * as actions from './actions'

const capabilitySlice = createSlice({
    name: 'capabilities',
    initialState: { },
    reducers: {
        setCapability: (state, action) => {
            state[action.payload.id] = action.payload
        }
    },
    extraReducers: {
        [actions.requestCreateCapability.fulfilled]: (state, action) => {
            state[action.payload.id] = action.payload
        },
        [actions.requestUpdateCapability.fulfilled]: (state, action) => {
            state[action.payload.id] = action.payload
        },
        [actions.requestArchiveCapability.fulfilled]: (state, action) => {
            state[action.payload.id] = action.payload
        },
        [actions.requestDeleteCapability.fulfilled]: (state, action) => {
            delete state[action.payload.id]
        },
        [actions.requestUpdateCapabilitiesBulk.fulfilled]: (state, action) => {
            setStateFromArray(state, action.payload)
        },
        [actions.requestSearchCapabilities.fulfilled]: (state, action) => {
            setStateFromArray(state, action.payload)
        },
    }
})

export const { setCapability } = capabilitySlice.actions

export default capabilitySlice.reducer