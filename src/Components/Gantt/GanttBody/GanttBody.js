import { Box, Grid, useTheme } from '@mui/material'
import { PropTypes } from 'prop-types'
import { DateConstants, getIsDateInRange } from 'Utilities/dateHelpers'
import { GanttEntry } from '../GanttEntry'

const calculateDividerPosition = (dateRange) => {
    const today = new Date()
    if (getIsDateInRange(today, [dateRange[0].toISOString(), dateRange[1].toISOString()])) {
        return (today - dateRange[0]) / (dateRange[1] - dateRange[0]) * 100
    } else {
        return false
    }
}

function GanttBody({ entries, maxHeight, dateRange }) {
    const theme = useTheme()

    const baseHeight = 56
    const numEntries = entries.length

    const MIN_HEIGHT = baseHeight * numEntries
    let dividerPosition = calculateDividerPosition(dateRange)

    const sxDivider = {
        position: 'absolute',
        left: `${dividerPosition}%`,
        height: '100%',
        width: '3px',
        marginLeft: '10px',
        background: theme.palette.primary.main,
        zIndex: 4
    }

    const sxGridContainer = {
        display: 'flex',
        flexGrow: 1,
        position: 'absolute',
        backgroundColor: theme.palette.background.paper,
        minHeight: (MIN_HEIGHT + 2 + 16) + 'px',
    }

    return (
        <Grid container wrap = 'nowrap' sx = {sxGridContainer}>
            {DateConstants.Month.map((_month, index) => {
                return <Grid
                    container
                    item
                    sx = {{ display: 'flex', minWidth: '112px', flexGrow: '1', borderLeft: '1px solid black' }}
                    key = {index}>
                </Grid>
            })}
            {dividerPosition && <Box sx = {sxDivider}></Box>}
            {entries.map((entry, index) => {
                return (<GanttEntry
                    entry = {entry}
                    index = {index}
                    key = {index}
                    dateRange = {dateRange}
                />)
            })}
        </Grid>
    )
}
GanttBody.propTypes = {
    entries: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        startDate: PropTypes.instanceOf(Date),
        endDate: PropTypes.instanceOf(Date),
        details: PropTypes.string,
        completion: PropTypes.number
    })).isRequired,
    maxHeight: PropTypes.string.isRequired,
    dateRange: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired
}


export default GanttBody
