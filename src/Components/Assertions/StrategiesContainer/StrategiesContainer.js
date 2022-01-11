import { AddCircleOutline } from '@mui/icons-material'
import { Card, CircularProgress, Grid, IconButton, Stack, Tooltip, Typography } from '@mui/material'
import { StrategyCard } from 'Components/Cards/OGSM/StrategyCard'
import { ogsmRefactor } from 'Constants/FeatureMessages'
import Tooltips from 'Constants/Tooltips'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestCreateAssertion } from 'Redux/Assertions/actions'
import { selectChildIdsByParentId } from 'Redux/Assertions/selectors'
import { enqueueMessage } from 'Redux/Snackbar/reducer'

export default function StrategiesContainer({ parentId, productId, hasEdit }) {

    const dispatch = useDispatch()

    const strategies = useSelector((state) => selectChildIdsByParentId(state, parentId))

    const [adding, setAdding] = useState(false)

    const handleAddNewStrategy = () => {
        setAdding(true)
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
        })).then(() => setAdding(false))
            .then(() => dispatch(enqueueMessage(ogsmRefactor)))
    }

    return (
        <Card>
            <Stack spacing = {1} padding = {1}>
                <Grid container alignItems = 'center' spacing = {1}>
                    <Grid item alignSelf = 'baseline'>
                        <Typography variant = 'h6' color = 'secondary'>Strategies</Typography>
                    </Grid>
                    {hasEdit &&
                        <Grid item>
                            <Tooltip arrow title = {Tooltips.STRATEGY_NEW_ENTRY}>
                                <IconButton
                                    color = 'primary'
                                    disabled = {adding}
                                    size = 'small'
                                    onClick = {handleAddNewStrategy}
                                >
                                    {adding ?
                                        <CircularProgress
                                            size = '1.25rem'
                                            data-testid = 'StrategiesContainer__loading'
                                        /> :
                                        <AddCircleOutline
                                            fontSize = 'small'
                                            data-testid = 'StrategiesContainer__icon-add'
                                        />
                                    }
                                </IconButton>
                            </Tooltip>
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


