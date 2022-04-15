import { createAsyncThunk } from '@reduxjs/toolkit'
import { handleThunkRequest } from 'Utilities/requests'
import { searchHelper } from 'Utilities/searchHelper'
import Constants from './constants'

export const requestSearchEvents = createAsyncThunk(
    Constants.SEARCH_EVENTS,
    async(search, { rejectWithValue }) => {
        const request = { endpoint: `/api/gantt_events?search=${searchHelper(search)}`, method: 'GET', body: {} }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestCreateEvent = createAsyncThunk(
    Constants.CREATE_EVENT,
    async(event, { rejectWithValue }) => {
        const request = { endpoint: '/api/gantt_events', method: 'POST', body: event }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestUpdateEvent = createAsyncThunk(
    Constants.UPDATE_EVENT,
    async(event, { rejectWithValue }) => {
        const { id, ...body } = event
        const request = { endpoint: `/api/gantt_events/${id}`, method: 'PUT', body }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestDeleteEvent = createAsyncThunk(
    Constants.DELETE_EVENT,
    async(id, { rejectWithValue }) => {
        const request = { endpoint: `/api/gantt_events/${id}`, method: 'DELETE', body: {} }
        const data = await handleThunkRequest(request, rejectWithValue)
        return { ...data, id }
    }
)