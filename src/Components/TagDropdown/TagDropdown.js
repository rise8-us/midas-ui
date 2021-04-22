import { TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectAllTags } from '../../Redux/Tags/selectors'
import { Tag } from '../Tag'

function TagDropdown({ defaultTags, error, onChange }) {
    const allTags = useSelector(selectAllTags)

    const [tags, setTags] = useState(defaultTags)

    const onRemoveTag = (tagId) => setTags(tags.filter(t => t.id !== tagId))

    const onSelectTag = (_e, values) => {
        if (values.length === 0) {
            setTags([])
            return
        }

        const selectedValue = String(values[values.length - 1].label).split('::')
        const existingTag = values.filter(tag =>
            selectedValue.length === 2 &&
            tag.label.includes(selectedValue[0], 0) &&
            !tag.label.includes(selectedValue[1])
        )

        if (existingTag.length === 0) setTags(values)
        else setTags(values.filter(tag => !tag.label.includes(existingTag[0].label)))
    }

    useEffect(() => {
        onChange(tags)
    }, [tags])

    return (
        <Autocomplete
            multiple
            options = {allTags}
            getOptionLabel = {(option) => option.label}
            getOptionSelected = {(option, value) => option.id === value.id}
            onChange = {onSelectTag}
            value = {tags}
            defaultValue = {tags}
            renderTags = {(value) => value.map((tag, index) =>
                <Tag
                    key = {index}
                    {...tag}
                    onDelete = {() => onRemoveTag(tag.id)}
                />
            )}
            renderInput = {(params) =>
                <TextField
                    {...params}
                    label = 'Add Tag(s)'
                    margin = 'dense'
                    error = { error.length > 0 }
                    helperText = { error[0] ?? ''}
                />
            }
        />
    )
}

TagDropdown.propTypes = {
    defaultTags: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.array.isRequired
}

export default TagDropdown
