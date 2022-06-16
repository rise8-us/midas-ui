import { createAsyncThunk } from '@reduxjs/toolkit'
import { handleThunkRequest } from 'Utilities/requests'
import { searchHelper } from 'Utilities/searchHelper'
import Constants from './constants'

export const requestSearchReleases = createAsyncThunk(
    Constants.SEARCH_RELEASES,
    async(search, { rejectWithValue }) => {
        const request = { endpoint: `/api/releases?search=${searchHelper(search)}`, method: 'GET', body: {} }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const fetchReleasesByProjectId = createAsyncThunk(
    Constants.FETCH_RELEASES_BY_PROJECT,
    async(projectId, { rejectWithValue }) => {
        const request = { endpoint: `/api/releases/project/${projectId}`, method: 'GET', body: {} }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const fetchReleasesByProductId = createAsyncThunk(
    Constants.FETCH_RELEASES_BY_PRODUCT,
    async(productId, { rejectWithValue }) => {
        const request = { endpoint: `/api/releases/product/${productId}`, method: 'GET', body: {} }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestSyncReleasesByProjectId = createAsyncThunk(
    Constants.SYNC_RELEASES_PROJECT,
    async(projectId, { rejectWithValue }) => {
        const request = { endpoint: `/api/releases/sync/project/${projectId}`, method: 'GET', body: {} }
        return handleThunkRequest(request, rejectWithValue)
    }
)