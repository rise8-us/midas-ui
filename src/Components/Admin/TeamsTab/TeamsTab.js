import { alpha, Box, Button, IconButton, makeStyles } from '@material-ui/core'
import { Add, Archive, Unarchive } from '@material-ui/icons'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllTeams } from '../../../Redux/Teams/selectors'
import { Table } from '../../Table'
import TeamsConstant from '../../../Redux/Teams/constants'
import { requestArchiveTeam } from '../../../Redux/Teams/actions'
import { openPopup } from '../../../Redux/Popups/actions'

const useStyles = makeStyles(theme => ({
    addButton: {
        '&:hover': {
            color: theme.palette.primary.main
        },
        height: 40
    }
}))

const TeamsTab = () => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const allTeams = useSelector(selectAllTeams)
    const archivedTeams = allTeams.filter(team => team.isArchived)

    const createTeam = () => dispatch(
        openPopup(TeamsConstant.CREATE_TEAM, 'CreateOrUpdateTeamPopup'))
    const updateTeam = (id) => dispatch(
        openPopup(TeamsConstant.UPDATE_TEAM, 'CreateOrUpdateTeamPopup', { id }))
    const archiveTeam = (id, isArchived) => dispatch(requestArchiveTeam({ id, isArchived: !isArchived }))

    const buildActions = (id, isArchived) => {
        return (
            <IconButton
                title = {isArchived ? 'unarchive' : 'archive' }
                color = 'secondary'
                onClick = {(e) => {
                    e.stopPropagation()
                    archiveTeam(id, isArchived)
                }}
            >
                {isArchived ? <Unarchive /> : <Archive />}
            </IconButton>
        )
    }

    const buildRows = () => {
        return allTeams.map(team => ({
            data: [
                team.id,
                team.name,
                team.gitlabGroupId,
                buildActions(team.id, team.isArchived),
            ],
            properties: {
                strikeThrough: team.isArchived
            }
        }))
    }

    return (
        <div style = {{ padding: 24 }}>
            <Box
                textAlign = 'right'
                padding = '24px 0'
            >
                <Button
                    varient = 'text'
                    startIcon = {<Add/>}
                    className = {classes.addButton}
                    onClick = {createTeam}
                >
                    Add New Team
                </Button>
            </Box>
            <Table
                columns = {['id', 'teamname', 'GitLab Group Id', '']}
                rows = {buildRows()}
                onRowClick = {(data) => {
                    const id = data[0]
                    !archivedTeams.find(team => team.id == id) && updateTeam(id)
                }}
                tableWidth = '100%'
            />
        </div>
    )
}

export default TeamsTab