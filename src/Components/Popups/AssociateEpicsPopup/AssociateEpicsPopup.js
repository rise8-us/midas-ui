import { Popup } from 'Components/Popup'
import { SearchEpics } from 'Components/Search'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { closePopup } from 'Redux/Popups/actions'
import { selectTargetById } from 'Redux/Targets/selectors'

export default function AssociateEpicsPopup({ targetId, title, subtitle, searchCriteria, onSelect }) {
    const dispatch = useDispatch()

    const target = useSelector(state => selectTargetById(state, targetId))
    const onClose = () => dispatch(closePopup('AssociateEpics'))

    const handleOnSelect = (_e, values) => {
        const newEpic = values[0]
        onSelect([...target.epicIds, newEpic.id])
    }

    return (
        <Popup
            title = {title}
            subtitle = {subtitle}
            onClose = {onClose}
            cancelText = 'close'
            hideRequiredText
            disableDefaultPadding
        >
            <SearchEpics
                defaultSearchTerms = {searchCriteria}
                onChange = {handleOnSelect}
                excludeIds = {target.epicIds}
            />
        </Popup>
    )
}

AssociateEpicsPopup.propTypes = {
    onSelect: PropTypes.func.isRequired,
    searchCriteria: PropTypes.string,
    subtitle: PropTypes.string,
    targetId: PropTypes.number.isRequired,
    title: PropTypes.string,
}

AssociateEpicsPopup.defaultProps = {
    searchCriteria: undefined,
    subtitle: undefined,
    title: 'Add Epics',
}