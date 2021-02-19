import { createAsyncThunk } from '@reduxjs/toolkit'
import Axios from 'axios'
import { createAxiosRequest } from '../../Utilities/requests'
import Constants from './constants'

export const requestFetchInitInfo = createAsyncThunk(
    Constants.FETCH_INFO_PUBLIC,
    async(_, { rejectWithValue }) => {
        const request = createAxiosRequest('/init/info', 'GET', {})
        try {
            const response = await Axios(request)
            return await response.data
        } catch (error) {
            return rejectWithValue(error.response.data.errors)
        }
    }
)

export const requestFetchInitUser = createAsyncThunk(
    Constants.FETCH_INIT_LOGON,
    async(_, { rejectWithValue }) => {
        const request = createAxiosRequest('/init/user', 'GET', {})
        try {
            const response = await Axios(request)
            return await response.data
        } catch (error) {
            return rejectWithValue(error.response.data.errors)
        }
    }
)