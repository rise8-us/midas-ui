import reducer, * as actions from './reducer'


describe('PageAccess reducer', () => {
    const mockStore = {
        portfolios: {}
    }

    test('should handle initial state', () => {
        expect(reducer(undefined, {})).toEqual(mockStore)
    })

    test('should handle setPortfolioPagePermission where id !> 0', () => {
        const payload = { permissions: { edit: true }, id: undefined }

        const newStore = reducer(mockStore, { type: actions.setPortfolioPagePermission.type, payload: payload })

        expect(newStore.portfolios).toEqual({})
    })

    test('should handle setPortfolioPagePermission where id > 0', () => {
        const payload = { permissions: { edit: true }, id: 1 }

        const newStore = reducer(mockStore, { type: actions.setPortfolioPagePermission.type, payload: payload })

        expect(newStore.portfolios).toEqual({ 1: { edit: true } })
    })
})
