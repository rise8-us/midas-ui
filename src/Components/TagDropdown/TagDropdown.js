import { TextField } from '@material-ui/core'
import { ArrowDropDown } from '@material-ui/icons'
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete'
import { unwrapResult } from '@reduxjs/toolkit'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestCreateTag } from '../../Redux/Tags/actions'
import { selectTagsByTypes } from '../../Redux/Tags/selectors'
import FormatErrors from '../../Utilities/FormatErrors'
import { Tag } from '../Tag'

const filter = createFilterOptions()

function TagDropdown(props) {
    const { defaultTags, error, onChange, label, deletable, disableUnderline, options, type,
        creatable, creatableType, ...autocompleteProps } = props

    const dispatch = useDispatch()

    const allTags = useSelector(state => selectTagsByTypes(state, type))

    const [tags, setTags] = useState(defaultTags)

    const onRemoveTag = (tagId) => {
        const newTags = tags.filter(t => t.id !== tagId)
        setTags(newTags)
        typeof onChange === 'function' && onChange(newTags)
    }

    const onSelectTag = async(_e, values) => {
        if (values.length === 0) {
            setTags([])
            typeof onChange === 'function' && onChange([])
            return
        }

        let currentTags = values.filter(o => o.id !== -1)
        const newTag = values.filter(o => o.id === -1)

        if (newTag.length > 0) {
            const newLabel = newTag[0].label.split('"')[1]

            await dispatch(requestCreateTag({
                label: newLabel,
                color: '#c2c2c2',
                description: '',
                tagType: creatableType
            })).then(unwrapResult)
                .then(results => {
                    currentTags.push(results)
                })
        }

        const selectedValue = String(currentTags[currentTags.length - 1].label).split('::')
        const existingTag = currentTags.filter(tag =>
            selectedValue.length === 2 &&
            tag.label.includes(selectedValue[0], 0) &&
            !tag.label.includes(selectedValue[1])
        )

        if (existingTag.length > 0)
            currentTags = currentTags.filter(tag => !tag.label.includes(existingTag[0].label))

        setTags(currentTags)
        typeof onChange === 'function' && onChange(currentTags)
    }

    useEffect(() => {
        setTags(defaultTags)
    }, [defaultTags])

    return (
        <Autocomplete
            {...autocompleteProps}
            multiple
            freeSolo
            forcePopupIcon
            options = {options ?? allTags}
            getOptionLabel = {(option) => option.label}
            getOptionSelected = {(option, value) => option.id === value.id}
            onChange = {onSelectTag}
            value = {tags}
            defaultValue = {tags}
            style = {{
                minWidth: '250px',
            }}
            renderTags = {(value) => value.map((tag, index) =>
                <Tag
                    key = {index}
                    {...tag}
                    onDelete = {deletable ? () => onRemoveTag(tag.id) : null}
                />
            )}
            renderInput = {(params) =>
                <TextField
                    {...params}
                    label = {label}
                    margin = 'dense'
                    error = { error.length > 0 }
                    InputProps = {{
                        ...params.InputProps,
                        disableUnderline,
                    }}
                    helperText = {<FormatErrors errors = {error}/>}
                />
            }
            filterOptions = {(filteredOptions, params) => {
                const filtered = filter(filteredOptions, params)

                creatable && params.inputValue !== '' && filtered.length === 0 && filtered.push({
                    id: -1,
                    label: `Add "${params.inputValue}"`
                })
                return filtered
            }}
        />
    )
}

TagDropdown.propTypes = {
    defaultTags: PropTypes.array.isRequired,
    onChange: PropTypes.func,
    error: PropTypes.array,
    disabled: PropTypes.bool,
    freeSolo: PropTypes.bool,
    disableClearable: PropTypes.bool,
    label: PropTypes.string,
    deletable: PropTypes.bool,
    disableUnderline: PropTypes.bool,
    popupIcon: PropTypes.node,
    options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        description: PropTypes.string,
        color: PropTypes.string.isRequired
    })),
    type: PropTypes.arrayOf(PropTypes.oneOf(['ALL', 'PROJECT', 'PRODUCT', 'PORTFOLIO', 'GITLAB'])),
    creatable: PropTypes.bool,
    creatableType: PropTypes.oneOf(['ALL', 'PROJECT', 'PRODUCT', 'PORTFOLIO']),
}

TagDropdown.defaultProps = {
    disabled: false,
    freeSolo: false,
    error: [],
    disableClearable: false,
    label: null,
    deletable: false,
    disableUnderline: false,
    popupIcon: <ArrowDropDown />,
    options: undefined,
    onChange: undefined,
    type: ['ALL'],
    creatable: false,
    creatableType: 'ALL'
}

export default TagDropdown
