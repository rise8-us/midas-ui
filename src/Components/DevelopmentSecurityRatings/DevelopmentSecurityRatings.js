import { Grid, makeStyles, Typography } from '@material-ui/core'
import { CircularStatus } from 'Components/CircularStatus'
import PropTypes from 'prop-types'
import React from 'react'

const useStyles = makeStyles((theme) => ({
    label: {
        height: '29px',
        paddingLeft: theme.spacing(1)
    }
}))

const circularProgress = (displayValue, value, color) => (
    <CircularStatus
        thickness = {3}
        displayValue = {displayValue}
        value = {value}
        size = {24}
        fontSize = '.675rem'
        style = {{
            color: color,
            borderRadius: '50%',
            boxShadow: '0 0 15px 0'
        }}
    />
)

function DevelopmentSecurityRatings({ codeCoverage, security, reliability, maintainability }) {
    const classes = useStyles()

    return (
        <Grid container item xs = {8} s = {8} m = {8} direction = 'column' justifyContent = 'center'>
            <Grid container item wrap = 'nowrap' alignItems = 'center' style = {{ maxHeight: '35px' }}>
                <Grid item>
                    {circularProgress(codeCoverage.value, codeCoverage.value, codeCoverage.color)}
                </Grid>
                <Grid item>
                    <Typography color = 'textSecondary' className = {classes.label}>Coverage</Typography>
                </Grid>
            </Grid>
            <Grid container item wrap = 'nowrap' alignItems = 'center' style = {{ maxHeight: '35px' }}>
                <Grid item>
                    {circularProgress(security.value, 100, security.color)}
                </Grid>
                <Grid item>
                    <Typography color = 'textSecondary' className = {classes.label}>Security</Typography>
                </Grid>
            </Grid>
            <Grid container item wrap = 'nowrap' alignItems = 'center' style = {{ maxHeight: '35px' }}>
                <Grid item>
                    {circularProgress(reliability.value, 100, reliability.color)}
                </Grid>
                <Grid item>
                    <Typography color = 'textSecondary' className = {classes.label}>Reliability</Typography>
                </Grid>
            </Grid>
            <Grid container item wrap = 'nowrap' alignItems = 'center' style = {{ maxHeight: '35px' }}>
                <Grid item>
                    {circularProgress(maintainability.value, 100, maintainability.color)}
                </Grid>
                <Grid item>
                    <Typography color = 'textSecondary' className = {classes.label}>Maintainability</Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}

DevelopmentSecurityRatings.propTypes = {
    codeCoverage: PropTypes.shape({
        value: PropTypes.number,
        color: PropTypes.string
    }).isRequired,
    security: PropTypes.shape({
        value: PropTypes.oneOf(['U', 'A', 'B', 'C', 'D', 'E']),
        color: PropTypes.string
    }).isRequired,
    reliability: PropTypes.shape({
        value: PropTypes.oneOf(['U', 'A', 'B', 'C', 'D', 'E']),
        color: PropTypes.string
    }).isRequired,
    maintainability: PropTypes.shape({
        value: PropTypes.oneOf(['U', 'A', 'B', 'C', 'D', 'E']),
        color: PropTypes.string
    }).isRequired
}

export default DevelopmentSecurityRatings