import { Banner } from 'Components/Banner'
import * as Pages from 'Components/Pages'
import { PopupManager } from 'Components/PopupManager'
import { SnackbarManager } from 'Components/Snackbar'
import { WebsocketProvider } from 'Components/WebsocketProvider'
import useHistory from 'Hooks/useHistory'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
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
                <Routes>
                    <Route path = '/' element = {<Navigate to = '/portfolios' replace />} />
                    <Route path = '/account' element = {<Pages.Account />} />
                    <Route path = '/dashboard' element = {<Pages.Dashboard />} />
                    <Route path = '/home' element = {<Navigate to = '/portfolios' replace />} />
                    <Route path = '/portfolios' element = {<Pages.Portfolios />} />
                    <Route path = '/portfolios/:portfolioId' element = {<Pages.Portfolio />} />
                    <Route path = '/portfolios/:portfolioId/:portfolioTab' element = {<Pages.Portfolio />} />
                    <Route
                        path = '/portfolios/:portfolioId/:portfolioTab/:capabilityId'
                        element = {<Pages.Portfolio />}
                    />
                    <Route path = '/products' element = {<Pages.Products />} />
                    <Route path = '/products/:productId' element = {<Pages.Product />} />
                    <Route path = '/products/:productId/:productTab' element = {<Pages.Product />} />
                    <Route
                        path = '/products/:productId/:productTab/:assertionId'
                        element = {<Pages.Product />}
                    />
                    <Route path = '/projects' element = {<Pages.Projects />} />
                    <Route path = '/tags' element = {<Pages.Tags />} />
                    {user.isAdmin && <Route path = '/admin' element = {<Pages.Admin />} />}
                    <Route path = '/appMetrics' element = {<Pages.AppMetrics />} />
                    <Route element = {<Pages.PageNotFound />} />
                </Routes>
            </WebsocketProvider>
        </Banner>
    )
}

export default App
