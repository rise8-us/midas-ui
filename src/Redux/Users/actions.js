import { createAsyncThunk } from '@reduxjs/toolkit'
import Axios from 'axios'
import { createAxiosRequest } from '../../Utilities/requests'
import Constants from './constants'

export const requestFetchOneUser = createAsyncThunk(
    Constants.FETCH_ONE_USER,
    async(id, { rejectWithValue }) => {
        const request = createAxiosRequest(`/api/users/${id}`, 'GET', {})
        try {
            const response = await Axios(request)
            const data = await response.data
            return data
        } catch (error) {
            return rejectWithValue(error.response.data.errors)
        }
    }
)

export const requestUpdateUser = createAsyncThunk(
    Constants.UPDATE_USER,
    async(user, { rejectWithValue }) => {
        const { id, ...body } = user
        const request = createAxiosRequest(`/api/users/${id}`, 'PUT', { ...body })
        try {
            const response = await Axios(request)
            const data = await response.data
            return data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const requestUpdateUserRoles = createAsyncThunk(
    Constants.UPDATE_USER_ROLES,
    async({ id, roles }, { rejectWithValue }) => {
        const request = createAxiosRequest(`/api/users/${id}/admin/roles`, 'PUT', { roles: roles })
        try {
            const response = await Axios(request)
            const data = await response.data
            return data
        } catch (error) {
            return rejectWithValue(error.response.data.errors)
        }
    }
)

export const requestFindUserBy = createAsyncThunk(
    Constants.FIND_USER_BY,
    async(search, { rejectWithValue }) => {
        const request = createAxiosRequest(`/api/users?search=${search}`, 'GET', { })
        try {
            const response = await Axios(request)
            const data = await response.data
            return data
        } catch (error) {
            return rejectWithValue(error.response.data.errors)
        }
    }
)