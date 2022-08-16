import { Popup } from 'Components/Popup'
import ProductConfigurationFields from 'Components/ProductConfigurationFields/ProductConfigurationFields'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectRequestErrors } from 'Redux/Errors/selectors'
import { closePopup } from 'Redux/Popups/actions'
import { requestUpdateProduct } from 'Redux/Products/actions'
import ProductConstants from 'Redux/Products/constants'
import { selectProductById } from 'Redux/Products/selectors'

const constant = ProductConstants.UPDATE_PRODUCT

export default function ProductConfigurationPopup({ id }) {
    const dispatch = useDispatch()

    const product = useSelector((state) => selectProductById(state, id))
    const errors = useSelector((state) => selectRequestErrors(state, constant))

    const [teams, setTeams] = useState([])
    const [tags, setTags] = useState([])
    const [projects, setProjects] = useState([])
    const [gitlabGroupId, setGitlabGroupId] = useState(null)
    const [sourceControl, setSourceControl] = useState({})
    const [roadmapType, setRoadmapType] = useState(null)

    const onClose = () => dispatch(closePopup(constant))

    const onSubmit = () => {
        dispatch(requestUpdateProduct({
            ...product,
            roadmapType: roadmapType?.name ?? 'MANUAL',
            gitlabGroupId: gitlabGroupId,
            sourceControlId: sourceControl?.id ?? null,
            tagIds: Object.values(tags.map((tag) => tag.id)),
            projectIds: Object.values(projects.map((project) => project.id)),
            personnel: {
                ...product.personnel,
                teamIds: teams.map((team) => team.id),
            },
            childIds: [] // required by api
        }))
    }

    return (
        <Popup
            title = 'Update Product Configuration'
            subtitle = {product.name}
            subtitleVariant = 'body1'
            onClose = {onClose}
            onSubmit = {onSubmit}
            hideRequiredText
        >
            <ProductConfigurationFields
                errors = {errors}
                onRoadmapTypeChange = {setRoadmapType}
                onGroupIdChange = {setGitlabGroupId}
                onProjectsChange = {setProjects}
                onSourceControlChange = {setSourceControl}
                onTagsChange = {setTags}
                onTeamsChange = {setTeams}
                product = {product}
            />
        </Popup>
    )
}

ProductConfigurationPopup.propTypes = {
    id: PropTypes.number.isRequired
}
