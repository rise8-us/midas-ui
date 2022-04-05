import { Grid, Typography, useTheme } from '@mui/material'
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
        position: 'sticky',
        top: 0,
        backgroundColor: theme.palette.background.paper,
        width: '100%',
        borderBottom: '1px solid black',
        zIndex: 5
    }

    return (
        <Grid container wrap = 'nowrap' sx = {sxGridContainer}>
            {monthArray.map((monthIndex, index) => (
                <Grid container item sx = {{ minWidth: '112px', borderLeft: '1px solid black' }} key = {index}>
                    <Typography variant = 'h6' sx = {{ color: theme.palette.grey[600], marginLeft: 1 }}>
                        {getMonthAbbreviated(monthIndex)}
                    </Typography>
                </Grid>
            ))}
        </Grid>
    )
}

GanttHeader.propTypes = {
    dateRange: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired
}
export default GanttHeader
