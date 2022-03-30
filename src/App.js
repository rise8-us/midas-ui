import { Banner } from 'Components/Banner'
import * as Pages from 'Components/Pages'
import { PopupManager } from 'Components/PopupManager'
import { SnackbarManager } from 'Components/Snackbar'
import { WebsocketProvider } from 'Components/WebsocketProvider'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Route, Switch, useHistory } from 'react-router-dom'
import { requestPostPageMetrics } from 'Redux/AppMetrics/actions'
import { setInitialized } from 'Redux/AppSettings/reducer'
import { selectUserLoggedIn } from 'Redux/Auth/selectors'
import { initializeApp } from 'Utilities/initializeApp'

function App() {
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(selectUserLoggedIn)

    useEffect(() => {
        initializeApp().catch(() => setInitialized(false))
        history.listen(trackPageView)
    }, [])

    const trackPageView = ({ pathname }) => {
        dispatch(requestPostPageMetrics(pathname.slice(1).replace(/\/$/, '')))
    }

    return (
        <Banner>
            <WebsocketProvider>
                <PopupManager />
                <SnackbarManager />
                <Switch>
                    <Route exact path = '/'><Redirect to = '/dashboard'/></Route>
                    <Route exact path = '/account' component = {Pages.Account} />
                    <Route exact path = '/dashboard' component = {Pages.Dashboard} />
                    <Route exact path = '/home'><Redirect to = '/dashboard'/></Route>
                    <Route exact path = '/portfolios' component = {Pages.Portfolios} />
                    <Route exact path = '/portfolios/:portfolioId' component = {Pages.Portfolio} />
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
                    <Route exact path = '/appMetrics' component = {Pages.AppMetrics} />
                    <Route component = {Pages.PageNotFound} />
                </Switch>
            </WebsocketProvider>
        </Banner>
    )
}

export default App
