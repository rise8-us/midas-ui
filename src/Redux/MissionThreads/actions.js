import { createAsyncThunk } from '@reduxjs/toolkit'
import { handleThunkRequest } from 'Utilities/requests'
import Constants from './constants'

export const requestSearchMissionThreads = createAsyncThunk(
    Constants.SEARCH_MISSION_THREADS,
    async(search, { rejectWithValue }) => {
        const request = { endpoint: `/api/missionthreads?search=${search}`, method: 'GET', body: {} }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestCreateMissionThread = createAsyncThunk(
    Constants.CREATE_MISSION_THREAD,
    async(missionThread, { rejectWithValue }) => {
        const request = { endpoint: '/api/missionthreads', method: 'POST', body: missionThread }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestUpdateMissionThread = createAsyncThunk(
    Constants.UPDATE_MISSION_THREAD,
    async(missionThread, { rejectWithValue }) => {
        const { id, ...body } = missionThread
        const request = { endpoint: `/api/missionthreads/${id}`, method: 'PUT', body }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestUpdateMissionThreadsBulk = createAsyncThunk(
    Constants.UPDATE_MISSION_THREAD_BULK,
    async(missionThreads, { rejectWithValue }) => {
        const request = { endpoint: '/api/missionthreads/bulk', method: 'PUT', body: missionThreads }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestDeleteMissionThread = createAsyncThunk(
    Constants.DELETE_MISSION_THREAD,
    async(id, { rejectWithValue }) => {
        const request = { endpoint: `/api/missionthreads/${id}`, method: 'DELETE', body: {} }
        const data = await handleThunkRequest(request, rejectWithValue)
        return { ...data, id }
    }
)