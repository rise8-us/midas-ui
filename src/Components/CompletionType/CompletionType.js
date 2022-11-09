import { AttachMoney, HelpOutline } from '@mui/icons-material'
import { Autocomplete, Checkbox, Grid, TextField, Tooltip, Typography } from '@mui/material'
import { SearchEpics } from 'Components/Search'
import useDebounce from 'Hooks/useDebounce'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { selectCompletionTypes } from 'Redux/AppSettings/selectors'

const types = {
    BINARY: 'BINARY',
    NUMBER: 'NUMBER',
    MONEY: 'MONEY',
    PERCENTAGE: 'PERCENTAGE',
    GITLAB_EPIC: 'GITLAB_EPIC',
    GITLAB_ISSUE: 'GITLAB_ISSUE'
}

export const determineCompletionTypeData = (onChangeType, fields) => {
    const noSyncFields = {
        gitlabEpicId: null,
        gitlabIssueId: null
    }
    const { completionType, value, target } = fields

    switch (completionType) {
    case types.BINARY: {
        onChangeType({
            ...noSyncFields,
            completionType,
            value: value < target ? 0 : 1,
            target: 1
        })
        break
    }
    case types.PERCENTAGE: {
        const newValue = value < target ? (value / target * 100) : 100

        onChangeType({
            ...noSyncFields,
            completionType,
            value: Number.parseFloat(newValue.toFixed(2)),
            target: 100
        })
        break
    }
    case types.NUMBER:
    case types.MONEY: {
        onChangeType({
            ...noSyncFields,
            completionType,
            value,
            target
        })
        break
    }
    case types.GITLAB_ISSUE: {
        onChangeType({
            ...noSyncFields,
            completionType,
            gitlabIssueId: fields.gitlabIssueId
        })
        break
    }
    case types.GITLAB_EPIC: {
        onChangeType({
            ...noSyncFields,
            completionType,
            gitlabEpicId: fields.gitlabEpicId
        })
        break
    }
    }
}

const isValid = (value) => RegExp(/^\d{0,}([.]{0,1})\d{0,2}$/).test(value)
const isManualOption = (option) => [types.BINARY, types.PERCENTAGE, types.NUMBER, types.MONEY].includes(option)

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
        inputValue !== valueToReturn && onChange(valueToReturn ? valueToReturn : 0)
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

    if ([types.NUMBER, types.MONEY].includes(type)) {
        return (
            <Grid item xs zeroMinWidth>
                <TypeTextField
                    disabled = {disabled}
                    inputValue = {inputValue}
                    label = 'Target'
                    onChange = {onChange}
                    showMoneyAdornment = {type === types.MONEY}
                    title = 'Target value required for completion'
                />
            </Grid>
        )
    }

    return null
}

function ValueType({ type, inputValue, onChange, disabled, max }) {
    const addPercentageSymbol = () => type === types.PERCENTAGE ? ' (%)' : ''
    const isChecked = () => inputValue === 1

    return [types.NUMBER, types.MONEY, types.PERCENTAGE].includes(type)
        ? <Grid item xs = 'auto' data-testid = {`CompletionType__value-${type}`}>
            <TypeTextField
                disabled = {disabled}
                inputValue = {inputValue}
                label = {'Value' + addPercentageSymbol()}
                onChange = {onChange}
                showMoneyAdornment = {type === types.MONEY}
                title = 'Current progress towards completion'
                max = {max}
            />
        </Grid>
        : <Grid container alignItems = 'baseline' alignContent = 'center' paddingLeft = {2}>
            <Grid item>
                <label htmlFor = 'toggle'>
                    <Typography variant = 'caption' color = 'secondary'>Complete</Typography>
                </label>
            </Grid>
            <Grid item data-testid = 'CompletionType__checkbox-button'>
                <Checkbox
                    id = 'toggle'
                    disabled = {disabled}
                    checked = {isChecked()}
                    size = 'small'
                    onChange = {(e) => onChange(e.target.checked ? 1 : 0)}
                />
            </Grid>
        </Grid>
}

