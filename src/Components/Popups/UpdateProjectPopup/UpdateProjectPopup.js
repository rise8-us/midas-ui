import { Box, makeStyles, TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectRequestErrors } from '../../../Redux/Errors/selectors'
import { closePopup } from '../../../Redux/Popups/actions'
import { requestUpdateProject } from '../../../Redux/Projects/actions'
import ProjectConstants from '../../../Redux/Projects/constants'
import { selectProjectById } from '../../../Redux/Projects/selectors'
import { selectAllTags } from '../../../Redux/Tags/selectors'
import { Popup } from '../../Popup'
import { Tag } from '../../Tag'

const useStyles = makeStyles(() => ({
    numberField: {
        '& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
            display: 'none'
        }
    }
}))

function UpdateProjectPopup({ id }) {
    const dispatch = useDispatch()
    const classes = useStyles()

    const project = useSelector(state => selectProjectById(state, id))
    const errors = useSelector(state => selectRequestErrors(state, ProjectConstants.UPDATE_PROJECT))

    const allTags = useSelector(selectAllTags)

    const [name, setName] = useState(project.name)
    const [gitlabProjectId, setGitlabProjectId] = useState(project.gitlabProjectId)
    const [description, setDescription] = useState(project.description)
    const [tags, setTags] = useState(project.tags)
    const [nameError, setNameError] = useState([])
    const [gitlabError, setGitlabError] = useState([])
    const [tagsError, setTagsError] = useState([])

    const onNameChange = (e) => setName(e.target.value)
    const onGitlabProjectIdChange = (e) => setGitlabProjectId(e.target.value)
    const onDescriptionChange = (e) => setDescription(e.target.value)
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

    const onClose = () => dispatch(closePopup(ProjectConstants.UPDATE_PROJECT))
    const onRemoveTag = (tagId) => setTags(tags.filter(t => t.id !== tagId))

    const onSubmit = () =>
        dispatch(requestUpdateProject({
            ...project,
            name,
            gitlabProjectId,
            description,
            tagIds: Object.values(tags.map(t => t.id))
        }))

    useEffect(() => {
        if (errors.length > 0) {
            setNameError(errors.filter(error => error.includes('name')))
            setGitlabError(errors.filter(error => error.includes('Gitlab')))
            setTagsError(errors.filter(error => error.includes('Tag')))
        }
    }, [errors])

    return (
        <Popup
            title = 'Update Project'
            onClose = {onClose}
            onSubmit = {onSubmit}
        >
            <Box display = 'flex' flexDirection = 'column'>
                <TextField
                    label = 'Project Name'
                    data-testid = 'UpdateProjectPopup__input-name'
                    value = {name}
                    onChange = {onNameChange}
                    error = {nameError.length > 0}
                    helperText = {nameError[0] ?? ''}
                    margin = 'dense'
                    required
                />
                <TextField
                    label = 'Gitlab Project Id'
                    type = 'number'
                    className = {classes.numberField}
                    data-testid = 'UpdateProjectPopup__input-gitlabProjectId'
                    value = {gitlabProjectId}
                    onChange = {onGitlabProjectIdChange}
                    error = {gitlabError.length > 0}
                    helperText = {gitlabError[0] ?? ''}
                    margin = 'dense'
                />
                <TextField
                    label = 'Description'
                    data-testid = 'UpdateProjectPopup__input-description'
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
            </Box>
        </Popup>
    )
}

UpdateProjectPopup.propTypes = {
    id: PropTypes.number.isRequired
}

export default UpdateProjectPopup