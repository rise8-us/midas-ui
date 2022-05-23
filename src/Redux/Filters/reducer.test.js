import reducer, { setAppBarFilterString, setHomePageFilterString, setTargetFilters } from './reducer'

const initialState = {
    appBar: {
        filterString: ''
    },
    homePage: {
        filterString: ''
    },
    targetFilters: {
        isPriority: false
    }
}

test('should handle initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
})

test('should set home page filter string', () => {
    const actions = [{ type: setHomePageFilterString, payload: 'string' }]
    const state = actions.reduce(reducer, initialState)

    expect(state.homePage.filterString).toEqual('string')
})

test('should set appBar filter string', () => {
    const actions = [{ type: setAppBarFilterString, payload: 'appBar' }]
    const state = actions.reduce(reducer, initialState)

    expect(state.appBar.filterString).toEqual('appBar')
})

test('should set target filter', () => {
    const actions = [{ type: setTargetFilters, payload: { isPriority: true } }]
    const state = actions.reduce(reducer, initialState)

    expect(state.targetFilters.isPriority).toEqual(true)
})