import { PropTypes } from 'prop-types'
import { cellStyles, rowStyles } from 'Utilities/ganttHelpers'

export default function GanttHeader(props) {
    const { columns, chartBackgroundColor, borderColor, titleComponent, ...titleProps } = props
    const TitleComponent = titleComponent

    const containerStyle = {
        ...rowStyles(chartBackgroundColor, borderColor),
        position: 'sticky',
        top: 0,
        zIndex: 5,
    }

    return (
        <div style = {containerStyle} data-testid = 'GanttHeader__wrap'>
            {columns.map((column, index) => (
                <div
                    style = {cellStyles(borderColor, column.flexGrow)}
                    data-testid = {'GanttHeader__column-' + index}
                    key = {index}
                >
                    <TitleComponent {...titleProps}>
                        {column.title}
                    </TitleComponent>
                </div>
            ))}
        </div>
    )
}

GanttHeader.propTypes = {
    borderColor: PropTypes.string,
    chartBackgroundColor: PropTypes.string,
    columns: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        flexGrow: PropTypes.number
    })),
    titleComponent: PropTypes.elementType
}

GanttHeader.defaultProps = {
    borderColor: '#d8d8d8',
    chartBackgroundColor: '#fff',
    columns: [],
    titleComponent: 'p'
}