import reducer, * as reduxActions from './reducer'

const defaultState = {
    messages: []
}

describe('snackbar reducer', () => {

    test('enqueueMessage with all props', () => {
        const payload = { timeout: 10, key: 'test', severity: 'success' }

        const actions = [{ type: reduxActions.enqueueMessage.type, payload }]
        const state = actions.reduce(reducer, defaultState)

        expect(state.messages[0]).toEqual(payload)
    })

    test('enqueueMessage with no props', () => {
        const now = Date.now()
        jest.spyOn(Date, 'now').mockImplementation(() => now)

        const actions = [{ type: reduxActions.enqueueMessage.type, payload: {} }]
        const state = actions.reduce(reducer, defaultState)

        expect(state.messages[0]).toEqual({ timeout: 3000, key: now, severity: 'info' })
    })

    test('removeMessage should remove message', () => {
        const actions = [{ type: reduxActions.removeMessage.type, payload: { key: 'bogo' } }]
        const state = actions.reduce(reducer, { messages: [{ test: 'yolo', key: 'bogo' }] })

        expect(state.messages).toEqual([])
    })

    test('removeMessage should not remove message', () => {
        const message = { test: 'yolo', key: 'bogo' }
        const actions = [{ type: reduxActions.removeMessage.type, payload: { } }]
        const state = actions.reduce(reducer, { messages: [message] })

        expect(state.messages).toEqual([message])
    })

    test('removeAllMessages should set messages to empty array', () => {
        const actions = [{ type: reduxActions.removeAllMessages.type, payload: {} }]
        const state = actions.reduce(reducer, { messages: [{ test: 'yolo' }] })

        expect(state.messages).toEqual([])
    })

})