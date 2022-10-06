
import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { Fragment } from 'react'
import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from 'react-error-boundary'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import store from 'Redux/store'
import App from './App'
import { theme } from './Styles/materialThemes'

const container = document.getElementById('root')
const root = createRoot(container)

// expose store when run in Cypress
if (window.Cypress) {
    window.store = store
}

const errorFallbackComponent = ({ error }) => (
    <div role = 'alert'>
        <div>Oh no! An Error has occurred! Please report this to the MIDAS dev team.</div>
        <pre>{error.message}</pre>
    </div>
)

root.render(
    <Router>
        <Provider store = {store}>
            <Fragment>
                <ThemeProvider theme = {theme}>
                    <CssBaseline />
                    <ErrorBoundary FallbackComponent = {errorFallbackComponent}>
                        {/* <React.StrictMode> */}
                        <App />
                        {/* </React.StrictMode> */}
                    </ErrorBoundary>
                </ThemeProvider>
            </Fragment>
        </Provider>
    </Router>,)
