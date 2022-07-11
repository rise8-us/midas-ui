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
    async(projectId, { rejectWithValue }) => {
        const request = { endpoint: `/api/issues/sync/project/${projectId}`, method: 'GET', body: {} }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestSearchIssuesByPortfolioIdAndDateRange = createAsyncThunk(
    Constants.SEARCH_ISSUES,
    async([portfolioId, startDate, endDate], { rejectWithValue }) => {
        const request = { endpoint: `/api/issues/portfolio/${portfolioId}/${startDate}/${endDate}`,
            method: 'GET', body: {} }
        return handleThunkRequest(request, rejectWithValue)
    }
)