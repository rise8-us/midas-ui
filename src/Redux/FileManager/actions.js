import { createAsyncThunk } from '@reduxjs/toolkit'
import { handleThunkRequest } from 'Utilities/requests'

export const requestSaveFile = createAsyncThunk(
    'save_file',
    async(file, { rejectWithValue }) => {
        const request = { endpoint: '/api/filemanager/upload', method: 'POST',
            body: file,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestGetFileNames = createAsyncThunk(
    'get_files',
    async({ rejectWithValue }) => {
        const request = { endpoint: '/api/filemanager/files', method: 'GET', body: {} }
        return handleThunkRequest(request, rejectWithValue)
    }
)