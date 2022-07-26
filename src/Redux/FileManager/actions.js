import { createAsyncThunk } from '@reduxjs/toolkit'
import { handleThunkDownloadRequest, handleThunkRequest, handleThunkRequestWithHeaders } from 'Utilities/requests'

export const requestGetFile = createAsyncThunk(
    'get_file',
    async(fileName, { rejectWithValue }) => {
        const request = { endpoint: '/api/filemanager/download', method: 'POST', body: { fileName: fileName } }
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
                'product': saveRequest.product
            }
        }
        return handleThunkRequestWithHeaders(request, rejectWithValue)
    }
)

export const requestGetFileNames = createAsyncThunk(
    'get_files',
    async(productName, { rejectWithValue }) => {
        const request = { endpoint: '/api/filemanager/files/?product=' + `${productName}`, method: 'GET', body: {} }
        return handleThunkRequest(request, rejectWithValue)
    }
)