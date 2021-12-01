import { Box, Typography } from '@mui/material'
import { ProjectCard } from 'Components/Cards'
import PropTypes from 'prop-types'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { openPopup } from 'Redux/Popups/actions'
import ProductConstants from 'Redux/Products/constants'
import { selectProductById } from 'Redux/Products/selectors'
import ProjectConstants from 'Redux/Projects/constants'
import { styled } from 'Styles/materialThemes'

const TypographyClickable = styled(Typography)(() => ({
    '&:hover': {
        cursor: 'pointer',
        textDecoration: 'underline',
    },
}))

function ProjectsTab({ id, hasEdit }) {

    const dispatch = useDispatch()

    const product = useSelector((state) => selectProductById(state, id))
    const projects = product.projects?.filter((p) => !p.isArchived)

    const updateProduct = () =>
        dispatch(
            openPopup(ProductConstants.UPDATE_PRODUCT, 'ProductPopup', {
                id: product.id,
            })
        )

    const createProject = async() => {
        dispatch(
            openPopup(ProjectConstants.CREATE_PROJECT, 'ProjectPopup', {
                parentId: product.id,
            })
        )
    }

    const noProjectsString = 'There does not seem to be any projects associated with ' +
        `${product.name !== undefined ? product.name : ' this product'}`

    const typoProps = {
        variant: 'caption',
        style: {
            padding: '0 2px',
        },
    }

    return (
        <div>
            {projects?.length > 0 ? (
                <Box
                    display = 'grid'
                    justifyContent = 'left'
                    gridTemplateColumns = 'repeat(auto-fit, 450px)'
                    gridAutoRows = '1fr'
                    gap = '10px 10px'
                    gridAutoFlow = 'row'
                    style = {{ margin: '20px 0' }}
                >
                    {projects.map((project) => (
                        <ProjectCard id = {project.id} key = {project.id} hasEdit = {hasEdit} />
                    ))}
                </Box>
            ) : (
                <div style = {{ display: 'inline-flex', padding: '12px 36px' }}>
                    <Typography {...typoProps} color = 'text.secondary'>
                        {noProjectsString} •
                    </Typography>
                    {hasEdit && (
                        <>
                            <Typography {...typoProps} color = 'text.secondary'>•</Typography>
                            <TypographyClickable
                                {...typoProps}
                                color = 'primary'
                                onClick = {updateProduct}
                            >
                                add an existing project
                            </TypographyClickable>
                            <Typography {...typoProps} color = 'text.secondary'>or</Typography>
                            <TypographyClickable
                                {...typoProps}
                                color = 'primary'
                                onClick = {createProject}
                            >
                                create a new project
                            </TypographyClickable>
                            <Typography variant = 'caption'>.</Typography>
                        </>
                    )}
                </div>
            )}
        </div>
    )
}

ProjectsTab.propTypes = {
    id: PropTypes.number.isRequired,
    hasEdit: PropTypes.bool.isRequired,
}

export default ProjectsTab