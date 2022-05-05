import { Popup } from 'Components/Popup'
import { SearchEpics } from 'Components/Search'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { closePopup } from 'Redux/Popups/actions'

export default function AssociateEpicsPopup({ excludeIds, title, subtitle, searchCriteria, onSelect }) {
    const dispatch = useDispatch()

    const onClose = () => dispatch(closePopup('AssociateEpics'))

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
                onChange = {(_e, values) => onSelect(values[0])}
                excludeIds = {excludeIds}
            />
        </Popup>
    )
}

AssociateEpicsPopup.propTypes = {
    excludeIds: PropTypes.arrayOf(PropTypes.number),
    onSelect: PropTypes.func.isRequired,
    searchCriteria: PropTypes.string,
    subtitle: PropTypes.string,
    title: PropTypes.string,
}

AssociateEpicsPopup.defaultProps = {
    excludeIds: [],
    searchCriteria: undefined,
    subtitle: undefined,
    title: 'Add Epics',
}