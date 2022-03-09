import { createAsyncThunk } from '@reduxjs/toolkit'
import { handleThunkRequest } from 'Utilities/requests'
import Constants from './constants'

export const requestGetUniqueLogonMetrics = createAsyncThunk(
    Constants.UNIQUE_LOGON_METRICS,
    async(search, { rejectWithValue }) => {

        const request = { endpoint: '/api/appUserMetrics?search=' + search, method: 'GET', body: {} }
        return handleThunkRequest(request, rejectWithValue)
    }
)
