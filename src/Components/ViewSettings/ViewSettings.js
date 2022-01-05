import { FilterList } from '@mui/icons-material'
import { Grid, Typography } from '@mui/material'
import { AssertionHeader, AssertionRootIdentifier } from 'Components/Assertions'
import { DateFilter } from 'Components/DateFilter'
import { TooltipOptions } from 'Components/TooltipOptions'
import PropTypes from 'prop-types'
import React, { useEffect, useMemo, useState } from 'react'
import { getIsDateInRange } from 'Utilities/dateHelpers'

const filters = [
    { title: 'Show Completed', value: 'showCompleted' },
    { title: 'Show Archived', value: 'showArchived' }
]

const getFilters = (currentState) => filters.map(option => ({ ...option, checked: currentState[option.value] }))

export default function ViewSettings({ objectives, initialIndex, onChange, productId, hasEdit }) {

    const [selectedIndex, setSelectedIndex] = useState(initialIndex)
    const [options, setOptions] = useState({ showCompleted: false, showArchived: false })
    const [isCreated, setIsCreated] = useState(false)
    const [filterByDate, setFilterByDate] = useState(null)
    const [dateFilterRange, setDateFilterRange] = useState([null, null])

    const itemsToShow = useMemo(() => {
        const filtered = objectives.filter(objective => {
            if (!options.showCompleted && objective.status === 'COMPLETED') return false
            if (!options.showArchived && objective.isArchived) return false
            return getIsDateInRange(objective[filterByDate], dateFilterRange)
        })

        if (initialIndex && !isCreated) {
            setSelectedIndex(initialIndex)
        } else if (!filtered.map(o => o.id).includes(selectedIndex)) {
            const selectedObjective = isCreated ? filtered[filtered.length - 1] : filtered[0]
            setSelectedIndex(selectedObjective?.id)
            isCreated && setIsCreated(false)
        }

        return filtered
    }, [objectives, initialIndex, options, filterByDate, dateFilterRange, setSelectedIndex])

    const handleOnChange = (i) => {
        setSelectedIndex(i)
    }

    useEffect(() => {
        onChange(selectedIndex)
    }, [selectedIndex])

    return (
        <Grid container item direction = 'column'>
            <Grid item flexGrow = {1} paddingBottom = {1}>
                <AssertionHeader
                    productId = {productId}
                    hasEdit = {hasEdit}
                    onCreate = {() => {
                        setIsCreated(true)
                        setSelectedIndex(itemsToShow.length + 1)
                    }}
                />
            </Grid>
            <Grid container item columnGap = {2} wrap = 'nowrap'>
                {objectives.length > 0 &&
                    <Grid item>
                        <AssertionRootIdentifier
                            utility
                            title = {
                                <TooltipOptions
                                    multiple
                                    options = {getFilters(options)}
                                    onChange = {(key, checked) => setOptions(prev => ({ ...prev, [key]: checked }))}
                                />
                            }
                        >
                            <FilterList color = 'secondary' fontSize = 'small'/>
                        </AssertionRootIdentifier>
                    </Grid>
                }
                <Grid container flexGrow = {1} spacing = {1}>
                    {itemsToShow?.map((objective, index) => (
                        <Grid item key = {index}>
                            <AssertionRootIdentifier
                                title = {objective.text}
                                selected = {objective.id === selectedIndex}
                                onClick = {() => handleOnChange(objective.id)}
                            >
                                <Typography data-testid = 'ViewSettings__item'>{index + 1}</Typography>
                            </AssertionRootIdentifier>
                        </Grid>
                    ))}
                </Grid>
                {objectives.length > 0 &&
                    <Grid item justifyContent = 'end' marginRight = {1} xs = 'auto'>
                        <DateFilter
                            filterByDate = {filterByDate}
                            setFilterByDate = {setFilterByDate}
                            dateFilterRange = {dateFilterRange}
                            setDateFilterRange = {setDateFilterRange}
                        />
                    </Grid>
                }
            </Grid>
        </Grid>
    )
}

ViewSettings.propTypes = {
    hasEdit: PropTypes.bool.isRequired,
    initialIndex: PropTypes.number,
    objectives: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        text: PropTypes.string,
        isArchived: PropTypes.bool,
        status: PropTypes.string
    })),
    onChange: PropTypes.func.isRequired,
    productId: PropTypes.number.isRequired,
}

ViewSettings.defaultProps = {
    initialIndex: null,
    objectives: []
}