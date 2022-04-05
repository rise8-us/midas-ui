import { Button, useTheme } from '@mui/material'
import { PropTypes } from 'prop-types'
import { useState } from 'react'
import { GanttBody } from '../GanttBody'
import { GanttHeader } from '../GanttHeader'

const mockEntries = [
    {
        title: 'Create Midas App',
        startDate: new Date('2020-12-15'),
        endDate: new Date('2021-11-01'),
        details: 'some deets'
    }, {
        title: 'Create User Profiles',
        startDate: new Date('2021-03-01'),
        endDate: new Date('2021-10-16'),
        details: 'some deets',
        completion: 67
    }, {
        title: 'Create Products Page',
        startDate: new Date('2021-07-01'),
        endDate: new Date('2021-12-01'),
        details: 'some deets',
        completion: 24
    }, {
        title: 'Create Portfolios',
        startDate: new Date('2022-10-01'),
        endDate: new Date('2023-2-01'),
        details: 'some deets',
        completion: 24
    }, {
        title: 'test entry4',
        startDate: new Date('2022-10-01'),
        endDate: new Date('2023-2-01'),
        details: 'some deets',
        completion: 24
    }, {
        title: 'test entry2',
        startDate: new Date('2022-07-01'),
        endDate: new Date('2023-2-01'),
        details: 'some deets',
        completion: 24
    }, {
        title: 'test entry3',
        startDate: new Date('2022-10-01'),
        endDate: new Date('2023-2-01'),
        details: 'some deets',
        completion: 24
    }, {
        title: 'test entry4',
        startDate: new Date('2022-10-01'),
        endDate: new Date('2023-2-01'),
        details: 'some deets',
        completion: 24
    }, {
        title: 'test entry2',
        startDate: new Date('2022-03-01'),
        endDate: new Date('2022-07-16'),
        details: 'some deets',
        completion: 67
    }, {
        title: 'test entry2',
        startDate: new Date('2022-07-01'),
        endDate: new Date('2023-2-01'),
        details: 'some deets',
        completion: 24
    }, {
        title: 'test entry3',
        startDate: new Date('2022-10-01'),
        endDate: new Date('2023-2-01'),
        details: 'some deets',
        completion: 24
    }, {
        title: 'test entry4',
        startDate: new Date('2022-10-01'),
        endDate: new Date('2023-2-01'),
        details: 'some deets',
        completion: 24
    }, {
        title: 'test entry2',
        startDate: new Date('2022-07-01'),
        endDate: new Date('2023-2-01'),
        details: 'some deets',
        completion: 24
    }, {
        title: 'test entry3',
        startDate: new Date('2022-10-01'),
        endDate: new Date('2023-2-01'),
        details: 'some deets',
        completion: 24
    }, {
        title: 'test entry4',
        startDate: new Date('2022-10-01'),
        endDate: new Date('2023-2-01'),
        details: 'some deets',
        completion: 24
    }, {
        title: 'first entry from last year',
        startDate: new Date('2021-11-15'),
        endDate: new Date('2022-06-01'),
        details: 'some deets',
        completion: 95
    }, {
        title: 'test entry2',
        startDate: new Date('2022-03-01'),
        endDate: new Date('2022-07-16'),
        details: 'some deets',
        completion: 67
    }, {
        title: 'test entry2',
        startDate: new Date('2022-07-01'),
        endDate: new Date('2023-2-01'),
        details: 'some deets',
        completion: 24
    }, {
        title: 'test entry3',
        startDate: new Date('2022-10-01'),
        endDate: new Date('2023-2-01'),
        details: 'some deets',
        completion: 24
    }, {
        title: 'test entry4',
        startDate: new Date('2022-10-01'),
        endDate: new Date('2023-2-01'),
        details: 'some deets',
        completion: 24
    }, {
        title: 'test entry2',
        startDate: new Date('2022-07-01'),
        endDate: new Date('2023-2-01'),
        details: 'some deets',
        completion: 24
    }, {
        title: 'test entry3',
        startDate: new Date('2022-10-01'),
        endDate: new Date('2023-2-01'),
        details: 'some deets',
        completion: 24
    }, {
        title: 'test entry4',
        startDate: new Date('2022-10-01'),
        endDate: new Date('2023-2-01'),
        details: 'some deets',
        completion: 24
    }, {
        title: 'first entry from last year',
        startDate: new Date('2021-11-15'),
        endDate: new Date('2022-06-01'),
        details: 'some deets',
        completion: 95
    }, {
        title: 'test entry2',
        startDate: new Date('2022-03-01'),
        endDate: new Date('2022-07-16'),
        details: 'some deets',
        completion: 67
    }, {
        title: 'test entry2',
        startDate: new Date('2022-07-01'),
        endDate: new Date('2023-2-01'),
        details: 'some deets',
        completion: 24
    }, {
        title: 'test entry3',
        startDate: new Date('2022-10-01'),
        endDate: new Date('2023-2-01'),
        details: 'some deets',
        completion: 24
    }, {
        title: 'test entry4',
        startDate: new Date('2022-10-01'),
        endDate: new Date('2023-2-01'),
        details: 'some deets',
        completion: 24
    }, {
        title: 'test entry2',
        startDate: new Date('2022-07-01'),
        endDate: new Date('2023-2-01'),
        details: 'some deets',
        completion: 24
    }, {
        title: 'test entry3',
        startDate: new Date('2022-10-01'),
        endDate: new Date('2023-2-01'),
        details: 'some deets',
        completion: 24
    }, {
        title: 'test entry4',
        startDate: new Date('2022-10-01'),
        endDate: new Date('2023-2-01'),
        details: 'some deets',
        completion: 24
    }]

function GanttChart({ entries = mockEntries, maxHeight }) {
    const theme = useTheme()

    let dateStart = new Date()
    let dateEnd = new Date()
    dateStart.setMonth(dateStart.getMonth() - 3)
    dateEnd.setMonth(dateStart.getMonth() + 12)

    const defaultDateRange = [dateStart, dateEnd]

    const [dateRange, setDateRange] = useState(defaultDateRange)

    const handleRangeChange = (direction) => {
        let newDateStart = dateRange[0]
        let newDateEnd = dateRange[1]

        newDateStart.setMonth(newDateStart.getMonth() + direction)
        newDateEnd.setMonth(newDateEnd.getMonth() + direction)
        setDateRange([newDateStart, newDateEnd])
    }

    const sxGanttChartContainer = {
        position: 'absolute',
        height: '100%',
        width: 'calc(100% - 48px)',
        maxHeight: maxHeight,
        overflowY: 'scroll',
        overflowX: 'hidden',
        background: theme.palette.background.paper,
    }

    return (
        <div>
            <Button onClick = {() => handleRangeChange(-1)} >Left</Button>
            <Button onClick = {() => handleRangeChange(1)} >Right</Button>
            <div style = {sxGanttChartContainer} >
                <GanttHeader dateRange = {dateRange}/>
                <GanttBody entries = {entries} maxHeight = {maxHeight} dateRange = {dateRange}/>
            </div>
        </div>
    )
}

GanttChart.propTypes = {
    entries: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string,
            startDate: PropTypes.instanceOf(Date),
            endDate: PropTypes.instanceOf(Date),
            details: PropTypes.string,
            completion: PropTypes.number
        })
    ).isRequired,
    maxHeight: PropTypes.string.isRequired
}

export default GanttChart
