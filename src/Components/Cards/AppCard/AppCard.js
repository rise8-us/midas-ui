import {
    Box, Card, CardActions, CardContent, CardHeader, Divider, IconButton, Typography
} from '@material-ui/core'
import { Edit } from '@material-ui/icons'
import PropTypes from 'prop-types'
import React, { useLayoutEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ApplicationConstants from '../../../Redux/Applications/constants'
import { selectApplicationById } from '../../../Redux/Applications/selectors'
import { openPopup } from '../../../Redux/Popups/actions'
import { PathToProdStepper } from '../../PathToProdStepper'
import { Tag } from '../../Tag'

function AppCard({ id }) {
    const dispatch = useDispatch()
    const ref = useRef()

    const application = useSelector(state => selectApplicationById(state, id))

    const hasProjects = application.projects.length > 0
    const hasTags = application.tags.length > 0

    const calcStep = (project) => Math.log2(project.projectJourneyMap + 1)

    const updateApplicationPopup = () => {
        dispatch(openPopup(ApplicationConstants.UPDATE_APPLICATION, 'UpdateApplicationPopup', { id }))
    }

    useLayoutEffect(() => {
        const spans = Math.ceil(ref.current.clientHeight / 2) + 5
        ref.current.style.gridRowEnd = `span ${spans}`
    }, [])

    return (
        <Card style = {{ width: '450px', height: 'fit-content' }} ref = {ref}>
            <CardHeader
                title = {application.name}
                titleTypographyProps = {{ variant: 'h5', color: 'textPrimary' }}
                style = {{ backgroundColor: '#FF00FF05' }}
                action = {
                    <IconButton
                        onClick = {updateApplicationPopup}
                        color = 'secondary'
                        data-testid = 'AppCard__button-edit'
                    >
                        <Edit />
                    </IconButton>
                }
            />
            { hasProjects &&
                <>
                    <Divider variant = 'fullWidth' />
                    <CardContent>
                        {application.projects.map((project, index) => (
                            <Box key = {index} style = {{ paddingBottom: '30px' }}>
                                <Typography variant = 'h6' color = 'textSecondary' style = {{ marginLeft: '10px' }}>
                                    {project.name}
                                </Typography>
                                <PathToProdStepper step = {calcStep(project)} padding = '5px 20px 5px 20px'/>
                            </Box>
                        ))}
                    </CardContent>
                </>
            }
            { hasTags &&
                <>
                    <Divider variant = 'fullWidth' />
                    <CardActions
                        style = {{
                            backgroundColor: hasProjects ? '#FF00FF05' : 'inherit',
                            padding: '5px 16px'
                        }}
                    >
                        <Box display = 'flex' flexWrap = 'wrap' >
                            {application.tags.map((tag, index) => (
                                <Tag { ...tag } key = {index}/>
                            ))}
                        </Box>
                    </CardActions>
                </>
            }
        </Card>

    )
}

AppCard.propTypes = {
    id: PropTypes.number.isRequired,
}

export default AppCard
