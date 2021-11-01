/* eslint-disable security/detect-non-literal-require */
/* eslint-disable react/prop-types */
import { ThemeProvider } from '@mui/material/styles'
import { render as rtlRender } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history'
import { default as React } from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import { createStore } from 'redux'
import { rootReducer } from 'Redux/reducers'
import { theme } from 'Styles/materialThemes'

function render(ui, { initialState, store = createStore(rootReducer, initialState), ...renderOptions } = {}) {
    function Wrapper({ children }) {
        return <Provider store = {store}><ThemeProvider theme = {theme}>{children}</ThemeProvider></Provider>
    }
    return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// TODO: Get route with path working so that useParams hook can access a templete for the route
function renderWithRouter(ui, {
    route = '/',
    // routePath = '/',
    history = createMemoryHistory(),
    ...renderOptions
} = {}) {

    history.push(route)

    return render(
        <Router history = {history}>
            {/* <Route path = {routePath}> */}
            {ui}
            {/* </Route> */}
        </Router>, { ...renderOptions })
}

export const useSelectorMock = () => {
    const reactRedux = require('react-redux')
    return jest.spyOn(reactRedux, 'useSelector')
}

export const useDispatchMock = () => {
    const reactRedux = require('react-redux')
    const dispatch = jest.fn()
    const mock = () => dispatch
    jest.spyOn(reactRedux, 'useDispatch').mockImplementation(mock)
    return dispatch
}

export const useModuleMock = (moduleName, property) => {
    const mock = jest.fn()
    const module = require(`../${moduleName}`)
    module[property] = mock
    return mock
}

// re-export everything
export * from '@testing-library/react'
export * from '@testing-library/user-event'
export { userEvent }
// override render method
export { render, renderWithRouter }

