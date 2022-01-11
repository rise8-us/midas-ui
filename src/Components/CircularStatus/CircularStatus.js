import { Box, CircularProgress, Tooltip, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import React from 'react'
function CircularStatus(props) {

    const { title, titleAdornment, variant, value, displayValue, size, tooltip, interactive, ...more } = props
    const { valueColor, displayValueColor, titleColor, fontSize, ...circularProgressProps } = more
    return (

        <Box display = 'flex' justifyContent = 'space-around' flexDirection = 'column'>
            {title &&
                <div style = {{ display: 'flex' }}>
                    <Typography
                        variant = 'subtitle2'
                        color = 'text.secondary'
                        style = {{
                            alignSelf: 'center',
                            margin: '4px 0',
                            color: titleColor,
                        }}
                    >{title}</Typography>
                    {titleAdornment}
                </div>
            }
            <div style = {{ alignSelf: 'center' }}>
                <Box position = 'relative' display = 'inline-flex'>
                    <CircularProgress
                        variant = {variant}
                        value = {value}
                        style = {{
                            color: valueColor
                        }}
                        size = {size}
                        {...circularProgressProps}
                    />
                    <Tooltip
                        title = {tooltip}
                        leaveDelay = {250}
                        PopperProps = {{
                            style: {
                                display: tooltip ? 'unset' : 'none',
                                minWidth: '350px',
                            }
                        }}
                        disableInteractive = {!interactive}
                    >
                        <Typography
                            variant = 'subtitle2'
                            style = {{
                                lineHeight: `${size}px`,
                                position: 'absolute',
                                width: '100%',
                                margin: 'auto',
                                textAlign: 'center',
                                color: displayValueColor,
                                fontSize
                            }}
                        >{isNaN(displayValue) ? displayValue : String(parseInt(displayValue))}</Typography>
                    </Tooltip>
                </Box>
            </div>
        </Box>
    )
}

CircularStatus.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    valueColor: PropTypes.string,
    title: PropTypes.string,
    titleAdornment: PropTypes.node,
    titleColor: PropTypes.string,
    variant: PropTypes.oneOf(['static', 'determinate', 'indeterminate']),
    displayValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    displayValueColor: PropTypes.string,
    size: PropTypes.number,
    tooltip: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    interactive: PropTypes.bool,
    fontSize: PropTypes.string,
}

CircularStatus.defaultProps = {
    title: null,
    titleAdornment: null,
    titleColor: 'unset',
    value: 0,
    variant: 'determinate',
    displayValue: null,
    valueColor: 'inherit',
    displayValueColor: 'inherit',
    size: 36,
    tooltip: '',
    interactive: false,
    fontSize: '.875rem'
}

export default CircularStatus