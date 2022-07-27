import { createAsyncThunk } from '@reduxjs/toolkit'
import { handleThunkDownloadRequest, handleThunkRequest, handleThunkRequestWithHeaders } from 'Utilities/requests'
import Constants from './constants'

export const requestGetFile = createAsyncThunk(
    Constants.DOWNLOAD_FILE,
    async(downloadRequest, { rejectWithValue }) => {
        const request = { endpoint: '/api/filemanager/download', method: 'POST', body: downloadRequest }
        return handleThunkDownloadRequest(request, rejectWithValue)
    }
)

export const requestSaveFile = createAsyncThunk(
    Constants.UPLOAD_FILE,
    async(saveRequest, { rejectWithValue }) => {
        const request = { endpoint: '/api/filemanager/upload', method: 'POST',
            body: saveRequest.file,
            headers: {
                'Content-Type': 'multipart/form-data',
                'product': saveRequest.product,
                'portfolio': saveRequest.portfolio
            }
        }
        return handleThunkRequestWithHeaders(request, rejectWithValue)
    }
)

export const requestGetFileNames = createAsyncThunk(
    Constants.GET_FILE_LIST,
    async(params, { rejectWithValue }) => {
        const request = {
            endpoint: `/api/filemanager/files/?portfolio=${params.portfolioName}&product=${params.productName}`,
            method: 'GET',
            body: {}
        }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestDeleteFile = createAsyncThunk(
    Constants.DELETE_FILE,
    async(deleteRequest, { rejectWithValue }) => {
        const request = { endpoint: '/api/filemanager/delete', method: 'DELETE', body: deleteRequest }
        return handleThunkRequest(request, rejectWithValue)
    }
)