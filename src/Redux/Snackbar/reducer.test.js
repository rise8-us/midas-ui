import reducer, * as reduxActions from './reducer'

const defaultState = {
    messages: []
}

describe('snackbar reducer', () => {

    test('enqueueMessage with all props', () => {
        const payload = { timeout: 10, id: 'test', severity: 'success', open: true }

        const actions = [{ type: reduxActions.enqueueMessage.type, payload }]
        const state = actions.reduce(reducer, defaultState)

        expect(state.messages[0]).toEqual({ ...payload, open: undefined })
    })

    test('enqueueMessage does not add existing message with same id', () => {
        const payload = { timeout: 10, id: 'test', severity: 'success' }

        const actions = [{ type: reduxActions.enqueueMessage.type, payload }]
        const state = actions.reduce(reducer, { messages: [payload] })

        expect(state.messages.length).toEqual(1)
    })

    test('enqueueMessage with no props', () => {
        const now = Date.now()
        jest.spyOn(Date, 'now').mockImplementation(() => now)

        const actions = [{ type: reduxActions.enqueueMessage.type, payload: {} }]
        const state = actions.reduce(reducer, defaultState)

        expect(state.messages[0]).toEqual({ timeout: 3000, id: now, severity: 'info' })
    })

    test('updateMessage updates a message', () => {
        const payload = { timeout: 10, id: 'test', severity: 'success', open: false }

        const actions = [{ type: reduxActions.updateMessage.type, payload }]
        const state = actions.reduce(reducer, { messages: [{ ...payload, open: true }] })

        expect(state.messages[0]).toEqual(payload)
    })

    test('removeMessage should remove message', () => {
        const actions = [{ type: reduxActions.removeMessage.type, payload: { id: 'bogo' } }]
        const state = actions.reduce(reducer, { messages: [{ test: 'yolo', id: 'bogo' }] })

        expect(state.messages).toEqual([])
    })

    test('removeMessage should not remove message', () => {
        const message = { test: 'yolo', id: 'bogo' }
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