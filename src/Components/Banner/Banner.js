import { Box, makeStyles } from '@material-ui/core'
import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import useWindowSize from '../../Hooks/useWindowSize'

const useStyles = makeStyles(() => ({
    banner: {
        zIndex: 1,
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        position: 'fixed'
    }
}))

function Banner({ children }) {
    const classes = useStyles()
    const window = useWindowSize()

    const classification = useSelector(state => state.app.classification)

    const bottomBannerTopStyle = window.height - 20
    let banner = 'NOT CONNECTED TO SERVER'

    if (classification.name) banner = String(classification.name)
    if (classification.caveat) banner = banner + `//${classification.caveat}`

    const bannerStyle = {
        backgroundColor: classification.backgroundColor ? classification.backgroundColor : '#DBDBDB',
        color: classification.textColor ? classification.textColor : '#000000'
    }

    return (
        <>
            <Box className = {classes.banner} style = {bannerStyle}>
                {banner}
            </Box>
            <>{children}</>
            <Box className = {classes.banner} style = {{ top: `${bottomBannerTopStyle}px`, ...bannerStyle }}>
                {banner}
            </Box>
        </>
    )
}

Banner.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.arrayOf(PropTypes.element)
    ]).isRequired
}

export default Banner