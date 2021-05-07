import { createSlice } from '@reduxjs/toolkit'
import * as actions from './actions'

const objectiveSlice = createSlice({
    name: 'objectives',
    initialState: {
        creation: {
            text: '',
            productId: null,
            assertionDTOs: {}
        }
    },
    reducers: {
        addNewAssertion: (state, action) => {
            state.creation.assertionDTOs[action.payload.identifier] = action.payload
        },
        updateNewAssertion: (state, action) => {
            state.creation.assertionDTOs[action.payload.identifier] = action.payload
        },
        deleteNewAssertion: (state, action) => {
            delete state.creation.assertionDTOs[action.payload.identifier]
        },
        addNewObjective: (state, action) => { // don't think we need this
            state.creation =  action.payload
        },
        updateNewObjective: (state, action) => {
            state.creation = {
                ...state.creation,
                ...action.payload
            }
        },
        deleteNewObjective: (state) => {
            state.creation = { assertionDTOs: {}, text: '', productId: null }
        }
    },
    extraReducers: {
        [actions.requestFetchObjectives.fulfilled]: (state, action) => {
            action.payload.forEach(objective => state[objective.id] = objective)
        },
        [actions.requestCreateObjective.fulfilled]: (state, action) => {
            state[action.payload.id] = action.payload
        },
        [actions.requestUpdateObjective.fulfilled]: (state, action) => {
            state[action.payload.id] = action.payload
        },
    }
})

export const { addNewAssertion, updateNewAssertion, updateNewObjective, deleteNewObjective } = objectiveSlice.actions

export default objectiveSlice.reducer