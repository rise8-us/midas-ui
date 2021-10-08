import { createAsyncThunk } from '@reduxjs/toolkit'
import { handleThunkRequest } from 'Utilities/requests'
import Constants from './constants'

export const requestGetBackupAsString = createAsyncThunk(
    Constants.BACKUP_STRING,
    async(_, { rejectWithValue }) => {
        const request = { endpoint: '/api/dbActions/backupString', method: 'GET', body: {} }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestPostBackupAsJson = createAsyncThunk(
    Constants.RESTORE_JSON,
    async(backupString, { rejectWithValue }) => {
        const request = { endpoint: '/api/dbActions/restoreJSON', method: 'POST', body: { mysqlDump: backupString } }
        return handleThunkRequest(request, rejectWithValue)
    }
)