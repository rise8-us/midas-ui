import { Popup } from 'Components/Popup'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { closePopup } from 'Redux/Popups/actions'

function ConfirmationPopup({ onConfirm, onCancel, detail, open, constant }) {
    const dispatch = useDispatch()

    const handleConfirm = (event) => {
        typeof onConfirm === 'function' && onConfirm(event)
    }

    const handleCancel = (event) => {
        typeof onCancel === 'function' && onCancel(event)
        dispatch(closePopup(constant))
    }

    return (
        <Popup
            hideRequiredText
            title = 'Are you sure?'
            open = {open}
            subtitle = 'Please confirm or cancel'
            submitText = 'confirm'
            onClose = {handleCancel}
            onSubmit = {handleConfirm}
        >
            {detail}
        </Popup>
    )
}

ConfirmationPopup.propTypes = {
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
    detail: PropTypes.node,
    open: PropTypes.bool,
    constant: PropTypes.string,
}

ConfirmationPopup.defaultProps = {
    onConfirm: undefined,
    onCancel: undefined,
    detail: '',
    open: true,
    constant: ''
}

export default ConfirmationPopup