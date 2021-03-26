import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Banner } from './Components/Banner'
import { Account, Admin, Home, PageNotFound } from './Components/Pages'
import { PopupManager } from './Components/PopupManager'
import { getUserLoggedIn } from './Redux/Auth/selectors'
import { requestFetchInit } from './Redux/Init/actions'
import { requestFetchAllProducts } from './Redux/Products/actions'
import { requestFetchAllTags } from './Redux/Tags/actions'
import { requestFetchAllTeams } from './Redux/Teams/actions'

function App() {
    const dispatch = useDispatch()

    const user = useSelector((state) => getUserLoggedIn(state))

    useEffect(() => {
        async function initializeApp() {
            dispatch(requestFetchInit())
            dispatch(requestFetchAllTeams())
            dispatch(requestFetchAllProducts())
            dispatch(requestFetchAllTags())
        }
        initializeApp()
    }, [])

    return (
        <Banner>
            <PopupManager />
            <Switch>
                {/* unsecured Routes */}
                <Route exact path = '/'>
                    <Redirect to = '/home'/>
                </Route>
                <Route exact path = '/home' component = {Home} />
                <Route exact path = '/account' component = {Account} />
                {user.isAdmin && <Route exact path = '/admin' component = {Admin} />}
                <Route component = {PageNotFound} />
            </Switch>
        </Banner>
    )
}

export default App
