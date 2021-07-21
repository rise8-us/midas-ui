import { Accordion, AccordionActions, AccordionDetails, makeStyles } from '@material-ui/core'
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
    }
}))

function AssertionAccordion({ accordionHeaderProps, actionButtons,
    children, defaultExpanded, expanded, rootAssertion }) {

    const classes = useStyles()

    const accordionProps = {
        className: classes.root,
        defaultExpanded,
        expanded: expanded,
        classes: {
            root: classes.accordionRoot
        },
        TransitionProps: {
            unmountOnExit: true
        }
    }

    return (
        <Accordion {...accordionProps}>
            <AssertionHeader {...accordionHeaderProps}/>
            <AccordionDetails
                className = {classes.accordionDetails}
                style = {(rootAssertion) ? { marginBottom: 16 } : undefined}
            >
                {children}
            </AccordionDetails>
            {actionButtons &&
                <AccordionActions>
                    {actionButtons}
                </AccordionActions>
            }
        </Accordion>
    )
}

AssertionAccordion.propTypes = {
    accordionHeaderProps: PropTypes.shape({
        id: PropTypes.number,
        commentCount: PropTypes.number,
        category: PropTypes.string,
        detail: PropTypes.string,
        editable: PropTypes.bool,
        onChange: PropTypes.func,
        onSave: PropTypes.func,
        onDelete: PropTypes.func,
        onClick: PropTypes.func,
        defaultEditable: PropTypes.bool,
        status: PropTypes.string,
        addChildAssertion: PropTypes.func,
        addChildAssertionLabel: PropTypes.string,
        expandable: PropTypes.bool,
        quickSave: PropTypes.bool,
    }),
    expanded: PropTypes.bool,
    defaultExpanded: PropTypes.bool,
    actionButtons: PropTypes.node,
    rootAssertion: PropTypes.bool,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
}

AssertionAccordion.defaultProps = {
    accordionHeaderProps: {
        id: undefined,
        commentCount: 0,
        detail: '',
        editable: false,
        onChange: undefined,
        onSave: undefined,
        onDelete: undefined,
        onClick: undefined,
        defaultEditable: false,
        expandable: true,
        quickSave: true
    },
    defaultExpanded: false,
    expanded: undefined,
    actionButtons: undefined,
    rootAssertion: false,
    children: undefined
}

export default AssertionAccordion