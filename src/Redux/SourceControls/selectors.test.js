import * as selectors from './selectors'


const mockState = {
    sourceControls: {
        4: {
            id: 4,
            name: 'New Config',
            description: 'IL2'
        },
        5: {
            id: 5,
            name: 'New Config2',
            description: 'IL4'
        }
    }
}

test('selectSourceControlById - returns config object', () => {
    expect(selectors.selectSourceControlById(mockState, 4)).toEqual(mockState.sourceControls[4])
})

test('selectSourceControlById - null id returns object with keys', () => {
    expect(selectors.selectSourceControlById(mockState, null)).toEqual({
        name: '',
        description: '',
        baseUrl: ''
    })
})

test('selectSourceControls - returns config array', () => {
    const configs = selectors.selectSourceControls(mockState)
    expect(configs).toBeInstanceOf(Array)
    expect(configs).toHaveLength(2)
    expect(configs[0]).toEqual(mockState.sourceControls[4])
})

test('selectSourceControls - returns empty array', () => {
    expect(selectors.selectSourceControls({})).toBeInstanceOf(Array)
})
