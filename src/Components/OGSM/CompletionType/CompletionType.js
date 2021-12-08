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
        const newValue = value < target ? (value / target * 100) : 100

        onChangeType({
            completionType,
            value: Number.parseFloat(newValue.toFixed(2)),
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

const isValid = (value) => RegExp(/^\d{0,}([.]{0,1})\d{0,2}$/).test(value)

function TypeTextField({ inputValue, onChange, disabled, label, showMoneyAdornment, title, max }) {
    const [value, setValue] = useState(inputValue)

    const valueToReturn = useDebounce(Math.min(value, max), 500)

    const onValueChange = ({ target }) => {
        const { value } = target

        value.length === 0
            ? setValue('')
            : isValid(value) && setValue(value, max)
    }

    useEffect(() => {
        onChange(valueToReturn ? valueToReturn : 0)
    }, [valueToReturn])

    useEffect(() => {
        setValue(inputValue)
    }, [inputValue])

    return (
        <TextField
            fullWidth
            variant = 'outlined'
            size = 'small'
            label = {label}
            value = {value}
            disabled = {disabled}
            onChange = {onValueChange}
            InputProps = {{
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
            <div style = {{ marginLeft: '8px' }}>
                <TypeTextField
                    disabled = {disabled}
                    inputValue = {inputValue}
                    label = 'Target'
                    onChange = {onChange}
                    showMoneyAdornment = {type === 'MONEY'}
                    title = 'Target value required for completion'
                />
            </div>
        )
    }

    return null
}

function ValueType({ type, inputValue, onChange, disabled, max }) {

    if (['NUMBER', 'MONEY', 'PERCENTAGE'].includes(type)) {
        return (
            <TypeTextField
                disabled = {disabled}
                inputValue = {inputValue}
                label = {`Value${type === 'PERCENTAGE' ? ' (%)' : ''}`}
                onChange = {onChange}
                showMoneyAdornment = {type === 'MONEY'}
                title = 'Current progress towards completion'
                max = {max}
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
            <Grid item>
                <Checkbox
                    id = 'toggle'
                    disabled = {disabled}
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
        <Grid container flexWrap = 'nowrap'>
            <Grid item minWidth = '165px' marginRight = {1} style = {{ flexGrow: 1 }}>
                <Autocomplete
                    freeSolo
                    autoComplete
                    forcePopupIcon = {hasEdit}
                    disabled = {!hasEdit}
                    getOptionLabel = {(option) => option.displayName}
                    options = {Object.values(completionTypes).filter(cType => cType.name !== 'STRING')}
                    value = {renderedOption}
                    onChange = {onChangeDropdown}
                    renderInput = {(params) =>
                        <TextField
                            {...params}
                            fullWidth
                            label = 'Completion Type'
                            error = {error?.length > 0}
                            helperText = {error}
                            variant = 'outlined'
                            size = 'small'
                        />
                    }
                />
            </Grid>
            <Grid item marginLeft = 'auto'>
                <ValueType
                    type = {renderedOption?.name}
                    onChange = {(values) => onSaveValue(values)}
                    inputValue = {value}
                    max = {target}
                    disabled = {!hasEdit}
                />
            </Grid>
            <Grid item zeroMinWidth>
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
ValueType.propTypes = {
    ...defaultPropTypes,
    max: PropTypes.number
}
ValueType.defaultProps = {
    ...defaultProps,
    max: Number.MAX_SAFE_INTEGER
}

TypeTextField.propTypes = {
    disabled: PropTypes.bool.isRequired,
    inputValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    showMoneyAdornment: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    max: PropTypes.number
}

TypeTextField.defaultProps = {
    max: Number.MAX_SAFE_INTEGER
}