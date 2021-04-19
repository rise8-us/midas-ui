import { Box, Button, makeStyles, Typography } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ApplicationConstant from '../../../Redux/Applications/constants'
import { selectUnarchivedApplicationIds } from '../../../Redux/Applications/selectors'
import { openPopup } from '../../../Redux/Popups/actions'
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

    const allApplicationIds = useSelector(selectUnarchivedApplicationIds, (left, right) => left.length === right.length)

    const createApp = () => dispatch(openPopup(ApplicationConstant.CREATE_APPLICATION, 'CreateApplicationPopup'))
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
                            onClick = {createApp}
                        >
                            Add New App
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
                    {allApplicationIds.map((id) => (
                        <AppCard key = {id} id = {id}/>
                    ))}
                </Box>
            </Box>
        </Page>
    )
}

export default Home