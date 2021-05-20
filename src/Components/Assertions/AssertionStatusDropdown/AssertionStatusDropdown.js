import { TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import useAssertionStatuses from '../../../Hooks/useAssertionStatuses'

function AssertionStatusDropdown({ option, onChange, error }) {

    const allStatuses = useAssertionStatuses()

    const [selectStatus, setSelectStatus] = useState('')

    const handleChange = (_e, value) => {
        setSelectStatus(value)
        typeof onChange === 'function' && onChange(value.name)
    }

    useEffect(() => {
        allStatuses.length > 0 && setSelectStatus(allStatuses.filter(s => s.name === option)[0])
    }, [allStatuses])

    return (
        <Autocomplete
            options = {allStatuses}
            disableClearable
            getOptionLabel = {(option) => option?.label ?? ''}
            getOptionSelected = {(option, value) => option.name === value?.name}
            style = {{ width: '175px', direction: 'ltr', margin: '0', height: 'auto', padding: 0 }}
            onChange = {handleChange}
            value = {selectStatus}
            renderInput = {(params) =>
                <TextField
                    {...params}
                    placeholder = 'Select status'
                    variant = 'filled'
                    style = {{ margin: '4px 0px' }}
                    InputProps = {{
                        ...params.InputProps,
                        disableUnderline: true,
                        'data-testid': 'AssertionStatusDropdown__input',
                        style: {
                            padding: '2px',
                            margin: '0',
                            border: error ? 'solid 1px red' : '1px'
                        },
                    }}
                />
            }
        />
    )
}

AssertionStatusDropdown.propTypes = {
    option: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.bool
}

AssertionStatusDropdown.defaultProps = {
    option: 'NOT_STARTED',
    onChange: undefined,
    error: false
}

export default AssertionStatusDropdown