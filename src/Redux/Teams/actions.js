import { createAsyncThunk } from '@reduxjs/toolkit'
import { handleThunkRequest } from '../../Utilities/requests'
import Constants from './constants'

export const requestFetchAllTeams = createAsyncThunk(
    Constants.FETCH_ALL_TEAMS,
    async(_, { rejectWithValue }) => {
        const request = { endpoint: '/api/teams', method: 'GET', body: {} }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestCreateTeam = createAsyncThunk(
    Constants.CREATE_TEAM,
    async(team, { rejectWithValue }) => {
        const request = { endpoint: '/api/teams', method: 'POST', body: team }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestUpdateTeam = createAsyncThunk(
    Constants.UPDATE_TEAM,
    async(team, { rejectWithValue }) => {
        const { id, ...body } = team
        const request = { endpoint: `/api/teams/${id}`, method: 'PUT', body }
        return handleThunkRequest(request, rejectWithValue)
    }
)