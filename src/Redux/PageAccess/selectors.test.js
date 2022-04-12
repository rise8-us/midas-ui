import * as selectors from './selectors'

describe('PageAccess selectors', () => {

    const initialMockStore = {
        pageAccess: {
            portfolios: { }
        }
    }

    test('selectPortfolioPagePermission - key does not exist', () => {
        expect(selectors.selectPortfolioPagePermission(initialMockStore, 1)).toEqual({})
    })

    test('selectPortfolioPagePermission - entry exists', () => {
        const newMockStore = {
            pageAccess: {
                portfolios: {
                    1: {
                        edit: true
                    }
                }
            }
        }
        expect(selectors.selectPortfolioPagePermission(newMockStore, 1)).toEqual({ edit: true })
    })
})
