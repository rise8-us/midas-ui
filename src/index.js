import { CssBaseline } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core/styles'
import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import App from './App'
import store from './Redux/store'
import { darkTheme } from './Styles/materialThemes'
import './Styles/scrollbar.css'

// expose store when run in Cypress
if (window.Cypress) {
    window.store = store
}

ReactDOM.render(
    <Router>
        <Provider store = {store}>
            <Switch>
                <Fragment>
                    <ThemeProvider theme = {darkTheme}>
                        <CssBaseline />
                        <App />
                    </ThemeProvider>
                </Fragment>
            </Switch>
        </Provider>
    </Router>,
    document.getElementById('root')
)
