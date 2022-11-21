import { Popup } from 'Components/Popup'
import { SearchEpicsDropdown } from 'Components/Search/SearchEpicsDropdown'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { closePopup } from 'Redux/Popups/actions'
import { selectTargetById } from 'Redux/Targets/selectors'
import { useState } from 'react'

export default function AssociateEpicsPopup({ targetId, title, subtitle, onSelectEpic }) {
    const dispatch = useDispatch()

    const target = useSelector(state => selectTargetById(state, targetId))

    const onClose = () => dispatch(closePopup('AssociateEpics'))
    const [selectedEpicIds, setSelectedEpicIds] = useState(target.epicIds)
    const [isLoading, setIsLoading] = useState(false)

    const handleSelect = (epicId) => {
        setSelectedEpicIds([...selectedEpicIds, epicId])
    }

    const handleDeselect = (epicId) => {
        setSelectedEpicIds(selectedEpicIds.filter(id => id !== epicId))
    }

    const onSubmit = () => {
        onSelectEpic(selectedEpicIds, setIsLoading)
    }

    return (
        <Popup
            title = {title}
            subtitle = {subtitle}
            onClose = {onClose}
            onSubmit = {onSubmit}
            isSubmitting = {isLoading}
            cancelText = 'close'
            hideRequiredText
            disableDefaultPadding
            width = '500px'
        >
            <SearchEpicsDropdown
                portfolioId = {target.portfolioId}
                selectedEpicIds = {selectedEpicIds}
                handleOnSelect = {handleSelect}
                handleOnDeselect = {handleDeselect}
            />
        </Popup>
    )
}

AssociateEpicsPopup.propTypes = {
    onSelectEpic: PropTypes.func.isRequired,
    subtitle: PropTypes.string,
    targetId: PropTypes.number.isRequired,
    title: PropTypes.string,
}

AssociateEpicsPopup.defaultProps = {
    subtitle: undefined,
    title: 'Associate Epics',
}
