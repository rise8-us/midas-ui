import { Box } from '@mui/material'
import { ProjectCard } from 'Components/Cards'
import { FloatingActionButton } from 'Components/FloatingActionButton'
import { Page } from 'Components/Page'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserLoggedIn } from 'Redux/Auth/selectors'
import { selectAppBarFilter } from 'Redux/Filters/selectors'
import { openPopup } from 'Redux/Popups/actions'
import ProjectConstants from 'Redux/Projects/constants'
import { selectUnarchivedProjects } from 'Redux/Projects/selectors'

function Projects() {
    const dispatch = useDispatch()

    const allProjects = useSelector(selectUnarchivedProjects)
    const filterString = useSelector(selectAppBarFilter).toLowerCase()
    const userLoggedIn = useSelector(selectUserLoggedIn)

    const filteredProducts = allProjects.filter(project => project.name.toLowerCase().includes(filterString))

    const create = () => dispatch(openPopup(ProjectConstants.CREATE_PROJECT, 'ProjectPopup'))

    return (
        <Page>
            <Box style = {{ padding: '20px 40px' }}>
                <Box
                    display = 'grid'
                    justifyContent = 'center'
                    gridTemplateColumns = 'repeat(auto-fit, 450px)'
                    gridAutoRows = '1fr'
                    gap = '10px 10px'
                    gridAutoFlow = 'row'
                    style = {{ marginBottom: '40px', padding: '0 30px' }}
                >
                    {filteredProducts.map((project, index) => (
                        <ProjectCard key = {index} id = {project.id} hasEdit = {userLoggedIn.id === project.ownerId}/>
                    ))}
                </Box>
            </Box>
            <FloatingActionButton onClick = {create} />
        </Page>
    )
}

export default Projects