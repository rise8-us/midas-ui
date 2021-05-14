import { Accordion, AccordionActions, AccordionDetails, Button, makeStyles } from '@material-ui/core'
import PropTypes from 'prop-types'
import React from 'react'
import { AddAnotherAssertion, AssertionHeader } from '../'

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
    accordionExpanded: {
        '&:last-child': {
            marginBottom: 16
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
        alignItems: 'baseline',
        padding: theme.spacing(1)
    }
}))

function AssertionAccordion({ accordionHeaderProps, addAnotherButtonProps, outerRootButtonProps,
    canAddOption, children, defaultExpanded, expanded, outerRoot, create }) {

    const classes = useStyles()

    const accordionProps = {
        className: classes.root,
        defaultExpanded,
        expanded: expanded,
        classes: {
            root: classes.accordionRoot,
            expanded: classes.accordionExpanded
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
                style = {{ paddingBottom: create ? 0 : '16px' }}
            >
                {children}
            </AccordionDetails>
            <AccordionActions
                style = {{
                    justifyContent: 'end',
                    padding: outerRoot ? '16px' : 'initial'
                }}
            >
                {canAddOption && <AddAnotherAssertion {...addAnotherButtonProps}/>}
            </AccordionActions>
            {create && outerRoot &&
                <Button
                    size = 'small'
                    color = 'primary'
                    variant = 'outlined'
                    style = {{ margin: '16px', marginTop: '-8px' }}
                    onClick = {outerRootButtonProps.onClick}
                >{outerRootButtonProps.label}</Button>
            }
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
        defaultEditable: PropTypes.bool,
        status: PropTypes.string
    }),
    addAnotherButtonProps: PropTypes.shape({
        label: PropTypes.string,
        onClick: PropTypes.func
    }),
    outerRootButtonProps: PropTypes.shape({
        label: PropTypes.string,
        onClick: PropTypes.func
    }),
    expanded: PropTypes.bool,
    canAddOption: PropTypes.bool,
    defaultExpanded: PropTypes.bool,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
    outerRoot: PropTypes.bool,
    create: PropTypes.bool
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
        defaultEditable: false,
        status: 'Not Started'
    },
    addAnotherButtonProps: {
        label: '',
        onClick: undefined
    },
    outerRootButtonProps: {
        label: 'ADD OGSM',
        onClick: undefined
    },
    canAddOption: false,
    defaultExpanded: false,
    expanded: undefined,
    outerRoot: false,
    create: false,
    children: undefined
}

export default AssertionAccordion