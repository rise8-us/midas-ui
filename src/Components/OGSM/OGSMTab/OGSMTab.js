import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Add } from '@material-ui/icons'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { OGSMView } from '../'
import { requestFetchObjectives } from '../../../Redux/Objectives/actions'
import { selectObjectivesByProductId } from '../../../Redux/Objectives/selectors'

const useStyles = makeStyles((theme) => ({
    button: {
        '&:hover': {
            color: theme.palette.primary.main
        },
        height: 40
    },
    root: {
        marginTop: 16,
        paddingBottom: 48,
        width: '100%',
    }
}))

function OGSMTab({ productId }) {
    const classes = useStyles()
    const dispatch = useDispatch()

    const [showCreate, setShowCreate] = useState(false)

    const objectives = useSelector(state => selectObjectivesByProductId(state, productId),
        (left, right) => left.length === right.length)

    useEffect(() => {
        dispatch(requestFetchObjectives(`product.id:${productId}`))
    }, [])

    useEffect(() => {
        if (showCreate) setShowCreate(false)
    }, [objectives])

    return (
        <div className = {classes.root}>
            <Button
                className = {classes.button}
                variant = 'outlined'
                startIcon = {<Add/>}
                color = {!showCreate ? 'primary' : 'secondary'}
                onClick = {() => setShowCreate(!showCreate)}
            >
                {!showCreate ? 'Add a new OGSM' : 'Cancel OGSM creation'}
            </Button>
            { showCreate &&
                <OGSMView create productId = {productId}/>
            }
            {objectives.map((objective, index) => (
                <OGSMView key = {index} id = {objective.id} productId = {productId}/>
            ))}
        </div>
    )
}

OGSMTab.propTypes = {
    productId: PropTypes.number.isRequired
}

export default OGSMTab
