import { createAsyncThunk } from '@reduxjs/toolkit'
import { handleThunkRequest } from 'Utilities/requests'
import { searchHelper } from 'Utilities/searchHelper'
import Constants from './constants'

export const requestSearchComments = createAsyncThunk(
    Constants.SEARCH_COMMENTS,
    async(search, { rejectWithValue }) => {
        const request = { endpoint: `/api/comments?search=${searchHelper(search)}`, method: 'GET', body: {} }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestCreateComment = createAsyncThunk(
    Constants.CREATE_COMMENT,
    async(comment, { rejectWithValue }) => {
        const request = { endpoint: '/api/comments', method: 'POST', body: comment }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestUpdateComment = createAsyncThunk(
    Constants.UPDATE_COMMENT,
    async(comment, { rejectWithValue }) => {
        const { id, ...body } = comment
        const request = { endpoint: `/api/comments/${id}`, method: 'PUT', body }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestDeleteComment = createAsyncThunk(
    Constants.DELETE_COMMENT,
    async(id, { rejectWithValue }) => {
        const request = { endpoint: `/api/comments/${id}`, method: 'DELETE', body: {} }
        const data = await handleThunkRequest(request, rejectWithValue)
        return { ...data, id }
    }
)