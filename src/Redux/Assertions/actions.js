import { createAsyncThunk } from '@reduxjs/toolkit'
import { handleThunkRequest } from '../../Utilities/requests'
import Constants from './constants'

export const requestSearchAssertions = createAsyncThunk(
    Constants.SEARCH_ASSERTIONS,
    async(query, { rejectWithValue }) => {
        const request = { endpoint: `/api/assertions?search=${query}`, method: 'GET', body: {} }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestCreateAssertion = createAsyncThunk(
    Constants.CREATE_ASSERTION,
    async(assertion, { rejectWithValue }) => {
        const request = { endpoint: '/api/assertions', method: 'POST', body: assertion }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestUpdateAssertion = createAsyncThunk(
    Constants.UPDATE_ASSERTION,
    async(assertion, { rejectWithValue }) => {
        const { id, ...body } = assertion
        const request = { endpoint: `/api/assertions/${id}`, method: 'PUT', body }
        return handleThunkRequest(request, rejectWithValue)
    }
)
