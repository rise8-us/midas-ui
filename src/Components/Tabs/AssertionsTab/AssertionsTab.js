import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Add } from '@material-ui/icons'
import { unwrapResult } from '@reduxjs/toolkit'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useAssertionRoot from '../../../Hooks/useAssertionRoot'
import { requestCreateAssertion, requestSearchAssertions } from '../../../Redux/Assertions/actions'
import { selectAssertionsByTypeAndProductId } from '../../../Redux/Assertions/selectors'
import { deleteAssertion } from '../../../Redux/ModifiedAssertions/reducer'
import { Assertion } from '../../Assertions'

const useStyles = makeStyles((theme) => ({
    button: {
        '&:hover': {
            color: theme.palette.primary.main
        },
        height: 40,
        marginBottom: theme.spacing(2)
    },
    root: {
        marginTop: theme.spacing(2),
        paddingBottom: theme.spacing(6),
        width: '100%',
    }
}))

function AssertionsTab({ productId }) {
    const classes = useStyles()
    const dispatch = useDispatch()

    const [showCreate, setShowCreate] = useState(false)

    const objectives = useSelector(state => selectAssertionsByTypeAndProductId(state, 'objective', productId),
        (left, right) => left.length === right.length)
    const buildTree = useAssertionRoot('OBJECTIVE_0')

    const submitOGSM = () => {
        dispatch(requestCreateAssertion(buildTree)).then(unwrapResult)
            .then(() => {
                deleteAssertion('objective_0')
                setShowCreate(false)
            })
    }

    useEffect(() => {
        dispatch(requestSearchAssertions(`product.id:${productId}`))
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
                <Assertion
                    create
                    index = {0}
                    defaultText = 'Enter new objective here...'
                    order = {['OBJECTIVE', 'GOAL', 'STRATEGY', 'MEASURE']}
                    outerRoot
                    productId = {productId}
                    defaultEditable = {true}
                    defaultExpanded = {true}
                    outerRootButtonProps = {{
                        label: 'submit ogsm',
                        onClick: submitOGSM
                    }}
                />
            }
            {objectives.map((objective, index) => (
                <div style = {{ margin: '16px 0' }} key = {index}>
                    <Assertion
                        index = {index + 1}
                        defaultText = 'Enter new objective here...'
                        order = {['OBJECTIVE', 'GOAL', 'STRATEGY', 'MEASURE']}
                        outerRoot
                        id = {objective.id}
                        productId = {productId}
                        defaultExpanded
                    />
                </div>
            ))}
        </div>
    )
}

AssertionsTab.propTypes = {
    productId: PropTypes.number.isRequired
}

export default AssertionsTab