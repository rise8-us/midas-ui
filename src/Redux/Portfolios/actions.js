import { createAsyncThunk } from '@reduxjs/toolkit'
import { handleThunkRequest } from 'Utilities/requests'
import Constants from './constants'

export const requestFetchAllPortfolios = createAsyncThunk(
    Constants.FETCH_ALL_PORTFOLIOS,
    async(_, { rejectWithValue }) => {
        const request = { endpoint: '/api/portfolios', method: 'GET' }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestSearchPortfolio = createAsyncThunk(
    Constants.SEARCH_PORTFOLIO,
    async(search, { rejectWithValue }) => {
        const request = { endpoint: `/api/portfolios?search=${search}`, method: 'GET' }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestCreatePortfolio = createAsyncThunk(
    Constants.CREATE_PORTFOLIO,
    async(portfolio, { rejectWithValue }) => {
        const request = { endpoint: '/api/portfolios', method: 'POST', body: portfolio }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestUpdatePortfolio = createAsyncThunk(
    Constants.UPDATE_PORTFOLIO,
    async(portfolio, { rejectWithValue }) => {
        const { id, ...body } = portfolio
        const request = { endpoint: `/api/portfolios/${id}`, method: 'PUT', body }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestArchivePortfolio = createAsyncThunk(
    Constants.ARCHIVE_PORTFOLIO,
    async({ id, isArchived }, { rejectWithValue }) => {
        const request = { endpoint: `/api/portfolios/${id}/archive`, method: 'PUT', body: { isArchived } }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestfetchPortfolioMetrics = createAsyncThunk(
    Constants.FETCH_PORTFOLIO_METRICS,
    async({ id, startDate, sprintDuration, sprintCycles }, { rejectWithValue }) => {
        const requestParams = `sprints=${sprintCycles} & duration=${sprintDuration}`
        const request = {
            endpoint: `/api/portfolios/${id}/sprint-metrics/${startDate}?` + requestParams,
            method: 'GET',
            body: {}
        }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestfetchPortfolioMetricsSummary = createAsyncThunk(
    Constants.FETCH_PORTFOLIO_METRICS_SUMMARY,
    async({ id, startDate, sprintDuration }, { rejectWithValue }) => {
        const requestParams = `startDate=${startDate}&duration=${sprintDuration}`
        const request = {
            endpoint: `/api/portfolios/${id}/sprint-metrics/summary?` + requestParams,
            method: 'GET',
            body: {}
        }
        return handleThunkRequest(request, rejectWithValue)
    }
)