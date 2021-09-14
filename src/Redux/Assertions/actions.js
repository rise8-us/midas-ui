import { createAsyncThunk } from '@reduxjs/toolkit'
import { handleThunkRequest } from 'Utilities/requests'
import Constants from './constants'

export const requestSearchAssertions = createAsyncThunk(
    Constants.SEARCH_ASSERTION,
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

export const requestDeleteAssertion = createAsyncThunk(
    Constants.DELETE_ASSERTION,
    async(id, { rejectWithValue }) => {
        const request = { endpoint: `/api/assertions/${id}`, method: 'DELETE', body: {} }
        const data = await handleThunkRequest(request, rejectWithValue)
        return { ...data, id }
    }
)

export const requestFetchAllBlockedAssertions = createAsyncThunk(
    Constants.FETCH_BLOCKED_ASSERTIONS,
    async(_, { rejectWithValue }) => {
        const request = {
            endpoint: '/api/assertions?search=status:BLOCKED OR status:AT_RISK',
            method: 'GET',
            body: {}
        }
        return handleThunkRequest(request, rejectWithValue)
    }
)