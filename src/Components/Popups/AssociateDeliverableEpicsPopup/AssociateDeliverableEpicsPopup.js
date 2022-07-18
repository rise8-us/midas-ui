import { Popup } from 'Components/Popup'
import { SearchEpicsDropdown } from 'Components/Search/SearchEpicsDropdown'
import PropTypes from 'prop-types'
import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectDeliverableByParentId } from 'Redux/Deliverables/selectors'
import { closePopup } from 'Redux/Popups/actions'

export default function AssociateDeliverableEpicsPopup({
    deliverableId,
    title,
    subtitle,
    onSelectEpic,
    onDeselectEpic,
    portfolioId
}) {
    const dispatch = useDispatch()

    const children = useSelector(state => selectDeliverableByParentId(state, deliverableId))
    const epicIds = useMemo(() => children.map(c => c.completion.gitlabEpic?.id), [children])

    const onClose = () => dispatch(closePopup('AssociateDeliverableEpics'))

    const handleOnSelect = (e, value, setEpicLoading) => {
        e.stopPropagation()
        onSelectEpic(value, setEpicLoading)
    }

    const handleOnDeselect = (e, value, setEpicLoading) => {
        e.stopPropagation()
        const deliverableToDelete = children.filter(child => child.title === value.title)
        onDeselectEpic(deliverableToDelete[0].id, setEpicLoading)
    }

    return (
        <Popup
            title = {title}
            subtitle = {subtitle}
            onClose = {onClose}
            cancelText = 'close'
            hideRequiredText
            disableDefaultPadding
            width = '500px'
        >
            <SearchEpicsDropdown
                portfolioId = {portfolioId}
                linkedEpicIds = {epicIds}
                handleOnSelect = {handleOnSelect}
                handleOnDeselect = {handleOnDeselect}
            />
        </Popup>
    )
}

AssociateDeliverableEpicsPopup.propTypes = {
    deliverableId: PropTypes.number.isRequired,
    onDeselectEpic: PropTypes.func.isRequired,
    onSelectEpic: PropTypes.func.isRequired,
    portfolioId: PropTypes.number.isRequired,
    subtitle: PropTypes.string,
    title: PropTypes.string,
}

AssociateDeliverableEpicsPopup.defaultProps = {
    subtitle: undefined,
    title: 'Associate Epics',
}