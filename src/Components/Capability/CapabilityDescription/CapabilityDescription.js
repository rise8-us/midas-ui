import { AutoSaveTextField } from 'Components/AutoSaveTextField'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { requestUpdateCapability } from 'Redux/Capabilities/actions'
import { styled } from 'Styles/materialThemes'

const StyledAutoSaveTextFieldDescription = styled(AutoSaveTextField)(({ theme }) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.text.secondary,
}))

export default function CapabilityDescription(props) {
    const { capability, canEdit, renderEmptyOnReadOnly, ...autoSaveTextFieldProps } = props
    const dispatch = useDispatch()

    const updateCapability = (newDescription) => {
        dispatch(requestUpdateCapability({
            ...capability,
            description: newDescription,
        }))
    }

    if (!canEdit && !renderEmptyOnReadOnly && !capability.description) return null

    return (
        <StyledAutoSaveTextFieldDescription
            canEdit = {canEdit}
            initialValue = {capability.description}
            onSave = {updateCapability}
            placeholder = 'Enter Requirement Context'
            fullWidth
            multiline
            dataTestId = 'CapabilityDescription'
            {...autoSaveTextFieldProps}
        />
    )
}

CapabilityDescription.propTypes = {
    capability: PropTypes.shape({
        id: PropTypes.number,
        description: PropTypes.string
    }).isRequired,
    canEdit: PropTypes.bool,
    renderEmptyOnReadOnly: PropTypes.bool
}

CapabilityDescription.defaultProps = {
    canEdit: false,
    renderEmptyOnReadOnly: true
}