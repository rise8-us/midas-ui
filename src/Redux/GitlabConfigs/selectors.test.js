import * as selectors from './selectors'


const mockState = {
    gitlabConfigs: {
        4: {
            id: 4,
            name: 'New Config',
            description: 'IL2',
            baseUrl: 'http://foo.bar'
        },
        5: {
            id: 5,
            name: 'New Config2',
            description: 'IL4',
            baseUrl: 'http://foo.bar.baz'
        }
    }
}

test('selectGitlabConfigById - returns config object', () => {
    const returnedConfig = {
        ...mockState.gitlabConfigs[4]
    }
    const config = selectors.selectGitlabConfigById(mockState, 4)
    expect(config).toEqual({
        ...returnedConfig,
        description: 'IL2',
        baseUrl: 'http://foo.bar'
    })
})

test('selectGitlabConfigById - null id returns object with keys', () => {
    expect(selectors.selectGitlabConfigById(mockState, null)).toEqual({
        name: '',
        description: '',
        baseUrl: ''
    })
})

test('selectGitlabConfigs - returns config array', () => {

    const configOne = {
        id: 4,
        name: 'New Config',
        description: 'IL2',
        baseUrl: 'http://foo.bar'
    }
    const configs = selectors.selectGitlabConfigs(mockState)
    expect(configs[0]).toEqual(configOne)
})

test('selectGitlabConfigs - returns empty array', () => {
    expect(selectors.selectGitlabConfigs({})).toBeInstanceOf(Array)
})
