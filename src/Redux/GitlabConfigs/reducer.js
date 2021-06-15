import { createSlice } from '@reduxjs/toolkit'
import * as actions from './actions'

const gitlabConfigSlice = createSlice({
    name: 'gitlabConfigs',
    initialState: { },
    reducers: { },
    extraReducers: {
        [actions.requestFetchAllGitlabConfigs.fulfilled]: (state, action) => {
            action.payload.forEach(config => {
                state[config.id] = config
            })
        },
        [actions.requestCreateGitlabConfig.fulfilled]: (state, action) => {
            state[action.payload.id] = action.payload
        },
        [actions.requestUpdateGitlabConfig.fulfilled]: (state, action) => {
            state[action.payload.id] = action.payload
        }
    }
})

export default gitlabConfigSlice.reducer