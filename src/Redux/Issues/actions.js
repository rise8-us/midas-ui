import { createAsyncThunk } from '@reduxjs/toolkit'
import { handleThunkRequest } from 'Utilities/requests'
import { searchHelper } from 'Utilities/searchHelper'
import Constants from './constants'

export const requestSearchIssues = createAsyncThunk(
    Constants.SEARCH_ISSUES,
    async(search, { rejectWithValue }) => {
        const request = { endpoint: `/api/issues?search=${searchHelper(search)}`, method: 'GET', body: {} }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestSyncIssuesByProjectId = createAsyncThunk(
    Constants.SYNC_ISSUES_PROJECT,
    async(id, { rejectWithValue }) => {
        const request = { endpoint: `/api/issues/all/${id}`, method: 'GET', body: {} }
        return handleThunkRequest(request, rejectWithValue)
    }
)
