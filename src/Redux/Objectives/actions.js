import { createAsyncThunk } from '@reduxjs/toolkit'
import { handleThunkRequest } from '../../Utilities/requests'
import Constants from './constants'

export const requestFetchObjectives = createAsyncThunk(
    Constants.FETCH_OGSMS,
    async(query, { rejectWithValue }) => {
        const request = { endpoint: `/api/objectives?search=${query}}`, method: 'GET', body: {} }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestCreateObjective = createAsyncThunk(
    Constants.CREATE_OGSM,
    async(objective, { rejectWithValue }) => {
        const request = { endpoint: '/api/objectives', method: 'POST', body: objective }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestUpdateObjective = createAsyncThunk(
    Constants.UPDATE_OGSM,
    async(objective, { rejectWithValue }) => {
        const { id, ...body } = objective
        const request = { endpoint: `/api/objectives/${id}`, method: 'PUT', body }
        return handleThunkRequest(request, rejectWithValue)
    }
)
