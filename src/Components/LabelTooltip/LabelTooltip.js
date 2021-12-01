import { HelpOutline } from '@mui/icons-material'
import { Grid, Icon, Tooltip, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import React from 'react'

function LabelTooltip({ text, iconFontSize, typographyProps, tooltipProps }) {

    return (
        <Grid container flexWrap = 'nowrap'>
            <Grid item zeroMinWidth>
                <Typography {...typographyProps}>{text}</Typography>
            </Grid>
            <Grid item zeroMinWidth style = {{ display: 'flex', alignItems: 'center' }}>
                {tooltipProps.title ?
                    <Tooltip {...tooltipProps} >
                        <Icon
                            sx = {{
                                borderRadius: '50%',
                                display: 'flex',
                                cursor: 'help',
                                color: 'text.secondary',
                                ml: '4px'
                            }}
                            fontSize = {iconFontSize}
                            data-testid = 'LabelTooltip__icon'
                        >
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
        color: PropTypes.oneOf(['text.primary', 'text.secondary', 'primary', 'secondary'])
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