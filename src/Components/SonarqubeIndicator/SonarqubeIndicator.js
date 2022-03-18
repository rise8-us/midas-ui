import { useTheme } from '@mui/material'
import PropTypes from 'prop-types'
import { CircularStatus } from '../CircularStatus'

function SonarqubeIndicator({ title, value, adornment, tooltip }) {
    const theme = useTheme()

    const determineColor = (indicatorValue) => {
        if (indicatorValue === 'A' || indicatorValue >= 80) return theme.palette.success.main
        else if (['B', 'C'].includes(indicatorValue) || indicatorValue >= 55) return theme.palette.warning.main
        else if (['D', 'E'].includes(indicatorValue) || indicatorValue < 55) return theme.palette.error.main
        else return theme.palette.info.main
    }

    return (
        <CircularStatus
            title = {title}
            titleColor = {theme.palette.text.primary}
            value = {typeof value === 'number' ? value : 100}
            valueColor = {determineColor(value)}
            displayValue = {value}
            displayValueColor = {determineColor(value)}
            titleAdornment = {adornment}
            tooltip = {tooltip}
            interactive
        />
    )
}

SonarqubeIndicator.propTypes = {
    title: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    adornment: PropTypes.node,
    tooltip: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
}

SonarqubeIndicator.defaultProps = {
    title: '?',
    value: '?',
    adornment: null,
    tooltip: ''
}

export default SonarqubeIndicator