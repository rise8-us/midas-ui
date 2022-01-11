import { createAsyncThunk } from '@reduxjs/toolkit'
import { handleThunkRequest } from 'Utilities/requests'
import Constants from './constants'

export const requestSearchCoverages = createAsyncThunk(
    Constants.SEARCH_COVERAGE,
    async(query, { rejectWithValue }) => {
        const request = { endpoint: `/api/coverages?search=${query}`, method: 'GET', body: {} }
        return handleThunkRequest(request, rejectWithValue)
    }
)
