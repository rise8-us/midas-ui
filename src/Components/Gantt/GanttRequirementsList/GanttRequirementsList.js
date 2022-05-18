
import { Edit } from '@mui/icons-material'
import { IconButton, Stack } from '@mui/material'
import PropTypes from 'prop-types'
import { styled } from 'Styles/materialThemes'
import GanttRequirements from '../GanttRequirements/GanttRequirements'

const StyledDiv = styled('div')(({ theme }) => ({
    borderRadius: theme.spacing(1),
    color: theme.palette.gantt.association.dark.text,
    background: theme.palette.gantt.association.dark.background,
    padding: theme.spacing(1),
}))

export default function GanttRequirementsList({ handleEditCapability, capabilities, deliverableIds }) {

    return (
        <StyledDiv data-testid = 'GanttRequirementsList__wrapper'>
            <Stack direction = 'row' alignItems = 'center' justifyContent = 'space-between'>
                <Stack spacing = {1}>
                    {capabilities?.map((capability, index) => {
                        if (!capability.deliverableIds?.some(id => deliverableIds.includes(id))) return null
                        return <GanttRequirements
                            key = {index}
                            capabilityId = {capability.id}
                            deliverableIds = {deliverableIds}
                        />
                    })}
                </Stack>
                {handleEditCapability &&
                    <IconButton
                        title = 'edit'
                        onClick = {handleEditCapability}
                        data-testid = 'GanttRequirementsList__edit-button'>
                        <Edit fontSize = 'small'/>
                    </IconButton>
                }
            </Stack>
        </StyledDiv>
    )
}

GanttRequirementsList.propTypes = {
    handleEditCapability: PropTypes.func,
    capabilities: PropTypes.array,
    deliverableIds: PropTypes.arrayOf(PropTypes.number)
}

GanttRequirementsList.defaultProps = {
    handleEditCapability: undefined,
    capabilities: [],
    deliverableIds: []
}