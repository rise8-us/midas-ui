import { createSlice } from '@reduxjs/toolkit'
import { setStateFromArray } from 'Utilities/reduxHelpers'
import * as actions from './actions'

const personaSlice = createSlice({
    name: 'personas',
    initialState: { },
    reducers: { },
    extraReducers: {
        [actions.requestFetchPersonasByProductId.fulfilled]: (state, action) => {
            setStateFromArray(state, action.payload)
        },
        [actions.requestCreatePersona.fulfilled]: (state, action) => {
            state[action.payload.id] = action.payload
        },
        [actions.requestUpdatePersona.fulfilled]: (state, action) => {
            state[action.payload.id] = action.payload
        },
        [actions.requestDeletePersona.fulfilled]: (state, action) => {
            delete state[action.payload.id]
        }
    }
})

export default personaSlice.reducer