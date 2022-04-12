import { createSlice } from '@reduxjs/toolkit'
import { requestFetchInit } from 'Redux/Init/actions'

const appSettingsSlice = createSlice({
    name: 'app',
    initialState: {
        assertionCommentId: null,
        assertionCommentType: null,
        assertionStatus: {},
        classification: {},
        projectJourneyMap: {},
        roadmapStatus: {},
        roadmapTypes: {},
        completionType: {},
        feedbackRating: {},
        roles: {},
        sonarqubeMaintainability: {},
        sonarqubeReliability: {},
        sonarqubeSecurity: {},
        tagTypes: [],
        pageScrollY: 0,
        initialized: false,
        portfolioPage: { }
    },
    reducers: {
        setAssertionComment: (state, action) => {
            const currentId = state.assertionCommentId
            const { assertionId, deletedAssertionId, type } = action.payload
            const newId = deletedAssertionId ?? assertionId

            state.assertionCommentId = currentId === newId ? null : assertionId
            state.assertionCommentType = type
        },
        setPageScrollY: (state, action) => {
            state.pageScrollY = action.payload
        },
        setInitialized: (state, action) => {
            state.initialized = action.payload
        },
        setPortfolioPageSettings: (state, action) => {
            const { id, selectedDeliverableId, ...settings } = action.payload

            const currentSettings = state.portfolioPage[id] ?? {}

            if (id > 0) {
                state.portfolioPage[id] = {
                    ...state.portfolioPage[id],
                    selectedDeliverableId: currentSettings.selectedDeliverableId !== selectedDeliverableId
                        ? selectedDeliverableId : null,
                    ...settings
                }
            }
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
            action.payload.roadmapStatus.map(status => {
                state.roadmapStatus[status.name] = status
            })
            action.payload.roadmapType.map(type => {
                state.roadmapTypes[type.name] = type
            })
            action.payload.completionType.map(type => {
                state.completionType[type.name] = type
            })
            action.payload.feedbackRating.map(rating => {
                state.feedbackRating[rating.name] = rating
            })
        }
    }
})

export const {
    toggleNavBar, setAssertionComment, setPageScrollY, setInitialized, setPortfolioPageSettings
} = appSettingsSlice.actions

export default appSettingsSlice.reducer