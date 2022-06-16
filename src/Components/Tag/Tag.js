import { Cancel } from '@mui/icons-material'
import { Chip, Tooltip, useTheme } from '@mui/material'
import PropTypes from 'prop-types'

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
            data-testid = 'Tag__chip'
            deleteIcon = {<Cancel title = {`Remove ${tagLabel[0]}`} />}
        />
    )
}

export default function Tag({ label, description, color, onDelete, onClick }) {

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
    color: PropTypes.string,
    description: PropTypes.string,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    onDelete: PropTypes.func,
}

Tag.defaultProps = {
    color: 'black',
    description: null,
    onClick: undefined,
    onDelete: undefined,
}