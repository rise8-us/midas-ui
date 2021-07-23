import { Accordion, AccordionDetails, AccordionSummary, makeStyles } from '@material-ui/core'
import { ExpandMore } from '@material-ui/icons'
import PropTypes from 'prop-types'
import React from 'react'
import { AssertionHeader } from '../'

const useStyles = makeStyles((theme) => ({
    root: {
        boxShadow: 'none'
    },
    accordionRoot: {
        '&:before': {
            display: 'none',
        }
    },
    accordionDetails: {
        borderLeft: 'solid 1px',
        borderColor: theme.palette.text.secondary,
        marginLeft: theme.spacing(2),
        paddingRight: 0,
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(1)
    },
    accordionSummaryRoot: {
        minHeight: 48,
        height: 48,
        width: '100%',
        '&.Mui-expanded': {
            height: 48,
            minHeight: 48
        }
    }
}))

function AssertionAccordion({
    assertionHeaderProps, children, category, expandable, defaultExpanded, expanded, rootAssertion
}) {
    const classes = useStyles()

    return (
        <Accordion
            className = { classes.root }
            defaultExpanded = { defaultExpanded }
            expanded = { expanded }
            classes = {{ root: classes.accordionRoot }}
            TransitionProps = {{ unmountOnExit: true }}
        >
            <AccordionSummary
                expandIcon = {
                    expandable
                        ? <ExpandMore data-testid = {`AssertionHeader__icon-expand-${category}`}/>
                        : <></>
                }
                classes = {{ root: classes.accordionSummaryRoot }}
                IconButtonProps = {{
                    style: {
                        padding: '8px'
                    }
                }}
            >
                <AssertionHeader {... { ...assertionHeaderProps, category } }/>
            </AccordionSummary>
            <AccordionDetails
                className = {classes.accordionDetails}
                style = {(rootAssertion) ? { marginBottom: 16 } : undefined}
            >
                {children}
            </AccordionDetails>
        </Accordion>
    )
}

AssertionAccordion.propTypes = {
    assertionHeaderProps: PropTypes.shape({
        id: PropTypes.number,
        commentCount: PropTypes.number,
        title: PropTypes.string,
        onSave: PropTypes.func,
        onDelete: PropTypes.func,
        status: PropTypes.string,
        addChildAssertion: PropTypes.func,
        addChildAssertionLabel: PropTypes.string,
    }),
    category: PropTypes.string.isRequired,
    expandable: PropTypes.bool,
    expanded: PropTypes.bool,
    defaultExpanded: PropTypes.bool,
    rootAssertion: PropTypes.bool,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
}

AssertionAccordion.defaultProps = {
    assertionHeaderProps: {
        id: undefined,
        commentCount: 0,
        title: '',
        onSave: undefined,
        onDelete: undefined,
        expandable: true,
    },
    expandable: true,
    expanded: undefined,
    defaultExpanded: false,
    rootAssertion: false,
    children: undefined
}

export default AssertionAccordion