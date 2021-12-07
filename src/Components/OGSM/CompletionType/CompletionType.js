import { AttachMoney, HelpOutline } from '@mui/icons-material'
import { Autocomplete, Checkbox, Grid, TextField, Tooltip, Typography } from '@mui/material'
import useDebounce from 'Hooks/useDebounce'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectCompletionTypes } from 'Redux/AppSettings/selectors'

export const determineCompletionTypeData = (completionType, onChangeType, value, target) => {
    switch (completionType) {
    case 'BINARY': {
        onChangeType({
            completionType,
            value: value < target ? 0 : 1,
            target: 1
        })
        break
    }
    case 'PERCENTAGE': {
        onChangeType({
            completionType,
            value: value < target ? (value / target * 100) : 100,
            target: 100
        })
        break
    }
    case 'NUMBER':
    case 'MONEY': {
        onChangeType({
            completionType,
            value,
            target
        })
        break
    }
    }
}

function TypeTextField({ inputValue, onChange, disabled, label, showMoneyAdornment, title }) {
    const [value, setValue] = useState(inputValue)

    const valueToReturn = useDebounce(value, 500)

    const onValueChange = (e) => setValue(e.target.value)

    useEffect(() => {
        valueToReturn && onChange(valueToReturn)
    }, [valueToReturn])

    useEffect(() => {
        setValue(inputValue)
    }, [inputValue])

    return (
        <TextField
            variant = 'outlined'
            label = {label}
            value = {value}
            disabled = {disabled}
            onChange = {onValueChange}
            style = {{ marginLeft: '16px', minWidth: '100px', width: '0px' }}
            inputProps = {{ inputMode: 'numeric', pattern: '[0-9]*' }}
            InputProps = {{
                style: { height: '40px' },
                startAdornment: showMoneyAdornment && (
                    <AttachMoney fontSize = 'small' color = 'secondary' style = {{ marginLeft: '-10px' }}/>
                ),
                endAdornment: (
                    <Tooltip title = {title}>
                        <div style = {{ borderRadius: '50%', cursor: 'help', display: 'flex', opacity: .6 }}>
                            <HelpOutline color = 'secondary' fontSize = 'small'/>
                        </div>
                    </Tooltip>
                ),
            }}
        />
    )
}

function TargetType({ type, inputValue, onChange, disabled }) {

    if (['NUMBER', 'MONEY'].includes(type)) {
        return (
            <TypeTextField
                disabled = {disabled}
                inputValue = {inputValue}
                label = 'Target'
                onChange = {onChange}
                showMoneyAdornment = {type === 'MONEY'}
                title = 'Target value required for completion'
            />
        )
    }

    return null
}

function ValueType({ type, inputValue, onChange, disabled }) {

    if (['NUMBER', 'MONEY', 'PERCENTAGE'].includes(type)) {
        return (
            <TypeTextField
                disabled = {disabled}
                inputValue = {inputValue}
                label = {`Value${type === 'PERCENTAGE' ? ' (%)' : ''}`}
                onChange = {onChange}
                showMoneyAdornment = {type === 'MONEY'}
                title = 'Current progress towards completion'
            />
        )
    }

    if (type === 'BINARY') return (
        <Grid container alignItems = 'baseline'>
            <Grid item>
                <label htmlFor = 'toggle'>
                    <Typography variant = 'caption' color = 'secondary'>Complete</Typography>
                </label>
            </Grid>
            <Grid item height = '40px'>
                <Checkbox
                    id = 'toggle'
                    checked = {inputValue === 1 ? true : false}
                    size = 'small'
                    onChange = {(e) => onChange(e.target.checked ? 1 : 0)}
                />
            </Grid>
        </Grid>
    )
    return null

}

export default function CompletionType({
    completionType,
    hasEdit,
    onChangeType,
    onSaveTarget,
    onSaveValue,
    target,
    value
}) {

    const completionTypes = useSelector(selectCompletionTypes)

    const renderedOption = completionTypes[completionType] ?? null

    const [error, setError] = useState(null)

    const onChangeDropdown = (_e, selectedOption) => {
        selectedOption?.name ? setError(null) : setError('Cannot be empty!')

        determineCompletionTypeData(selectedOption?.name, onChangeType, value, target)
    }

    return (
        <Grid container flexWrap = 'nowrap' justifyContent = 'space-between'>
            <Grid item xs = {6}>
                <Autocomplete
                    style = {{ minWidth: '100px', marginTop: '-4px' }}
                    freeSolo
                    size = 'small'
                    forcePopupIcon = {hasEdit}
                    disabled = {!hasEdit}
                    autoComplete
                    getOptionLabel = {(option) => option.displayName}
                    options = {Object.values(completionTypes).filter(cType => cType.name !== 'STRING')}
                    value = {renderedOption}
                    onChange = {onChangeDropdown}
                    renderInput = {(params) =>
                        <TextField
                            {...params}
                            label = 'Completion Type'
                            error = {error?.length > 0}
                            helperText = {error}
                        />
                    }
                />
            </Grid>
            <Grid item xs = 'auto' marginLeft = 'auto'>
                <ValueType
                    type = {renderedOption?.name}
                    onChange = {(values) => onSaveValue(values)}
                    inputValue = {value}
                    disabled = {!hasEdit}
                />
            </Grid>
            <Grid item xs = 'auto' zeroMinWidth>
                <TargetType
                    type = {renderedOption?.name}
                    onChange = {(values) => onSaveTarget(values)}
                    inputValue = {target}
                    disabled = {!hasEdit}
                />
            </Grid>
        </Grid>
    )
}

CompletionType.propTypes = {
    completionType: PropTypes.string,
    hasEdit: PropTypes.bool,
    onChangeType: PropTypes.func.isRequired,
    onSaveTarget: PropTypes.func.isRequired,
    onSaveValue: PropTypes.func.isRequired,
    target: PropTypes.number,
    value: PropTypes.number,
}

CompletionType.defaultProps = {
    completionType: 'BINARY',
    hasEdit: false,
    target: 1,
    value: 0,
}

const defaultPropTypes = {
    disabled: PropTypes.bool,
    inputValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onChange: PropTypes.func.isRequired,
    type: PropTypes.string,
}

const defaultProps = {
    disabled: true,
    inputValue: '',
    type: null,
}
TargetType.propTypes = defaultPropTypes
TargetType.defaultProps = defaultProps
ValueType.propTypes = defaultPropTypes
ValueType.defaultProps = defaultProps

TypeTextField.propTypes = {
    disabled: PropTypes.bool.isRequired,
    inputValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    showMoneyAdornment: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
}