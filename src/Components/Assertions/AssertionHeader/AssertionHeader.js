import { Grid, Typography } from '@mui/material'
import { unwrapResult } from '@reduxjs/toolkit'
import { AddItem } from 'Components/AddItem'
import Tooltips from 'Constants/Tooltips'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { requestCreateAssertion } from 'Redux/Assertions/actions'

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

    const handleAddNewOGSM = () => {
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

        return Promise.resolve(
            dispatch(requestCreateAssertion(newOGSM))
                .then(unwrapResult).then(() => {
                    onCreate()
                })
        )
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
                            <AddItem
                                onClick = {handleAddNewOGSM}
                                title = {Tooltips.OGSM_NEW_ENTRY}
                            />
                    }
                </Grid>
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