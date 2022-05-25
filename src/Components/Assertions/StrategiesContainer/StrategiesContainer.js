import { Card, Grid, Stack, Typography } from '@mui/material'
import { AddItem } from 'Components/AddItem'
import { StrategyCard } from 'Components/Cards/OGSM/StrategyCard'
import Tooltips from 'Constants/Tooltips'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { requestCreateAssertion } from 'Redux/Assertions/actions'
import { selectChildIdsByParentId } from 'Redux/Assertions/selectors'

export default function StrategiesContainer({ parentId, productId, hasEdit }) {

    const dispatch = useDispatch()

    const strategies = useSelector((state) => selectChildIdsByParentId(state, parentId))

    const handleAddNewStrategy = () => {
        return Promise.resolve(
            dispatch(requestCreateAssertion({
                parentId,
                productId,
                text: 'Enter new strategy here...',
                status: 'NOT_STARTED',
                children: [],
                measures: [{
                    value: 0,
                    target: 1,
                    text: 'Enter new measure here...',
                    completionType: 'BINARY'
                }]
            }))
        )
    }

    return (
        <Card>
            <Stack spacing = {1} padding = {1}>
                <Grid container alignItems = 'center' spacing = {1}>
                    <Grid item alignSelf = 'baseline'>
                        <Typography variant = 'h6' color = 'secondary'>Strategies</Typography>
                    </Grid>
                    {hasEdit &&
                        <Grid item data-testid = 'StrategiesContainer__add-item'>
                            <AddItem
                                onClick = {handleAddNewStrategy}
                                title = {Tooltips.STRATEGY_NEW_ENTRY}
                            />
                        </Grid>
                    }
                </Grid>
                {strategies.map((id, index) => (
                    <StrategyCard key = {index} id = {id} hasEdit = {hasEdit}/>
                ))}
            </Stack>
        </Card>
    )
}

StrategiesContainer.propTypes = {
    parentId: PropTypes.number.isRequired,
    productId: PropTypes.number.isRequired,
    hasEdit: PropTypes.bool.isRequired
}



