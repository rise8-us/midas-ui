import React from 'react'
import ProductConstants from '../../../Redux/Products/constants'
import { fireEvent, render, screen, useDispatchMock, useModuleMock } from '../../../Utilities/test-utils'

import { ProductCard } from './index'

describe('<ProductCard />', () => {

    const product = {
        id: 0,
        name: 'product 1',
        description: 'desc 1',
        productJourneyMap: 1,
        tagIds: [1],
        tags: [
            { id: 1,
                label: 'Some tags',
                description: null,
                color: ''
            }
        ]
    }

    const getProductByIdMock = useModuleMock('Redux/Products/selectors', 'getProductById')
    const openPopupMock = useModuleMock('Redux/Popups/actions', 'openPopup')
    const journeyMapUpdateMock = useModuleMock('Redux/Products/actions', 'requestUpdateJourneyMapById')

    beforeEach(() => {
        useDispatchMock().mockReturnValue({})
        getProductByIdMock.mockReturnValue(product)
    })

    test('should display data', () => {
        render(<ProductCard id = {product.id}/>)

        expect(screen.getByText('product 1')).toBeInTheDocument()
    })

    test('should fire updateProductPopup', () => {
        render(<ProductCard id = {product.id}/>)

        fireEvent.click(screen.getByTestId('ProductCard__button-edit'))

        expect(openPopupMock).toHaveBeenCalledWith(
            ProductConstants.UPDATE_PRODUCT, 'UpdateProductPopup', { id: product.id })
    })

    test('should fire updateProgress forward', () => {
        render(<ProductCard id = {product.id}/>)

        fireEvent.click(screen.getByTestId('ProductCard__button-forward'))

        expect(journeyMapUpdateMock).toHaveBeenCalledTimes(1)
        expect(journeyMapUpdateMock.mock.calls[0][0]).toEqual({ id: 0, productJourneyMap: 3 })
    })

    test('should fire updateProgress backward', () => {
        render(<ProductCard id = {product.id}/>)

        fireEvent.click(screen.getByTestId('ProductCard__button-back'))

        expect(journeyMapUpdateMock).toHaveBeenCalledTimes(1)
        expect(journeyMapUpdateMock.mock.calls[0][0]).toEqual({ id: 0, productJourneyMap: 0 })
    })
})