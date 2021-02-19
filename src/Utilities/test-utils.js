/* eslint-disable react/prop-types */
import { render as rtlRender } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { rootReducer } from '../Redux/reducers'

function render(
    ui,
    {
        initialState,
        store = createStore(rootReducer, initialState),
        ...renderOptions
    } = {}
) {
    function Wrapper({ children }) {
        return <Provider store = {store}>{children}</Provider>
    }
    return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
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
// override render method
export { render }

