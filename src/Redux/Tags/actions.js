import { createAsyncThunk } from '@reduxjs/toolkit'
import { handleThunkRequest } from 'Utilities/requests'
import Constants from './constants'

export const requestFetchAllTags = createAsyncThunk(
    Constants.GET_ALL_TAGS,
    async(id, { rejectWithValue }) => {
        const request = { endpoint: '/api/tags', method: 'GET', body: { } }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestCreateTag = createAsyncThunk(
    Constants.CREATE_TAG,
    async(tag, { rejectWithValue }) => {
        const request = { endpoint: '/api/tags', method: 'POST', body: tag }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestDeleteTag = createAsyncThunk(
    Constants.DELETE_TAG,
    async(id, { rejectWithValue }) => {
        const request = { endpoint: `/api/tags/${id}`, method: 'DELETE', body: {} }
        const data = await handleThunkRequest(request, rejectWithValue)
        return { ...data, id }
    }
)

export const requestUpdateTag = createAsyncThunk(
    Constants.UPDATE_TAG,
    async(tag, { rejectWithValue }) => {
        const { id, ...body } = tag
        const request = { endpoint: `/api/tags/${id}`, method: 'PUT', body }
        return handleThunkRequest(request, rejectWithValue)
    }
)
