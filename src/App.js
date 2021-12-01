import { Banner } from 'Components/Banner'
import * as Pages from 'Components/Pages'
import { PopupManager } from 'Components/PopupManager'
import { SnackbarProvider } from 'Components/SnackbarProvider'
import { WebsocketProvider } from 'Components/WebsocketProvider'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'
import { setInitialized } from 'Redux/AppSettings/reducer'
import { selectUserLoggedIn } from 'Redux/Auth/selectors'
import { initializeApp } from 'Utilities/initializeApp'

function App() {
    const user = useSelector(selectUserLoggedIn)

    useEffect(() => {
        initializeApp().catch(() => setInitialized(false))
    }, [])

    return (
        <Banner>
            <SnackbarProvider>
                <WebsocketProvider>
                    <PopupManager />
                    <Switch>
                        <Route exact path = '/'><Redirect to = '/dashboard'/></Route>
                        <Route exact path = '/account' component = {Pages.Account} />
                        <Route exact path = '/dashboard' component = {Pages.Dashboard} />
                        <Route exact path = '/home'><Redirect to = '/dashboard'/></Route>
                        <Route exact path = '/portfolios' component = {Pages.Portfolios} />
                        <Route exact path = '/products' component = {Pages.Products} />
                        <Route exact path = '/products/:productId' component = {Pages.Product} />
                        <Route exact path = '/products/:productId/:productTab' component = {Pages.Product} />
                        <Route
                            exact
                            path = '/products/:productId/:productTab/:assertionId'
                            component = {Pages.Product}
                        />
                        <Route exact path = '/projects' component = {Pages.Projects} />
                        <Route exact path = '/tags' component = {Pages.Tags} />
                        <Route exact path = '/capabilities' component = {Pages.Capabilities} />
                        {user.isAdmin && <Route exact path = '/admin' component = {Pages.Admin} />}
                        <Route component = {Pages.PageNotFound} />
                    </Switch>
                </WebsocketProvider>
            </SnackbarProvider>
        </Banner>
    )
}

export default App
