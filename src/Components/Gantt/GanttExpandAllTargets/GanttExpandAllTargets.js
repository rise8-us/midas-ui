import { Button } from '@mui/material'
import PropTypes from 'prop-types'
import { styled } from 'Styles/materialThemes'

const StyledDiv = styled('div')(() => ({
    alignItems: 'right',
    cursor: 'pointer',
    display: 'flex',
    height: '32px',
    width: '136px',
    justifyContent: 'right',
    padding: '8px',
    borderRight: '1px solid black',
    marginRight: 0,
    marginLeft: 'auto'
}))

export default function GanttExpandAllTargets({ expandAllTargets, allExpanded }) {

    return (
        <StyledDiv>
            <Button onClick = {expandAllTargets} data-testid = 'GanttExpandAllTargets__button'>
                {allExpanded ? 'Collapse all' : 'Expand all'}
            </Button>
        </StyledDiv>
    )
}

GanttExpandAllTargets.propTypes = {
    expandAllTargets: PropTypes.func.isRequired,
    allExpanded: PropTypes.bool
}

GanttExpandAllTargets.defaultProps = {
    allExpanded: false
}