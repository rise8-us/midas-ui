import { createAsyncThunk } from '@reduxjs/toolkit'
import { handleThunkRequest } from 'Utilities/requests'
import Constants from './constants'

export const requestFetchInit = createAsyncThunk(
    Constants.FETCH_INIT,
    async(_, { rejectWithValue }) => {
        const request = { endpoint: '/init', method: 'GET', body: {} }
        return handleThunkRequest(request, rejectWithValue)
    }
)