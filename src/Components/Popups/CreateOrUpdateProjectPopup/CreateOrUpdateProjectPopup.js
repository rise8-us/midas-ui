import { Box, makeStyles, TextField } from '@material-ui/core'
import { unwrapResult } from '@reduxjs/toolkit'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectRequestErrors } from '../../../Redux/Errors/selectors'
import { closePopup } from '../../../Redux/Popups/actions'
import { requestSearchProduct } from '../../../Redux/Products/actions'
import { requestCreateProject, requestUpdateProject } from '../../../Redux/Projects/actions'
import ProjectConstants from '../../../Redux/Projects/constants'
import { selectProjectById } from '../../../Redux/Projects/selectors'
import FormatErrors from '../../../Utilities/FormatErrors'
import { Popup } from '../../Popup'
import { TagDropdown } from '../../TagDropdown'

const useStyles = makeStyles(() => ({
    numberField: {
        '& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
            display: 'none'
        }
    }
}))

function CreateOrUpdateProjectPopup({ id, parentId }) {
    const dispatch = useDispatch()
    const classes = useStyles()

    const project = useSelector(state => selectProjectById(state, id))

    const isCreate = project.id === undefined
    const popupTitle = isCreate ? 'Create Project' : 'Update Project'
    const projectConstant = isCreate ? ProjectConstants.CREATE_PROJECT : ProjectConstants.UPDATE_PROJECT
    const projectRequest = (data) => isCreate ? requestCreateProject(data) : requestUpdateProject(data)

    const errors = useSelector(state => selectRequestErrors(state, projectConstant))

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
    const onTagsChange = (value) => setTags(value)

    const onClose = () => dispatch(closePopup(projectConstant))

    const onSubmit = () => {
        let data = {
            ...project,
            name,
            gitlabProjectId,
            description,
            tagIds: Object.values(tags.map(t => t.id))
        }
        if (parentId !== null) data.productId = parentId
        dispatch(projectRequest(data)).then(unwrapResult).then(() =>
            parentId && dispatch(requestSearchProduct(`id:${parentId}`))
        )
    }

    useEffect(() => {
        if (errors.length > 0) {
            setNameError(errors.filter(error => error.includes('name')))
            setGitlabError(errors.filter(error => error.includes('Gitlab')))
            setTagsError(errors.filter(error => error.includes('Tag')))
        }
    }, [errors])

    return (
        <Popup
            title = {popupTitle}
            onClose = {onClose}
            onSubmit = {onSubmit}
        >
            <Box display = 'flex' flexDirection = 'column'>
                <TextField
                    label = 'Project Name'
                    inputProps = {{
                        'data-testid': 'CreateOrUpdateProjectPopup__input-name'
                    }}
                    value = {name}
                    onChange = {onNameChange}
                    error = {nameError.length > 0}
                    helperText = {<FormatErrors errors = {nameError}/>}
                    margin = 'dense'
                    required
                />
                <TextField
                    label = 'Gitlab Project Id'
                    type = 'number'
                    className = {classes.numberField}
                    inputProps = {{
                        'data-testid': 'CreateOrUpdateProjectPopup__input-gitlabProjectId'
                    }}
                    value = {gitlabProjectId}
                    onChange = {onGitlabProjectIdChange}
                    error = {gitlabError.length > 0}
                    helperText = {<FormatErrors errors = {gitlabError}/>}
                    margin = 'dense'
                />
                <TextField
                    label = 'Description'
                    inputProps = {{
                        'data-testid': 'CreateOrUpdateProjectPopup__input-description'
                    }}
                    value = {description}
                    onChange = {onDescriptionChange}
                    margin = 'dense'
                    multiline
                />
                <TagDropdown
                    defaultTags = {tags}
                    error = {tagsError}
                    deletable
                    onChange = {onTagsChange}
                    label = 'Tag(s)'
                    type = {['ALL', 'PROJECT']}
                />
            </Box>
        </Popup>
    )
}

CreateOrUpdateProjectPopup.propTypes = {
    id: PropTypes.number,
    parentId: PropTypes.number
}

CreateOrUpdateProjectPopup.defaultProps = {
    id: null,
    parentId: null
}

export default CreateOrUpdateProjectPopup