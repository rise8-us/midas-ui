import * as reduxActions from './actions'
import reducer from './reducer'

const mockStateOpen = {
    foobar: {
        open: true,
        props: {
            id: 1
        },
        name: 'foobar',
        componentName: 'FooBarPopup'
    }
}

const mockStateClose = {
    foobar: {
        open: false,
        name: 'foobar',
        componentName: '',
        props: { }
    }
}

test('should handle initial state', () => {
    expect(reducer(undefined, { type: 'blah' })).toEqual({})
})

test('should handle openPopup', () => {
    const payloadOpen = {
        open: true,
        name: 'foobar',
        componentName: 'FooBarPopup',
        props: {
            id: 1
        }
    }

    expect(
        reducer({}, { type: `${reduxActions.openPopup}`, payload: payloadOpen })
    ).toEqual(mockStateOpen)
})

test('should handle closePopup', () => {
    const payloadClose = {
        name: 'foobar',
        open: false,
        componentName: '',
        props: { }
    }
    expect(
        reducer(mockStateOpen, { type: `${reduxActions.closePopup}`, payload: payloadClose })
    ).toEqual(mockStateClose)
})

test('should handle fulfilled matcher - exists', () => {
    expect(
        reducer(mockStateOpen, { type: 'foobar/fulfilled', payload: {} })
    ).toEqual(mockStateClose)
})

test('should handle fulfilled matcher - undefined', () => {
    expect(
        reducer({}, { type: 'barfoo/fulfilled', payload: {} })
    ).toEqual({})
})