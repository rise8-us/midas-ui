import * as selectors from './selectors'

const mockState = {
    popups: {
        'popup/foo': {
            open: true
        },
        'popup/bar': {
            open: false
        }
    }
}

test('getPopup - returns popup object', () => {
    expect(selectors.getPopup(mockState, 'popup/foo')).toBe(mockState.popups['popup/foo'])
})

test('getPopup - returns empty object', () => {
    expect(selectors.getPopup(mockState, 'popup/foobar')).toBeInstanceOf(Object)
})

test('getOpenPopups - returns array of popups', () => {
    const openPopups = selectors.getOpenPopups(mockState)

    expect(openPopups).toHaveLength(1)
    expect(openPopups[0]).toEqual(mockState.popups['popup/foo'])
})

test('getOpenPopups - returns empty array', () => {

    expect(selectors.getOpenPopups({})).toBeInstanceOf(Array)
})