import { Typography, useTheme } from '@mui/material'
import { PropTypes } from 'prop-types'
import { useMemo } from 'react'
import { getMonthAbbreviated } from 'Utilities/dateHelpers'

function GanttHeader({ dateRange }) {
    const theme = useTheme()

    const monthArray = useMemo(() => {
        let currentMonth = dateRange[0].getMonth()
        const monthOrder = []

        for (let i = 0; i < 12; i++) {
            monthOrder.push(currentMonth)
            currentMonth = (currentMonth + 1) % 12
        }
        return monthOrder
    }, [dateRange])

    const sxGridContainer = {
        display: 'flex',
        position: 'sticky',
        top: 0,
        zIndex: 5,
        backgroundColor: theme.palette.background.paper,
        borderBottom: '1px solid black',
    }

    const columnStyle = {
        borderLeft: '1px solid black',
        flexGrow: 1
    }

    return (
        <div style = {sxGridContainer}>
            {monthArray.map((monthIndex, index) => (
                <div style = {columnStyle} key = {index}>
                    <Typography
                        variant = 'h6'
                        width = {0}
                        sx = {{ color: theme.palette.grey[600], marginLeft: 1 }}
                    >
                        {getMonthAbbreviated(monthIndex)}
                    </Typography>
                </div>
            ))}
        </div>
    )
}

GanttHeader.propTypes = {
    dateRange: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired
}
export default GanttHeader