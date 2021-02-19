import { makeStyles } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import { getUserLoggedIn } from '../../../Redux/Auth/selectors'
import Header from '../../Header/Header'
import Page from '../../Page/Page'
import { UserRoles } from '../../UserRoles'
import { UserSettings } from '../../UserSettings'

const useStyles = makeStyles(() => ({
    wrap: {
        display: 'flex',
        flexDirection: 'row'
    }
}))
function Account() {
    const classes = useStyles()
    const user = useSelector((state) => getUserLoggedIn(state))

    return (
        <Page>
            <Header title = 'Account Information' subtitle = {`ID: ${user.id}`} />
            <div className = {classes.wrap}>
                <UserSettings user = { user } />
                <UserRoles user = { user } />
            </div>
        </Page>
    )
}

export default Account
