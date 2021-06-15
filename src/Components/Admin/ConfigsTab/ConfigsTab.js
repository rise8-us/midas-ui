import { Box, Button, IconButton, makeStyles } from '@material-ui/core'
import { Add, Edit } from '@material-ui/icons'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ConfigConstants from '../../../Redux/GitlabConfigs/constants'
import { selectGitlabConfigs } from '../../../Redux/GitlabConfigs/selectors'
import { openPopup } from '../../../Redux/Popups/actions'
import { Table } from '../../Table'

const useStyles = makeStyles(theme => ({
    button: {
        '&:hover': {
            color: theme.palette.primary.main
        },
        height: 40
    }
}))

function ConfigsTab() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const allConfigs = useSelector(selectGitlabConfigs)

    const createConfig = () => dispatch(
        openPopup(ConfigConstants.CREATE_CONFIG, 'CreateOrUpdateGitlabConfigPopup'))
    const updateConfig = (id) => dispatch(
        openPopup(ConfigConstants.UPDATE_CONFIG, 'CreateOrUpdateGitlabConfigPopup', { id }))

    const buildRows = () => {
        return allConfigs.map(config => ({
            data: [
                config.name,
                config.description,
                config.baseUrl,
                buildActions(config.id, config.isArchived)
            ],
            properties: { strikeThrough: config.isArchived }
        }))
    }

    const buildActions = (id) => {
        return (
            <>
                <IconButton
                    title = 'edit'
                    color = 'secondary'
                    onClick = {() => updateConfig(id)}
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
                    onClick = {createConfig}
                >
                    Add New Config
                </Button>
            </Box>
            <Table
                rows = {buildRows()}
                columns = {['Name', 'Description', 'Base Url', '']}
            />
        </div>
    )
}

export default ConfigsTab
