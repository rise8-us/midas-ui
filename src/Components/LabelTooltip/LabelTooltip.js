import { Grid, Icon, Tooltip, useTheme } from '@material-ui/core'
import { HelpOutline } from '@material-ui/icons'
import PropTypes from 'prop-types'
import React from 'react'

function LabelTooltip({ label, tooltipTitle }) {

    const theme = useTheme()

    return (
        <Grid container direction = 'row' alignItems = 'stretch' spacing = {1}>
            <Grid item>
                {label}
            </Grid>
            <Grid item>
                {tooltipTitle &&
                <Tooltip title = {tooltipTitle} placement = 'top' enterDelay = {500} arrow>
                    <div>
                        <Icon style = {{ color: theme.palette.secondary.dark }} >
                            <HelpOutline viewBox = '0 0 25 25'/>
                        </Icon>
                    </div>
                </Tooltip>
                }
            </Grid>
        </Grid>
    )
}

LabelTooltip.propTypes = {
    label: PropTypes.string.isRequired,
    tooltipTitle: PropTypes.string,
}

LabelTooltip.defaultProps = {
    tooltipTitle: null,
}

export default LabelTooltip