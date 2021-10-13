import { alpha, Grid, Icon, makeStyles, Tooltip, Typography } from '@material-ui/core'
import { HelpOutline } from '@material-ui/icons'
import PropTypes from 'prop-types'
import React from 'react'

const useStyles = makeStyles(theme => ({
    icon: {
        borderRadius: '50%',
        display: 'flex',
        cursor: 'help',
        color: alpha(theme.palette.secondary.main, .5)
    }
}))

function LabelTooltip({ text, iconFontSize, typographyProps, tooltipProps }) {
    const classes = useStyles()

    return (
        <Grid container direction = 'row' alignItems = 'stretch' spacing = {1}>
            <Grid item>
                <Typography {...typographyProps}>{text}</Typography>
            </Grid>
            <Grid item style = {{ display: 'flex', alignItems: 'center' }}>
                {tooltipProps.title ?
                    <Tooltip {...tooltipProps} >
                        <Icon className = {classes.icon} fontSize = {iconFontSize} data-testid = 'LabelTooltip__icon'>
                            <HelpOutline fontSize = {iconFontSize}/>
                        </Icon>
                    </Tooltip>
                    :
                    null
                }
            </Grid>
        </Grid>
    )
}

LabelTooltip.propTypes = {
    text: PropTypes.string.isRequired,
    iconFontSize: PropTypes.oneOf(['inherit', 'small', 'medium', 'large']),
    typographyProps: PropTypes.shape({
        variant: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2',
            'body1', 'body2', 'button', 'caption', 'overline']),
        color: PropTypes.oneOf(['textPrimary', 'textSecondary', 'primary', 'secondary'])
    }),
    tooltipProps: PropTypes.shape({
        title: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
    })
}

LabelTooltip.defaultProps = {
    iconFontSize: 'medium',
    typographyProps: undefined,
    tooltipProps: {
        title: undefined
    }
}

export default LabelTooltip