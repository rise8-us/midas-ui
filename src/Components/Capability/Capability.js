import { Divider, Grid } from '@mui/material'
import { alpha } from '@mui/system'
import { CapabilityDescription, CapabilityTitle } from 'Components/Capability'
import { DeliverablesContainer } from 'Components/DeliverablesContainer'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCapabilityPageSettings } from 'Redux/AppSettings/selectors'
import { selectCapabilityById } from 'Redux/Capabilities/selectors'
import { requestSearchDeliverables } from 'Redux/Deliverables/actions'
import { selectCapabilitiesPagePermission } from 'Redux/PageAccess/selectors'
import { styled } from 'Styles/materialThemes'

const StyledGrid = styled(Grid)(({ theme, selected }) => ({
    padding: theme.spacing(1),
    border: '1px solid',
    borderRadius: theme.spacing(1),
    borderColor: selected ? theme.palette.text.primary : alpha(theme.palette.secondary.main, .4),
    '&:hover': {
        borderColor: theme.palette.text.primary,
    },
}))

export default function Capability({ id }) {
    const dispatch = useDispatch()

    useEffect(() => {
        id > 0 && dispatch(requestSearchDeliverables('capability.id:' + id))
    }, [id])

    const canEdit = useSelector(state => selectCapabilitiesPagePermission(state, 'edit'))
    const capabilityPageSettings = useSelector(selectCapabilityPageSettings)
    const capability = useSelector((state) => selectCapabilityById(state, id))
    const isCreate = capability.id === undefined

    return (
        <StyledGrid
            container
            direction = 'column'
            selected = {capability.deliverableIds?.includes(capabilityPageSettings.selectedDeliverableId)}
        >
            <Grid item>
                <CapabilityTitle
                    capability = {capability}
                    canEdit = {canEdit}
                    showDelete = {!isCreate}
                    color = {isCreate ? 'secondary' : 'primary'}
                    placeholder = 'NEW CAPABILITY NEEDS STATEMENT'
                    clearAfterSave = {isCreate}
                    revertOnEmpty
                />
            </Grid>
            <Grid item paddingLeft = '30px'>
                {!isCreate && (canEdit || capability.description) &&
                    <CapabilityDescription
                        canEdit = {canEdit}
                        capability = {capability}
                        placeholder = 'Enter Operational Context'
                    />
                }
                {!isCreate &&
                    <>
                        <Divider style = {{ padding: '4px 0' }}/>
                        <DeliverablesContainer capabilityId = {id}/>
                    </>
                }
            </Grid>
        </StyledGrid>
    )
}

Capability.propTypes = {
    id: PropTypes.number
}

Capability.defaultProps = {
    id: undefined
}