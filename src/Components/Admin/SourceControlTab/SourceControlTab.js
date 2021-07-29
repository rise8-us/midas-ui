import { Box, Button, IconButton, makeStyles } from '@material-ui/core'
import { Add, Edit } from '@material-ui/icons'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { openPopup } from '../../../Redux/Popups/actions'
import SourceControlConstants from '../../../Redux/SourceControls/constants'
import { selectSourceControls } from '../../../Redux/SourceControls/selectors'
import { Table } from '../../Table'

const useStyles = makeStyles(theme => ({
    button: {
        '&:hover': {
            color: theme.palette.primary.main
        },
        height: 40
    }
}))

function SourceControlTab() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const allSourceControls = useSelector(selectSourceControls)

    const createSourceControl = () => dispatch(
        openPopup(SourceControlConstants.CREATE_SourceControl, 'CreateOrUpdateSourceControlPopup'))
    const updateSourceControl = (id) => dispatch(
        openPopup(SourceControlConstants.UPDATE_SourceControl, 'CreateOrUpdateSourceControlPopup', { id }))

    const buildRows = () => {
        return allSourceControls.map(SourceControl => ({
            data: [
                SourceControl.name,
                SourceControl.description,
                SourceControl.baseUrl,
                buildActions(SourceControl.id)
            ],
            properties: { strikeThrough: false }
        }))
    }

    const buildActions = (id) => {
        return (
            <>
                <IconButton
                    title = 'edit'
                    color = 'secondary'
                    onClick = {() => updateSourceControl(id)}
                >
                    <Edit />
                </IconButton>
            </>
        )
    }

    return (
        <div style = {{ padding: '24px' }}>
            <Box display = 'block' width = '75vw' margin = 'auto' textAlign = 'right' padding = '24px 0'>
                <Button
                    variant = 'text'
                    startIcon = {<Add/>}
                    className = {classes.button}
                    onClick = {createSourceControl}
                >
                    Add New Source Control
                </Button>
            </Box>
            <Table
                rows = {buildRows()}
                columns = {['Name', 'Description', 'Base Url', '']}
            />
        </div>
    )
}

export default SourceControlTab
