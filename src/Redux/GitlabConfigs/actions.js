import { createAsyncThunk } from '@reduxjs/toolkit'
import { handleThunkRequest } from '../../Utilities/requests'
import Constants from './constants'

export const requestFetchAllGitlabConfigs = createAsyncThunk(
    Constants.FETCH_ALL_CONFIGS,
    async(_, { rejectWithValue }) => {
        const request = { endpoint: '/api/gitlabConfigs', method: 'GET', body: {} }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestCreateGitlabConfig = createAsyncThunk(
    Constants.CREATE_CONFIG,
    async(config, { rejectWithValue }) => {
        const request = { endpoint: '/api/gitlabConfigs', method: 'POST', body: config }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestUpdateGitlabConfig = createAsyncThunk(
    Constants.UPDATE_CONFIG,
    async(config, { rejectWithValue }) => {
        const { id, ...body } = config
        const request = { endpoint: `/api/gitlabConfigs/${id}`, method: 'PUT', body }
        return handleThunkRequest(request, rejectWithValue)
    }
)

