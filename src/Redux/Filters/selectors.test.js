import * as selectors from './selectors'

const mockState = {
    filters: {
        appBar: {
            filterString: 'test'
        }
    }
}

test('should return object', () => {
    const searchFilter = selectors.selectAppBarFilter(mockState)
    expect(searchFilter).toEqual('test')
})
