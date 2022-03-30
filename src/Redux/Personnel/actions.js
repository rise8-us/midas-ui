import { createAsyncThunk } from '@reduxjs/toolkit'
import { handleThunkRequest } from 'Utilities/requests'
import Constants from './constants'

export const requestFetchAllPersonnel = createAsyncThunk(
    Constants.FETCH_ALL_PERSONNEL,
    async(_, { rejectWithValue }) => {
        const request = { endpoint: '/api/personnel', method: 'GET', body: {} }
        return handleThunkRequest(request, rejectWithValue)
    }
)