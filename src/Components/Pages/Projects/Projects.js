import { Box, Button, makeStyles, useTheme } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import React, { useLayoutEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useWindowSize from '../../../Hooks/useWindowSize'
import { openPopup } from '../../../Redux/Popups/actions'
import ProjectConstants from '../../../Redux/Projects/constants'
import { selectUnarchivedProjects } from '../../../Redux/Projects/selectors'
import { ProjectCard } from '../../Cards'
import { Page } from '../../Page'

const useStyles = makeStyles(theme => ({
    button: {
        '&:hover': {
            color: theme.palette.primary.main
        },
        height: 40
    }
}))

function Projects() {
    const dispatch = useDispatch()
    const classes = useStyles()
    const flexRef = useRef()
    const theme = useTheme()
    const windowSize = useWindowSize()
    const cardWidth = 450

    const [cardsOnRow, setCardsOnRow] = useState(1)

    const allProjects = useSelector(selectUnarchivedProjects)

    const createProject = () => dispatch(openPopup(ProjectConstants.CREATE_PROJECT, 'CreateOrUpdateProjectPopup'))

    const setButtonWidth = () => ({
        width: `${cardWidth * cardsOnRow + (theme.spacing(2) * (cardsOnRow - 1))}px`,
        margin: 'auto'
    })

    useLayoutEffect(() => {
        const cardsOnRowNew = Math.floor(flexRef.current.clientWidth / (cardWidth + 16))
        cardsOnRowNew !== cardsOnRow && setCardsOnRow(cardsOnRowNew)
    }, [windowSize])

    return (
        <Page>
            <div style = {{ padding: '60px' }}>
                <Box display = 'flex' flexWrap = 'wrap' justifyContent = 'center' ref = {flexRef}>
                    <div style = {{ width: '100%' }}>
                        <Box
                            textAlign = 'right'
                            padding = '24px 0'
                            justifyContent = 'right'
                            margin = 'auto'
                            style = {setButtonWidth()}
                        >
                            <Button
                                variant = 'outlined'
                                startIcon = {<Add/>}
                                className = {classes.button}
                                onClick = {createProject}
                            >
                                Add New Project
                            </Button>
                        </Box>
                    </div>
                    {allProjects.map((project, index) => (
                        <ProjectCard key = {index} id = {project.id}/>
                    ))}
                </Box>
            </div>
        </Page>
    )
}

export default Projects