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

const Header = (props) => {
    const classes = useStyles()

    return (
        <Box className = {classes.row}>
            <Box className = {classes.box} data-testid = 'Account__header'>
                <Typography variant = {props.titleVariant} color = 'textPrimary'>{props.title}</Typography>
                <Typography variant = {props.subtitleVariant} color = 'textSecondary'>{props.subtitle}</Typography>
            </Box>
            {props.icon}
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
