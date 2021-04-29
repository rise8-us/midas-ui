import { IconButton, makeStyles, TextField } from '@material-ui/core'
import { AddCircleOutline, Edit, SaveOutlined } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TagDropdown } from '../../../Components/TagDropdown'
import { selectRequestErrors } from '../../../Redux/Errors/selectors'
import { requestUpdateProduct } from '../../../Redux/Products/actions'
import ProductConstants from '../../../Redux/Products/constants'
import { selectProductById } from '../../../Redux/Products/selectors'
import { getUrlParam } from '../../../Utilities/queryParams'
import { Page } from '../../Page'

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 15
    },
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

function Product() {
    const classes = useStyles()
    const dispatch = useDispatch()

    const id = parseInt(getUrlParam('products'))

    const product = useSelector(state => selectProductById(state, id))
    const errors = useSelector(state => selectRequestErrors(state, ProductConstants.UPDATE_PRODUCT))

    const [isDisabled, setDisabled] = useState(true)
    const [visionStatement, setVision] = useState(product.visionStatement)
    const [name, setName] = useState(product.name)
    const [tags, setTags] = useState(product.tags)
    const [loaded, setLoaded] = useState(false)
    const [tagsError, setTagsError] = useState([])

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

    const handlePageAction = () => {
        !isDisabled && submitUpdate()
        setDisabled(!isDisabled)
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
            setTagsError(errors.filter(error => error.includes('Tag')))
        }
    }, [errors])

    return (
        <Page>
            <div className = {classes.root}>
                <div className = {classes.row}>
                    <TextField
                        InputProps = {{
                            disableUnderline: isDisabled,
                            readOnly: isDisabled,
                            'data-testid': 'Product__input-name',
                            className: classes.h4,
                        }}
                        value = {name}
                        onChange = {onNameChange}
                    />
                    <IconButton
                        className = {classes.icon}
                        data-testid = 'Product__icon-page-action'
                        onClick = {handlePageAction}
                        color = 'secondary'
                    >
                        {isDisabled ? <Edit /> : <SaveOutlined />}
                    </IconButton>
                </div>
                <div className = {classes.row}>
                    <TextField
                        InputProps = {{
                            disableUnderline: isDisabled,
                            readOnly: isDisabled,
                            'data-testid': 'Product__input-vision',
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
                        error = {tagsError}
                        onChange = {onTagsChange}
                        freeSolo = {isDisabled}
                        disableClearable = {isDisabled}
                        deletable = {!isDisabled}
                        disableUnderline = {true}
                        popupIcon = {<AddCircleOutline color = 'secondary' />}
                    />
                </div>
            </div>
        </Page>
    )
}

export default Product