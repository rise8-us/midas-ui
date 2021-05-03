import { Accordion, AccordionDetails, Box, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Add } from '@material-ui/icons'
import React, { useState } from 'react'
import { OGSMHeader, OGSMMeasure } from '../'
import { OGSMCreate } from '../OGSMCreate'

// TODO: get rid of divider line between accordions that are collapsed
// TODO: shrink header from 64px minHeight to 36px

const useStyles = makeStyles((theme) => ({
    button: {
        '&:hover': {
            color: theme.palette.primary.main
        },
        height: 40
    },
    root: {
        marginTop: 16,
        width: '100%',
    },
    outerAccordion: {
        margin: '16px 0'
    },
    innerAccordion: {
        width: '100%',
        boxShadow: 'none'
    },
    accordionDetails: {
        borderLeft: 'solid 1px',
        borderColor: theme.palette.text.secondary,
        marginLeft: theme.spacing(2),
        paddingRight: 0
    },
    accordionRoot: {
        '&:before': {
            display: 'none',
        }
    }
}))

function OGSMTab() {
    const classes = useStyles()

    const [showCreate, setShowCreate] = useState(false)

    const accordionInnerProps = {
        className: classes.innerAccordion,
        classes: {
            root: classes.accordionRoot
        },
        TransitionProps: {
            unmountOnExit: true
        }
    }

    return (
        <div className = {classes.root}>
            <Button
                className = {classes.button}
                variant = 'outlined'
                startIcon = {<Add/>}
                color = 'primary'
                onClick = {() => setShowCreate(!showCreate)}
            >
                Add a new OGSM
            </Button>
            { showCreate &&
                <OGSMCreate productId = {0}/>
            }
            <Accordion
                TransitionProps = {{ unmountOnExit: true }}
                className = {classes.outerAccordion}
                classes = {{ root: classes.accordionRoot }}
            >
                <OGSMHeader
                    category = 'Objective'
                    detail = 'Add an OSGM view'
                />
                <AccordionDetails className = {classes.accordionDetails} style = {{ marginBottom: '16px' }}>
                    <Box display = 'flex' flexDirection = 'column' width = '100%'>
                        <Accordion {...accordionInnerProps}>
                            <OGSMHeader
                                category = 'Goal'
                                detail = 'Render the OGSM display'
                            />
                            <AccordionDetails className = {classes.accordionDetails}>
                                <Box display = 'flex' flexDirection = 'column' width = '100%'>
                                    <Accordion {...accordionInnerProps}>
                                        <OGSMHeader
                                            category = 'Strategy'
                                            detail = 'Build all the things'
                                        />
                                        <AccordionDetails
                                            className = {classes.accordionDetails}
                                            style = {{
                                                display: 'flex',
                                                flexWrap: 'wrap',
                                                flexDirection: 'column'
                                            }}
                                        >
                                            <OGSMMeasure
                                                detail = 'Add OGSM slice to API'
                                                completed = {true}
                                            />
                                            <OGSMMeasure
                                                detail = 'Add Assertions slice to API'
                                                completed = {true}
                                            />
                                            <OGSMMeasure
                                                detail = 'Add comments slice to API'
                                                completed = {true}
                                            />
                                            <OGSMMeasure
                                                detail = 'Build OGSM view on UI'
                                                completed = {false}
                                            />
                                        </AccordionDetails>
                                    </Accordion>
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default OGSMTab
