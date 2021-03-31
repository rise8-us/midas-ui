import React from 'react'
import ProductConstants from '../../../Redux/Products/constants'
import { fireEvent, render, screen, useDispatchMock, useModuleMock } from '../../../Utilities/test-utils'
import { ProductCard } from './index'

describe('<ProductCard />', () => {
    const product = {
        id: 0,
        name: 'product 1',
        description: 'desc 1',
        tags: []
    }

    const openPopupMock = useModuleMock('Redux/Popups/actions', 'openPopup')

    beforeEach(() => {
        useDispatchMock().mockReturnValue({})
    })

    test('should display data', () => {
        render(<ProductCard product = {product}/>)

        expect(screen.getByText('product 1')).toBeInTheDocument()
    })

    test('should fire updateProductPopup', () => {
        render(<ProductCard product = {product}/>)

        fireEvent.click(screen.getByTestId('ProductCard__button-edit'))

        expect(openPopupMock).toHaveBeenCalledWith(
            ProductConstants.UPDATE_PRODUCT, 'UpdateProductPopup', { id: product.id })
    })
})