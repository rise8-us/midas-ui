import { AddCircleOutline, ArrowCircleLeftOutlined, ArrowCircleRightOutlined, Link } from '@mui/icons-material'
import { Box, Button, Divider, Grid, Stack } from '@mui/material'
import { CapabilityDescription, CapabilityTitle, NoCapabilitiesOptions } from 'Components/Capability'
import { CapabilityCard } from 'Components/Cards/CapabilityCard'
import { DeliverablesContainer, DeliverablesView } from 'Components/Deliverables'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectPortfolioPageSettings } from 'Redux/AppSettings/selectors'
import { requestCreateCapability } from 'Redux/Capabilities/actions'
import { selectCapabilitiesByPortfolioId } from 'Redux/Capabilities/selectors'
import { requestSearchDeliverables } from 'Redux/Deliverables/actions'
import { selectPortfolioPagePermission } from 'Redux/PageAccess/selectors'
import { openPopup } from 'Redux/Popups/actions'
import { buildOrQueryByIds } from 'Utilities/requests'

export default function PortfolioCapabilities({ portfolioId }) {
    const dispatch = useDispatch()

    const capabilities = useSelector(state => selectCapabilitiesByPortfolioId(state, portfolioId))
    const pagePermissions = useSelector(state => selectPortfolioPagePermission(state, portfolioId))
    const pageSettings = useSelector(state => selectPortfolioPageSettings(state, portfolioId))
    const [viewingCapability, setViewingCapability] = useState(0)
    const [fetched, setFetched] = useState(false)

    const { selectedDeliverableId } = pageSettings

    const handleChange = (value) => {
        const newValue = viewingCapability + value
        setViewingCapability(newValue)
        fetchDeliverablesByIds(capabilities[newValue].deliverableIds)
    }

    const createCapability = () => {
        dispatch(requestCreateCapability({
            referenceId: capabilities.length + 1,
            portfolioId,
            title: 'Enter new requirement here',
        })).then(() => { setViewingCapability(capabilities.length) })
    }

    const fetchDeliverablesByIds = (ids) => {
        ids?.length > 0 && dispatch(requestSearchDeliverables(buildOrQueryByIds(ids)))
    }

    useEffect(() => {
        if (!fetched && capabilities[viewingCapability]?.deliverableIds?.length > 0) {
            fetchDeliverablesByIds(capabilities[viewingCapability].deliverableIds)
            setFetched(true)
        }
    }, [capabilities])

    const options = [
        {
            text: 'Add new',
            icon: <AddCircleOutline />,
            onClick: () => createCapability()
        }, {
            text: 'Link existing',
            icon: <Link />,
            onClick: () => dispatch(openPopup('LinkCapabilityPopup', 'LinkCapabilityPopup', { portfolioId }))
        }
    ]

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
            <Grid item lg = {6} xs = {12} marginBottom = {4}>
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
                    <Stack>
                        <Box display = 'flex' justifyContent = 'space-between'>
                            <Button
                                disabled = {viewingCapability === 0}
                                onClick = {() => handleChange(-1)}
                                data-testid = 'PortfolioCapabilities__previous-button'
                                startIcon = {<ArrowCircleLeftOutlined />}
                            >
                                Previous
                            </Button>
                            <Button
                                disabled = {viewingCapability === capabilities.length - 1}
                                onClick = {() => handleChange(1)}
                                data-testid = 'PortfolioCapabilities__next-button'
                                endIcon = {<ArrowCircleRightOutlined />}
                            >
                                Next
                            </Button>
                        </Box>
                        <Divider style = {{ padding: '4px 0' }}/>
                        <Box paddingLeft = {4}>
                            <DeliverablesContainer
                                capabilityId = {capabilities[viewingCapability]?.id}
                                portfolioId = {portfolioId}
                            />
                        </Box>
                    </Stack>
                </CapabilityCard>
            </Grid>
            <Grid item lg = {6}>
                <DeliverablesView
                    portfolioId = {portfolioId}
                    selectedDeliverableId = {selectedDeliverableId}
                    hasEdit = {pagePermissions.edit}
                />
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
