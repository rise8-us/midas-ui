import { createAsyncThunk } from '@reduxjs/toolkit'
import { handleThunkRequest } from 'Utilities/requests'
import { searchHelper } from 'Utilities/searchHelper'
import Constants from './constants'

export const requestSearchMilestones = createAsyncThunk(
    Constants.SEARCH_MILESTONES,
    async(search, { rejectWithValue }) => {
        const request = { endpoint: `/api/gantt_milestones?search=${searchHelper(search)}`, method: 'GET', body: {} }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestCreateMilestone = createAsyncThunk(
    Constants.CREATE_MILESTONE,
    async(milestone, { rejectWithValue }) => {
        const request = { endpoint: '/api/gantt_milestones', method: 'POST', body: milestone }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestUpdateMilestone = createAsyncThunk(
    Constants.UPDATE_MILESTONE,
    async(milestone, { rejectWithValue }) => {
        const { id, ...body } = milestone
        const request = { endpoint: `/api/gantt_milestones/${id}`, method: 'PUT', body }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestDeleteMilestone = createAsyncThunk(
    Constants.DELETE_MILESTONE,
    async(id, { rejectWithValue }) => {
        const request = { endpoint: `/api/gantt_milestones/${id}`, method: 'DELETE', body: {} }
        const data = await handleThunkRequest(request, rejectWithValue)
        return { ...data, id }
    }
)