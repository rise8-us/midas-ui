import { createSlice } from '@reduxjs/toolkit'
import { setStateFromArray } from 'Utilities/reduxHelpers'
import * as actions from './actions'

const featureSlice = createSlice({
    name: 'features',
    initialState: { },
    reducers: { },
    extraReducers: {
        [actions.requestFetchFeaturesByProductId.fulfilled]: (state, action) => {
            setStateFromArray(state, action.payload)
        },
        [actions.requestUpdateFeaturesBulk.fulfilled]: (state, action) => {
            setStateFromArray(state, action.payload)
        },
        [actions.requestCreateFeature.fulfilled]: (state, action) => {
            state[action.payload.id] = action.payload
        },
        [actions.requestUpdateFeature.fulfilled]: (state, action) => {
            state[action.payload.id] = action.payload
        },
        [actions.requestDeleteFeature.fulfilled]: (state, action) => {
            delete state[action.payload.id]
        }
    }
})

export default featureSlice.reducer