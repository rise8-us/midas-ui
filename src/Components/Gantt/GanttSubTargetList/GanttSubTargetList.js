import { Stack } from '@mui/material'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { selectTargetFilters } from 'Redux/Filters/selectors'
import { selectTargetsByIds } from 'Redux/Targets/selectors'
import { sortArrayAlphabetically } from 'Utilities/sorting'
import { GanttSubTarget } from '../GanttSubTarget'

export default function GanttSubTargetList({ ids, defaultAllOpen }) {
    const targetFilters = useSelector(selectTargetFilters)
    const subtargets = useSelector(state => selectTargetsByIds(state, ids))
    const subtargetsFiltered = [...subtargets]
        .filter(t => targetFilters.isPriority ? t.isPriority === targetFilters.isPriority : true)
    const subtargetsSorted = sortArrayAlphabetically(subtargetsFiltered, 'title')

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
