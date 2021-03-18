import { createSlice } from '@reduxjs/toolkit'
import { requestFetchInit } from '../Init/actions'

const appSettingsSlice = createSlice({
    name: 'app',
    initialState: {
        navBarOpen: false,
        roles: {},
        classification: {}
    },
    reducers: {
        toggleNavBarOpen: (state) => {
            state.navBarOpen = !state.navBarOpen
        }
    },
    extraReducers: {
        [requestFetchInit.fulfilled]: (state, action) => {
            state.classification = action.payload.classification
            action.payload.roles.map(role => {
                state.roles[role.name] = role
            })
        }
    }
})

export const { toggleNavBarOpen } = appSettingsSlice.actions

export default appSettingsSlice.reducer