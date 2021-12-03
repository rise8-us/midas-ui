import { AddCircleOutline, OpenWith as Directions } from '@mui/icons-material'
import { Card, CircularProgress, Grid, IconButton, Stack, Tooltip, Typography } from '@mui/material'
import { StrategyCard } from 'Components/Cards/OGSM/StrategyCard'
import Tooltips from 'Constants/Tooltips'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestCreateAssertion } from 'Redux/Assertions/actions'
import { selectAssertionsByParentId } from 'Redux/Assertions/selectors'

export default function StrategyContainer({ id, productId, hasEdit }) {

    const dispatch = useDispatch()

    const strategies = useSelector((state) => selectAssertionsByParentId(state, id))

    const [adding, setAdding] = useState(false)

    const handleAddNewStrategy = () => {
        setAdding(true)
        dispatch(requestCreateAssertion({
            text: 'Enter new strategy here...',
            parentId: id,
            productId: productId,
            status: 'NOT_STARTED',
            children: [],
            measures: [{
                value: 0,
                target: 1,
                text: 'Enter new measure here...',
                completionType: 'BINARY'
            }]
        })).then(() => setAdding(false))
    }

    return (
        <Card>
            <Stack spacing = {1} padding = {1}>
                <Grid container alignItems = 'center' spacing = {1}>
                    <Grid item>
                        <Directions
                            fontSize = 'large'
                            color = 'secondary'
                            style = {{
                                marginTop: '4px',
                                marginLeft: '8px'
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <Typography
                            variant = 'h6'
                            color = 'secondary'
                            style = {{
                                marginLeft: '2px',
                                marginRight: '8px',
                                paddingBottom: '2px'
                            }}
                        >
                            Strategies
                        </Typography>
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
                                            data-testid = 'StrategyContainer__loading'
                                        /> :
                                        <AddCircleOutline
                                            fontSize = 'small'
                                            data-testid = 'StrategyContainer__icon-add'
                                        />
                                    }
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    }
                </Grid>
                {strategies.map((strategy, index) => (
                    <StrategyCard key = {index} id = {strategy.id} hasEdit = {hasEdit}/>
                ))}
            </Stack>
        </Card>
    )
}

StrategyContainer.propTypes = {
    id: PropTypes.number.isRequired,
    productId: PropTypes.number.isRequired,
    hasEdit: PropTypes.bool.isRequired
}



