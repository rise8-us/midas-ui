import { createAsyncThunk } from '@reduxjs/toolkit'
import { handleThunkRequest } from 'Utilities/requests'
import Constants from './constants'

export const requestFetchDeliverablesByProductId = createAsyncThunk(
    Constants.FETCH_DELIVERABLE_BY_PRODUCT,
    async(id, { rejectWithValue }) => {
        const request = { endpoint: `/api/deliverables?search=product.id:${id}`, method: 'GET', body: {} }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestCreateDeliverable = createAsyncThunk(
    Constants.CREATE_DELIVERABLE,
    async(deliverable, { rejectWithValue }) => {
        const request = { endpoint: '/api/deliverables', method: 'POST', body: deliverable }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestUpdateDeliverable = createAsyncThunk(
    Constants.UPDATE_DELIVERABLE,
    async(deliverable, { rejectWithValue }) => {
        const { id, ...body } = deliverable
        const request = { endpoint: `/api/deliverables/${id}`, method: 'PUT', body }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestUpdateDeliverablesBulk = createAsyncThunk(
    Constants.UPDATE_DELIVERABLE_BULK,
    async(deliverables, { rejectWithValue }) => {
        const request = { endpoint: '/api/deliverables/bulk', method: 'PUT', body: deliverables }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestArchiveDeliverable = createAsyncThunk(
    Constants.ARCHIVE_DELIVERABLE,
    async({ id, isArchived }, { rejectWithValue }) => {
        const request = { endpoint: `/api/deliverables/${id}/archive`, method: 'PUT', body: { isArchived } }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestDeleteDeliverable = createAsyncThunk(
    Constants.DELETE_DELIVERABLE,
    async(id, { rejectWithValue }) => {
        const request = { endpoint: `/api/deliverables/${id}`, method: 'DELETE', body: {} }
        const data = await handleThunkRequest(request, rejectWithValue)
        return { ...data, id }
    }
)