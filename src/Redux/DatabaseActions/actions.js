import { createAsyncThunk } from '@reduxjs/toolkit'
import { handleThunkDownloadRequest, handleThunkRequest } from 'Utilities/requests'
import Constants from './constants'

export const requestGetBackupList = createAsyncThunk(
    Constants.GET_BACKUP_LIST,
    async(_, { rejectWithValue }) => {
        const request = { endpoint: '/api/dbActions/fileNames', method: 'GET', body: {} }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestRestore = createAsyncThunk(
    Constants.RESTORE_FILE,
    async(fileName, { rejectWithValue }) => {
        const request = { endpoint: '/api/dbActions/restore', method: 'POST', body: { fileName: fileName } }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestTakeBackup = createAsyncThunk(
    Constants.BACKUP_DB,
    async(_, { rejectWithValue }) => {
        const request = { endpoint: '/api/dbActions/backup', method: 'GET', body: { } }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestDownloadBackupFile = createAsyncThunk(
    Constants.DOWNLOAD_FILE,
    async(fileName, { rejectWithValue }) => {
        const request = { endpoint: '/api/dbActions/download', method: 'POST', body: { fileName: fileName } }
        return handleThunkDownloadRequest(request, rejectWithValue)
    }
)