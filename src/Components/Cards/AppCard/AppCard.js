import React from 'react'
import { Box, Card, CardContent, CardHeader, IconButton, useTheme, Divider, Typography} from '@material-ui/core'
import PropTypes from 'prop-types'
import {  Edit } from '@material-ui/icons'
// import { openPopup } from '../../../Redux/Popups/actions'
import { getApplicationById } from '../../../Redux/Applications/selectors'
// import ApplicationConstants from '../../../Redux/Applications/constants'
import { getProjectById } from '../../../Redux/Projects/selectors'
import { useSelector } from 'react-redux'
import { PathToProdStepper } from '../../PathToProdStepper'
import Tag from '../../Tag/Tag'

function AppCard({ id }) {
    const theme = useTheme()
    const application = useSelector(state => getApplicationById(state, id))

    const projects = application.projectsIds.map((id) => useSelector(state => getProjectById(state, id)))
    const calcStep = (project) => Math.log2(project.projectJourneyMap + 1)

    const editApplicationPopup = () => {
        // dispatch(openPopup(ApplicationsConstants.UPDATE_APPLICATION, 'UpdateApplicationPopup', { id: application.id }))
    }

    const appContent = () => {
        return (
            <>
                {projects.map((project, index) => (
                    <Box key = {index} display = 'flex' flexDirection = 'column' >
                        <Typography variant = 'h6'>
                            {project.name}
                        </Typography>
                        <PathToProdStepper key = {index} step = {calcStep(project)} />
                        <Box display = 'flex' flexWrap = 'wrap' padding = '0px 20px 5px 20px'>
                            {project.tags.map((tag, index) => (
                                <Tag { ...tag } key = {index}/>
                            ))}
                        </Box>
                    </Box>
                ))}
            </>
        )
    }

    return (
        <Card style = {{ width: '450px', margin: theme.spacing(1) }}>
            <CardHeader
                title = {application.name}
                subheader = 'Metrics'
                titleTypographyProps = {{ variant: 'h5', style: { padding: '5px' } }}
                subheaderTypographyProps = {{ variant: 'h6', style: { padding: '5px' } }}
                action = {
                    <IconButton
                        onClick = {editApplicationPopup()}
                        color = 'secondary'
                        data-testid = 'AppCard__button-edit'
                    >
                        <Edit />
                    </IconButton>
                }
            />
            <Divider />
            <CardContent >
                {appContent()}
            </CardContent>
            <Divider/>
            <CardContent>
                <Box display = 'flex' flexWrap = 'wrap' >
                    {application.tags.map((tag, index) => (
                        <Tag { ...tag } key = {index}/>
                    ))}
                </Box>
            </CardContent>
        </Card>
    )
}

AppCard.propTypes = {
    id: PropTypes.number.isRequired
}

export default AppCard
