import { createAsyncThunk } from '@reduxjs/toolkit'
import { handleThunkRequest } from 'Utilities/requests'
import { searchHelper } from 'Utilities/searchHelper'
import Constants from './constants'

export const requestFetchSearchEpics = createAsyncThunk(
    Constants.FETCH_BY_SEARCH,
    async(search, { rejectWithValue }) => {
        const request = { endpoint: `/api/epics?search=${searchHelper(search)}`, method: 'GET', body: {} }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestFetchEpicsByProductId = createAsyncThunk(
    Constants.FETCH_BY_PRODUCT,
    async(id, { rejectWithValue }) => {
        const request = { endpoint: `/api/epics?search=product.id:${id}`, method: 'GET', body: {} }
        return handleThunkRequest(request, rejectWithValue)
    }
)
export const requestFetchEpicsByPortfolioId = createAsyncThunk(
    Constants.FETCH_BY_PORTFOLIO,
    async(id, { rejectWithValue }) => {
        const request = { endpoint: `/api/epics?search=portfolio.id:${id}`, method: 'GET', body: {} }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestSyncEpicsByProductId = createAsyncThunk(
    Constants.SYNC_EPICS_PRODUCT,
    async(id, { rejectWithValue }) => {
        const request = { endpoint: `/api/epics/all/product/${id}`, method: 'GET', body: {} }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestSyncEpicsByPortfolioId = createAsyncThunk(
    Constants.SYNC_EPICS_PORTFOLIO,
    async(id, { rejectWithValue }) => {
        const request = { endpoint: `/api/epics/all/portfolio/${id}`, method: 'GET', body: {} }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestHideEpic = createAsyncThunk(
    Constants.HIDE_EPIC,
    async({ id, isHidden }, { rejectWithValue }) => {
        const request = { endpoint: `/api/epics/${id}/hide`, method: 'PUT', body: { isHidden } }
        return handleThunkRequest(request, rejectWithValue)
    }
)