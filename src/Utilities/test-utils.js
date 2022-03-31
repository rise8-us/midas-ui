/* eslint-disable security/detect-non-literal-require */
/* eslint-disable react/prop-types */
import { ThemeProvider } from '@mui/material/styles'
import { render as rtlRender } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history'
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

export function mockUsersCollectionComponent({ setUserIds, ...everythingElse }) {
    return (
        <input
            title = 'usersCollectionMock'
            onChange = {() => setUserIds([24])}
            placeholder = {everythingElse.placeholderValue}
            {...everythingElse}
        />
    )
}

export function mockSearchEpicsComponent({ onChange, ...everythingElse }) {
    return (
        <input
            title = 'searchEpicsMock'
            onChange = {e => onChange(e, [{
                id: 20,
                title: 'epic title',
                epidId: 10,
                productId: 11
            }], 'selectOption')}
            placeholder = 'Link epics by title or product name'
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

export function mockDateSelector(props) {
    return (
        <>
            <label htmlFor = 'mockDateSelector'>{props.label}</label>
            <input
                id = 'mockDateSelector'
                placeholder = {props.placeholder}
                defaultValue = {props.initialValue}
                value = {props.value}
                onBlur = {() => props.onAccept('2021-04-20')}
                onChange = {(e) => props.onChange(e)}
                data-testid = 'mockDateSelector__input'
            />
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
        BINARY: { name: 'BINARY', displayName: 'Binary', description: 'Complete? true or false', descriptor: null },
        PERCENTAGE: {
            name: 'PERCENTAGE',
            displayName: 'Percentage',
            description: 'Percentage of completeness',
            descriptor: null
        },
        NUMBER: {
            name: 'NUMBER',
            displayName: 'Number',
            description: 'Numerical representation of completeness',
            descriptor: null
        },
        MONEY: {
            name: 'MONEY',
            displayName: 'Money',
            description: 'Monetary representation of completeness',
            descriptor: null
        },
        GITLAB_EPIC: {
            name: 'GITLAB_EPIC',
            displayName: 'GitLab Epic',
            description: 'GitLab Epic',
            descriptor: 'total weight'
        },
        GITLAB_ISSUE: {
            name: 'GITLAB_ISSUE',
            displayName: 'GitLab Issue',
            description: 'GitLab Issue',
            descriptor: null
        },
    })
}

export function selectRolesAsArrayMock() {
    const enumSelectors = require('Redux/AppSettings/selectors')
    jest.spyOn(enumSelectors, 'selectRolesAsArray').mockReturnValue([
        {
            offset: 0,
            name: 'ADMIN',
            description: 'Can update or add anything'
        }, {
            offset: 1,
            name: 'PORTFOLIO_LEAD',
            description: 'Manages portfolio'
        }, {
            offset: 2,
            name: 'PRODUCT_MANAGER',
            description: 'Manages products'
        }, {
            offset: 3,
            name: 'TECH_LEAD',
            description: 'Lead SWE in charge of technical functionality'
        }, {
            offset: 4,
            name: 'DESIGNER',
            description: 'Manages product UI/UX designs'
        }, {
            offset: 5,
            name: 'PLATFORM_OPERATOR',
            description: 'Owner/Operator of platform hosting service'
        }, {
            offset: 6,
            name: 'PORTFOLIO_ADMIN',
            description: 'Admin over a portfolio'
        }, {
            offset: 7,
            name: 'STAKEHOLDER',
            description: 'Stakeholder'
        }
    ])
}

// re-export everything
export * from '@testing-library/react'
export * from '@testing-library/user-event'
export { userEvent }
// override render method
export { render, renderWithRouter }

