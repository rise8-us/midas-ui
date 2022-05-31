import { Button, ClickAwayListener, Popper } from '@mui/material'
import { CalendarPicker, LocalizationProvider, PickersDay } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import PropTypes from 'prop-types'
import { getDateIfValid, getDateInDisplayOrder } from 'Utilities/dateHelpers'

export default function DatePopper({
    clearable,
    isOpen,
    value,
    setIsOpen,
    hasEdit,
    handleOnChange,
    handleOnClear,
    minDate,
    anchorEl
}) {

    return (
        <Popper
            open = {isOpen}
            placement = 'bottom'
            anchorEl = {anchorEl}
            sx = {theme => ({
                background: theme.palette.background.paper,
                zIndex: 1301,
                borderRadius: theme.spacing(1),
                boxShadow: '0 0 10px black'
            })}
            modifiers = {[
                {
                    name: 'offset',
                    options: {
                        offset: [0, 8]
                    }
                }
            ]}
            data-testid = 'DatePopper__wrapper'
        >
            <LocalizationProvider dateAdapter = {AdapterDateFns}>
                <ClickAwayListener onClickAway = {() => setIsOpen(false)}>
                    <CalendarPicker
                        onChange = {e => e}
                        disabled = {!hasEdit}
                        defaultCalendarMonth = {value ? new Date(value) : new Date()}
                        minDate = {getDateIfValid(minDate)}
                        renderDay = {(day, _selectedDays, pickerProps) => (
                            <PickersDay
                                {...pickerProps}
                                key = {day}
                                day = {day}
                                onDaySelect = {handleOnChange}
                                selected = {getDateInDisplayOrder(day.toISOString()) === value}
                            />
                        )}
                    />
                </ClickAwayListener>
            </LocalizationProvider>
            {clearable &&
            <Button onClick = {handleOnClear} style = {{ marginLeft: '8px', marginTop: '-32px' }}>
                Clear
            </Button>
            }
        </Popper>
    )
}

DatePopper.propTypes = {
    clearable: PropTypes.bool,
    isOpen: PropTypes.bool.isRequired,
    value: PropTypes.string,
    setIsOpen: PropTypes.func.isRequired,
    hasEdit: PropTypes.bool,
    handleOnChange: PropTypes.func.isRequired,
    handleOnClear: PropTypes.func.isRequired,
    minDate: PropTypes.string,
    anchorEl: PropTypes.any,
}

DatePopper.defaultProps = {
    clearable: true,
    value: null,
    hasEdit: false,
    minDate: null,
    anchorEl: null,
}