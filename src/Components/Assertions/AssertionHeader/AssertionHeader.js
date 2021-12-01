import { AddCircleOutline } from '@mui/icons-material'
import { Chip, CircularProgress, Grid, IconButton, Tooltip, Typography } from '@mui/material'
import { unwrapResult } from '@reduxjs/toolkit'
import Tooltips from 'Constants/Tooltips'
import useAssertionStatuses from 'Hooks/useAssertionStatuses'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { requestCreateAssertion } from 'Redux/Assertions/actions'

const generateCircle = (color) => (
    <div
        style = {{
            width: 8,
            height: 8,
            borderRadius: '50%',
            marginLeft: '5px',
            backgroundColor: color
        }}
    />
)


const defaultAssertionData = (type, pId) => ({
    text: `Enter new ${type} here...`,
    productId: pId,
    status: 'NOT_STARTED',
})

const defaultMeasureData = (type) => ({
    value: 0,
    target: 1,
    text: `Enter new ${type} here...`,
    completionType: 'BINARY'
})

function AssertionHeader({ productId, hasEdit, onCreate }) {
    const dispatch = useDispatch()

    const allStatuses = useAssertionStatuses()

    const [adding, setAdding] = useState(false)

    const handleAddNewOGSM = () => {
        setAdding(true)

        const newOGSM = {
            ...defaultAssertionData('objective', productId),
            children: [{
                ...defaultAssertionData('strategy', productId),
                children: [],
                measures: [{
                    ...defaultMeasureData('measures')
                }]
            }],
            measures: [{
                ...defaultMeasureData('goal')
            }]
        }

        dispatch(requestCreateAssertion(newOGSM)).then(unwrapResult).then(() => {
            setAdding(false)
            onCreate()
        })
    }

    return (
        <Grid container direction = 'column'>
            <Grid container item alignItems = 'center'>
                <Grid item>
                    <Typography
                        variant = 'h6'
                        color = 'text.primary'
                        style = {{
                            marginLeft: '2px',
                            marginRight: '8px',
                            paddingBottom: '2px'
                        }}
                    >
                        Objectives, Goals, Strategies, and Measures
                    </Typography>
                </Grid>
                <Grid item>
                    {hasEdit &&
                        <Tooltip title = {Tooltips.OGSM_NEW_ENTRY} arrow>
                            <IconButton
                                color = 'primary'
                                disabled = {adding}
                                size = 'small'
                                onClick = {handleAddNewOGSM}
                            >
                                { adding
                                    ? <CircularProgress size = '1.25rem' />
                                    : <AddCircleOutline fontSize = 'small' data-testid = 'AssertionHeader__icon-add'/>
                                }
                            </IconButton>
                        </Tooltip>
                    }
                </Grid>
            </Grid>
            <Grid container item style = {{ height: '22px', alignContent: 'center' }}>
                {allStatuses.map((status, index) => (
                    <Grid item key = {index}>
                        <Chip
                            label = {status.label.toUpperCase()}
                            icon = {generateCircle(status.color)}
                            variant = 'outlined'
                            color = 'secondary'
                            style = {{
                                border: 0,
                                fontSize: '10px'
                            }}
                        />
                    </Grid>
                ))}
            </Grid>
        </Grid>
    )
}

AssertionHeader.propTypes = {
    productId: PropTypes.number.isRequired,
    onCreate: PropTypes.func.isRequired,
    hasEdit: PropTypes.bool.isRequired,
}

export default AssertionHeader