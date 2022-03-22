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

export const requestGetPageMetrics = createAsyncThunk(
    Constants.GET_PAGE_METRICS,
    async(_, { rejectWithValue }) => {

        const request = { endpoint: '/api/metrics_page_view', method: 'GET', body: { } }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestSearchPageMetrics = createAsyncThunk(
    Constants.SEARCH_PAGE_METRICS,
    async(search, { rejectWithValue }) => {

        const request = { endpoint: '/api/metrics_page_view?search=' + search, method: 'GET', body: { } }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestPostPageMetrics = createAsyncThunk(
    Constants.POST_PAGE_METRICS,
    async(pathname, { rejectWithValue }) => {

        const request = { endpoint: '/api/metrics_page_view', method: 'POST', body: { pathname } }
        return handleThunkRequest(request, rejectWithValue)
    }
)