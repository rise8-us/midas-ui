import { AttachMoney, HelpOutline } from '@mui/icons-material'
import { Autocomplete, Checkbox, Grid, TextField, Tooltip, Typography } from '@mui/material'
import { SearchEpics } from 'Components/Search'
import useDebounce from 'Hooks/useDebounce'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { selectCompletionTypes } from 'Redux/AppSettings/selectors'

export const determineCompletionTypeData = (completionType, onChangeType, value, target) => {
    switch (completionType) {
    case 'GITLAB_ISSUE':
    case 'BINARY': {
        onChangeType({
            completionType,
            value: value < target ? 0 : 1,
            target: 1
        })
        break
    }
    case 'GITLAB_EPIC':
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
    const [textFieldValue, setTextFieldValue] = useState(inputValue)

    const valueToReturn = useDebounce(Math.min(textFieldValue, max), 500)

    const onValueChange = ({ target }) => {
        const { value } = target

        value.length === 0
            ? setTextFieldValue('')
            : isValid(value) && setTextFieldValue(value, max)
    }

    useEffect(() => {
        onChange(valueToReturn ? valueToReturn : 0)
    }, [valueToReturn])

    useEffect(() => {
        setTextFieldValue(inputValue)
    }, [inputValue])

    return (
        <TextField
            variant = 'outlined'
            size = 'small'
            label = {label}
            value = {textFieldValue}
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
            <Grid item xs zeroMinWidth>
                <TypeTextField
                    disabled = {disabled}
                    inputValue = {inputValue}
                    label = 'Target'
                    onChange = {onChange}
                    showMoneyAdornment = {type === 'MONEY'}
                    title = 'Target value required for completion'
                />
            </Grid>
        )
    }

    return null
}

function ValueType({ type, inputValue, onChange, disabled, max }) {
    const { productId } = useParams()

    switch (type) {
    case 'NUMBER':
    case 'MONEY':
    case 'PERCENTAGE':
        return (
            <Grid item xs = 'auto'>
                <TypeTextField
                    disabled = {disabled}
                    inputValue = {inputValue}
                    label = {`Value${type === 'PERCENTAGE' ? ' (%)' : ''}`}
                    onChange = {onChange}
                    showMoneyAdornment = {type === 'MONEY'}
                    title = 'Current progress towards completion'
                    max = {max}
                />
            </Grid>
        )
    case 'BINARY':
        return (
            <Grid container alignItems = 'baseline' alignContent = 'center' paddingLeft = {2}>
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
    case 'GITLAB_EPIC':
        return (
            <Grid item minWidth = {300} style = {{ flexGrow: 1 }}>
                <SearchEpics
                    defaultSearchTerms = {'product.id:' + productId}
                    textFieldProps = {{
                        variant: 'outlined',
                        size: 'small',
                        label: 'Select Epic',
                        placeholder: 'Search product epics by title',
                    }}
                />
            </Grid>
        )
    case 'GITLAB_ISSUE':
    default:
        return null
    }
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
        <Grid container spacing = {1} style = {{ marginLeft: '-8px', marginBottom: 0 }}>
            <Grid item xs marginBottom = {1} minWidth = '175px' maxWidth = '225px'>
                <Autocomplete
                    freeSolo
                    autoComplete
                    forcePopupIcon = {hasEdit}
                    disabled = {!hasEdit}
                    getOptionLabel = {(option) => option.displayName}
                    options = {Object.values(completionTypes)
                        .filter(cType => !['GITLAB_ISSUE', 'GITLAB_EPIC'].includes(cType.name))}
                    value = {renderedOption}
                    onChange = {onChangeDropdown}
                    renderInput = {(params) =>
                        <TextField
                            {...params}
                            label = 'Completion Type'
                            error = {error?.length > 0}
                            helperText = {error}
                            variant = 'outlined'
                            size = 'small'
                        />
                    }
                />
            </Grid>
            <Grid item container xs = 'auto' spacing = {1} style = {{ maxWidth: 'fit-content' }}>
                <ValueType
                    type = {renderedOption?.name}
                    onChange = {(values) => onSaveValue(values)}
                    inputValue = {value}
                    max = {target}
                    disabled = {!hasEdit}
                />
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