import { createAsyncThunk } from '@reduxjs/toolkit'
import { handleThunkRequest } from '../../Utilities/requests'
import Constants from './constants'

export const requestFetchInitInfo = createAsyncThunk(
    Constants.FETCH_INFO_PUBLIC,
    async(_, { rejectWithValue }) => {
        const request = { endpoint: '/init/info', method: 'GET', body: {} }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestFetchInitUser = createAsyncThunk(
    Constants.FETCH_INIT_LOGON,
    async(_, { rejectWithValue }) => {
        const request = { endpoint: '/init/user', method: 'GET', body: {} }
        return handleThunkRequest(request, rejectWithValue)
    }
)