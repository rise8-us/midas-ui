import { Accordion, AccordionDetails, AccordionSummary, alpha } from '@mui/material'
import PropTypes from 'prop-types'
import React from 'react'
import { styled } from 'Styles/materialThemes'
import { AssertionEntry } from '../'

const AccordionStyled = styled(Accordion)(() => ({
    boxShadow: 'none',
    backgroundColor: 'transparent'
}))

const AccordionDetailsStyled = styled(AccordionDetails)(({ theme }) => ({
    borderLeft: 'solid 1px',
    borderColor: alpha(theme.palette.text.secondary, 0.4),
    margin: '0px 0px 0px 16px',
    padding: '0px 0px 0px 8px',
    display: 'flex',
    flexDirection: 'column'
}))

const AccordionSummaryStyled = styled(AccordionSummary)(() => ({
    minHeight: 42,
    height: 42,
    padding: 0,
    width: '100%',
    '&.Mui-expanded': {
        minHeight: 42,
        height: 42
    },
    '&.MuiPaper-root-MuiAccordion-root:before': {
        backgroundColor: 'red',
        height: '10px'
    }
}))

function AssertionAccordion({ assertionEntryProps, children, category, defaultExpanded, expanded, rootAssertion }) {
    return (
        <AccordionStyled
            defaultExpanded = {defaultExpanded}
            expanded = {expanded}
            TransitionProps = {{ unmountOnExit: true }}
            sx = {{
                '&:before': {
                    display: 'none'
                }
            }}
        >
            <AccordionSummaryStyled expandIcon = {null}>
                <AssertionEntry {...assertionEntryProps} category = {category[0]} />
            </AccordionSummaryStyled>
            <AccordionDetailsStyled style = {rootAssertion ? { marginBottom: 16 } : undefined}>
                {children}
            </AccordionDetailsStyled>
        </AccordionStyled>
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
        addChildAssertionLabel: PropTypes.string
    }),
    category: PropTypes.string.isRequired,
    expanded: PropTypes.bool,
    defaultExpanded: PropTypes.bool,
    rootAssertion: PropTypes.bool,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)])
}

AssertionAccordion.defaultProps = {
    assertionEntryProps: {
        id: undefined,
        commentCount: 0,
        title: '',
        onSave: undefined,
        onDelete: undefined,
        expandable: true
    },
    expanded: undefined,
    defaultExpanded: false,
    rootAssertion: false,
    children: undefined
}

export default AssertionAccordion
