import { AddCircleOutline, TrackChangesOutlined } from '@mui/icons-material'
import { Card, CircularProgress, Grid, IconButton, Stack, Tooltip, Typography } from '@mui/material'
import { MeasureCard } from 'Components/Cards/OGSM/MeasureCard'
import Tooltips from 'Constants/Tooltips'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestCreateMeasure, requestSearchMeasures } from 'Redux/Measures/actions'
import { selectMeasuresByAssertionId } from 'Redux/Measures/selectors'

export default function GoalContainer({ id, hasEdit }) {

    const dispatch = useDispatch()

    const [adding, setAdding] = useState(false)

    const goals = useSelector((state) => selectMeasuresByAssertionId(state, id))

    const handleAddNewGoal = () => {
        setAdding(true)
        dispatch(requestCreateMeasure({
            value: 0,
            target: 1,
            text: 'Enter new goal here...',
            assertionId: id,
            completionType: 'BINARY'
        })).then(() => setAdding(false))
    }

    useEffect(() => {
        dispatch(requestSearchMeasures(`assertion.id:${id}`))
    }, [id])

    return (
        <Card>
            <Stack spacing = {1} padding = {1}>
                <Grid container alignItems = 'center' spacing = {1}>
                    <Grid item>
                        <TrackChangesOutlined
                            fontSize = 'large'
                            color = 'secondary'
                            style = {{
                                marginTop: '5px',
                                marginLeft: '8px'
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <Typography
                            variant = 'h6'
                            color = 'secondary'
                            style = {{
                                marginLeft: '2px',
                                marginRight: '8px',
                                paddingBottom: '2px'
                            }}
                        >
                            Goals
                        </Typography>
                    </Grid>
                    {hasEdit &&
                        <Grid item>
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
                        </Grid>
                    }
                </Grid>
                {goals.map((goal, index) =>
                    <MeasureCard key = {index} id = {goal.id} hasEdit = {hasEdit}/>
                )}
            </Stack>
        </Card>
    )
}

GoalContainer.propTypes = {
    id: PropTypes.number.isRequired,
    hasEdit: PropTypes.bool.isRequired
}