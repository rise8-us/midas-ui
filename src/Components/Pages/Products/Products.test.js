import React from 'react'
import ProductConstants from '../../../Redux/Products/constants'
import { fireEvent, render, screen, useDispatchMock, useModuleMock } from '../../../Utilities/test-utils'
import { Products } from './index'

jest.mock('../../Cards/ProductCard/ProductCard', () =>
    function testing() { return (<div>Product Card mock</div>) })

describe('<Products>', () => {

    const openPopupMock = useModuleMock('Redux/Popups/actions', 'openPopup')
    const isProductCreatorMock = useModuleMock('Redux/Auth/selectors', 'isProductCreator')
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
        render(<Products />)

        expect(screen.getAllByText('Product Card mock')).toHaveLength(2)
    })

    test('should filter results', () => {
        const { rerender } = render(<Products />, { initialState: { filters: { appBar: { filterString: '1n' } } } })
        expect(screen.getAllByText('Product Card mock')).toHaveLength(1) // product name

        rerender(<Products />, { initialState: { filters: { appBar: { filterString: '2d' } } } })
        expect(screen.getAllByText('Product Card mock')).toHaveLength(1) // product description
    })

    test('Add Product calls openPopup', () => {
        isProductCreatorMock.mockReturnValue(true)
        render(<Products />)

        fireEvent.click(screen.getByTitle(/add/i))

        expect(openPopupMock).toHaveBeenCalledWith(ProductConstants.CREATE_PRODUCT, 'ProductPopup')
    })
})