import { Box, makeStyles, Typography } from '@material-ui/core'
import PropTypes from 'prop-types'
import React from 'react'

const useStyles = makeStyles(() => ({
    box: {
        display: 'flex',
        flexDirection: 'column',
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '16px'
    }
}))

function Header({ title, subtitle, titleVariant, subtitleVariant, icon }) {
    const classes = useStyles()

    return (
        <Box className = {classes.row}>
            <Box className = {classes.box} data-testid = 'Account__header'>
                <Typography variant = {titleVariant} color = 'textPrimary'>{title}</Typography>
                <Typography variant = {subtitleVariant} color = 'textSecondary'>{subtitle}</Typography>
            </Box>
            {icon}
        </Box>
    )
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
    titleVariant: PropTypes.string,
    subtitle: PropTypes.string,
    subtitleVariant: PropTypes.string,
    icon: PropTypes.element
}

Header.defaultProps = {
    titleVariant: 'h4',
    subtitleVariant: 'h6',
    subtitle: '',
    icon: null
}

export default Header
