import { Box, makeStyles, Typography } from '@material-ui/core'
import PropTypes from 'prop-types'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { openPopup } from '../../../Redux/Popups/actions'
import ProductConstants from '../../../Redux/Products/constants'
import { selectProductById } from '../../../Redux/Products/selectors'
import ProjectConstants from '../../../Redux/Projects/constants'
import { ProjectCard } from '../../Cards'

const useStyles = makeStyles(() => ({
    clickable: {
        '&:hover': {
            cursor: 'pointer',
            textDecoration: 'underline'
        }
    }
}))

function ProjectsTab({ id }) {
    const classes = useStyles()
    const dispatch = useDispatch()

    const product = useSelector(state => selectProductById(state, id))
    const projects = product.projects?.filter(p => !p.isArchived)

    const updateProduct = () =>
        dispatch(openPopup(ProductConstants.UPDATE_PRODUCT, 'ProductPopup', { id: product.id }))

    const createProject = async() => {
        dispatch(openPopup(ProjectConstants.CREATE_PROJECT, 'ProjectPopup', { parentId: product.id }))
    }

    const noProjectsString =
        `There does not seem to be any projects associated with \
${product.name !== undefined ? product.name : 'this product'} •`

    const typoProps = {
        variant: 'caption',
        style: {
            padding: '0 2px'
        }
    }

    return (
        <div>
            {projects?.length > 0 ?
                <Box
                    display = 'grid'
                    justifyContent = 'left'
                    gridTemplateColumns = 'repeat(auto-fit, 450px)'
                    gridAutoRows = '1fr'
                    gridGap = '10px 10px'
                    gridAutoFlow = 'row'
                    style = {{ margin: '20px 0' }}
                >
                    {projects.map(project => (
                        <ProjectCard id = {project.id} key = {project.id}/>
                    ))}
                </Box>
                :
                <div style = {{ display: 'inline-flex', padding: '12px 36px' }}>
                    <Typography {...typoProps} color = 'textSecondary'>{noProjectsString}</Typography>
                    <Typography
                        {...typoProps}
                        className = {classes.clickable}
                        color = 'primary'
                        onClick = {updateProduct}
                    >add an existing project</Typography>
                    <Typography {...typoProps} color = 'textSecondary'>or</Typography>
                    <Typography
                        {...typoProps}
                        className = {classes.clickable}
                        color = 'primary'
                        onClick = {createProject}
                    >create a new project</Typography>
                    <Typography variant = 'caption'>.</Typography>
                </div>
            }
        </div>
    )
}

ProjectsTab.propTypes = {
    id: PropTypes.number.isRequired
}

export default ProjectsTab