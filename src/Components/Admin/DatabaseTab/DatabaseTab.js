import { Backup, CloudDownload, Restore, WarningAmberRounded } from '@mui/icons-material'
import { Autocomplete, Button, CircularProgress, Grid, TextField, Tooltip } from '@mui/material'
import { unwrapResult } from '@reduxjs/toolkit'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import * as dbActions from 'Redux/DatabaseActions/actions'
import FormatErrors from 'Utilities/FormatErrors'

const getIcon = (processing, icon) => processing
    ? <CircularProgress color = 'inherit' size = {20} data-testid = 'DatabaseTab__waiting-icon'/>
    : icon

function WarningIcon({ errors }) {
    return (
        <Tooltip title = {<FormatErrors errors = {errors} />}>
            <WarningAmberRounded
                color = 'warning'
                style = {{ cursor: 'help' }}
                data-testid = 'DatabaseTab__warning-icon'
            />
        </Tooltip>
    )
}

WarningIcon.propTypes = {
    errors: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default function DatabaseTab() {
    const dispatch = useDispatch()

    const [isLoading, setIsLoading] = useState(false)
    const [isProcessingBackup, setIsProcessingBackup] = useState(false)
    const [isProcessingRestore, setIsProcessingRestore] = useState(false)
    const [isProcessingDownload, setIsProcessingDownload] = useState(false)
    const [backupsList, setBackupsList] = useState([])
    const [fetchErrors, setFetchErrors] = useState([])
    const [selectedBackupFile, setSelectedBackupFile] = useState(null)

    const executeGetBackupsList = () => {
        setIsLoading(true)
        dispatch(dbActions.requestGetBackupList())
            .then(unwrapResult)
            .then(data => {
                setBackupsList(data.reverse())
                setIsLoading(false)
            })
            .catch(errors => {
                setFetchErrors(errors)
                setIsLoading(false)
            })
    }

    const dispatchAction = (toggleFn, action) => {
        toggleFn(true)
        dispatch(action).then(() => toggleFn(false))
    }

    const handleDownloadClick = () =>
        dispatchAction(setIsProcessingDownload, dbActions.requestDownloadBackupFile(selectedBackupFile))

    const handleBackupClick = () =>
        dispatchAction(setIsProcessingBackup, dbActions.requestTakeBackup())

    const handleRestoreClick = () =>
        dispatchAction(setIsProcessingRestore, dbActions.requestRestore(selectedBackupFile))

    const handleSelectedBackupChange = (_e, selectedValue) =>
        setSelectedBackupFile(selectedValue)

    return (
        <Grid container marginY = '48px' padding = {3} rowSpacing = {2} direction = 'column' alignItems = 'center'>
            <Grid item justifyContent = 'center' flexGrow = {1} width = '375px'>
                <Button
                    onClick = {handleBackupClick}
                    variant = 'outlined'
                    endIcon = {getIcon(isProcessingBackup, <Backup />)}
                    disableRipple
                    fullWidth
                >
                    take backup
                </Button>
            </Grid>
            <Grid item flexGrow = {1} width = '375px'>
                <Autocomplete
                    options = {backupsList}
                    groupBy = {(option) => 'v' + option.split('/')[1]}
                    getOptionLabel = {(option) => option.split('/')[2]}
                    onChange = {handleSelectedBackupChange}
                    onOpen = {executeGetBackupsList}
                    loadingText = 'Retrieving backups...'
                    noOptionsText = 'No backups retrieved.'
                    loading = {isLoading}
                    ListboxProps = {{ style: { fontFamily: 'monospace' } }}
                    renderInput = {(params) =>
                        <TextField
                            {...params}
                            fullWidth
                            variant = 'outlined'
                            label = 'DB Backups'
                            InputProps = {{
                                ...params.InputProps,
                                endAdornment: fetchErrors.length > 0
                                    ? <WarningIcon errors = {fetchErrors} />
                                    : getIcon(isLoading, <>{params.InputProps.endAdornment}</>),
                            }}
                        />
                    }
                />
            </Grid>
            <Grid container item justifyContent = 'center' width = '375px' columnGap = {2}>
                <Grid item xs>
                    <Button
                        disabled = {selectedBackupFile === null}
                        onClick = {handleRestoreClick}
                        variant = 'outlined'
                        endIcon = {getIcon(isProcessingRestore, <Restore />)}
                        disableRipple
                        fullWidth
                    >
                        restore
                    </Button>
                </Grid>
                <Grid item xs>
                    <Button
                        disabled = {selectedBackupFile === null}
                        variant = 'outlined'
                        onClick = {handleDownloadClick}
                        endIcon = {getIcon(isProcessingDownload, <CloudDownload />)}
                        disableRipple
                        fullWidth
                    >
                        download
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    )
}