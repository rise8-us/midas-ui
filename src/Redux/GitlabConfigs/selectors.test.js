import * as selectors from './selectors'


const mockState = {
    gitlabConfigs: {
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

test('selectGitlabConfigById - returns config object', () => {
    expect(selectors.selectGitlabConfigById(mockState, 4)).toEqual(mockState.gitlabConfigs[4])
})

test('selectGitlabConfigById - null id returns object with keys', () => {
    expect(selectors.selectGitlabConfigById(mockState, null)).toEqual({
        name: '',
        description: '',
        baseUrl: ''
    })
})

test('selectGitlabConfigs - returns config array', () => {
    const configs = selectors.selectGitlabConfigs(mockState)
    expect(configs).toBeInstanceOf(Array)
    expect(configs).toHaveLength(2)
    expect(configs[0]).toEqual(mockState.gitlabConfigs[4])
})

test('selectGitlabConfigs - returns empty array', () => {
    expect(selectors.selectGitlabConfigs({})).toBeInstanceOf(Array)
})
