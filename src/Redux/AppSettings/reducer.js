import { createSlice } from '@reduxjs/toolkit'
import { requestFetchInit } from '../Init/actions'

const appSettingsSlice = createSlice({
    name: 'app',
    initialState: {
        navBarOpen: true,
        assertionCommentsOpen: null,
        roles: {},
        classification: {},
        projectJourneyMap: {},
        assertionStatus: {},
    },
    reducers: {
        toggleNavBar: (state) => {
            state.navBarOpen = !state.navBarOpen
        },
        setAssertionComment: (state, action) => {
            state.assertionCommentsOpen = action.payload === state.assertionCommentsOpen ? null : action.payload
        }
    },
    extraReducers: {
        [requestFetchInit.fulfilled]: (state, action) => {
            state.classification = action.payload.classification
            action.payload.roles.map(role => {
                state.roles[role.name] = role
            })
            action.payload.projectJourneyMap.map(pjm => {
                state.projectJourneyMap[pjm.name] = pjm
            })
            action.payload.assertionStatus.map(status => {
                state.assertionStatus[status.name] = status
            })
        }
    }
})

export const { toggleNavBar, setAssertionComment } = appSettingsSlice.actions

export default appSettingsSlice.reducer