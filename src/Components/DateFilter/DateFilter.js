import { FilterAltOffOutlined, FilterAltOutlined, Tune } from '@mui/icons-material'
import { Collapse, Stack } from '@mui/material'
import { AssertionRootIdentifier } from 'Components/Assertions'
import { DateRangeSelector } from 'Components/DateRangeSelector'
import { PresetFilterDates } from 'Components/PresetFilterDates'
import { TooltipOptions } from 'Components/TooltipOptions'
import PropTypes from 'prop-types'
import { useState } from 'react'

const filters = [
    { title: 'Start Date', value: 'startDate' },
    { title: 'Due Date', value: 'dueDate' },
    { title: 'Completion Date', value: 'completedAt' }
]

const getFilters = (checkedValue) => filters.map(item => ({ ...item, checked: checkedValue === item.value }))

export default function DateFilter({ filterByDate, setFilterByDate, dateFilterRange, setDateFilterRange }) {

    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

    const handleQuarterClick = (fromTo, dateValue) => {
        fromTo === 'from'
            ? setDateFilterRange([dateValue, dateFilterRange[1]])
            : setDateFilterRange([dateFilterRange[0], dateValue])
    }

    return (
        <Stack direction = 'row' spacing = {2} height = '26px'>
            <Collapse in = {filterByDate !== null} orientation = 'horizontal' unmountOnExit mountOnEnter>
                <Stack direction = 'row' spacing = {1}>
                    <DateRangeSelector
                        onSelect = {(startDate, endDate) => setDateFilterRange([startDate, endDate])}
                        initialStart = {dateFilterRange[0]}
                        initialEnd = {dateFilterRange[1]}
                    />
                    <AssertionRootIdentifier
                        utility
                        title = {
                            <PresetFilterDates
                                year = {selectedYear}
                                onYearChange = {setSelectedYear}
                                onQuarterClick = {handleQuarterClick}
                            />
                        }
                    >
                        <Tune color = 'secondary' fontSize = 'small'/>
                    </AssertionRootIdentifier>
                </Stack>
            </Collapse>
            <AssertionRootIdentifier
                utility
                title = {
                    <TooltipOptions
                        title = 'Date to Filter By'
                        options = {getFilters(filterByDate)}
                        onChange = {(key, checked) => setFilterByDate(checked ? key : null)}
                    />
                }
            >
                <>
                    {filterByDate === null
                        ? <FilterAltOffOutlined color = 'secondary' fontSize = 'small'/>
                        : <FilterAltOutlined color = 'secondary' fontSize = 'small'/>
                    }
                </>
            </AssertionRootIdentifier>
        </Stack>
    )
}

DateFilter.propTypes = {
    filterByDate: PropTypes.oneOf(['startDate', 'dueDate', 'completedAt']),
    setFilterByDate: PropTypes.func.isRequired,
    dateFilterRange: PropTypes.arrayOf(PropTypes.string, PropTypes.string),
    setDateFilterRange: PropTypes.func.isRequired
}

DateFilter.defaultProps = {
    dateFilterRange: [null, null],
    filterByDate: null
}