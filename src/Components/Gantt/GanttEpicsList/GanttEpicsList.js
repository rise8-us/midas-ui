
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestFetchSearchEpics } from 'Redux/Epics/actions'
import { selectEpicsByIds } from 'Redux/Epics/selectors'
import { buildOrQueryByIds } from 'Utilities/requests'
import { sortArrayAlphabetically } from 'Utilities/sorting'
import { GanttAssociatedEpic } from '../GanttAssociatedEpic'

export default function GanttEpicsList({ onDeleteClick, ids }) {
    const dispatch = useDispatch()

    const epics = useSelector(state => selectEpicsByIds(state, ids))
    const epicsSorted = sortArrayAlphabetically(epics, 'name')

    useEffect(() => {
        dispatch(requestFetchSearchEpics(buildOrQueryByIds(ids)))
    }, [JSON.stringify(ids)])

    return (
        <>
            {epicsSorted.map((epic, index) =>
                <div key = {index}>
                    <GanttAssociatedEpic
                        name = {epic.name}
                        title = {epic.title}
                        webUrl = {epic.webUrl}
                        onDelete = {typeof onDeleteClick === 'function' ? () => onDeleteClick(epic.id) : undefined}
                    />
                </div>
            )}
        </>
    )
}

GanttEpicsList.propTypes = {
    ids: PropTypes.arrayOf(PropTypes.number),
    onDeleteClick: PropTypes.func,
}

GanttEpicsList.defaultProps = {
    ids: [],
    onDeleteClick: undefined
}