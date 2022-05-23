import * as selectors from './selectors'

const mockState = {
    filters: {
        appBar: {
            filterString: 'test'
        },
        targetFilters: {
            isPriority: true
        }
    }
}

test('should return object', () => {
    const searchFilter = selectors.selectAppBarFilter(mockState)
    expect(searchFilter).toEqual('test')
})

test('should return object', () => {
    const searchFilter = selectors.selectTargetFilters(mockState)
    expect(searchFilter).toEqual({ 'isPriority': true })
})
