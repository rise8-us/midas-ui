import { Box } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAppBarFilter } from '../../../Redux/Filters/selectors'
import { openPopup } from '../../../Redux/Popups/actions'
import ProjectConstants from '../../../Redux/Projects/constants'
import { selectUnarchivedProjects } from '../../../Redux/Projects/selectors'
import { ProjectCard } from '../../Cards'
import { FloatingActionButton } from '../../FloatingActionButton'
import { Page } from '../../Page'

function Projects() {
    const dispatch = useDispatch()

    const allProjects = useSelector(selectUnarchivedProjects)
    const filterString = useSelector(selectAppBarFilter).toLowerCase()

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
                    gridGap = '10px 10px'
                    gridAutoFlow = 'row'
                    style = {{ marginBottom: '40px', padding: '0 30px' }}
                >
                    {filteredProducts.map((project, index) => (
                        <ProjectCard key = {index} id = {project.id} hasEdit = {false}/>
                    ))}
                </Box>
            </Box>
            <FloatingActionButton onClick = {create} />
        </Page>
    )
}

export default Projects