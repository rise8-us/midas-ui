import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectProductById } from '../../../Redux/Products/selectors'
import { ProjectCard } from '../../Cards'

function ProjectsTab({ id }) {
    const product = useSelector(state => selectProductById(state, id))
    const projects = product.projects?.filter(p => !p.isArchived)

    return (
        <div style = {{ display: 'flex' }}>
            {projects?.length > 0 &&
                projects.map(project => (
                    <ProjectCard id = {project.id} key = {project.id}/>
                ))
            }
        </div>
    )
}

ProjectsTab.propTypes = {
    id: PropTypes.number.isRequired
}

export default ProjectsTab