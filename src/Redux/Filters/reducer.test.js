import reducer, { setHomePageFilterString } from './reducer'

const initialState = {
    homePage: {
        filterString: ''
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
