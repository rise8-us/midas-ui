import { Button, CircularProgress, Grid, TextField } from '@mui/material'
import { unwrapResult } from '@reduxjs/toolkit'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { requestGetBackupAsString, requestPostBackupAsJson } from 'Redux/DatabaseActions/actions'

export default function DatabaseTab() {
    const dispatch = useDispatch()

    const [backupValue, setBackupValue] = useState('')
    const [isProcessing, setIsProcessing] = useState(false)

    const requestGetBackup = async() => {
        setIsProcessing(true)
        dispatch(requestGetBackupAsString())
            .then(unwrapResult)
            .then(data => {
                setBackupValue(data)
                setIsProcessing(false)
            })
    }

    const requestPutBackup = () => {
        backupValue.trim().length > 0 && dispatch(requestPostBackupAsJson(backupValue))
    }

    return (
        <Grid container style = {{ padding: '24px' }}>
            <Grid container item spacing = {2} direction = 'column' md = {3} lg = {2} xl = {1}>
                <Grid item style = {{ position: 'absolute' }}>
                    <Button onClick = {requestGetBackup} variant = 'outlined' style = {{ width: '160px' }}>
                        Retrieve Backup
                    </Button>
                </Grid>
                <Grid item style = {{ position: 'absolute', marginTop: '48px' }}>
                    <Button onClick = {requestPutBackup} variant = 'outlined' style = {{ width: '160px' }}>
                        Upload Backup
                    </Button>
                </Grid>
            </Grid>
            <Grid item xs = {12} sm = {12} md = {9} lg = {10} xl = {11}>
                {isProcessing
                    ? <CircularProgress variant = 'indeterminate'/>
                    : <TextField
                        multiline
                        fullWidth
                        variant = 'filled'
                        placeholder = 'PLACE BACKUP TEXT HERE'
                        value = {backupValue}
                        onChange = {e => setBackupValue(e.target.value)}
                    />
                }
            </Grid>
        </Grid>
    )
}