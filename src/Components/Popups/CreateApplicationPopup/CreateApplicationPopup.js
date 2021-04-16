import { Box, TextField } from '@material-ui/core'
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete'
import { unwrapResult } from '@reduxjs/toolkit'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestCreateApplication } from '../../../Redux/Applications/actions'
import ApplicationConstants from '../../../Redux/Applications/constants'
import { selectRequestErrors } from '../../../Redux/Errors/selectors'
import { closePopup } from '../../../Redux/Popups/actions'
import { requestCreateProject } from '../../../Redux/Projects/actions'
import { selectNoAppIdProjects } from '../../../Redux/Projects/selectors'
import { selectAllTags } from '../../../Redux/Tags/selectors'
import { Popup } from '../../Popup'
import { Tag } from '../../Tag'

const filter = createFilterOptions()

function CreateApplicationPopup() {
    const dispatch = useDispatch()

    const allTags = useSelector(selectAllTags)
    const availableProjects = useSelector(selectNoAppIdProjects)

    const errors = useSelector(state => selectRequestErrors(state, ApplicationConstants.CREATE_APPLICATION))

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [tags, setTags] = useState([])
    const [projects, setProjects] = useState([])

    const [nameError, setNameError] = useState([])
    const [tagsError, setTagsError] = useState([])
    const [projectsError, setProjectsError] = useState([])

    const onNameChange = (e) => setName(e.target.value)
    const onDescriptionChange = (e) => setDescription(e.target.value)

    const onSelectProjects = (_e, values) => {
        const newProject = values.filter(o => o.id === -1)

        if (newProject.length > 0) {
            const newName = newProject[0].name.split('"')[1]
            let newValues = values.filter(o => o.id !== -1)

            dispatch(requestCreateProject({ name: newName })).then(unwrapResult)
                .then(results => {
                    newValues.push(results)
                    setProjects(newValues)
                })
                .catch(rejectedValueOrSerializedError => setProjectsError([rejectedValueOrSerializedError]))
        } else {
            setProjects(values)
        }
    }
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

    const onClose = () => dispatch(closePopup(ApplicationConstants.CREATE_APPLICATION))
    const onRemoveTag = (tagId) => setTags(tags.filter(t => t.id !== tagId))

    const onSubmit = () => {
        dispatch(requestCreateApplication({
            name,
            description,
            tagIds: Object.values(tags.map(t => t.id)),
            projectIds: Object.values(projects.map(p => p.id))
        }))
    }

    useEffect(() => {
        if (errors.length > 0) {
            setNameError(errors.filter(error => error.includes('name')))
            setTagsError(errors.filter(error => error.includes('Tag')))
        }
    }, [errors])

    return (
        <Popup
            title = 'Create New Application'
            onClose = {onClose}
            onSubmit = {onSubmit}
        >
            <Box display = 'flex' flexDirection = 'column'>
                <TextField
                    label = 'Application Name'
                    data-testid = 'CreateApplicationPopup__input-name'
                    value = {name}
                    onChange = {onNameChange}
                    error = { nameError.length > 0 }
                    helperText = { nameError[0] ?? '' }
                    margin = 'dense'
                    required
                />
                <TextField
                    label = 'Description'
                    data-testid = 'CreateApplicationPopup__input-description'
                    value = {description}
                    onChange = {onDescriptionChange}
                    margin = 'dense'
                    multiline
                />
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
                            error = { tagsError.length > 0 }
                            helperText = { tagsError[0] ?? ''}
                        />
                    }
                />
                <Autocomplete
                    multiple
                    autoSelect
                    options = {availableProjects}
                    getOptionLabel = {(option) => option.name}
                    getOptionSelected = {(option, value) => option.id === value.id}
                    onChange = {onSelectProjects}
                    value = {projects}
                    ChipProps = {{ variant: 'outlined' }}
                    renderInput = {(params) =>
                        <TextField
                            {...params}
                            label = 'Add Project(s)'
                            margin = 'dense'
                            error = {projectsError.length > 0}
                            helperText = {projectsError[0] ?? ''}
                            data-testid = 'CreateApplicationPopup__input-projects'
                        />
                    }
                    filterOptions = {(options, params) => {
                        const filtered = filter(options, params)

                        params.inputValue !== '' && filtered.length === 0 && filtered.push({
                            id: -1,
                            name: `Add "${params.inputValue}"`
                        })

                        return filtered
                    }}
                />
            </Box>
        </Popup>
    )
}

export default CreateApplicationPopup