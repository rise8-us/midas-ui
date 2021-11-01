import { Cancel } from '@mui/icons-material'
import { Chip, Tooltip, useTheme } from '@mui/material'
import PropTypes from 'prop-types'
import React from 'react'

const generateLabel = (label, scope) => {
    if (scope) return `${scope} | ${label}`
    else return label
}

const buildTag = (tagLabel, tagColor, actions) => {
    const theme = useTheme()

    return (
        <Chip
            label = {generateLabel(tagLabel[0], tagLabel[1])}
            style = {{
                color: theme.palette.text.primary,
                margin: '2px',
                borderColor: tagColor,
                height: '20px'
            }}
            variant = 'outlined'
            size = 'small'
            onClick = {actions.onClick}
            onDelete = {actions.onDelete}
            deleteIcon = {<Cancel title = {`Remove ${tagLabel[0]}`} />}
        />
    )
}

function Tag({ label, description, color, onDelete, onClick }) {

    const labelArray = Array.from(String(label).split('::')).reverse()

    return (
        <>
            {description ?
                <Tooltip title = {description} placement = 'top' arrow>
                    {buildTag(labelArray, color, { onDelete, onClick })}
                </Tooltip>
                :
                buildTag(labelArray, color, { onDelete, onClick })
            }
        </>
    )
}

Tag.propTypes = {
    label: PropTypes.string.isRequired,
    description: PropTypes.string,
    color: PropTypes.string.isRequired,
    onDelete: PropTypes.func,
    onClick: PropTypes.func,
}

Tag.defaultProps = {
    description: null,
    onDelete: undefined,
    onClick: undefined,
}

export default Tag