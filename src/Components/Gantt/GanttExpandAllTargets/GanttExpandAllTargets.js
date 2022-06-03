import { Button } from '@mui/material'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { setPortfolioPageSettingExpandAll } from 'Redux/AppSettings/reducer'
import { selectPortfolioPageSettingAllExpanded } from 'Redux/AppSettings/selectors'

const divStyle = {
    display: 'flex',
    height: '32px',
    minWidth: '130px',
    justifyContent: 'right',
    borderRight: '1px solid black',
    marginLeft: 'auto'
}

export default function GanttExpandAllTargets({ portfolioId }) {
    const dispatch = useDispatch()

    const allExpanded = useSelector(state => selectPortfolioPageSettingAllExpanded(state, portfolioId))

    const handleOnClick = () => {
        dispatch(setPortfolioPageSettingExpandAll({ portfolioId, isExpanded: !allExpanded }))
    }

    return (
        <div style = {divStyle}>
            <Button onClick = {handleOnClick} fullWidth>
                {allExpanded ? 'collapse all' : 'expand all'}
            </Button>
        </div>
    )
}

GanttExpandAllTargets.propTypes = {
    portfolioId: PropTypes.number.isRequired
}