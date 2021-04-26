import { Box, makeStyles, TextField, IconButton } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectProductById } from '../../../Redux/Products/selectors'
import { getUrlParam } from '../../../Utilities/queryParams'
import { Page } from '../../Page'
import { requestUpdateProduct } from '../../../Redux/Products/actions'
import { Tag } from '../../../Components/Tag'
import { Edit } from '@material-ui/icons'
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined'

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

    const [isDisabled, setDisabled] = useState(true)
    const [visionStatement, setVision] = useState(product.visionStatement)
    const [name, setName] = useState(product.name)
    const [loaded, setLoaded] = useState(false)

    const onVisionChange = (e) => !isDisabled && setVision(e.target.value)
    const onNameChange = (e) => !isDisabled && setName(e.target.value)

    useEffect(() => {
        if (!loaded && product.id === id) {
            setVision(product.visionStatement)
            setName(product.name)
            setLoaded(true)
        }
    })

    const onSubmit = () => {
        setName(name)
        setVision(visionStatement)
        dispatch(requestUpdateProduct({
            ...product,
            name,
            visionStatement,
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
                        <SaveOutlinedIcon />
                    </IconButton>
                }
            </Box>
            <Box display = 'flex' alignItems = 'right' paddingLeft = '30px'>
                {product.tags.map((tag, index) => (
                    <Tag { ...tag } key = {index}/>
                ))}
            </Box>
        </Page>
    )
}

export default Product