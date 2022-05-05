import { useModuleMock } from 'Utilities/test-utils'
import * as selectors from './selectors'

describe('Epic selectors', () => {

    const selectPortfolioByIdMock = useModuleMock('Redux/Portfolios/selectors', 'selectPortfolioById')
    const selectProductByIdMock = useModuleMock('Redux/Products/selectors', 'selectProductById')

    const mockState = {
        epics: {
            2: {
                id: 2,
                productId: 1,
                title: 'title',
                description: 'description',
                index: 0
            },
            3: {
                id: 3,
                productId: 1
            },
            4: {
                id: 4,
                productId: 6
            },
            5: {
                id: 5,
                productId: 1
            },
            6: {
                id: 6,
                portfolioId: 42
            }
        },
    }

    test('selectEpicById - returns default epic object', () => {
        const epics = selectors.selectEpicById({ epics: {} }, 1)

        expect(epics).toEqual({ title: '', description: '', name: undefined })
    })

    test('selectEpicById - Product - returns epic object', () => {
        selectProductByIdMock.mockReturnValue({ id: 1, name: 'product' })
        selectPortfolioByIdMock.mockReturnValue({})

        const epic = selectors.selectEpicById(mockState, 2)

        expect(epic).toEqual({
            ...mockState.epics[2],
            name: 'product'
        })
    })

    test('selectEpicById - Portfolio - returns epic object', () => {
        selectProductByIdMock.mockReturnValue({})
        selectPortfolioByIdMock.mockReturnValue({ id: 1, name: 'portfolio' })

        const epic = selectors.selectEpicById(mockState, 6)

        expect(epic).toEqual({
            ...mockState.epics[6],
            name: 'portfolio'
        })
    })

    test('selectEpicsByProductId - returns empty array', () => {
        const epics = selectors.selectEpicsByProductId({}, 1)

        expect(epics).toHaveLength(0)
    })

    test('selectEpicsByProductId - returns array of epics', () => {
        const epics = selectors.selectEpicsByProductId(mockState, 1)

        expect(epics).toHaveLength(3)
    })

    test('selectEpicsByIds', () => {
        selectProductByIdMock.mockReturnValue({ id: 1, name: 'product' })
        selectPortfolioByIdMock.mockReturnValue({})

        const epicsList = selectors.selectEpicsByIds(mockState, [2])

        expect(epicsList).toHaveLength(1)
        expect(epicsList[0]).toEqual({ ...mockState.epics[2], name: 'product' })
    })
})
