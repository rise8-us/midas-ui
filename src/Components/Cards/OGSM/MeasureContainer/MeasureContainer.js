import { Stack } from '@mui/material'
import { MeasureCard } from 'Components/Cards/OGSM/MeasureCard'
import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestSearchMeasures } from 'Redux/Measures/actions'
import { selectMeasuresByAssertionId } from 'Redux/Measures/selectors'

export default function MeasureContainer({ id, hasEdit }) {

    const dispatch = useDispatch()

    const measures = useSelector((state) => selectMeasuresByAssertionId(state, id))

    useEffect(() => {
        dispatch(requestSearchMeasures(`assertion.id:${id}`))
    }, [id])

    return (
        <Stack spacing = {1}>
            {measures.map((measure, index) =>
                <MeasureCard key = {index} id = {measure.id} hasEdit = {hasEdit}/>
            )}
        </Stack>
    )
}

MeasureContainer.propTypes = {
    id: PropTypes.number.isRequired,
    hasEdit: PropTypes.bool.isRequired
}