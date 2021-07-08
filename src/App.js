import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Banner } from './Components/Banner'
import * as Pages from './Components/Pages'
import { PopupManager } from './Components/PopupManager'
import { WebsocketProvider } from './Components/WebsocketProvider'
import { selectUserLoggedIn } from './Redux/Auth/selectors'
import { requestFetchAllBlockedAssertions } from './Redux/BlockedAssertions/actions'
import { requestFetchAllGitlabConfigs } from './Redux/GitlabConfigs/actions'
import { requestFetchInit } from './Redux/Init/actions'
import { requestFetchAllPortfolios } from './Redux/Portfolios/actions'
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
            dispatch(requestFetchAllPortfolios())
            dispatch(requestFetchAllGitlabConfigs())
            dispatch(requestFetchAllBlockedAssertions())
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
            <WebsocketProvider>
                <PopupManager />
                <Switch>
                    <Route exact path = '/'><Redirect to = '/dashboard'/></Route>
                    <Route exact path = '/account' component = {Pages.Account} />
                    <Route exact path = '/dashboard' component = {Pages.Dashboard} />
                    <Route exact path = '/home' component = {Pages.Home} />
                    <Route exact path = '/portfolios' component = {Pages.Portfolios} />
                    <Route exact path = '/products' component = {Pages.Products} />
                    <Route exact path = '/products/:productId' component = {Pages.Product} />
                    <Route exact path = '/projects' component = {Pages.Projects} />
                    <Route exact path = '/tags' component = {Pages.Tags} />
                    {user.isAdmin && <Route exact path = '/admin' component = {Pages.Admin} />}
                    <Route component = {Pages.PageNotFound} />
                </Switch>
            </WebsocketProvider>
        </Banner>
    )
}

export default App
