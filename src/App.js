import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Banner } from './Components/Banner'
import { Account, Admin, Home, PageNotFound, Product, Projects, Tags } from './Components/Pages'
import { PopupManager } from './Components/PopupManager'
import { selectUserLoggedIn } from './Redux/Auth/selectors'
import { requestFetchInit } from './Redux/Init/actions'
import { requestFetchAllProducts } from './Redux/Products/actions'
import { requestFetchAllProjects } from './Redux/Projects/actions'
import { requestFetchAllTags } from './Redux/Tags/actions'
import { requestFetchAllTeams } from './Redux/Teams/actions'

function App() {
    const dispatch = useDispatch()

    const user = useSelector((state) => selectUserLoggedIn(state))

    useEffect(() => {
        async function initializeApp() {
            dispatch(requestFetchAllTeams())
            dispatch(requestFetchAllProjects())
            dispatch(requestFetchAllTags())
            dispatch(requestFetchAllProducts())
        }

        async function whoami() {
            const init = await dispatch(requestFetchInit())
            if (init.meta.requestStatus === 'fulfilled') initializeApp()
            else console.error('INIT FAILED')
        }
        whoami()
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
                <Route exact path = '/projects' component = {Projects} />
                <Route exact path = '/account' component = {Account} />
                <Route exact path = '/tags' component = {Tags} />
                <Route exact path = '/products/:productId' component = {Product} />
                {user.isAdmin && <Route exact path = '/admin' component = {Admin} />}
                <Route component = {PageNotFound} />
            </Switch>
        </Banner>
    )
}

export default App
