import configureMockStore from 'redux-mock-store'
import * as actions from './actions'

const mockStore = configureMockStore()
const store = mockStore({})

afterEach(() => {
    store.clearActions()
})

test('should create OpenPopup action', () => {
    const payload = { open: true, componentName: 'createFooBarPopup', name: 'Test Modal', props: {} }

    store.dispatch(actions.openPopup('Test Modal', 'createFooBarPopup', {}))

    expect(store.getActions()[0].type).toEqual('popup/open')
    expect(store.getActions()[0].payload).toEqual(payload)
})

test('should create closePopup action', () => {
    const payload = { open: false, name: 'Test Modal', componentName: '', props: {} }

    store.dispatch(actions.closePopup('Test Modal'))

    expect(store.getActions()[0].type).toEqual('popup/close')
    expect(store.getActions()[0].payload).toEqual(payload)
})