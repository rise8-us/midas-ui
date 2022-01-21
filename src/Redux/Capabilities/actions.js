import { createAsyncThunk } from '@reduxjs/toolkit'
import { handleThunkRequest } from 'Utilities/requests'
import Constants from './constants'

export const requestSearchCapabilities = createAsyncThunk(
    Constants.SEARCH_CAPABILITY,
    async(search, { rejectWithValue }) => {
        const request = { endpoint: `/api/capabilities?search=${search}`, method: 'GET', body: {} }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestCreateCapability = createAsyncThunk(
    Constants.CREATE_CAPABILITY,
    async(capability, { rejectWithValue }) => {
        const request = { endpoint: '/api/capabilities', method: 'POST', body: capability }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestUpdateCapability = createAsyncThunk(
    Constants.UPDATE_CAPABILITY,
    async(capability, { rejectWithValue }) => {
        const { id, ...body } = capability
        const request = { endpoint: `/api/capabilities/${id}`, method: 'PUT', body }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestUpdateCapabilitiesBulk = createAsyncThunk(
    Constants.UPDATE_CAPABILITY_BULK,
    async(capabilities, { rejectWithValue }) => {
        const request = { endpoint: '/api/capabilities/bulk', method: 'PUT', body: capabilities }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestArchiveCapability = createAsyncThunk(
    Constants.ARCHIVE_CAPABILITY,
    async({ id, isArchived }, { rejectWithValue }) => {
        const request = { endpoint: `/api/capabilities/${id}/archive`, method: 'PUT', body: { isArchived } }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestDeleteCapability = createAsyncThunk(
    Constants.DELETE_CAPABILITY,
    async(id, { rejectWithValue }) => {
        const request = { endpoint: `/api/capabilities/${id}`, method: 'DELETE', body: {} }
        const data = await handleThunkRequest(request, rejectWithValue)
        return { ...data, id }
    }
)