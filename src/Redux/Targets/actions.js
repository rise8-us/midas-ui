import { createAsyncThunk } from '@reduxjs/toolkit'
import { handleThunkRequest } from 'Utilities/requests'
import { searchHelper } from 'Utilities/searchHelper'
import Constants from './constants'

export const requestSearchTargets = createAsyncThunk(
    Constants.SEARCH_TARGETS,
    async(search, { rejectWithValue }) => {
        const request = { endpoint: `/api/gantt_targets?search=${searchHelper(search)}`, method: 'GET', body: {} }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestCreateTarget = createAsyncThunk(
    Constants.CREATE_TARGET,
    async(target, { rejectWithValue }) => {
        const request = { endpoint: '/api/gantt_targets', method: 'POST', body: target }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestUpdateTarget = createAsyncThunk(
    Constants.UPDATE_TARGET,
    async(target, { rejectWithValue }) => {
        const { id, ...body } = target
        const request = { endpoint: `/api/gantt_targets/${id}`, method: 'PUT', body }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestDeleteTarget = createAsyncThunk(
    Constants.DELETE_TARGET,
    async(id, { rejectWithValue }) => {
        const request = { endpoint: `/api/gantt_targets/${id}`, method: 'DELETE', body: {} }
        const data = await handleThunkRequest(request, rejectWithValue)
        return { ...data, id }
    }
)