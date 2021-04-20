import React from 'react'
import ProductConstants from '../../../Redux/Products/constants'
import { fireEvent, render, screen, useDispatchMock, useModuleMock } from '../../../Utilities/test-utils'
import { AppCard } from './index'

describe('<AppCard />', () => {

    const product = {
        id: 4,
        name: 'Midas Product',
        description: 'New Product',
        projectIds: [2],
        isArchived: false,
        portfolioId: 2,
        tagIds: [4],
        tags: [
            {   id: 4,
                label: 'Some tags',
                description: null,
                color: ''
            }
        ],
        projects: [{ id: 2, name: 'project 1' }]
    }
    const product2 = {
        ...product,
        projects: []
    }

    const selectProductByIdMock = useModuleMock('Redux/Products/selectors', 'selectProductById')
    const openPopupMock = useModuleMock('Redux/Popups/actions', 'openPopup')

    beforeEach(() => {
        useDispatchMock().mockReturnValue({})
        selectProductByIdMock.mockReturnValue(product)
    })

    test('should display data with projects', () => {
        render(<AppCard id = {product.id}/>)

        expect(screen.getByText('Midas Product')).toBeInTheDocument()
        expect(screen.getByText('Some tags')).toBeInTheDocument()
        expect(screen.getByText('project 1')).toBeInTheDocument()
    })

    test('should display data without projects', () => {
        selectProductByIdMock.mockReturnValue(product2)
        render(<AppCard id = {product.id}/>)

        expect(screen.getByText('Midas Product')).toBeInTheDocument()
        expect(screen.getByText('Some tags')).toBeInTheDocument()
        expect(screen.queryByText('project 1')).not.toBeInTheDocument()
    })

    test('should fire updateProductPopup', () => {
        render(<AppCard id = {product.id}/>)

        fireEvent.click(screen.getByTestId('AppCard__button-edit'))

        expect(openPopupMock).toHaveBeenCalledWith(
            ProductConstants.UPDATE_PRODUCT, 'UpdateProductPopup', { id: product.id })
    })

})