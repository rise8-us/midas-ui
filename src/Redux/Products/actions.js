import { createAsyncThunk } from '@reduxjs/toolkit'
import { handleThunkRequest } from 'Utilities/requests'
import Constants from './constants'

export const requestFetchAllProducts = createAsyncThunk(
    Constants.FETCH_ALL_PRODUCTS,
    async(_, { rejectWithValue }) => {
        const request = { endpoint: '/api/products', method: 'GET', body: {} }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestSearchProduct = createAsyncThunk(
    Constants.SEARCH_PRODUCT,
    async(search, { rejectWithValue }) => {
        const request = { endpoint: `/api/products AND ${search}`, method: 'GET', body: {} }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestCreateProduct = createAsyncThunk(
    Constants.CREATE_PRODUCT,
    async(product, { rejectWithValue }) => {
        const request = { endpoint: '/api/products', method: 'POST', body: product }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestUpdateProduct = createAsyncThunk(
    Constants.UPDATE_PRODUCT,
    async(product, { rejectWithValue }) => {
        const { id, ...body } = product
        const request = { endpoint: `/api/products/${id}`, method: 'PUT', body }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestArchiveProduct = createAsyncThunk(
    Constants.ARCHIVE_PRODUCT,
    async({ id, isArchived }, { rejectWithValue }) => {
        const request = { endpoint: `/api/products/${id}/archive`, method: 'PUT', body: { isArchived } }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestFetchProductSprintMetrics = createAsyncThunk(
    Constants.FETCH_PRODUCT_SPRINT_METRICS,
    async({ id, startDate, duration, sprints = 1 }, { rejectWithValue }) => {
        const params = `duration=${duration}&sprints=${sprints}`
        const request = { endpoint: `/api/products/${id}/sprint-metrics/${startDate}?${params}`, method: 'GET' }
        return handleThunkRequest(request, rejectWithValue)
    }
)
