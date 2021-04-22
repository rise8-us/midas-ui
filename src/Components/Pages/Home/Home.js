import { Box, Button, makeStyles, Typography } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { openPopup } from '../../../Redux/Popups/actions'
import ProductConstant from '../../../Redux/Products/constants'
import { selectUnarchivedProductIds } from '../../../Redux/Products/selectors'
import TagConstants from '../../../Redux/Tags/constants'
import { AppCard } from '../../Cards'
import { Page } from '../../Page'

const useStyles = makeStyles(theme => ({
    button: {
        '&:hover': {
            color: theme.palette.primary.main
        },
        height: 40
    }
}))

function Home() {
    const dispatch = useDispatch()
    const classes = useStyles()

    const allProductIds = useSelector(selectUnarchivedProductIds)

    const createProduct = () => dispatch(openPopup(ProductConstant.CREATE_PRODUCT, 'CreateOrUpdateProductPopup'))
    const createTag = () => dispatch(openPopup(TagConstants.CREATE_TAG, 'CreateOrUpdateTagPopup'))

    return (
        <Page>
            <Box display = 'flex' flexDirection = 'column'>
                <Box display = 'flex'>
                    <Typography variant = 'h6' color = 'textSecondary' style = {{ padding: '20px' }}>
                        Measuring Inception to Production
                    </Typography>
                    <div style = {{ flexGrow: 1 }} />
                    <div style = {{ padding: '20px' }}>
                        <Button
                            variant = 'text'
                            startIcon = {<Add/>}
                            className = {classes.button}
                            onClick = {createProduct}
                        >
                            Add New Product
                        </Button>
                        <Button
                            variant = 'text'
                            startIcon = {<Add/>}
                            className = {classes.button}
                            onClick = {createTag}
                        >
                            Add New Tag
                        </Button>
                    </div>
                </Box>
                <Box
                    display = 'grid'
                    justifyContent = 'center'
                    gridTemplateColumns = 'repeat(auto-fit, 450px)'
                    gridAutoRows = '2px'
                    gridGap = '0 10px'
                    gridAutoFlow = 'row'
                    style = {{ marginBottom: '40px', padding: '0 30px' }}
                >
                    {allProductIds.map((id) => (
                        <AppCard key = {id} id = {id}/>
                    ))}
                </Box>
            </Box>
        </Page>
    )
}

export default Home