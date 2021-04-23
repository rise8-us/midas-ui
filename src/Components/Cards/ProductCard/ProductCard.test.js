import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import ProductConstants from '../../../Redux/Products/constants'
import { fireEvent, render, screen, useDispatchMock, useModuleMock } from '../../../Utilities/test-utils'
import { ProductCard } from './index'

const mockHistoryPush = jest.fn()
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: mockHistoryPush,
    })
}))

describe('<ProductCard />', () => {
    const product = {
        id: 4,
        name: 'Midas',
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
        render(<ProductCard id = {product.id}/>)

        expect(screen.getByText('Midas')).toBeInTheDocument()
        expect(screen.getByText('Some tags')).toBeInTheDocument()
        expect(screen.getByText('project 1')).toBeInTheDocument()
    })

    test('should display data without projects', () => {
        selectProductByIdMock.mockReturnValue(product2)
        render(<ProductCard id = {product.id}/>)

        expect(screen.getByText('Midas')).toBeInTheDocument()
        expect(screen.getByText('Some tags')).toBeInTheDocument()
        expect(screen.queryByText('project 1')).not.toBeInTheDocument()
    })

    test('should call CreateOrUpdateProductPopup', () => {
        render(<ProductCard id = {product.id}/>)

        fireEvent.click(screen.getByTestId('ProductCard__button-edit'))

        expect(openPopupMock).toHaveBeenCalledWith(
            ProductConstants.UPDATE_PRODUCT, 'CreateOrUpdateProductPopup', { id: product.id })
    })

    test('should go to products page', () => {
        render(<MemoryRouter><ProductCard id = {product.id}/></MemoryRouter>)

        fireEvent.click(screen.getByText('Midas'))

        expect(mockHistoryPush).toHaveBeenCalledWith('/products/4')
    })

})