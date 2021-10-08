import { Grid, Typography } from '@material-ui/core'
import Capability from 'Components/Capability/Capability'
import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllCapabilityIds } from 'Redux/Capabilities/selectors'

function CapabilitiesList({ hasEdit }) {

    const selectedCapabilityIds = useSelector(selectAllCapabilityIds)

    return (
        <Grid container direction = 'column'>
            {selectedCapabilityIds.map((id, index) => (
                <Grid item key = {index} style = {{ paddingBottom: 10 }}>
                    <Capability id = {id} hasEdit = {hasEdit}/>
                </Grid>
            ))}
            {!hasEdit && selectedCapabilityIds.length === 0 &&
                <Typography color = 'textSecondary' variant = 'body2' style = {{ paddingTop: 10, paddingBottom: 13 }}>
                    There are no Capability Needs Statements to display.
                </Typography>
            }
            {hasEdit &&
                <Grid item>
                    <Capability hasEdit = {hasEdit}/>
                </Grid>
            }
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