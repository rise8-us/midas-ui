import * as selectors from './selectors'

describe('PageAccess selectors', () => {

    const mockStore = {
        pageAccess: {
            capabilities: {
                edit: false
            }
        }
    }

    test('selectCapabilitiesPagePermission', () => {
        expect(selectors.selectCapabilitiesPagePermission(mockStore, 'edit')).toBeFalsy()
        expect(selectors.selectCapabilitiesPagePermission(mockStore, 'foo')).toBeUndefined()
    })
})