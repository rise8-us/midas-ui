import { FilterList } from '@mui/icons-material'
import { Box, Checkbox, Grid, Stack, Typography } from '@mui/material'
import { AssertionHeader, AssertionRootIdentifier } from 'Components/Assertions'
import PropTypes from 'prop-types'
import React, { useEffect, useMemo, useState } from 'react'

const tooltipTitle = (showCompleted, completedOnChange, showArchived, archivedOnChange) => (
    <Stack width = '160px' data-testid = 'tooltipTitle'>
        <Box display = 'flex' alignItems = 'center' justifyContent = 'space-between'>
            <Typography color = 'secondary' variant = 'caption'>Show Completed</Typography>
            <Checkbox
                color = 'secondary'
                data-testid = 'ViewSettings__checkbox-completed'
                checked = {showCompleted}
                onClick = {completedOnChange}
            />
        </Box>
        <Box display = 'flex' alignItems = 'center' justifyContent = 'space-between'>
            <Typography color = 'secondary' variant = 'caption'>Show Archived</Typography>
            <Checkbox
                color = 'secondary'
                data-testid = 'ViewSettings__checkbox-archived'
                checked = {showArchived}
                onClick = {archivedOnChange}
            />
        </Box>
    </Stack>
)

export default function ViewSettings({ objectives, initialIndex, onChange, productId, hasEdit }) {

    const [selectedIndex, setSelectedIndex] = useState(initialIndex)
    const [showCompleted, setShowCompleted] = useState(false)
    const [showArchived, setShowArchived] = useState(false)

    const itemsToShow = useMemo(() => {
        const filtered = objectives.filter(objective => {
            if (!showCompleted && objective.status === 'COMPLETED') return false
            else if (!showArchived && objective.isArchived) return false
            else return true
        })

        filtered.filter(o => o.id === selectedIndex).length === 0 &&
            filtered.length > 0 &&
            setSelectedIndex(filtered[0].id)

        return filtered
    }, [objectives, showCompleted, showArchived, setSelectedIndex])

    const handleOnChange = (i) => {
        setSelectedIndex(i)
    }

    useEffect(() => {
        onChange(selectedIndex)
    }, [selectedIndex])

    return (
        <Grid container item direction = 'column' spacing = {3}>
            <Grid item>
                <AssertionHeader
                    productId = {productId}
                    hasEdit = {hasEdit}
                    onCreate = {() => setSelectedIndex(itemsToShow.length + 1)}
                />
            </Grid>
            <Grid container item spacing = {2}>
                {objectives.length > 0 &&
                    <Grid item>
                        <AssertionRootIdentifier
                            indicator = {<FilterList color = 'secondary' fontSize = 'small'/>}
                            title = {
                                tooltipTitle(
                                    showCompleted, () => setShowCompleted(prev => !prev),
                                    showArchived, () => setShowArchived(prev => !prev),
                                )
                            }
                        />
                    </Grid>
                }
                {itemsToShow.map((objective, index) => (
                    <Grid item key = {index}>
                        <AssertionRootIdentifier
                            title = {objective.text}
                            selected = {objective.id === selectedIndex}
                            onClick = {() => handleOnChange(objective.id)}
                            indicator = {<Typography>{index + 1}</Typography>}
                        />
                    </Grid>
                ))}
            </Grid>
        </Grid>
    )
}

ViewSettings.propTypes = {
    objectives: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        text: PropTypes.string,
        isArchived: PropTypes.bool,
        status: PropTypes.string
    })),
    initialIndex: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    productId: PropTypes.number.isRequired,
    hasEdit: PropTypes.bool.isRequired
}

ViewSettings.defaultProps = {
    objectives: [],
    initialIndex: 0
}