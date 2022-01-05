import reducer, { setCapabilityPagePermission } from './reducer'

const mockStore = {
    capabilities: {
        edit: false
    }
}

test('should handle initial state', () => {
    expect(reducer(undefined, {})).toEqual({
        capabilities: {
            edit: false
        },
    })
})

test('should handle setCapabilityPagePermission', () => {
    const payload = { permission: 'edit', value: true }

    expect(
        reducer(mockStore, { type: setCapabilityPagePermission.type, payload: payload })
    ).toEqual({
        capabilities: {
            edit: true
        }
    })
})
