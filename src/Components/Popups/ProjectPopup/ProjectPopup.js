import { Box, makeStyles, TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { unwrapResult } from '@reduxjs/toolkit'
import { Popup } from 'Components/Popup'
import { TagDropdown } from 'Components/TagDropdown'
import useFormReducer from 'Hooks/useFormReducer'
import PropTypes from 'prop-types'
import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectRequestErrors } from 'Redux/Errors/selectors'
import { closePopup } from 'Redux/Popups/actions'
import { requestSearchProduct } from 'Redux/Products/actions'
import { requestCreateProject, requestUpdateProject } from 'Redux/Projects/actions'
import ProjectConstants from 'Redux/Projects/constants'
import { selectProjectById } from 'Redux/Projects/selectors'
import { selectSourceControlById, selectSourceControls } from 'Redux/SourceControls/selectors'
import FormatErrors from 'Utilities/FormatErrors'

const useStyles = makeStyles(() => ({
    numberField: {
        '& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
            display: 'none'
        }
    }
}))

const initDetails = (create) => {
    return {
        isCreate: create,
        title: create ? 'Create Project' : 'Update Project',
        constant: create ? ProjectConstants.CREATE_PROJECT : ProjectConstants.UPDATE_PROJECT,
        request: (data) => create ? requestCreateProject(data) : requestUpdateProject(data)
    }
}

function ProjectPopup({ id, parentId }) {
    const dispatch = useDispatch()
    const classes = useStyles()

    const project = useSelector(state => selectProjectById(state, id))
    const context = initDetails(project.id === undefined)

    const allSourceControls = useSelector(selectSourceControls)
    const orginalSourceControl = useSelector(state => selectSourceControlById(state, project.sourceControlId))

    const errors = useSelector(state => selectRequestErrors(state, context.constant))
    const nameError = useMemo(() => errors.filter(error => error.includes('name')), [errors])
    const gitlabError = useMemo(() => errors.filter(error => error.includes('Gitlab')), [errors])
    const tagsError = useMemo(() => errors.filter(error => error.includes('Tag')), [errors])

    const [formValues, formDispatch] = React.useReducer(useFormReducer, {
        name: project.name,
        description: project.description,
        gitlabProjectId: project.gitlabProjectId,
        tags: project.tags,
        sourceControl: orginalSourceControl.id !== undefined ? orginalSourceControl : null
    })

    const handleChange = (name, value) => {
        formDispatch({
            type: 'onChange',
            payload: { name, value }
        })
    }

    const onClose = () => dispatch(closePopup(context.constant))

    const onSubmit = () => {
        let data = {
            ...project,
            name: formValues.name,
            description: formValues.description,
            gitlabProjectId: formValues.gitlabProjectId,
            sourceControlId: formValues.sourceControl?.id ?? null,
            tagIds: Object.values(formValues.tags.map(t => t.id))
        }
        if (parentId !== null) data.productId = parentId
        dispatch(context.request(data)).then(unwrapResult).then(() =>
            parentId && dispatch(requestSearchProduct(`id:${parentId}`))
        )
    }

    return (
        <Popup
            title = {context.title}
            onClose = {onClose}
            onSubmit = {onSubmit}
        >
            <Box display = 'flex' flexDirection = 'column'>
                <TextField
                    label = 'Project Name'
                    inputProps = {{
                        'data-testid': 'ProjectPopup__input-name'
                    }}
                    value = {formValues.name}
                    onChange = {(e) => handleChange('name', e.target.value)}
                    error = {nameError.length > 0}
                    helperText = {<FormatErrors errors = {nameError}/>}
                    margin = 'dense'
                    required
                />
                <Autocomplete
                    value = {formValues.sourceControl}
                    onChange = {(_e, values) => handleChange('sourceControl', values)}
                    options = {allSourceControls}
                    getOptionLabel = {option => option.name}
                    renderInput = {(params) =>
                        <TextField
                            {...params}
                            label = 'Gitlab server'
                            InputProps = {{
                                ...params.InputProps,
                                readOnly: true,
                            }}
                            margin = 'dense'
                        />
                    }
                />
                <TextField
                    label = 'Gitlab Project Id'
                    type = 'number'
                    className = {classes.numberField}
                    inputProps = {{
                        'data-testid': 'ProjectPopup__input-gitlabProjectId'
                    }}
                    value = {formValues.gitlabProjectId}
                    onChange = {(e) => handleChange('gitlabProjectId', e.target.value)}
                    error = {gitlabError.length > 0}
                    helperText = {<FormatErrors errors = {gitlabError}/>}
                    margin = 'dense'
                />
                <TextField
                    label = 'Description'
                    inputProps = {{
                        'data-testid': 'ProjectPopup__input-description'
                    }}
                    value = {formValues.description}
                    onChange = {(e) => handleChange('description', e.target.value)}
                    margin = 'dense'
                    multiline
                />
                <TagDropdown
                    label = 'Tag(s)'
                    defaultTags = {formValues.tags}
                    error = {tagsError}
                    deletable
                    onChange = {(e) => handleChange('tags', e)}
                    type = {['ALL', 'PROJECT']}
                    creatable
                    creatableType = 'PROJECT'
                    forcePopupIcon
                />
            </Box>
        </Popup>
    )
}

ProjectPopup.propTypes = {
    id: PropTypes.number,
    parentId: PropTypes.number
}

ProjectPopup.defaultProps = {
    id: null,
    parentId: null
}

export default ProjectPopup
