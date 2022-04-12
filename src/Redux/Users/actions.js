import { createAsyncThunk } from '@reduxjs/toolkit'
import { handleThunkRequest } from 'Utilities/requests'
import { searchHelper } from 'Utilities/searchHelper'
import Constants from './constants'


export const requestFetchOneUser = createAsyncThunk(
    Constants.FETCH_ONE_USER,
    async(id, { rejectWithValue }) => {
        const request = { endpoint: `/api/users/${id}`, method: 'GET', body: {} }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestUpdateUser = createAsyncThunk(
    Constants.UPDATE_USER,
    async(user, { rejectWithValue }) => {
        const { id, ...body } = user
        const request = { endpoint: `/api/users/${id}`, method: 'PUT', body: body }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestUpdateUserRoles = createAsyncThunk(
    Constants.UPDATE_USER_ROLES,
    async({ id, roles }, { rejectWithValue }) => {
        const request = { endpoint: `/api/users/${id}/roles`, method: 'PUT', body: { roles: roles } }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestFindUserBy = createAsyncThunk(
    Constants.FIND_USER_BY,
    async(search, { rejectWithValue }) => {
        const request = { endpoint: `/api/users?search=${searchHelper(search)}`, method: 'GET', body: {} }
        return handleThunkRequest(request, rejectWithValue)
    }
)