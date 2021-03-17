import { Box, Button, makeStyles, Typography } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import React from 'react'
import { useDispatch } from 'react-redux'
import { openPopup } from '../../../Redux/Popups/actions'
import ProductConstants from '../../../Redux/Products/constants'
import TeamConstants from '../../../Redux/Teams/constants'
import Page from '../../Page/Page'

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

    const createProduct = () => dispatch(openPopup(ProductConstants.CREATE_PRODUCT, 'CreateProductPopup'))
    const createTeam = () => dispatch(openPopup(TeamConstants.CREATE_TEAM, 'CreateTeamPopup'))

    return (
        <Page>
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
                        onClick = {createTeam}
                    >
                        Add New Team
                    </Button>
                </div>
            </Box>
        </Page>
    )
}

export default Home