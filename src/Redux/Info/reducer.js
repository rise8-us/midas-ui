import { createSlice } from '@reduxjs/toolkit'
import * as actions from './actions'

const infoSlice = createSlice({
    name: 'info',
    initialState: {
        roles: {},
        classification: {}
    },
    reducers: { },
    extraReducers: {
        [actions.requestFetchInitInfo.fulfilled]: (state, action) => {
            state.classification = action.payload.classification
            action.payload.roles.map(role => {
                state.roles[role.name] = role
            })
        }
    }
})

export default infoSlice.reducer