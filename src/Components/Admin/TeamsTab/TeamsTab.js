import { Add, Archive, Unarchive } from '@mui/icons-material'
import { Box, Button, IconButton } from '@mui/material'
import { Table } from 'Components/Table'
import { useDispatch, useSelector } from 'react-redux'
import { openPopup } from 'Redux/Popups/actions'
import { requestArchiveTeam } from 'Redux/Teams/actions'
import TeamsConstant from 'Redux/Teams/constants'
import { selectAllTeams } from 'Redux/Teams/selectors'

const TeamsTab = () => {
    const dispatch = useDispatch()

    const allTeams = useSelector(selectAllTeams)
    const archivedTeams = allTeams.filter(team => team.isArchived)

    const createTeam = () => dispatch(
        openPopup(TeamsConstant.CREATE_TEAM, 'TeamPopup'))
    const updateTeam = (id) => dispatch(
        openPopup(TeamsConstant.UPDATE_TEAM, 'TeamPopup', { id }))
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
                size = 'large'
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
        <div style = {{ padding: '24px' }}>
            <Box display = 'block' width = '75vw' margin = 'auto' textAlign = 'right' padding = '24px 0'>
                <Button
                    varient = 'text'
                    startIcon = {<Add/>}
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
            />
        </div>
    )
}

export default TeamsTab