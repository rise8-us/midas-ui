/* eslint-disable security/detect-non-literal-require */
/* eslint-disable react/prop-types */
import { ThemeProvider } from '@mui/material/styles'
import { render as rtlRender } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history'
import { default as React } from 'react'
import { Provider } from 'react-redux'
import { Route, Router } from 'react-router-dom'
import { createStore } from 'redux'
import { rootReducer } from 'Redux/reducers'
import { theme } from 'Styles/materialThemes'

function render(ui, { initialState, store = createStore(rootReducer, initialState), ...renderOptions } = {}) {
    function Wrapper({ children }) {
        return <Provider store = {store}><ThemeProvider theme = {theme}>{children}</ThemeProvider></Provider>
    }
    return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}
function renderWithRouter(ui, {
    path = '/', // ie. "/project/:id"
    route = '/', // ie. "/project/ABC123"
    history = createMemoryHistory(),
    ...renderOptions
} = {}) {

    history.push(route)

    return render(
        <Router history = {history}>
            <Route path = {path} render = {() => ui}/>
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

export function mockSearchUsersComponent({ onChange, ...everythingElse }) {
    return (
        <input
            title = 'searchUsersMock'
            onChange = {e => onChange(e, {
                id: 24,
                username: 'jsmith',
                displayName: 'Hiemer Smith'
            })}
            placeholder = 'username, display name, or email'
            {...everythingElse}
        />
    )
}

export function mockProductConfigurationFields(props) {
    return (
        <>
            <input onChange = {() => props.onTagsChange([{ id: 10, label: 'tag' }])} placeholder = 'tags' />
            <input onChange = {() => props.onTeamsChange([{ id: 20, name: 'team' }])} placeholder = 'team' />
            <input onChange = {() => props.onProjectsChange([{ id: 30, name: 'label' }])} placeholder = 'projects'/>
            <input onChange = {() => props.onSourceControlChange({ id: 40, name: 'sc' })} placeholder = 'srcc' />
            <input onChange = {() => props.onRoadmapTypeChange({ name: 'roadmaptype' })} placeholder = 'roadmaptype' />
            <input onChange = {() => props.onGroupIdChange(50)} placeholder = 'group' />
        </>
    )
}

export function selectRoadmapStatusesMock() {
    const enumSelectors = require('Redux/AppSettings/selectors')
    jest.spyOn(enumSelectors, 'selectRoadmapStatuses').mockReturnValue({
        FUTURE: { name: 'FUTURE', label: 'Future', color: '#000000' },
        COMPLETE: { name: 'COMPLETE', label: 'Complete', color: '#000000' }
    })
}

export function selectAssertionStatusesMock() {
    const enumSelectors = require('Redux/AppSettings/selectors')
    jest.spyOn(enumSelectors, 'selectAssertionStatuses').mockReturnValue({
        COMPLETED: { name: 'COMPLETED', label: 'Complete', color: '#0fcf50' },
        ON_TRACK: { name: 'ON_TRACK', label: 'On Track', color: '#5dade2' },
        AT_RISK: { name: 'AT_RISK', label: 'At Risk', color: '#ff9800' },
        BLOCKED: { name: 'BLOCKED', label: 'Blocked', color: '#e91e63' },
        NOT_STARTED: { name: 'NOT_STARTED', label: 'Not Started', color: '#969696' }
    })
}

export function selectCompletionTypesMock() {
    const enumSelectors = require('Redux/AppSettings/selectors')
    jest.spyOn(enumSelectors, 'selectCompletionTypes').mockReturnValue({
        BINARY: { name: 'BINARY', displayName: 'Binary', description: 'Complete? true or false' },
        PERCENTAGE: { name: 'PERCENTAGE', displayName: 'Percentage', description: 'Percentage of completeness' },
        NUMBER: { name: 'NUMBER', displayName: 'Number', description: 'Numerical representation of completeness' },
        MONEY: { name: 'MONEY', displayName: 'Money', description: 'Monetary representation of completeness' },
    })
}

// re-export everything
export * from '@testing-library/react'
export * from '@testing-library/user-event'
export { userEvent }
// override render method
export { render, renderWithRouter }

