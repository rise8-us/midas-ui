import { Stack, Typography } from '@mui/material'
import Capability from 'Components/Capability/Capability'
import { useSelector } from 'react-redux'
import { selectAllCapabilityIds } from 'Redux/Capabilities/selectors'
import { selectCapabilitiesPagePermission } from 'Redux/PageAccess/selectors'

export default function CapabilitiesList() {

    const selectedCapabilityIds = useSelector(selectAllCapabilityIds)
    const hasEdit = useSelector(state => selectCapabilitiesPagePermission(state, 'edit'))

    return (
        <Stack spacing = {1}>
            {selectedCapabilityIds.map((id, index) => (
                <Capability id = {id} key = {index}/>
            ))}
            {hasEdit
                ? <Capability />
                : <>
                    {selectedCapabilityIds.length === 0 &&
                        <Typography color = 'text.secondary' height = '44px' display = 'flex' alignItems = 'center'>
                            There are no Capability Needs Statements.
                        </Typography>
                    }
                </>
            }
        </Stack>
    )
}