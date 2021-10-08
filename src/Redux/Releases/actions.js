import { createAsyncThunk } from '@reduxjs/toolkit'
import { handleThunkRequest } from 'Utilities/requests'
import Constants from './constants'

export const requestSearchReleases = createAsyncThunk(
    Constants.SEARCH_PRODUCTS,
    async(search, { rejectWithValue }) => {
        const request = { endpoint: `/api/releases?search=${search}`, method: 'GET', body: {} }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestCreateRelease = createAsyncThunk(
    Constants.CREATE_RELEASE,
    async(release, { rejectWithValue }) => {
        const request = { endpoint: '/api/releases', method: 'POST', body: release }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestUpdateRelease = createAsyncThunk(
    Constants.UPDATE_RELEASE,
    async(release, { rejectWithValue }) => {
        const { id, ...body } = release
        const request = { endpoint: `/api/releases/${id}`, method: 'PUT', body }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestDeleteRelease = createAsyncThunk(
    Constants.DELETE_RELEASE,
    async(id, { rejectWithValue }) => {
        const request = { endpoint: `/api/releases/${id}`, method: 'DELETE', body: {} }
        const data = await handleThunkRequest(request, rejectWithValue)
        return { ...data, id }
    }
)