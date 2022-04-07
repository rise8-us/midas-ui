import { AddCircleOutline, Link } from '@mui/icons-material'
import { Box, Divider, Grid, IconButton } from '@mui/material'
import { CapabilitiesView } from 'Components/CapabilitiesView'
import { CapabilityDescription, CapabilityTitle, NoCapabilitiesOptions } from 'Components/Capability'
import { CapabilityCard } from 'Components/Cards/CapabilityCard'
import { DeliverablesContainer } from 'Components/DeliverablesContainer'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestCreateCapability } from 'Redux/Capabilities/actions'
import { selectCapabilitiesByPortfolioId } from 'Redux/Capabilities/selectors'
import { requestSearchDeliverables } from 'Redux/Deliverables/actions'
import { selectPortfolioPagePermission } from 'Redux/PageAccess/selectors'
import { openPopup } from 'Redux/Popups/actions'
import { buildOrQueryByIds } from 'Utilities/requests'

export default function PortfolioCapabilities({ portfolioId }) {
    const dispatch = useDispatch()

    const [viewingCapability, setViewingCapability] = useState(0)
    const capabilities = useSelector(state => selectCapabilitiesByPortfolioId(state, portfolioId))
    const pagePermissions = useSelector(state => selectPortfolioPagePermission(state, portfolioId))

    const handleChange = (value) => {
        setViewingCapability(prev => prev + value)
    }

    const createCapability = () => {
        dispatch(requestCreateCapability({
            referenceId: capabilities.length + 1,
            portfolioId,
            title: 'Enter new requirement here',
        })).then(() => { setViewingCapability(capabilities.length) })
    }

    const options = [
        {
            text: 'Add new',
            icon: <AddCircleOutline />,
            onClick: createCapability
        }, {
            text: 'Link existing',
            icon: <Link />,
            onClick: () => dispatch(openPopup('LinkCapabilityPopup', 'LinkCapabilityPopup', { portfolioId }))
        }
    ]

    useEffect(() => {
        capabilities[viewingCapability]?.deliverableIds?.length > 0 &&
            dispatch(requestSearchDeliverables(buildOrQueryByIds(capabilities[viewingCapability].deliverableIds)))
    }, [capabilities])


    if (capabilities.length === 0) {
        return (
            <NoCapabilitiesOptions
                portfolioId = {portfolioId}
                onCreate = {setViewingCapability}
            />
        )
    }

    return (
        <Grid container direction = 'row' data-testid = 'PortfolioCapabilities__parent-grid'>
            <Grid item lg = {6}>
                <CapabilityCard
                    title = {
                        <CapabilityTitle
                            capability = {capabilities[viewingCapability]}
                            onDelete = {setViewingCapability}
                            canEdit = {pagePermissions.edit ?? false}
                            showMoreOptions
                            options = {options}
                            showDelete
                        />
                    }
                    subheader = {
                        <CapabilityDescription
                            canEdit = {pagePermissions.edit ?? false}
                            capability = {capabilities[viewingCapability]}
                            renderEmptyOnReadOnly = {false}
                        />
                    }
                >
                    <Box>
                        <IconButton
                            disabled = {viewingCapability === 0}
                            onClick = {() => handleChange(-1)}
                            data-testid = 'PortfolioCapabilities__previous-button'
                        >
                            Previous
                        </IconButton>
                        <IconButton
                            disabled = { viewingCapability === capabilities.length - 1}
                            onClick = {() => handleChange(1)}
                            data-testid = 'PortfolioCapabilities__next-button'
                        >
                            Next
                        </IconButton>
                        <Divider style = {{ padding: '4px 0' }}/>
                    </Box>
                    <Box paddingLeft = {4}>
                        <DeliverablesContainer capabilityId = {capabilities[viewingCapability]?.id}/>
                    </Box>
                </CapabilityCard>
            </Grid>
            <Grid item lg = {6}>
                <CapabilitiesView />
            </Grid>
        </Grid>
    )
}

PortfolioCapabilities.propTypes = {
    portfolioId: PropTypes.number
}

PortfolioCapabilities.defaultProps = {
    portfolioId: null
}
