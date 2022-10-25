import { Button } from '@mui/material'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import {
    setPortfolioPageGanttExpandAll,
    setPortfolioPageSprintReportExpandAll
} from 'Redux/AppSettings/reducer'
import {
    selectPortfolioPageGanttAllExpanded,
    selectPortfolioPageSprintReportAllExpanded
} from 'Redux/AppSettings/selectors'

const divStyle = {
    display: 'flex',
    height: '32px',
    minWidth: '130px',
    justifyContent: 'right',
    borderRight: '1px solid black',
    marginLeft: 'auto'
}

export default function ExpandAllEntities({ portfolioId, type }) {
    const dispatch = useDispatch()

    const allExpanded = useSelector(state => type === 'SprintReport' ?
        selectPortfolioPageSprintReportAllExpanded(state, portfolioId) :
        selectPortfolioPageGanttAllExpanded(state, portfolioId))

    const handleOnClick = () => {
        type === 'SprintReport' ? (
            dispatch(setPortfolioPageSprintReportExpandAll({ portfolioId, isExpanded: !allExpanded }))
        ) : (
            dispatch(setPortfolioPageGanttExpandAll({ portfolioId, isExpanded: !allExpanded }))
        )
    }

    return (
        <div style = {divStyle}>
            <Button onClick = {handleOnClick} fullWidth>
                { allExpanded ? 'collapse all' : 'expand all' }
            </Button>
        </div>
    )
}

ExpandAllEntities.propTypes = {
    portfolioId: PropTypes.number,
    type: PropTypes.oneOf(['RoadMap', 'SprintReport'])
}

ExpandAllEntities.defaultProps = {
    portfolioId: undefined,
    type: 'RoadMap'
}
