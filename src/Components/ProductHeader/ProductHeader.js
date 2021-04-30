import { IconButton, makeStyles, TextField } from '@material-ui/core'
import { AddCircleOutline, Edit, Restore, SaveOutlined } from '@material-ui/icons'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TagDropdown } from '../../Components/TagDropdown'
import { selectRequestErrors } from '../../Redux/Errors/selectors'
import { requestUpdateProduct } from '../../Redux/Products/actions'
import ProductConstants from '../../Redux/Products/constants'
import { selectProductById } from '../../Redux/Products/selectors'
import FormatErrors from '../../Utilities/FormatErrors'

const useStyles = makeStyles((theme) => ({
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    h4: {
        ...theme.typography.h4,
        color: theme.palette.text.secondary,
    },
    h6: {
        ...theme.typography.h6,
        color: theme.palette.text.secondary,
    },
    icon: {
        height: 42
    }
}))

function ProductHeader({ id }) {
    const classes = useStyles()
    const dispatch = useDispatch()

    const product = useSelector(state => selectProductById(state, id))
    const errors = useSelector(state => selectRequestErrors(state, ProductConstants.UPDATE_PRODUCT))

    const [isDisabled, setDisabled] = useState(true)
    const [visionStatement, setVision] = useState(product.visionStatement)
    const [name, setName] = useState(product.name)
    const [tags, setTags] = useState(product.tags)
    const [loaded, setLoaded] = useState(false)
    const [nameError, setNameError] = useState([])

    const onVisionChange = (e) => !isDisabled && setVision(e.target.value)
    const onNameChange = (e) => !isDisabled && setName(e.target.value)
    const onTagsChange = (value) => setTags(value)

    const submitUpdate = () => {
        setName(name)
        setVision(visionStatement)
        dispatch(requestUpdateProduct({
            ...product,
            name,
            visionStatement,
            tagIds: Object.values(tags.map(t => t.id))
        }))
    }

    const handleEditAction = () => {
        !isDisabled && submitUpdate()
        setDisabled(!isDisabled)
    }

    const handleRevertAction = () => {
        setName(product.name)
        setVision(product.visionStatement)
        setTags(product.tags)
    }

    useEffect(() => {
        if (!loaded && product.id === id) {
            setVision(product.visionStatement)
            setName(product.name)
            setTags(product.tags)
            setLoaded(true)
        }
    })

    useEffect(() => {
        if (errors.length > 0) {
            setNameError(errors.filter(error => error.includes('Name')))
        }
    }, [errors])

    return (
        <>
            <div className = {classes.row}>
                <TextField
                    InputProps = {{
                        disableUnderline: isDisabled,
                        readOnly: isDisabled,
                        'data-testid': 'ProductHeader__input-name',
                        className: classes.h4,
                    }}
                    value = {name}
                    onChange = {onNameChange}
                    error = { nameError.length > 0 }
                    helperText = {<FormatErrors errors = {nameError}/>}
                />
                <div>
                    {!isDisabled && <IconButton
                        className = {classes.icon}
                        data-testid = 'ProductHeader__icon-revert'
                        onClick = {handleRevertAction}
                        color = 'secondary'
                    >
                        <Restore />
                    </IconButton>
                    }
                    <IconButton
                        className = {classes.icon}
                        data-testid = 'ProductHeader__icon-action'
                        onClick = {handleEditAction}
                        color = 'secondary'
                    >
                        {isDisabled ? <Edit /> : <SaveOutlined />}
                    </IconButton>
                </div>
            </div>
            <div className = {classes.row}>
                <TextField
                    InputProps = {{
                        disableUnderline: isDisabled,
                        readOnly: isDisabled,
                        'data-testid': 'ProductHeader__input-vision',
                        className: classes.h6,
                        spellCheck: true,
                    }}
                    hiddenLabel
                    value = {visionStatement}
                    onChange = {onVisionChange}
                    multiline
                    style = {{ width: '100%' }}
                />
            </div>
            <div className = {classes.row} >
                <TagDropdown
                    defaultTags = {tags}
                    error = {[]}
                    onChange = {onTagsChange}
                    freeSolo = {isDisabled}
                    disableClearable = {isDisabled}
                    deletable = {!isDisabled}
                    disableUnderline = {true}
                    popupIcon = {<AddCircleOutline color = 'secondary' />}
                />
            </div>
        </>
    )
}

ProductHeader.propTypes = {
    id: PropTypes.number.isRequired
}

export default ProductHeader