import { createSlice } from '@reduxjs/toolkit'
import { requestFetchInit } from '../Init/actions'

const appSettingsSlice = createSlice({
    name: 'app',
    initialState: {
        assertionCommentsOpen: null,
        assertionStatus: {},
        classification: {},
        navBarOpen: true,
        projectJourneyMap: {},
        roles: {},
        sonarqubeMaintainability: {},
        sonarqubeReliability: {},
        sonarqubeSecurity: {},
        tagTypes: [],
        pageScrollY: 0
    },
    reducers: {
        toggleNavBar: (state) => {
            state.navBarOpen = !state.navBarOpen
        },
        setAssertionComment: (state, action) => {
            state.assertionCommentsOpen = action.payload === state.assertionCommentsOpen ? null : action.payload
        },
        setPageScrollY: (state, action) => {
            state.pageScrollY = action.payload
        }
    },
    extraReducers: {
        [requestFetchInit.fulfilled]: (state, action) => {
            state.classification = action.payload.classification
            state.tagTypes = action.payload.tagTypes
            action.payload.roles.map(role => {
                state.roles[role.name] = role
            })
            action.payload.projectJourneyMap.map(pjm => {
                state.projectJourneyMap[pjm.name] = pjm
            })
            action.payload.assertionStatus.map(status => {
                state.assertionStatus[status.name] = status
            })
            action.payload.sonarqubeReliability.map(sonarqube => {
                state.sonarqubeReliability[sonarqube.name] = sonarqube
            })
            action.payload.sonarqubeMaintainability.map(sonarqube => {
                state.sonarqubeMaintainability[sonarqube.name] = sonarqube
            })
            action.payload.sonarqubeSecurity.map(sonarqube => {
                state.sonarqubeSecurity[sonarqube.name] = sonarqube
            })
        }
    }
})

export const { toggleNavBar, setAssertionComment, setPageScrollY } = appSettingsSlice.actions

export default appSettingsSlice.reducer