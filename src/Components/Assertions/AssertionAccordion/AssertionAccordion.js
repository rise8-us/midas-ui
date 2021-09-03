import { Accordion, AccordionDetails, AccordionSummary, alpha, makeStyles } from '@material-ui/core'
import PropTypes from 'prop-types'
import React from 'react'
import { AssertionEntry } from '../'

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
        borderColor: alpha(theme.palette.text.secondary, .4),
        margin: '0px 0px 0px 16px',
        padding: '0px 0px 0px 8px',
        display: 'flex',
        flexDirection: 'column',
    },
    accordionSummaryRoot: {
        minHeight: 42,
        height: 42,
        padding: 0,
        width: '100%',
        '&.Mui-expanded': {
            minHeight: 42,
            height: 42,
        }
    }
}))

function AssertionAccordion({ assertionEntryProps, children, category, defaultExpanded, expanded, rootAssertion }) {
    const classes = useStyles()

    return (
        <Accordion
            className = { classes.root }
            defaultExpanded = { defaultExpanded }
            expanded = { expanded }
            classes = {{ root: classes.accordionRoot }}
            TransitionProps = {{ unmountOnExit: true }}
            style = {{ backgroundColor: 'transparent' }}
        >
            <AccordionSummary
                expandIcon = {null}
                classes = {{ root: classes.accordionSummaryRoot }}
            >
                <AssertionEntry {...assertionEntryProps} category = {category[0]}/>
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
    assertionEntryProps: PropTypes.shape({
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
    expanded: PropTypes.bool,
    defaultExpanded: PropTypes.bool,
    rootAssertion: PropTypes.bool,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
}

AssertionAccordion.defaultProps = {
    assertionEntryProps: {
        id: undefined,
        commentCount: 0,
        title: '',
        onSave: undefined,
        onDelete: undefined,
        expandable: true,
    },
    expanded: undefined,
    defaultExpanded: false,
    rootAssertion: false,
    children: undefined
}

export default AssertionAccordion