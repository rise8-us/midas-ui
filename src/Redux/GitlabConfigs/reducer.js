import { createSlice } from '@reduxjs/toolkit'
import { setStateFromArray } from '../../Utilities/reduxHelpers'
import * as actions from './actions'

const gitlabConfigSlice = createSlice({
    name: 'gitlabConfigs',
    initialState: { },
    reducers: { },
    extraReducers: {
        [actions.requestFetchAllGitlabConfigs.fulfilled]: (state, action) => setStateFromArray(state, action.payload),
        [actions.requestCreateGitlabConfig.fulfilled]: (state, action) => {
            state[action.payload.id] = action.payload
        },
        [actions.requestUpdateGitlabConfig.fulfilled]: (state, action) => {
            state[action.payload.id] = action.payload
        }
    }
})

export default gitlabConfigSlice.reducer