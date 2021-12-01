import { createAsyncThunk } from '@reduxjs/toolkit'
import { handleThunkRequest } from 'Utilities/requests'
import Constants from './constants'

export const requestSearchMeasures = createAsyncThunk(
    Constants.SEARCH_MEASURE,
    async(query, { rejectWithValue }) => {
        const request = { endpoint: `/api/measures?search=${query}`, method: 'GET', body: {} }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestCreateMeasure = createAsyncThunk(
    Constants.CREATE_MEASURE,
    async(measure, { rejectWithValue }) => {
        const request = { endpoint: '/api/measures', method: 'POST', body: measure }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestUpdateMeasure = createAsyncThunk(
    Constants.UPDATE_MEASURE,
    async(measure, { rejectWithValue }) => {
        const { id, ...body } = measure
        const request = { endpoint: `/api/measures/${id}`, method: 'PUT', body }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestDeleteMeasure = createAsyncThunk(
    Constants.DELETE_MEASURE,
    async(id, { rejectWithValue }) => {
        const request = { endpoint: `/api/measures/${id}`, method: 'DELETE', body: {} }
        const data = await handleThunkRequest(request, rejectWithValue)
        return { ...data, id }
    }
)