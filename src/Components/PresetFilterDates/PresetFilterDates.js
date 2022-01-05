import { ArrowLeft, ArrowRight } from '@mui/icons-material'
import { Box, Grid, IconButton, Stack, Switch, Typography } from '@mui/material'
import { Tag } from 'Components/Tag'
import PropTypes from 'prop-types'
import React, { useState } from 'react'

const quarters = {
    Calendar: {
        Q1: { from: '-01-01', to: '-03-31', year: 0 },
        Q2: { from: '-04-01', to: '-06-30', year: 0 },
        Q3: { from: '-07-01', to: '-09-30', year: 0 },
        Q4: { from: '-10-01', to: '-12-31', year: 0 }
    },
    Government: {
        Q1: { from: '-10-01', to: '-12-31', year: -1 },
        Q2: { from: '-01-01', to: '-03-31', year: 0 },
        Q3: { from: '-04-01', to: '-06-30', year: 0 },
        Q4: { from: '-07-01', to: '-09-30', year: 0 }
    }
}

export default function PresetFilterDates({ onQuarterClick, year, onYearChange }) {
    const types = Object.keys(quarters)

    const [selectedType, setSelectedType] = useState(types[0])

    return (
        <Stack width = '140px' data-testid = 'PresentFilterDates__wrap'>
            <Grid container justifyContent = 'space-evenly'>
                {['From', 'To'].map((label, index) => {
                    const fromToKey = label.toLowerCase()
                    return (
                        <Stack key = {index} alignItems = 'center'>
                            <Typography color = 'secondary'>{label}</Typography>
                            {Object.entries(quarters[selectedType]).map(([key, value]) =>
                                <Tag
                                    key = {key}
                                    label = {key}
                                    color = 'text.secondary'
                                    onClick = {() =>
                                        onQuarterClick(fromToKey, (year + value.year) + value[fromToKey])
                                    }
                                />
                            )}
                        </Stack>
                    )
                }
                )}
            </Grid>
            <Box display = 'flex' alignItems = 'center' justifyContent = 'center'>
                <Stack direction = 'row' alignItems = 'center' spacing = {1}>
                    <IconButton onClick = {() => onYearChange(year - 1)} style = {{ padding: 0 }}>
                        <ArrowLeft/>
                    </IconButton>
                    <Typography color = 'secondary'>{year}</Typography>
                    <IconButton onClick = {() => onYearChange(year + 1)} style = {{ padding: 0 }}>
                        <ArrowRight/>
                    </IconButton>
                </Stack>
            </Box>
            <Box display = 'flex' alignItems = 'center' marginX = {1}>
                <Switch
                    id = 'quarterToggle'
                    size = 'small'
                    checked = {selectedType === types[0]}
                    onChange = {() => setSelectedType(prev => types.find(type => type !== prev))}
                />
                <label htmlFor = 'quarterToggle' style = {{ marginLeft: '4px' }}>
                    <Typography color = 'secondary' variant = 'caption'>{selectedType}</Typography>
                </label>
            </Box>
        </Stack>
    )
}

PresetFilterDates.propTypes = {
    onQuarterClick: PropTypes.func.isRequired,
    onYearChange: PropTypes.func.isRequired,
    year: PropTypes.number
}

PresetFilterDates.defaultProps = {
    year: new Date().getFullYear()
}