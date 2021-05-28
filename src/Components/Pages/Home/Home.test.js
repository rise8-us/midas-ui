import React from 'react'
import ProductConstants from '../../../Redux/Products/constants'
import TagConstants from '../../../Redux/Tags/constants'
import { fireEvent, render, screen, useDispatchMock, useModuleMock } from '../../../Utilities/test-utils'
import { Home } from './index'

jest.mock('../../Cards/ProductCard/ProductCard', () =>
    function testing() { return (<div>Product Card mock</div>) })

describe('<Home>', () => {

    const openPopupMock = useModuleMock('Redux/Popups/actions', 'openPopup')
    const selectUnarchivedProductsMock =
        useModuleMock('Redux/Products/selectors', 'selectUnarchivedProducts')

    beforeEach(() => {
        useDispatchMock().mockReturnValue({})
        selectUnarchivedProductsMock.mockReturnValue([
            {
                id: 1,
                name: '1n',
                description: '1d',
                projects: []
            }, {
                id: 2,
                name: '2n',
                description: '2d',
                projects: [
                    {
                        name: 'p1',
                        description: 'p2'
                    }
                ]
            }
        ])
    })

    test('Has correct text', () => {
        render(<Home />, { initialState: { filters: { homePage: { filterString: '' } } } })

        expect(screen.getByText('Measuring Inception to Production')).toBeInTheDocument()
        expect(screen.getAllByText('Product Card mock')).toHaveLength(2)
    })

    test('filter by name', () => {
        render(<Home />, { initialState: { filters: { homePage: { filterString: '1n' } } } })

        expect(screen.getByText('Measuring Inception to Production')).toBeInTheDocument()
        expect(screen.getAllByText('Product Card mock')).toHaveLength(1)
    })

    test('filter by description', () => {
        render(<Home />, { initialState: { filters: { homePage: { filterString: '2d' } } } })

        expect(screen.getByText('Measuring Inception to Production')).toBeInTheDocument()
        expect(screen.getAllByText('Product Card mock')).toHaveLength(1)
    })

    test('filter by product name', () => {
        render(<Home />, { initialState: { filters: { homePage: { filterString: 'p1' } } } })

        expect(screen.getByText('Measuring Inception to Production')).toBeInTheDocument()
        expect(screen.getAllByText('Product Card mock')).toHaveLength(1)
    })

    test('filter by product description', () => {
        render(<Home />, { initialState: { filters: { homePage: { filterString: 'p2' } } } })

        expect(screen.getByText('Measuring Inception to Production')).toBeInTheDocument()
        expect(screen.getAllByText('Product Card mock')).toHaveLength(1)
    })

    test('Add Product calls openPopup', () => {
        render(<Home />)

        fireEvent.click(screen.getByText('Add New Product'))

        expect(openPopupMock).toHaveBeenCalledWith(ProductConstants.CREATE_PRODUCT, 'CreateOrUpdateProductPopup')
    })

    test('Add Tag calls openPopup', () => {
        render(<Home />)

        fireEvent.click(screen.getByText('Add New Tag'))

        expect(openPopupMock).toHaveBeenCalledWith(TagConstants.CREATE_TAG, 'CreateOrUpdateTagPopup')
    })
})