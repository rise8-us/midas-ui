import { AddCircleOutline, LinkOutlined } from '@mui/icons-material'
import { Button, Stack, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { requestCreateCapability } from 'Redux/Capabilities/actions'
import { openPopup } from 'Redux/Popups/actions'

export default function NoCapabilitiesOptions({ portfolioId, onCreate }) {

    const dispatch = useDispatch()

    const createCapability = () => {
        dispatch(requestCreateCapability({
            referenceId: 1,
            portfolioId,
            title: 'Enter new requirement here',
        })).then(() => { onCreate(0) })
    }

    const openLinkCapabilityPopup = () =>
        dispatch(openPopup('LinkCapabilityPopup', 'LinkCapabilityPopup', { portfolioId }))

    return (
        <Stack spacing = {2}>
            <Typography>Looks like theres nothing here...</Typography>
            <Stack direction = 'row' spacing = {2}>
                <Button
                    startIcon = {<AddCircleOutline/>}
                    variant = 'outlined'
                    color = 'primary'
                    onClick = {createCapability}
                >
                    New Requirement
                </Button>
                <Button
                    startIcon = {<LinkOutlined/>}
                    variant = 'outlined'
                    color = 'primary'
                    onClick = {openLinkCapabilityPopup}
                >
                    Existing Requirement
                </Button>
            </Stack>
        </Stack>
    )
}

NoCapabilitiesOptions.propTypes = {
    onCreate: PropTypes.func.isRequired,
    portfolioId: PropTypes.number,
}

NoCapabilitiesOptions.defaultProps = {
    portfolioId: null
}