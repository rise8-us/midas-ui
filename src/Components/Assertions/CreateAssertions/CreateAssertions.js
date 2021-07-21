import { Button, CircularProgress } from '@material-ui/core'
import { unwrapResult } from '@reduxjs/toolkit'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import useAssertionRoot from '../../../Hooks/useAssertionRoot'
import { requestCreateAssertion } from '../../../Redux/Assertions/actions'
import { deleteAssertion } from '../../../Redux/ModifiedAssertions/reducer'
import { Assertion } from '../../Assertions'

function CreateAssertions({ productId, setShowCreate }) {
    const dispatch = useDispatch()

    const [submitted, setSubmitted] = useState(false)

    const buildTree = useAssertionRoot('OBJECTIVE_0')

    const submitOGSM = () => {
        setSubmitted(true)
        dispatch(requestCreateAssertion(buildTree)).then(unwrapResult)
            .then(() => {
                setSubmitted(false)
                setShowCreate(false)
                deleteAssertion('objective_0')
            })
    }

    return (
        <Assertion
            create
            index = {0}
            defaultText = 'Enter new objective here...'
            order = {['OBJECTIVE', 'GOAL', 'STRATEGY', 'MEASURE']}
            productId = {productId}
            defaultEditable = {true}
            defaultExpanded = {true}
            quickSave = {false}
            actionButtons = {<Button
                size = 'small'
                color = 'primary'
                variant = 'outlined'
                onClick = {submitOGSM}
                disabled = {submitted}
            >
                { submitted
                    ? <>submitting ogsm <CircularProgress size = {'0.8125rem'} style = {{ marginLeft: 5 }} /></>
                    : 'submit ogsm'
                }
            </Button>}
        />
    )
}

CreateAssertions.propTypes = {
    productId: PropTypes.number.isRequired,
    setShowCreate: PropTypes.func.isRequired
}

export default CreateAssertions