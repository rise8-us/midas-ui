import { TextField } from '@material-ui/core'
import { ArrowDropDown } from '@material-ui/icons'
import { Autocomplete } from '@material-ui/lab'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectAllTags } from '../../Redux/Tags/selectors'
import FormatErrors from '../../Utilities/FormatErrors'
import { Tag } from '../Tag'

function TagDropdown(props) {
    const { defaultTags, error, onChange, label, deletable, disableUnderline, options, type,
        ...autocompleteProps } = props

    const allTags = useSelector(selectAllTags)

    const [tags, setTags] = useState(defaultTags)

    const onRemoveTag = (tagId) => {
        const newTags = tags.filter(t => t.id !== tagId)
        setTags(newTags)
        typeof onChange === 'function' && onChange(newTags)
    }

    const onSelectTag = (_e, values) => {
        if (values.length === 0) {
            setTags([])
            typeof onChange === 'function' && onChange([])
            return
        }

        const selectedValue = String(values[values.length - 1].label).split('::')
        const existingTag = values.filter(tag =>
            selectedValue.length === 2 &&
            tag.label.includes(selectedValue[0], 0) &&
            !tag.label.includes(selectedValue[1])
        )

        let newTags

        if (existingTag.length === 0) newTags = [...values]
        else newTags = values.filter(tag => !tag.label.includes(existingTag[0].label))

        setTags(newTags)
        typeof onChange === 'function' && onChange(newTags)
    }

    useEffect(() => {
        setTags(defaultTags)
    }, [defaultTags])

    return (
        <Autocomplete
            {...autocompleteProps}
            multiple
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
                        type,
                    }}
                    helperText = {<FormatErrors errors = {error}/>}
                />
            }
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
    type: PropTypes.string
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
    type: 'text'
}

export default TagDropdown
