import { Button } from '@mui/material'
import PropTypes from 'prop-types'
import { styled } from 'Styles/materialThemes'

const StyledDiv = styled('div')(() => ({
    alignItems: 'right',
    cursor: 'pointer',
    display: 'flex',
    height: '32px',
    justifyContent: 'right',
    width: '136px',
    marginRight: 0,
    padding: '8px',
    marginLeft: 'auto',
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