function AutomatedType({ type, completion, onChange }) {
    const { productId } = useParams()
    switch (type) {
    case types.GITLAB_EPIC:
        return (
            <SearchEpics
                defaultSearchTerms = {'product.id:' + productId}
                textFieldProps = {{
                    variant: 'outlined',
                    size: 'small',
                    label: 'Select Epic',
                    placeholder: completion?.gitlabEpic?.title ?? 'Search product epics by title',
                }}
                onChange = {(_event, values) =>
                    values[0]?.id > 0 && onChange({
                        gitlabEpicId: values[0].id,
                        completionType: types.GITLAB_EPIC
                    })
                }
            />
        )
    case types.GITLAB_ISSUE:
    default:
        return null
    }
}

export default function CompletionType({ completion, hasEdit, onChange }) {
    const completionTypes = useSelector(selectCompletionTypes)

    const [renderedOption, setRenderedOption] = useState(completionTypes[completion?.completionType] ?? null)

    const onChangeDropdown = (_e, selectedOption) => {
        setRenderedOption(selectedOption)

        const fields = {
            completionType: selectedOption?.name,
            value: completion.value,
            target: completion.target
        }

        isManualOption(selectedOption?.name) && determineCompletionTypeData(onChange, fields)
    }

    return (
        <Grid container spacing = {1} style = {{ marginLeft: '-8px', marginBottom: 0, marginTop: '4px' }}>
            <Grid item xs marginBottom = {1} minWidth = '175px' style = {{ maxWidth: 'initial' }}>
                <Autocomplete
                    freeSolo
                    autoComplete
                    disableClearable
                    forcePopupIcon = {hasEdit}
                    disabled = {!hasEdit}
                    getOptionLabel = {(option) => option?.displayName}
                    options = {Object.values(completionTypes)
                        .filter(cType => !['CONNECTION_FAILURE', types.GITLAB_ISSUE].includes(cType.name))}
                    value = {renderedOption}
                    onChange = {onChangeDropdown}
                    renderInput = {(params) =>
                        <TextField
                            {...params}
                            label = 'Completion Type'
                            variant = 'outlined'
                            size = 'small'
                        />
                    }
                />
            </Grid>
            {isManualOption(renderedOption?.name) ?
                <Grid item container xs = 'auto' spacing = {1} style = {{ maxWidth: '100%' }}>
                    <ValueType
                        type = {renderedOption?.name}
                        onChange = {(value) => onChange({ value })}
                        inputValue = {completion.value}
                        max = {completion.target}
                        disabled = {!hasEdit}
                    />
                    <TargetType
                        type = {renderedOption?.name}
                        onChange = {(target) => onChange({ target })}
                        inputValue = {completion.target}
                        disabled = {!hasEdit}
                    />
                </Grid>
                :
                <Grid item sx = {{ maxWidth: 'md', width: 1 }}>
                    <AutomatedType
                        type = {renderedOption?.name}
                        onChange = {(value) => onChange({ ...value })}
                        completion = {completion}
                    />
                </Grid>
            }
        </Grid>
    )
}

CompletionType.propTypes = {
    completion: PropTypes.shape({
        value: PropTypes.number,
        target: PropTypes.number,
        completionType: PropTypes.string,
        id: PropTypes.number,
    }).isRequired,
    hasEdit: PropTypes.bool,
    onChange: PropTypes.func.isRequired
}

CompletionType.defaultProps = {
    hasEdit: false
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
AutomatedType.propTypes = {
    onChange: PropTypes.func.isRequired,
    type: PropTypes.string,
    completion: PropTypes.shape({
        gitlabEpic: PropTypes.shape({
            title: PropTypes.string
        })
    }).isRequired
}
AutomatedType.defaultProps = {
    type: 'unknown'
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
