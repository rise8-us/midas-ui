import { Accordion, AccordionDetails, makeStyles } from '@material-ui/core'
import PropTypes from 'prop-types'
import React from 'react'
import { AddAnotherAssertion, OGSMHeader } from '../'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
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
        flexWrap: 'wrap',
        flexDirection: 'column',
        alignItems: 'baseline'
    }
}))

function AssertionAccordion({ accordionHeaderProps, addAnotherButtonProps, canAddOption, children, defaultExpanded }) {
    const classes = useStyles()

    const accordionProps = {
        className: classes.root,
        defaultExpanded,
        classes: {
            root: classes.accordionRoot
        },
        TransitionProps: {
            unmountOnExit: true
        }
    }

    return (
        <Accordion {...accordionProps}>
            <OGSMHeader {...accordionHeaderProps}/>
            <AccordionDetails className = {classes.accordionDetails}>
                {children}
                {canAddOption && <AddAnotherAssertion {...addAnotherButtonProps}/>}
            </AccordionDetails>
        </Accordion>
    )
}

AssertionAccordion.propTypes = {
    accordionHeaderProps: PropTypes.shape({
        category: PropTypes.string,
        detail: PropTypes.string,
        autoFocus: PropTypes.bool,
        editable: PropTypes.bool,
        onChange: PropTypes.func,
        onSave: PropTypes.func,
        onClick: PropTypes.func,
        onEditClick: PropTypes.func,
        defaultEditable: PropTypes.bool
    }),
    addAnotherButtonProps: PropTypes.shape({
        label: PropTypes.string,
        onClick: PropTypes.func
    }),
    canAddOption: PropTypes.bool,
    defaultExpanded: PropTypes.bool,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)])
}

AssertionAccordion.defaultProps = {
    accordionHeaderProps: {
        detail: '',
        autoFocus: false,
        editable: false,
        onChange: undefined,
        onSave: undefined,
        onClick: undefined,
        onEditClick: undefined,
        defaultEditable: false
    },
    addAnotherButtonProps: {
        label: '',
        onClick: undefined
    },
    canAddOption: false,
    defaultExpanded: false,
    children: undefined
}

export default AssertionAccordion