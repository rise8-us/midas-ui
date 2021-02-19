import { createSlice } from '@reduxjs/toolkit'

const appSettingsSlice = createSlice({
    name: 'app',
    initialState: {
        navBarOpen: false
    },
    reducers: {
        toggleNavBarOpen: (state) => {
            state.navBarOpen = !state.navBarOpen
        }
    },
    extraReducers: {
    }
})

export const { toggleNavBarOpen } = appSettingsSlice.actions

export default appSettingsSlice.reducer