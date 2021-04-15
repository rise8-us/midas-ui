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

test('selectPopup - returns popup object', () => {
    expect(selectors.selectPopup(mockState, 'popup/foo')).toBe(mockState.popups['popup/foo'])
})

test('selectPopup - returns empty object', () => {
    expect(selectors.selectPopup(mockState, 'popup/foobar')).toBeInstanceOf(Object)
})

test('selectOpenPopups - returns array of popups', () => {
    const openPopups = selectors.selectOpenPopups(mockState)

    expect(openPopups).toHaveLength(1)
    expect(openPopups[0]).toEqual(mockState.popups['popup/foo'])
})

test('selectOpenPopups - returns empty array', () => {

    expect(selectors.selectOpenPopups({})).toBeInstanceOf(Array)
})