import { createAsyncThunk } from '@reduxjs/toolkit'
import { handleThunkRequest } from 'Utilities/requests'
import { searchHelper } from 'Utilities/searchHelper'
import Constants from './constants'

export const requestSearchWins = createAsyncThunk(
    Constants.SEARCH_WINS,
    async(search, { rejectWithValue }) => {
        const request = { endpoint: `/api/gantt_wins?search=${searchHelper(search)}`, method: 'GET', body: {} }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestCreateWin = createAsyncThunk(
    Constants.CREATE_WIN,
    async(win, { rejectWithValue }) => {
        const request = { endpoint: '/api/gantt_wins', method: 'POST', body: win }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestUpdateWin = createAsyncThunk(
    Constants.UPDATE_WIN,
    async(win, { rejectWithValue }) => {
        const { id, ...body } = win
        const request = { endpoint: `/api/gantt_wins/${id}`, method: 'PUT', body }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestDeleteWin = createAsyncThunk(
    Constants.DELETE_WIN,
    async(id, { rejectWithValue }) => {
        const request = { endpoint: `/api/gantt_wins/${id}`, method: 'DELETE', body: {} }
        const data = await handleThunkRequest(request, rejectWithValue)
        return { ...data, id }
    }
)