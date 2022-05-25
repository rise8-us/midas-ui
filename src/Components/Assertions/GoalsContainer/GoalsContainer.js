import { Card, Grid, Stack, Typography } from '@mui/material'
import { AddItem } from 'Components/AddItem'
import { MeasureCard } from 'Components/Cards/OGSM/MeasureCard'
import Tooltips from 'Constants/Tooltips'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestCreateMeasure, requestSearchMeasures } from 'Redux/Measures/actions'
import { selectMeasureIdsByAssertionId } from 'Redux/Measures/selectors'

export default function GoalsContainer({ assertionId, hasEdit }) {

    const dispatch = useDispatch()


    const goalIds = useSelector((state) => selectMeasureIdsByAssertionId(state, assertionId))

    const handleAddNewGoal = () => {
        return Promise.resolve(
            dispatch(requestCreateMeasure({
                assertionId,
                value: 0,
                target: 1,
                text: 'Enter new goal here...',
                completionType: 'BINARY'
            }))
        )
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
                    <Grid item data-testid = 'GoalsContainer__add-item'>
                        {hasEdit &&
                            <AddItem
                                onClick = {handleAddNewGoal}
                                title = {Tooltips.GOAL_NEW_ENTRY}
                            />
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

GoalsContainer.propTypes = {
    assertionId: PropTypes.number.isRequired,
    hasEdit: PropTypes.bool.isRequired
}