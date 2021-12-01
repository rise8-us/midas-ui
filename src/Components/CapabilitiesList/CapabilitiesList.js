import { Grid, Typography } from '@mui/material'
import Capability from 'Components/Capability/Capability'
import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllCapabilityIds } from 'Redux/Capabilities/selectors'

function CapabilitiesList({ hasEdit }) {

    const selectedCapabilityIds = useSelector(selectAllCapabilityIds)

    return (
        <Grid container direction = 'column' rowSpacing = {1}>
            {selectedCapabilityIds.map((id, index) => (
                <Grid item key = {index}>
                    <Capability id = {id} hasEdit = {hasEdit}/>
                </Grid>
            ))}
            <Grid item>
                {hasEdit
                    ? <Capability hasEdit = {hasEdit}/>
                    : <>
                        {selectedCapabilityIds.length === 0 &&
                            <Typography
                                color = 'text.secondary'
                                height = '44px'
                                display = 'flex'
                                alignItems = 'center'
                            >
                                There are no Capability Needs Statements.
                            </Typography>
                        }
                    </>
                }
            </Grid>
        </Grid>
    )
}

CapabilitiesList.propTypes = {
    hasEdit: PropTypes.bool
}

CapabilitiesList.defaultProps = {
    hasEdit: false
}

export default CapabilitiesList