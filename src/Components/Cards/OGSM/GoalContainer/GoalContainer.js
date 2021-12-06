import { AddCircleOutline } from '@mui/icons-material'
import { Card, CircularProgress, Grid, IconButton, Stack, Tooltip, Typography } from '@mui/material'
import { MeasureCard } from 'Components/Cards/OGSM/MeasureCard'
import Tooltips from 'Constants/Tooltips'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestCreateMeasure, requestSearchMeasures } from 'Redux/Measures/actions'
import { selectMeasureIdsByAssertionId } from 'Redux/Measures/selectors'

export default function GoalContainer({ assertionId, hasEdit }) {

    const dispatch = useDispatch()

    const [adding, setAdding] = useState(false)

    const goalIds = useSelector((state) => selectMeasureIdsByAssertionId(state, assertionId))

    const handleAddNewGoal = () => {
        setAdding(true)
        dispatch(requestCreateMeasure({
            assertionId,
            value: 0,
            target: 1,
            text: 'Enter new goal here...',
            completionType: 'BINARY'
        })).then(() => setAdding(false))
    }

    useEffect(() => {
        assertionId && dispatch(requestSearchMeasures(`assertion.id:${assertionId}`))
    }, [assertionId])

    return (
        <Card>
            <Stack spacing = {1} padding = {1}>
                <Grid container alignItems = 'center' spacing = {1}>
                    <Grid item alignSelf = 'baseline'>
                        <Typography variant = 'h6' color = 'secondary'>Goals</Typography>
                    </Grid>
                    <Grid item>
                        {hasEdit &&
                            <Tooltip arrow title = {Tooltips.GOAL_NEW_ENTRY}>
                                <IconButton
                                    color = 'primary'
                                    disabled = {adding}
                                    size = 'small'
                                    onClick = {handleAddNewGoal}
                                >
                                    {adding
                                        ? <CircularProgress size = '1.25rem' data-testid = 'GoalContainer__loading'/>
                                        : <AddCircleOutline fontSize = 'small' data-testid = 'GoalContainer__icon-add'/>
                                    }
                                </IconButton>
                            </Tooltip>
                        }
                    </Grid>
                </Grid>
                {goalIds.map((id, index) =>
                    <MeasureCard key = {index} id = {id} hasEdit = {hasEdit}/>
                )}
            </Stack>
        </Card>
    )
}

GoalContainer.propTypes = {
    assertionId: PropTypes.number.isRequired,
    hasEdit: PropTypes.bool.isRequired
}