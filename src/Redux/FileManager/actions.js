import { createAsyncThunk } from '@reduxjs/toolkit'
import { handleThunkDownloadRequest, handleThunkRequest, handleThunkRequestWithHeaders } from 'Utilities/requests'

export const requestGetFile = createAsyncThunk(
    'get_file',
    async(downloadRequest, { rejectWithValue }) => {
        const request = { endpoint: '/api/filemanager/download', method: 'POST', body: downloadRequest }
        return handleThunkDownloadRequest(request, rejectWithValue)
    }
)

export const requestSaveFile = createAsyncThunk(
    'save_file',
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
    'get_files',
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
    'delete_file',
    async(deleteRequest, { rejectWithValue }) => {
        const request = { endpoint: '/api/filemanager/delete', method: 'DELETE', body: deleteRequest }
        return handleThunkRequest(request, rejectWithValue)
    }
)