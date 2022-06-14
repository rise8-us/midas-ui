import { Chip, Stack, TextField } from '@mui/material'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'
import { unwrapResult } from '@reduxjs/toolkit'
import { EpicSyncRequest } from 'Components/EpicSyncRequest'
import { SearchTeams } from 'Components/Search/SearchTeams'
import { TagDropdown } from 'Components/TagDropdown'
import Tooltips from 'Constants/Tooltips'
import PropTypes from 'prop-types'
import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectRoadmapTypes } from 'Redux/AppSettings/selectors'
import { requestSyncEpicsByProductId } from 'Redux/Epics/actions'
import { requestCreateProject } from 'Redux/Projects/actions'
import { selectProjectsByProductId, selectProjectsWithNoProductId } from 'Redux/Projects/selectors'
import { selectSourceControlById, selectSourceControls } from 'Redux/SourceControls/selectors'
import { requestFindTeamBy } from 'Redux/Teams/actions'
import { styled } from 'Styles/materialThemes'
import FormatErrors from 'Utilities/FormatErrors'
import { buildOrQueryByIds } from 'Utilities/requests'

const TextFieldStyled = styled(TextField)(() => ({
    '& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button':
      {
          display: 'none',
      },
}))

const filter = createFilterOptions()
const searchErrors = (errors, searchString) => errors.filter(error => error.includes(searchString))

