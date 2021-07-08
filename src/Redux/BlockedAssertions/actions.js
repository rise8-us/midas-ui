import { createAsyncThunk } from '@reduxjs/toolkit'
import { handleThunkRequest } from '../../Utilities/requests'
import Constants from './constants'

export const requestFetchAllBlockedAssertions = createAsyncThunk(
    Constants.FETCH_BLOCKED_ASSERTIONS,
    async(_, { rejectWithValue }) => {
        const request = { endpoint: '/api/assertions/blockers', method: 'GET', body: {} }
        return handleThunkRequest(request, rejectWithValue)
    }
)
