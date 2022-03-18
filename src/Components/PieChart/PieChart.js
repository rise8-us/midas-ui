import PropTypes from 'prop-types'
import { PieChart as ReactMinimalPieChart } from 'react-minimal-pie-chart'

function PieChart({ size, data, label, ...PieChartProps }) {
    return (
        <div style = {{ height: size, width: size, minWidth: size, minHeight: size }}>
            <div style = {{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                height: '100%',
            }}>{label}</div>
            <div style = {{ bottom: size, position: 'relative' }}>
                <ReactMinimalPieChart
                    {...PieChartProps}
                    animate
                    startAngle = {270}
                    data = {data}
                    background = '#93939320'
                    segmentsStyle = {(index) => ({
                        filter: `drop-shadow(0 0 4px ${data[index]?.color}`
                    })}
                />
            </div>
        </div>
    )
}

PieChart.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        color: PropTypes.string,
        title: PropTypes.string
    })).isRequired,
    radius: PropTypes.number,
    lineWidth: PropTypes.number,
    size: PropTypes.string,
    reveal: PropTypes.number,
    label: PropTypes.node,
    rounded: PropTypes.bool
}

PieChart.defaultProps = {
    radius: 43,
    lineWidth: 20,
    size: '175px',
    reveal: null,
    label: null,
    rounded: false
}

export default PieChart