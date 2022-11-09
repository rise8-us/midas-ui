
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { selectEpicsByIds } from 'Redux/Epics/selectors'
import { sortArrayAlphabetically } from 'Utilities/sorting'
import { GanttAssociatedEpic } from '../GanttAssociatedEpic'

export default function GanttEpicsList({ onDeleteClick, ids, startDate, dueDate }) {
    const epics = useSelector(state => selectEpicsByIds(state, ids))
    const epicsSorted = sortArrayAlphabetically(epics, 'name')

    return (
        <>
            {epicsSorted.map((epic, index) =>
                <div key = {index}>
                    <GanttAssociatedEpic
                        name = {epic.name}
                        title = {epic.title}
                        webUrl = {epic.webUrl}
                        onDelete = {typeof onDeleteClick === 'function' ? () => onDeleteClick(epic.id) : undefined}
                        startDate = {startDate}
                        dueDate = {dueDate}
                        isClosed = {epic.state === 'closed'}
                    />
                </div>
            )}
        </>
    )
}

GanttEpicsList.propTypes = {
    ids: PropTypes.arrayOf(PropTypes.number),
    onDeleteClick: PropTypes.func,
    startDate: PropTypes.string.isRequired,
    dueDate: PropTypes.string.isRequired,
}

GanttEpicsList.defaultProps = {
    ids: [],
    onDeleteClick: undefined
}
