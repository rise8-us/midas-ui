import { createAsyncThunk } from '@reduxjs/toolkit'
import { handleThunkRequest } from '../../Utilities/requests'
import Constants from './constants'

export const requestFetchAllApplications = createAsyncThunk(
    Constants.FETCH_ALL_APPLICATIONS,
    async(_, { rejectWithValue }) => {
        const request = { endpoint: '/api/applications', method: 'GET', body: {} }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestCreateApplication = createAsyncThunk(
    Constants.CREATE_APPLICATION,
    async(project, { rejectWithValue }) => {
        const request = { endpoint: '/api/applications', method: 'POST', body: project }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestUpdateApplication = createAsyncThunk(
    Constants.UPDATE_APPLICATION,
    async(project, { rejectWithValue }) => {
        const { id, ...body } = project
        const request = { endpoint: `/api/applications/${id}`, method: 'PUT', body }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestArchiveApplication = createAsyncThunk(
    Constants.ARCHIVE_APPLICATION,
    async({ id, isArchived }, { rejectWithValue }) => {
        const request = { endpoint: `/api/applications/${id}/archive`, method: 'PUT', body: { isArchived } }
        return handleThunkRequest(request, rejectWithValue)
    }
)