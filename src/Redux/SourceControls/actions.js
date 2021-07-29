import { createAsyncThunk } from '@reduxjs/toolkit'
import { handleThunkRequest } from '../../Utilities/requests'
import Constants from './constants'

export const requestFetchAllSourceControls = createAsyncThunk(
    Constants.FETCH_ALL_CONFIGS,
    async(_, { rejectWithValue }) => {
        const request = { endpoint: '/api/sourceControls', method: 'GET', body: {} }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestCreateSourceControl = createAsyncThunk(
    Constants.CREATE_CONFIG,
    async(config, { rejectWithValue }) => {
        const request = { endpoint: '/api/sourceControls', method: 'POST', body: config }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestUpdateSourceControl = createAsyncThunk(
    Constants.UPDATE_CONFIG,
    async(config, { rejectWithValue }) => {
        const { id, ...body } = config
        const request = { endpoint: `/api/sourceControls/${id}`, method: 'PUT', body }
        return handleThunkRequest(request, rejectWithValue)
    }
)

