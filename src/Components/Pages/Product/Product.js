import { Box, IconButton, makeStyles, TextField } from '@material-ui/core'
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
    box: {
        display: 'flex',
        flexDirection: 'column',
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '36px',
        paddingBottom: '10px'
    },
    disabled: {
        color: theme.palette.text.primary
    },
    notDisabledh6: {
        fontFamily: theme.typography.h6.fontFamily,
        fontSize: theme.typography.h6.fontSize,
        fontWeight: theme.typography.h6.fontWeight,
        lineHeight: theme.typography.h6.lineHeight,
        color: theme.palette.text.secondary
    },
    notDisabledh4: {
        fontFamily: theme.typography.h4.fontFamily,
        fontSize: theme.typography.h4.fontSize,
        fontWeight: theme.typography.h4.fontWeight,
        lineHeight: theme.typography.h4.lineHeight
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

    const onSubmit = () => {
        setName(name)
        setVision(visionStatement)
        dispatch(requestUpdateProduct({
            ...product,
            name,
            visionStatement,
            tagIds: Object.values(tags.map(t => t.id))
        }))
        setDisabled(!isDisabled)
    }

    return (
        <Page >
            <Box className = {classes.row}>
                <Box className = {classes.box} >
                    <TextField
                        disabled = {isDisabled}
                        InputProps = {{
                            disableUnderline: isDisabled,
                            autoFocus: true,
                            'data-testid': 'Product__input-name',
                            className: classes.notDisabledh4,
                            classes: {
                                disabled: classes.disabled
                            }
                        }}
                        value = {name}
                        onChange = {onNameChange}
                    />
                    <TextField
                        disabled = {isDisabled}
                        InputProps = {{
                            disableUnderline: isDisabled,
                            'data-testid': 'Product__input-vision',
                            className: classes.notDisabledh6
                        }}
                        value = {visionStatement}
                        onChange = {onVisionChange}
                        multiline
                    />
                </Box>
                {isDisabled ?
                    <IconButton
                        className = {classes.icon}
                        data-testid = 'SaveAlt__icon'
                        onClick = {() => setDisabled(!isDisabled)}>
                        <Edit />
                    </IconButton> :
                    <IconButton
                        className = {classes.icon}
                        data-testid = 'SaveOut__icon'
                        color = 'secondary'
                        onClick = {onSubmit}
                    >
                        <SaveOutlined />
                    </IconButton>
                }
            </Box>
            <Box width = 'fit-content' paddingLeft = '35px'>
                <TagDropdown
                    defaultTags = {tags}
                    error = {tagsError}
                    onChange = {onTagsChange}
                    freeSolo = {isDisabled}
                    disableClearable = {isDisabled}
                    deletable = {!isDisabled}
                    disableUnderline = {isDisabled}
                    popupIcon = {<AddCircleOutline color = 'secondary' />}
                />
            </Box>
        </Page>
    )
}

export default Product