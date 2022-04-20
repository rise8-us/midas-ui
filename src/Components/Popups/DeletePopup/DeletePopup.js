import { Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { ConfirmationPopup } from '../ConfirmationPopup'


export default function DeletePopup({ id, title, type, request, constant }) {
    const dispatch = useDispatch()

    const handlePopupCancel = (event) => {
        event.stopPropagation()
    }

    const handlePopupConfirm = (event) => {
        event.stopPropagation()
        dispatch(request(id))
    }

    return (
        <ConfirmationPopup
            onConfirm = {handlePopupConfirm}
            onCancel = {handlePopupCancel}
            detail = {
                <Typography>You are about to delete {type}:
                    <Typography fontWeight = 'bold' color = 'error.main'>
                        {title}
                    </Typography>
                </Typography>
            }
            constant = {constant}
        />
    )
}

DeletePopup.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    type: PropTypes.string,
    request: PropTypes.func.isRequired,
    constant: PropTypes.string.isRequired
}

DeletePopup.defaultProps = {
    type: '',
    title: ''
}