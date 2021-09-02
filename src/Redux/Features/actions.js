import { createAsyncThunk } from '@reduxjs/toolkit'
import { handleThunkRequest } from 'Utilities/requests'
import Constants from './constants'

export const requestFetchFeaturesByProductId = createAsyncThunk(
    Constants.FETCH_BY_PRODUCT,
    async(id, { rejectWithValue }) => {
        const request = { endpoint: `/api/features?search=product.id:${id}`, method: 'GET', body: {} }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestCreateFeature = createAsyncThunk(
    Constants.CREATE_FEATURE,
    async(feature, { rejectWithValue }) => {
        const request = { endpoint: '/api/features', method: 'POST', body: feature }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestUpdateFeature = createAsyncThunk(
    Constants.UPDATE_FEATURE,
    async(feature, { rejectWithValue }) => {
        const { id, ...body } = feature
        const request = { endpoint: `/api/features/${id}`, method: 'PUT', body }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestUpdateFeaturesBulk = createAsyncThunk(
    Constants.UPDATE_FEATURE_BULK,
    async(features, { rejectWithValue }) => {
        const request = { endpoint: '/api/features/bulk', method: 'PUT', body: features }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestDeleteFeature = createAsyncThunk(
    Constants.DELETE_FEATURE,
    async(id, { rejectWithValue }) => {
        const request = { endpoint: `/api/features/${id}`, method: 'DELETE', body: {} }
        const data = await handleThunkRequest(request, rejectWithValue)
        return { ...data, id }
    }
)