import { Accordion, AccordionDetails, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { OGSMHeader, OGSMStrategy } from '../'

//TODO: get rid of divider line between accordions that are collapsed

const useStyles = makeStyles((theme) => ({
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
    innerAccordionDetails: {
        borderLeft: 'solid 1px',
        borderColor: theme.palette.text.secondary,
        marginLeft: 20,
        marginBottom: 20
    },
    heading: {
        ...theme.typography.h6
    }
}))

function OGSMTab() {
    const classes = useStyles()

    const accordionInnerProps = {
        className: classes.innerAccordion,
        TransitionProps: {
            unmountOnExit: true
        }
    }

    return (
        <div className = {classes.root}>
            <Accordion TransitionProps = {{ unmountOnExit: true }} className = {classes.outerAccordion}>
                <OGSMHeader
                    category = 'Objective'
                    detail = 'Add an OSGM view'
                />
                <AccordionDetails className = {classes.innerAccordionDetails}>
                    <Box display = 'flex' flexDirection = 'column' width = '100%'>
                        <Accordion {...accordionInnerProps}>
                            <OGSMHeader
                                category = 'Goal'
                                detail = 'To render the display MVP'
                            />
                            <AccordionDetails className = {classes.innerAccordionDetails}>
                                <Accordion {...accordionInnerProps}>
                                    <OGSMHeader
                                        category = 'Strategy'
                                        detail = 'To render the display MVP'
                                    />
                                    <AccordionDetails
                                        className = {classes.innerAccordionDetails}
                                        style = {{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}
                                    >
                                        <OGSMStrategy
                                            detail = 'Add OGSM slice to API'
                                            completed = {true}
                                        />
                                        <OGSMStrategy
                                            detail = 'Add Assertions slice to API'
                                            completed = {true}
                                        />
                                        <OGSMStrategy
                                            detail = 'Add comments slice to API'
                                            completed = {true}
                                        />
                                        <OGSMStrategy
                                            detail = 'Build OGSM view on UI'
                                            completed = {false}
                                        />
                                    </AccordionDetails>
                                </Accordion>
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                </AccordionDetails>
            </Accordion>

            <Accordion TransitionProps = {{ unmountOnExit: true }} className = {classes.outerAccordion}>
                <OGSMHeader
                    category = 'Objective'
                    detail = 'Add commenting to each sub-part of OSGM view'
                />
            </Accordion>
        </div>
    )
}

export default OGSMTab
