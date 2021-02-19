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

function Banner(props) {
    const classes = useStyles()
    const window = useWindowSize()

    const classification = useSelector(state => state.info.classification)
    if (!classification) return (<div data-testid = 'Banner__empty'>{props.children}</div>)

    const bottomBannerTopStyle = window.height - 20
    const banner = `${classification.name}//${classification.caveat}`
    const bannerStyle = { backgroundColor: classification.backgroundColor, color: classification.textColor }

    return (
        <>
            <Box className = {classes.banner} style = {bannerStyle}>
                {banner}
            </Box>
            <>{props.children}</>
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