import { Box, Button, IconButton, makeStyles } from '@material-ui/core'
import { Add, Archive, Edit, Unarchive } from '@material-ui/icons'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { openPopup } from '../../../Redux/Popups/actions'
import { requestArchiveProject } from '../../../Redux/Projects/actions'
import ProjectConstants from '../../../Redux/Projects/constants'
import { getProjects } from '../../../Redux/Projects/selectors'
import { Table } from '../../Table'
import { Tag } from '../../Tag'

const useStyles = makeStyles(theme => ({
    button: {
        '&:hover': {
            color: theme.palette.primary.main
        },
        height: 40
    }
}))

function ProjectsTab() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const allProjects = useSelector(getProjects)

    const createProject = () => dispatch(openPopup(ProjectConstants.CREATE_PROJECT, 'CreateProjectPopup'))
    const updateProject = (id) => dispatch(openPopup(ProjectConstants.UPDATE_PROJECT, 'UpdateProjectPopup', { id }))
    const archiveProject = (id, isArchived) => dispatch(requestArchiveProject({ id, isArchived: !isArchived }))

    const buildRows = () => {
        return allProjects.map(project =>
            [project.name,
                project.description,
                project.gitlabProjectId,
                buildTag(project.tags),
                buildActions(project.id, project.isArchived)
            ])
    }

    const buildTag = (tags) => {
        return (
            <Box display = 'flex' flexWrap = 'wrap'>
                {tags.map((tag, index) => (
                    <Tag key = {index} {...tag}/>
                ))}
            </Box>
        )
    }

    const buildActions = (id, isArchived) => {
        return (
            <>
                {!isArchived &&
                    <IconButton
                        title = 'edit'
                        color = 'secondary'
                        onClick = {() => updateProject(id)}
                    >
                        <Edit />
                    </IconButton>
                }
                <IconButton
                    title = {isArchived ? 'unarchive' : 'archive' }
                    color = 'secondary'
                    onClick = {() => archiveProject(id, isArchived)}
                >
                    {isArchived ? <Unarchive /> : <Archive />}
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
                    onClick = {createProject}
                >
                            Add New Project
                </Button>
            </Box>
            <Table
                rows = {buildRows()}
                columns = {['Name', 'Description', 'GitLab Project Id', 'Tags', '']}
            />
        </div>
    )
}

export default ProjectsTab
