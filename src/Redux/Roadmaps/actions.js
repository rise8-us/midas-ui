import { createAsyncThunk } from '@reduxjs/toolkit'
import { handleThunkRequest } from 'Utilities/requests'
import Constants from './constants'

export const requestFetchRoadmapsByProductId = createAsyncThunk(
    Constants.FETCH_BY_PRODUCT,
    async(id, { rejectWithValue }) => {
        const request = { endpoint: `/api/roadmaps?search=product.id:${id}`, method: 'GET', body: {} }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestCreateRoadmap = createAsyncThunk(
    Constants.CREATE_ROADMAP,
    async(roadmap, { rejectWithValue }) => {
        const request = { endpoint: '/api/roadmaps', method: 'POST', body: roadmap }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestUpdateRoadmap = createAsyncThunk(
    Constants.UPDATE_ROADMAP,
    async(roadmap, { rejectWithValue }) => {
        const { id, ...body } = roadmap
        const request = { endpoint: `/api/roadmaps/${id}`, method: 'PUT', body }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestDeleteRoadmap = createAsyncThunk(
    Constants.DELETE_ROADMAP,
    async(id, { rejectWithValue }) => {
        const request = { endpoint: `/api/roadmaps/${id}`, method: 'DELETE', body: {} }
        const data = await handleThunkRequest(request, rejectWithValue)
        return { ...data, id }
    }
)

export const requestHideRoadmap = createAsyncThunk(
    Constants.HIDE_ROADMAP,
    async({ id, isHidden }, { rejectWithValue }) => {
        const request = { endpoint: `/api/roadmaps/${id}/hide`, method: 'PUT', body: { isHidden } }
        return handleThunkRequest(request, rejectWithValue)
    }
)