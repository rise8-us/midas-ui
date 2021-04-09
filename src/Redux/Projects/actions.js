import { createAsyncThunk } from '@reduxjs/toolkit'
import { handleThunkRequest } from '../../Utilities/requests'
import Constants from './constants'

export const requestFetchAllProjects = createAsyncThunk(
    Constants.FETCH_ALL_PROJECTS,
    async(_, { rejectWithValue }) => {
        const request = { endpoint: '/api/projects', method: 'GET', body: {} }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestCreateProject = createAsyncThunk(
    Constants.CREATE_PROJECT,
    async(project, { rejectWithValue }) => {
        const request = { endpoint: '/api/projects', method: 'POST', body: project }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestUpdateProject = createAsyncThunk(
    Constants.UPDATE_PROJECT,
    async(project, { rejectWithValue }) => {
        const { id, ...body } = project
        const request = { endpoint: `/api/projects/${id}`, method: 'PUT', body }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestUpdateJourneyMapById = createAsyncThunk(
    Constants.UPDATE_JOURNEYMAP,
    async({ id, projectJourneyMap }, { rejectWithValue }) => {
        const request = { endpoint: `/api/projects/${id}/journeymap`, method: 'PUT', body: { projectJourneyMap } }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestArchiveProject = createAsyncThunk(
    Constants.ARCHIVE_PROJECT,
    async({ id, isArchived }, { rejectWithValue }) => {
        const request = { endpoint: `/api/projects/${id}/admin/archive`, method: 'PUT', body: { isArchived } }
        return handleThunkRequest(request, rejectWithValue)
    }
)