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

const CreateAssertionsButton = React.forwardRef((props, ref) => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const [added, setAdded] = useState(false)

    const defaultData = (type) => ({
        text: `Enter new ${type} here...`,
        type: type.toUpperCase(),
        productId: props.productId,
        parentId: undefined,
        status: 'NOT_STARTED',
    })

    const handleAddNewOGSM = () => {
        const blankMeasure = {
            ...defaultData('measure'),
            children: []
        }
        const blankStrategy = {
            ...defaultData('strategy'),
            children: [blankMeasure]
        }
        const blankGoal = {
            ...defaultData('goal'),
            children: [blankStrategy]
        }
        const blankObjective = {
            ...defaultData('objective'),
            children: [blankGoal]
        }

        setAdded(true)
        dispatch(requestCreateAssertion(blankObjective)).then(unwrapResult).then(() => {
            ref && ref.current.scrollIntoView()
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
})

CreateAssertionsButton.propTypes = {
    productId: PropTypes.number.isRequired
}

CreateAssertionsButton.defaultProps = {
    endAssertionsRef: undefined
}

export default CreateAssertionsButton