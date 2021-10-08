import { createAsyncThunk } from '@reduxjs/toolkit'
import { handleThunkRequest } from 'Utilities/requests'
import Constants from './constants'

export const requestSearchPerformanceMeasures = createAsyncThunk(
    Constants.SEARCH_PERFORMANCE_MEASURES,
    async(search, { rejectWithValue }) => {
        const request = { endpoint: `/api/performancemeasures?search=${search}`, method: 'GET', body: {} }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestCreatePerformanceMeasure = createAsyncThunk(
    Constants.CREATE_PERFORMANCE_MEASURE,
    async(performanceMeasure, { rejectWithValue }) => {
        const request = { endpoint: '/api/performancemeasures', method: 'POST', body: performanceMeasure }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestUpdatePerformanceMeasure = createAsyncThunk(
    Constants.UPDATE_PERFORMANCE_MEASURE,
    async(performanceMeasure, { rejectWithValue }) => {
        const { id, ...body } = performanceMeasure
        const request = { endpoint: `/api/performancemeasures/${id}`, method: 'PUT', body }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestUpdatePerformanceMeasuresBulk = createAsyncThunk(
    Constants.UPDATE_PERFORMANCE_MEASURE_BULK,
    async(performanceMeasures, { rejectWithValue }) => {
        const request = { endpoint: '/api/performancemeasures/bulk', method: 'PUT', body: performanceMeasures }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestDeletePerformanceMeasure = createAsyncThunk(
    Constants.DELETE_PERFORMANCE_MEASURE,
    async(id, { rejectWithValue }) => {
        const request = { endpoint: `/api/performancemeasures/${id}`, method: 'DELETE', body: {} }
        const data = await handleThunkRequest(request, rejectWithValue)
        return { ...data, id }
    }
)