import { Box, Card, CardContent, CardHeader, IconButton, Tooltip, useTheme } from '@material-ui/core'
import { ChevronLeft, ChevronRight, Edit } from '@material-ui/icons'
import PropTypes from 'prop-types'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { openPopup } from '../../../Redux/Popups/actions'
import { requestUpdateJourneyMapById } from '../../../Redux/Projects/actions'
import ProjectConstants from '../../../Redux/Projects/constants'
import { selectProjectById } from '../../../Redux/Projects/selectors'
import { PathToProdStepper } from '../../PathToProdStepper'
import { Tag } from '../../Tag'

function ProjectCard({ id }) {
    const dispatch = useDispatch()
    const theme = useTheme()

    const project = useSelector(state => selectProjectById(state, id))

    const calcStep = () => Math.log2(project.projectJourneyMap + 1)

    const handleProgress = (increment) => {
        const step = calcStep() + increment
        const journey = Math.pow(2, step) - 1

        dispatch(requestUpdateJourneyMapById({
            id,
            projectJourneyMap: journey
        }))
    }

    const updateProjectPopup = () => {
        dispatch(openPopup(ProjectConstants.UPDATE_PROJECT, 'CreateOrUpdateProjectPopup', { id }))
    }

    return (
        <Card style = {{ width: '450px', margin: theme.spacing(1) }}>
            <CardHeader
                title = {project.name}
                titleTypographyProps = {{ variant: 'h5', style: { padding: '5px' } }}
                action = {
                    <IconButton
                        onClick = {updateProjectPopup}
                        color = 'secondary'
                        data-testid = 'ProjectCard__button-edit'
                    >
                        <Edit />
                    </IconButton>
                }
            />
            <Box display = 'flex'>
                <Tooltip title = 'Roll back status'>
                    <>
                        <IconButton
                            onClick = {() => handleProgress(-1)}
                            color = 'secondary'
                            data-testid = 'ProjectCard__button-back'
                            disabled = {project.projectJourneyMap === 0}
                            style = {{ height: '48px', margin: 'auto' }}
                            disableRipple
                        >
                            <ChevronLeft />
                        </IconButton>
                    </>
                </Tooltip>
                <PathToProdStepper step = {calcStep()} />
                <Tooltip title = 'Complete current step'>
                    <>
                        <IconButton
                            onClick = {() => handleProgress(1)}
                            color = 'secondary'
                            data-testid = 'ProjectCard__button-forward'
                            disabled = {project.projectJourneyMap === 15}
                            style = {{ height: '48px', margin: 'auto' }}
                            disableRipple
                        >
                            <ChevronRight />
                        </IconButton>
                    </>
                </Tooltip>
            </Box>
            <CardContent>
                <Box display = 'flex' flexWrap = 'wrap'>
                    {project.tags.map((tag, index) => (
                        <Tag { ...tag } key = {index}/>
                    ))}
                </Box>
            </CardContent>
        </Card>
    )
}

ProjectCard.propTypes = {
    id: PropTypes.number.isRequired
}

export default ProjectCard