export default function ProductConfigurationFields({
    product,
    errors,
    onTagsChange,
    onTeamsChange,
    onProjectsChange,
    onGroupIdChange,
    onSourceControlChange,
    onRoadmapTypeChange
}) {

    const dispatch = useDispatch()

    const selectedSourceControl = useSelector((state) => selectSourceControlById(state, product.sourceControlId))
    const selectedProjects = useSelector((state) => selectProjectsByProductId(state, product.id))

    const allRoadmapTypes = useSelector(selectRoadmapTypes)
    const allSourceControls = useSelector(selectSourceControls)
    const projectsWithNoProductId = useSelector(selectProjectsWithNoProductId)

    const [teams, setTeams] = useState([])
    const [projects, setProjects] = useState(selectedProjects)
    const [tags, setTags] = useState(product.tags)
    const [roadmapType, setRoadmapType] = useState(null)
    const [gitlabGroupId, setGitlabGroupId] = useState(product.gitlabGroupId)
    const [sourceControl, setSourceControl] = useState(
        selectedSourceControl.id !== undefined ? selectedSourceControl : null
    )
    const availableProjects = useMemo(() => selectedProjects.concat(projectsWithNoProductId),
        [projectsWithNoProductId, selectedProjects]
    )

    const onSelectProjects = (_e, values) => {
        const newProject = values.filter((o) => o.id === -1)

        if (newProject.length > 0) {
            const newName = newProject[0].name.split('"')[1]
            const currentValues = values.filter((o) => o.id !== -1)

            dispatch(requestCreateProject({
                name: newName,
                productId: product.id,
                tagIds: [],
            })).then(unwrapResult)
                .then((results) => {
                    currentValues.push(results)
                    setProjects(currentValues)
                })
        } else {
            setProjects(values)
        }
    }

    useEffect(() => {
        product.personnel?.teamIds?.length > 0 &&
        dispatch(requestFindTeamBy(buildOrQueryByIds(product.personnel.teamIds)))
            .then(unwrapResult)
            .then((data) => {
                setTeams(data)
            })
    }, [])

    useEffect(() => {
        setRoadmapType(allRoadmapTypes[product.roadmapType])
    }, [allRoadmapTypes])

    useEffect(() => {
        onTeamsChange(teams)
    }, [teams])

    useEffect(() => {
        onTagsChange(tags)
    }, [tags])

    useEffect(() => {
        onRoadmapTypeChange(roadmapType)
    }, [roadmapType])

    useEffect(() => {
        onProjectsChange(projects)
    }, [projects])

    useEffect(() => {
        onGroupIdChange(gitlabGroupId)
    }, [gitlabGroupId])

    useEffect(() => {
        onSourceControlChange(sourceControl)
    }, [sourceControl])

    return (
        <Stack display = 'flex' flexDirection = 'column'>
            <SearchTeams
                onChange = {(_e, values) => setTeams(values)}
                value = {teams}
                multiple
            />
            <TagDropdown
                label = 'Tag(s)'
                onChange = {setTags}
                defaultTags = {tags}
                type = {['ALL', 'PRODUCT']}
                creatableType = 'PRODUCT'
                deletable
                creatable
                forcePopupIcon
            />
            <Autocomplete
                value = {roadmapType}
                onChange = {(_e, values) => setRoadmapType(values)}
                options = {Object.values(allRoadmapTypes)}
                getOptionLabel = {(option) => option.displayName}
                renderInput = {(params) => (
                    <TextField
                        {...params}
                        label = 'Roadmap Type'
                        InputProps = {{
                            ...params.InputProps,
                            readOnly: true,
                        }}
                        margin = 'dense'
                    />
                )}
            />
            <Autocomplete
                value = {sourceControl}
                onChange = {(_e, values) => setSourceControl(values)}
                options = {allSourceControls}
                getOptionLabel = {(option) => option.name}
                renderInput = {(params) => (
                    <TextField
                        {...params}
                        label = 'Gitlab server'
                        InputProps = {{
                            ...params.InputProps,
                            readOnly: true,
                        }}
                        margin = 'dense'
                    />
                )}
            />
            <TextFieldStyled
                label = 'Gitlab Group Id'
                type = 'number'
                inputProps = {{
                    'data-testid': 'ProductConfigurationFields__input-gitlabGroupId',
                }}
                InputProps = {{
                    endAdornment: (
                        <EpicSyncRequest
                            id = {product.id}
                            request = {requestSyncEpicsByProductId}
                            tooltip = {Tooltips.EPICS_ROADMAP_SYNC}
                        />
                    ) }}
                value = {gitlabGroupId ?? ''}
                onChange = {(e) => setGitlabGroupId(e.target.value)}
                error = {searchErrors(errors, 'Gitlab').length > 0}
                helperText = {<FormatErrors errors = {searchErrors(errors, 'Gitlab')} />}
                margin = 'dense'
            />
            <Autocomplete
                multiple
                autoSelect
                freeSolo
                options = {availableProjects}
                getOptionLabel = {(option) => option.name}
                isOptionEqualToValue = {(option, value) => option.id === value.id}
                onChange = {onSelectProjects}
                value = {projects}
                renderTags = {(params) => (
                    <>
                        {params.map((proj, index) =>
                            <Chip
                                key = {index}
                                data-testid = {'ProductConfigurationFields__project-tag-' + index}
                                label = {proj.name}
                                variant = 'outlined'
                                size = 'small'
                                style = {{
                                    textDecorationLine: proj.isArchived ? 'line-through' : 'none',
                                    marginRight: '3px'
                                }}
                                onDelete = {e => onSelectProjects(e, params.filter(p => p.id !== proj.id))}
                            />
                        )}
                    </>
                )}
                renderInput = {(params) => (
                    <TextField
                        {...params}
                        label = 'Gitlab Project(s)'
                        margin = 'dense'
                        error = {searchErrors(errors, 'Project with').length > 0}
                        placeholder = {'Projects that have CTF pipeline'}
                        helperText = {
                            searchErrors(errors, 'Project with').length > 0 ? (
                                <FormatErrors errors = {searchErrors(errors, 'Project with')} />
                            ) : (
                                'Don\'t see what you\'re looking for? Add it by typing it.'
                            )
                        }
                    />
                )}
                filterOptions = {(options, params) => {
                    const filtered = filter(options, params)

                    params.inputValue !== '' &&
                filtered.length === 0 &&
                filtered.push({
                    id: -1,
                    name: `Add "${params.inputValue}"`,
                })
                    return filtered
                }}
            />
        </Stack>
    )
}

ProductConfigurationFields.propTypes = {
    errors: PropTypes.arrayOf(PropTypes.string),
    onGroupIdChange: PropTypes.func,
    onProjectsChange: PropTypes.func,
    onSourceControlChange: PropTypes.func,
    onTagsChange: PropTypes.func,
    onTeamsChange: PropTypes.func,
    onRoadmapTypeChange: PropTypes.func,
    product: PropTypes.shape({
        id: PropTypes.number,
        sourceControlId: PropTypes.number,
        gitlabGroupId: PropTypes.number,
        personnel: PropTypes.shape({
            teamIds: PropTypes.arrayOf(PropTypes.number),
        }),
        projectIds: PropTypes.arrayOf(PropTypes.number),
        tags: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number,
            description: PropTypes.string,
            color: PropTypes.string,
            tagType: PropTypes.string
        })),
        roadmapType: PropTypes.string
    }).isRequired,
}

ProductConfigurationFields.defaultProps = {
    errors: [],
    onGroupIdChange: (v) => v,
    onProjectsChange: (v) => v,
    onSourceControlChange: (v) => v,
    onTagsChange: (v) => v,
    onTeamsChange: (v) => v,
    onRoadmapTypeChange: (v) => v,
}
