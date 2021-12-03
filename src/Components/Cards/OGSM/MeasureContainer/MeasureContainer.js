import { AddCircleOutline, BarChart } from '@mui/icons-material'
import { CircularProgress, Grid, IconButton, Stack, Tooltip, Typography } from '@mui/material'
import { MeasureCard } from 'Components/Cards/OGSM/MeasureCard'
import Tooltips from 'Constants/Tooltips'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestCreateMeasure, requestSearchMeasures } from 'Redux/Measures/actions'
import { selectMeasuresByAssertionId } from 'Redux/Measures/selectors'

export default function MeasureContainer({ id, hasEdit }) {

    const dispatch = useDispatch()

    const [adding, setAdding] = useState(false)

    const measures = useSelector((state) => selectMeasuresByAssertionId(state, id))

    const handleAddNewMeasure = () => {
        setAdding(true)
        dispatch(requestCreateMeasure({
            value: 0,
            target: 1,
            text: 'Enter new measure here...',
            assertionId: id,
            completionType: 'BINARY'
        })).then(() => setAdding(false))
    }

    useEffect(() => {
        dispatch(requestSearchMeasures(`assertion.id:${id}`))
    }, [id])

    return (
        <Stack spacing = {1} paddingBottom = {1}>
            <Grid container alignItems = 'center' spacing = {1}>
                <Grid item>
                    <BarChart
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
                        Measures
                    </Typography>
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
                                    ? <CircularProgress size = '1.25rem' data-testid = 'MeasureContainer__loading'/>
                                    : <AddCircleOutline fontSize = 'small' data-testid = 'MeasureContainer__icon-add'/>
                                }
                            </IconButton>
                        </Tooltip>
                    </Grid>
                }
            </Grid>
            {measures.map((measure, index) =>
                <MeasureCard key = {index} id = {measure.id} hasEdit = {hasEdit} icon = {<BarChart/>}/>
            )}
        </Stack>
    )
}

MeasureContainer.propTypes = {
    id: PropTypes.number.isRequired,
    hasEdit: PropTypes.bool.isRequired
}