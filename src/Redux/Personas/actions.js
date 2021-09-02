import { createAsyncThunk } from '@reduxjs/toolkit'
import { handleThunkRequest } from 'Utilities/requests'
import Constants from './constants'

export const requestFetchPersonasByProductId = createAsyncThunk(
    Constants.FETCH_BY_PRODUCT,
    async(id, { rejectWithValue }) => {
        const request = { endpoint: `/api/personas?search=product.id:${id}`, method: 'GET', body: {} }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestCreatePersona = createAsyncThunk(
    Constants.CREATE_PERSONA,
    async(persona, { rejectWithValue }) => {
        const request = { endpoint: '/api/personas', method: 'POST', body: persona }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestUpdatePersona = createAsyncThunk(
    Constants.UPDATE_PERSONA,
    async(persona, { rejectWithValue }) => {
        const { id, ...body } = persona
        const request = { endpoint: `/api/personas/${id}`, method: 'PUT', body }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestDeletePersona = createAsyncThunk(
    Constants.DELETE_PERSONA,
    async(id, { rejectWithValue }) => {
        const request = { endpoint: `/api/personas/${id}`, method: 'DELETE', body: {} }
        const data = await handleThunkRequest(request, rejectWithValue)
        return { ...data, id }
    }
)