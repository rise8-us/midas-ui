import { Stack } from '@mui/material'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestSearchTargets } from 'Redux/Targets/actions'
import { selectTargetsByIds } from 'Redux/Targets/selectors'
import { buildOrQueryByIds } from 'Utilities/requests'
import { sortArrayAlphabetically } from 'Utilities/sorting'
import { GanttSubTarget } from '../GanttSubTarget'

export default function GanttSubTargetList({ ids, defaultAllOpen }) {
    const dispatch = useDispatch()

    const subtargets = useSelector(state => selectTargetsByIds(state, ids))
    const subtargetsSorted = sortArrayAlphabetically(subtargets, 'title')

    useEffect(() => {
        dispatch(requestSearchTargets(buildOrQueryByIds(ids)))
    }, [JSON.stringify(ids)])

    return (
        <Stack spacing = {1}>
            {subtargetsSorted.map((subtarget, index) =>
                <GanttSubTarget
                    key = {index}
                    id = {subtarget.id}
                    target = {subtarget}
                    defaultOpen = {defaultAllOpen}
                />
            )}
        </Stack>
    )
}

GanttSubTargetList.propTypes = {
    ids: PropTypes.arrayOf(PropTypes.number).isRequired,
    defaultAllOpen: PropTypes.bool
}

GanttSubTargetList.defaultProps = {
    defaultAllOpen: false
}
