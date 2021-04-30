import { makeStyles, Typography } from '@material-ui/core'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import { ExpandMore } from '@material-ui/icons'
import PropTypes from 'prop-types'
import React from 'react'

const useStyles = makeStyles((theme) => ({
    heading: {
        ...theme.typography.h6,
    }
}))

function OGSMHeader({ category, detail }) {
    const classes = useStyles()

    return (
        <AccordionSummary expandIcon = {<ExpandMore data-testid = {`OGSMHeader__icon-${category}`} />} >
            <Typography className = {classes.heading} color = 'textSecondary'>
                {category}:
            </Typography>
            <Typography variant = 'h6' style = {{ margin: 'auto 0', paddingLeft: '4px' }}>
                {detail}
            </Typography>
        </AccordionSummary>
    )
}
OGSMHeader.propTypes = {
    category: PropTypes.string.isRequired,
    detail: PropTypes.string.isRequired
}

export default OGSMHeader