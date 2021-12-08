import { AddCircleOutline, BarChart } from '@mui/icons-material'
import { CircularProgress, Grid, IconButton, Stack, Tooltip, Typography } from '@mui/material'
import { MeasureCard } from 'Components/Cards/OGSM/MeasureCard'
import Tooltips from 'Constants/Tooltips'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestCreateMeasure, requestSearchMeasures } from 'Redux/Measures/actions'
import { selectMeasureIdsByAssertionId } from 'Redux/Measures/selectors'

export default function MeasuresContainer({ assertionId, hasEdit }) {

    const dispatch = useDispatch()

    const [adding, setAdding] = useState(false)

    const measureIds = useSelector((state) => selectMeasureIdsByAssertionId(state, assertionId))

    const handleAddNewMeasure = () => {
        setAdding(true)
        dispatch(requestCreateMeasure({
            value: 0,
            target: 1,
            text: 'Enter new measure here...',
            assertionId,
            completionType: 'BINARY'
        })).then(() => setAdding(false))
    }

    useEffect(() => {
        assertionId && dispatch(requestSearchMeasures(`assertion.id:${assertionId}`))
    }, [assertionId])

    return (
        <Stack spacing = {1}>
            <Grid container alignItems = 'center' spacing = {1}>
                <Grid item alignSelf = 'baseline'>
                    <Typography variant = 'h6' color = 'secondary'>Measures</Typography>
                </Grid>
                {hasEdit &&
                    <Grid item>
                        <Tooltip
                            arrow
                            title = {Tooltips.MEASURE_NEW_ENTRY}
                        >
                            <IconButton
                                color = 'primary'
                                disabled = {adding}
                                size = 'small'
                                onClick = {handleAddNewMeasure}
                            >
                                { adding
                                    ? <CircularProgress size = '1.25rem' data-testid = 'MeasuresContainer__loading'/>
                                    : <AddCircleOutline fontSize = 'small' data-testid = 'MeasuresContainer__icon-add'/>
                                }
                            </IconButton>
                        </Tooltip>
                    </Grid>
                }
            </Grid>
            {measureIds.map((id, index) =>
                <MeasureCard key = {index} id = {id} hasEdit = {hasEdit} icon = {<BarChart/>}/>
            )}
        </Stack>
    )
}

MeasuresContainer.propTypes = {
    assertionId: PropTypes.number.isRequired,
    hasEdit: PropTypes.bool.isRequired
}