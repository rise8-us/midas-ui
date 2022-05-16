import { BarChart } from '@mui/icons-material'
import { Grid, Stack, Typography } from '@mui/material'
import { AddItem } from 'Components/AddItem'
import { MeasureCard } from 'Components/Cards/OGSM/MeasureCard'
import Tooltips from 'Constants/Tooltips'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestCreateMeasure, requestSearchMeasures } from 'Redux/Measures/actions'
import { selectMeasureIdsByAssertionId } from 'Redux/Measures/selectors'

export default function MeasuresContainer({ assertionId, hasEdit }) {

    const dispatch = useDispatch()

    const measureIds = useSelector((state) => selectMeasureIdsByAssertionId(state, assertionId))

    const handleAddNewMeasure = () => {
        return Promise.resolve(
            dispatch(requestCreateMeasure({
                value: 0,
                target: 1,
                text: 'Enter new measure here...',
                assertionId,
                completionType: 'BINARY'
            }))
        )
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
                        <AddItem
                            onClick = {handleAddNewMeasure}
                            title = {Tooltips.MEASURE_NEW_ENTRY}
                        />
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