import { createAsyncThunk } from '@reduxjs/toolkit'
import { handleThunkRequest } from 'Utilities/requests'
import Constants from './constants'

export const requestFetchAllPortfolios = createAsyncThunk(
    Constants.FETCH_ALL_PORTFOLIOS,
    async(_, { rejectWithValue }) => {
        const request = { endpoint: '/api/products?search=type:PORTFOLIO', method: 'GET', body: {} }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestSearchPortfolio = createAsyncThunk(
    Constants.SEARCH_PORTFOLIO,
    async(search, { rejectWithValue }) => {
        const request = {
            endpoint: `/api/products?search=type:PORTFOLIO AND ${search}`,
            method: 'GET', body: {}
        }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestCreatePortfolio = createAsyncThunk(
    Constants.CREATE_PORTFOLIO,
    async(portfolio, { rejectWithValue }) => {
        const request = { endpoint: '/api/products', method: 'POST', body: portfolio }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestUpdatePortfolio = createAsyncThunk(
    Constants.UPDATE_PORTFOLIO,
    async(portfolio, { rejectWithValue }) => {
        const { id, ...body } = portfolio
        const request = { endpoint: `/api/products/${id}`, method: 'PUT', body }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestArchivePortfolio = createAsyncThunk(
    Constants.ARCHIVE_PORTFOLIO,
    async({ id, isArchived }, { rejectWithValue }) => {
        const request = { endpoint: `/api/products/${id}/archive`, method: 'PUT', body: { isArchived } }
        return handleThunkRequest(request, rejectWithValue)
    }
)