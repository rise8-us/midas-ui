import { Box, Chip, IconButton, makeStyles, rgbToHex, Tooltip, Typography, useTheme } from '@material-ui/core'
import { Cancel } from '@material-ui/icons'
import PropTypes from 'prop-types'
import React from 'react'

const useStyles = makeStyles((theme) => ({
    scopedChip: {
        border: '1px solid',
        backgroundColor: 'transparent',
        height: '20px',
        verticalAlign: 'middle',
        borderRadius: '16px',
    },
    deleteIcon: {
        padding: 0,
        margin: '6px 0px 0px 4px',
        height: 14,
        width: 14,
        color: rgbToHex(theme.palette.secondary.light) + '60',
        '&:hover, &:active': {
            color: rgbToHex(theme.palette.secondary.light) + 'A0',
        }
    }
}))

function Tag({ label, description, color, onDelete, onClick }) {
    const classes = useStyles()
    const theme = useTheme()

    const scope = Array.from(String(label).split('::'))

    const handleDeleteIconClick = (event) => {
        event.stopPropagation()
        onDelete(event)
    }

    const tag = (tagLabel, tagColor) => (
        <Chip
            label = {tagLabel}
            style = {{
                color: tagColor,
                margin: '2px',
                borderColor: tagColor,
                height: '20px'
            }}
            variant = 'outlined'
            size = 'small'
            onDelete = {onDelete}
            onClick = {onClick}
        />
    )

    const scopedTag = (tagLabel, tagColor) => (
        <Box
            className = {classes.scopedChip}
            style = {{ color: tagColor, margin: '2px' }}
            display = 'flex'
            flexDirection = 'row'
            flexWrap = 'none'
            onClick = {onClick}
        >
            <Typography
                variant = 'body2'
                style = {{
                    backgroundColor: tagColor,
                    color: theme.palette.getContrastText(tagColor),
                    height: '19px',
                    borderRadius: '11px 0px 0px 14px',
                    width: 'fit-content',
                    padding: '0px 6px',
                    fontWeight: 'bold',
                    fontSize: 'small'
                }}
            >
                {tagLabel[0]}
            </Typography>
            <Typography
                noWrap
                variant = 'body2'
                style = {{
                    color: tagColor,
                    padding: '0px 6px',
                    borderRadius: '0px 15px 17px 0px',
                    fontWeight: 'bold',
                    fontSize: 'small',
                    width: 'fit-content'
                }}
            >
                {tagLabel[1]}
            </Typography>
            {onDelete &&
                <IconButton onClick = {handleDeleteIconClick} className = {classes.deleteIcon} title = 'delete'>
                    <Cancel viewBox = '0 0 35 35' />
                </IconButton>
            }
        </Box>
    )


    if (scope.length === 1) return (
        <>
            {description ?
                <Tooltip title = {description} placement = 'top' arrow>
                    {tag(scope[0], color)}
                </Tooltip>
                :
                tag(scope[0], color)
            }
        </>
    )
    else return (
        <>
            {description ?
                <Tooltip title = {description} placement = 'top' arrow>
                    {scopedTag(scope, color)}
                </Tooltip>
                :
                scopedTag(scope, color)
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