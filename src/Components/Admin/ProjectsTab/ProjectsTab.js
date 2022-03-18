import { Add, Archive, Edit, Unarchive } from '@mui/icons-material'
import { Box, Button, IconButton } from '@mui/material'
import { Table } from 'Components/Table'
import { Tag } from 'Components/Tag'
import { useDispatch, useSelector } from 'react-redux'
import { openPopup } from 'Redux/Popups/actions'
import { requestArchiveProject } from 'Redux/Projects/actions'
import ProjectConstants from 'Redux/Projects/constants'
import { selectProjects } from 'Redux/Projects/selectors'

function ProjectsTab() {
    const dispatch = useDispatch()
    const allProjects = useSelector(selectProjects)

    const createProject = () =>
        dispatch(openPopup(ProjectConstants.CREATE_PROJECT, 'ProjectPopup'))
    const updateProject = (id) =>
        dispatch(openPopup(ProjectConstants.UPDATE_PROJECT, 'ProjectPopup', { id }))
    const archiveProject = (id, isArchived) =>
        dispatch(requestArchiveProject({ id, isArchived: !isArchived }))

    const buildRows = () => {
        return allProjects.map(project => ({
            data: [
                project.name,
                project.description,
                project.gitlabProjectId,
                buildTag(project.tags),
                buildActions(project.id, project.isArchived)
            ],
            properties: { strikeThrough: project.isArchived }
        }))
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
        return <>
            <IconButton
                title = {isArchived ? 'unarchive' : 'archive' }
                color = 'secondary'
                onClick = {() => archiveProject(id, isArchived)}
                size = 'large'
            >
                {isArchived ? <Unarchive /> : <Archive />}
            </IconButton>
            {!isArchived &&
                <IconButton
                    title = 'edit'
                    color = 'secondary'
                    onClick = {() => updateProject(id)}
                    size = 'large'
                >
                    <Edit />
                </IconButton>
            }
        </>
    }

    return (
        <div style = {{ padding: '24px' }}>
            <Box display = 'block' width = '75vw' margin = 'auto' textAlign = 'right' padding = '24px 0'>
                <Button
                    variant = 'text'
                    startIcon = {<Add/>}
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
