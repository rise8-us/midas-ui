import { Typography } from '@mui/material'
import PropTypes from 'prop-types'
import React from 'react'

function LegendItem({ color, text }) {
    return (
        <div style = {{ width: 'fit-content', display: 'flex', alignItems: 'center' }}>
            <div
                style = {{
                    height: '16px',
                    width: '16px',
                    backgroundColor: color,
                    display: 'inline-block',
                    borderRadius: '50%',
                }}
                data-testid = 'LegendItem__circle'
            />
            <Typography
                style = {{ paddingLeft: '5px', whiteSpace: 'nowrap' }}
                color = 'text.secondary'
                variant = 'body2'
            >{text}</Typography>
        </div>
    )
}

LegendItem.propTypes = {
    color: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
}

export default LegendItem