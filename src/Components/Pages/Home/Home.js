import { Box, Button, makeStyles, Typography } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { openPopup } from '../../../Redux/Popups/actions'
import ProjectConstants from '../../../Redux/Projects/constants'
import { getProjects } from '../../../Redux/Projects/selectors'
import TagConstants from '../../../Redux/Tags/constants'
import TeamConstants from '../../../Redux/Teams/constants'
import { ProjectCard } from '../../Cards'
import { Page } from '../../Page'

const useStyles = makeStyles(theme => ({
    button: {
        '&:hover': {
            color: theme.palette.primary.main
        },
        height: 40
    }
}))

function Home() {
    const dispatch = useDispatch()
    const classes = useStyles()

    const allProjects = useSelector(getProjects)

    const createProject = () => dispatch(openPopup(ProjectConstants.CREATE_PROJECT, 'CreateProjectPopup'))
    const createTeam = () => dispatch(openPopup(TeamConstants.CREATE_TEAM, 'CreateTeamPopup'))
    const createTag = () => dispatch(openPopup(TagConstants.CREATE_TAG, 'CreateTagPopup'))

    return (
        <Page>
            <Box display = 'flex' flexDirection = 'column'>
                <div style = {{ display: 'flex' }}>
                    <Typography variant = 'h6' color = 'textSecondary' style = {{ padding: '20px' }}>
                        Measuring Inception to Production
                    </Typography>
                    <div style = {{ flexGrow: 1 }} />
                    <div style = {{ padding: '20px' }}>
                        <Button
                            variant = 'text'
                            startIcon = {<Add/>}
                            className = {classes.button}
                            onClick = {createProject}
                        >
                            Add New Project
                        </Button>
                        <Button
                            variant = 'text'
                            startIcon = {<Add/>}
                            className = {classes.button}
                            onClick = {createTeam}
                        >
                            Add New Team
                        </Button>
                        <Button
                            variant = 'text'
                            startIcon = {<Add/>}
                            className = {classes.button}
                            onClick = {createTag}
                        >
                            Add New Tag
                        </Button>
                    </div>
                </div>
                <Box display = 'flex' flexWrap = 'wrap' justifyContent = 'center'>
                    {allProjects.map((project, index) => (
                        <ProjectCard key = {index} id = {project.id}/>
                    ))}
                </Box>
            </Box>
        </Page>
    )
}

export default Home