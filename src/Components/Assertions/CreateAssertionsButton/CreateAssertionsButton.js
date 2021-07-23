import { Button, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Add } from '@material-ui/icons'
import { unwrapResult } from '@reduxjs/toolkit'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { requestCreateAssertion } from '../../../Redux/Assertions/actions'

const useStyles = makeStyles((theme) => ({
    button: {
        '&:hover': {
            color: theme.palette.primary.main
        },
        height: 40,
        marginBottom: theme.spacing(2)
    }
}))

function CreateAssertionsButton({ productId, endAssertionsRef }) {
    const classes = useStyles()
    const dispatch = useDispatch()

    const [added, setAdded] = useState(false)

    const handleAddNewOGSM = () => {
        const blankMeasure = {
            text: 'Enter new measure here...',
            type: 'MEASURE',
            productId: productId,
            parentId: undefined,
            status: 'NOT_STARTED',
            children: []
        }
        const blankStrategy = {
            text: 'Enter new strategy here...',
            type: 'STRATEGY',
            productId: productId,
            parentId: undefined,
            status: 'NOT_STARTED',
            children: [blankMeasure]
        }
        const blankGoal = {
            text: 'Enter new goal here...',
            type: 'GOAL',
            productId: productId,
            parentId: undefined,
            status: 'NOT_STARTED',
            children: [blankStrategy]
        }
        const blankObjective = {
            text: 'Enter new objective here...',
            type: 'OBJECTIVE',
            productId: productId,
            parentId: undefined,
            status: 'NOT_STARTED',
            children: [blankGoal]
        }

        setAdded(true)
        dispatch(requestCreateAssertion(blankObjective)).then(unwrapResult).then(() => {
            endAssertionsRef && endAssertionsRef.current.scrollIntoView()
            setAdded(false)
        })
    }

    return (
        <Button
            className = {classes.button}
            variant = 'outlined'
            startIcon = {<Add/>}
            color = {'primary'}
            disabled = {added}
            onClick = {handleAddNewOGSM}
        >
            { added
                ? <>Adding new ogsm <CircularProgress size = {'0.8125rem'} style = {{ marginLeft: 5 }}/></>
                : 'Add a new OGSM'
            }
        </Button>
    )
}

CreateAssertionsButton.propTypes = {
    productId: PropTypes.number.isRequired,
    endAssertionsRef: PropTypes.object
}

CreateAssertionsButton.defaultProps = {
    endAssertionsRef: undefined
}

export default CreateAssertionsButton