import { selectAllMessages } from './selectors'

describe('snackbar selectors', () => {
    test('selectAllMessages should return array', () => {
        expect(selectAllMessages({ snackbar: { messages: [] } })).toBeInstanceOf(Array)
    })

    test('selectAllMessages should return array when null or undefined', () => {
        expect(selectAllMessages({ snackbar: { messages: null } })).toBeInstanceOf(Array)
        expect(selectAllMessages({ snackbar: { messages: undefined } })).toBeInstanceOf(Array)
    })
})