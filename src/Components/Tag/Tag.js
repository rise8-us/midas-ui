import { Box, Chip, makeStyles, Tooltip, Typography, useTheme } from '@material-ui/core'
import PropTypes from 'prop-types'
import React from 'react'

const useStyles = makeStyles(() => ({
    scopedChip: {
        border: '1px solid',
        backgroundColor: 'transparent',
        height: '20px',
        verticalAlign: 'middle',
        borderRadius: '16px',
    }
}))

function Tag({ label, description, color }) {
    const classes = useStyles()
    const theme = useTheme()

    const scope = Array.from(label.split('::'))

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
        />
    )

    const scopedTag = (tagLabel, tagColor) => (
        <Box
            className = {classes.scopedChip}
            style = {{ color: tagColor, margin: '2px' }}
            display = 'flex'
            flexDirection = 'row'
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
    color: PropTypes.string.isRequired
}

Tag.defaultProps = {
    description: null
}
export default Tag