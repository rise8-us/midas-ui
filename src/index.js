import { CssBaseline } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core/styles'
import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import App from './App'
import store from './Redux/store'
import { darkTheme } from './Styles/materialThemes'

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

ReactDOM.render(
    <Router>
        <Provider store = {store}>
            <Switch>
                <Fragment>
                    <ThemeProvider theme = {darkTheme}>
                        <CssBaseline />
                        <ErrorBoundary FallbackComponent = {errorFallbackComponent}>
                            {/* <React.StrictMode> */}
                            <App />
                            {/* </React.StrictMode> */}
                        </ErrorBoundary>
                    </ThemeProvider>
                </Fragment>
            </Switch>
        </Provider>
    </Router>,
    document.getElementById('root')
)
