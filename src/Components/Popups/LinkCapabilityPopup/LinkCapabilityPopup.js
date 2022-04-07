import { CheckBoxRounded, WarningAmberRounded } from '@mui/icons-material'
import { CircularProgress, MenuItem, Select, Stack, Typography } from '@mui/material'
import { Popup } from 'Components/Popup'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestSearchCapabilities, requestUpdateCapability } from 'Redux/Capabilities/actions'
import { selectCapabilitiesWithNoPortfolioId } from 'Redux/Capabilities/selectors'
import { closePopup } from 'Redux/Popups/actions'

export default function LinkCapabilityPopup({ portfolioId }) {
    const dispatch = useDispatch()

    const availableCapabilities = useSelector(state => selectCapabilitiesWithNoPortfolioId(state, portfolioId))

    const [processing, setProcessing] = useState(false)
    const [success, setSuccess] = useState(null)
    const [value, setValue] = useState('')

    useEffect(() => {
        dispatch(requestSearchCapabilities(''))
    }, [])

    const handleChange = (event) => {
        setValue(event.target.value)
        updateCapability(event.target.value)
    }

    const updateCapability = (capability) => {
        setProcessing(true)
        dispatch(requestUpdateCapability({
            ...capability,
            portfolioId
        })).then(() => {
            setProcessing(false)
            setSuccess(true)
        }).catch(() => {
            setProcessing(false)
            setSuccess(false)
        }).then(() => setTimeout(() => {
            setValue('')
            setSuccess(null)
        }, 3000))
    }

    const onClose = () => dispatch(closePopup('LinkCapabilityPopup'))

    return (
        <Popup
            onClose = {onClose}
            title = 'Link existing Requirements'
            hideRequiredText
            cancelText = 'close'
        >
            <Select
                value = {value}
                onChange = {handleChange}
                fullWidth
                defaultOpen
                data-testid = 'LinkCapabilityPopup__select'
                renderValue = {renderValue => (
                    <Stack direction = 'row' alignItems = 'center' justifyContent = 'space-between'>
                        <Typography>{renderValue.title}</Typography>
                        <div style = {{ display: 'flex', alignItems: 'center' }}>
                            {processing && <CircularProgress size = {18}/>}
                            {success === true &&
                                <CheckBoxRounded sx = {theme => { return { color: theme.palette.success.main } }}/>
                            }
                            {success === false &&
                                <WarningAmberRounded sx = {theme => { return { color: theme.palette.error.main } }}/>
                            }
                        </div>
                    </Stack>
                )}
            >
                {availableCapabilities.map((option, index) => (
                    <MenuItem value = {option} key = {index}>{option.title}</MenuItem>
                ))}
            </Select>
        </Popup>
    )
}

LinkCapabilityPopup.propTypes = {
    portfolioId: PropTypes.number.isRequired
}
