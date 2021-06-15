import { Box, CircularProgress, Tooltip, Typography } from '@material-ui/core'
import PropTypes from 'prop-types'
import React from 'react'

function CircularStatus(props) {
    const { title, titleAdornment, variant, value, displayValue, size, tooltip, ...colors } = props
    const { valueColor, displayValueColor, titleColor } = colors

    return (
        <Box display = 'flex' justifyContent = 'space-around' flexDirection = 'column'>
            {title &&
                <div style = {{ display: 'flex' }}>
                    <Typography
                        variant = 'subtitle2'
                        color = 'textSecondary'
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
                    />
                    <Tooltip title = {tooltip} PopperProps = {{ style: { display: tooltip ? 'unset' : 'none' } }}>
                        <Typography
                            variant = 'subtitle2'
                            style = {{
                                lineHeight: `${size}px`,
                                position: 'absolute',
                                width: '100%',
                                margin: 'auto',
                                textAlign: 'center',
                                color: displayValueColor,
                            }}
                        >{isNaN(displayValue) ? displayValue : String(parseInt(displayValue))}</Typography>
                    </Tooltip>
                </Box>
            </div>
        </Box>
    )
}

CircularStatus.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    valueColor: PropTypes.string,
    title: PropTypes.string,
    titleAdornment: PropTypes.node,
    titleColor: PropTypes.string,
    variant: PropTypes.oneOf(['static', 'determinate', 'indeterminate']),
    displayValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    displayValueColor: PropTypes.string,
    size: PropTypes.number,
    tooltip: PropTypes.string,
}

CircularStatus.defaultProps = {
    title: null,
    titleAdornment: null,
    titleColor: 'unset',
    variant: 'determinate',
    displayValue: null,
    valueColor: 'inherit',
    displayValueColor: 'inherit',
    size: 36,
    tooltip: '',
}

export default CircularStatus