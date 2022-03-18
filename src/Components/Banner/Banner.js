import { Box } from '@mui/material'
import useWindowSize from 'Hooks/useWindowSize'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const styles = {
    zIndex: 10000,
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    position: 'fixed',
    lineHeight: '20px',
    fontSize: '0.875rem'
}

function Banner({ children }) {

    const window = useWindowSize()

    const classification = useSelector(state => state.app.classification)

    const bottomBannerTopStyle = window.height - 20
    let banner = 'NOT CONNECTED TO SERVER'

    if (classification.name) banner = String(classification.name)
    if (classification.caveat) banner = banner + `//${classification.caveat}`

    const bannerStyle = {
        ...styles,
        backgroundColor: classification.backgroundColor ?? '#DBDBDB',
        color: classification.textColor ?? '#000000',
    }

    return (
        <>
            <Box style = {bannerStyle}>
                {banner}
            </Box>
            <>{children}</>
            <Box style = {{ top: `${bottomBannerTopStyle}px`, ...bannerStyle }}>
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