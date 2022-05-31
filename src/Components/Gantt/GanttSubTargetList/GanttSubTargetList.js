import { Stack } from '@mui/material'
import useDebounce from 'Hooks/useDebounce'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectTargetFilters } from 'Redux/Filters/selectors'
import { requestSearchTargets } from 'Redux/Targets/actions'
import { selectTargetsByIds } from 'Redux/Targets/selectors'
import { buildOrQueryByIds } from 'Utilities/requests'
import { sortArrayAlphabetically } from 'Utilities/sorting'
import { GanttSubTarget } from '../GanttSubTarget'

export default function GanttSubTargetList({ ids, defaultAllOpen }) {
    const dispatch = useDispatch()

    const targetFilters = useSelector(selectTargetFilters)
    const subtargets = useSelector(state => selectTargetsByIds(state, ids))
    const subtargetsFiltered = [...subtargets]
        .filter(t => targetFilters.isPriority ? t.isPriority === targetFilters.isPriority : true)
    const subtargetsSorted = sortArrayAlphabetically(subtargetsFiltered, 'title')

    const debouncedSubtargetList = useDebounce(ids, 100)

    useEffect(() => {
        debouncedSubtargetList.length > 0 && dispatch(requestSearchTargets(buildOrQueryByIds(debouncedSubtargetList)))
    }, [JSON.stringify(debouncedSubtargetList)])

    return (
        <Stack spacing = {1}>
            {subtargetsSorted.map((subtarget, index) =>
                <GanttSubTarget
                    key = {index}
                    id = {subtarget.id}
                    defaultOpen = {defaultAllOpen}
                />
            )}
        </Stack>
    )
}

GanttSubTargetList.propTypes = {
    ids: PropTypes.arrayOf(PropTypes.number).isRequired,
    defaultAllOpen: PropTypes.bool,
}

GanttSubTargetList.defaultProps = {
    defaultAllOpen: false
}
