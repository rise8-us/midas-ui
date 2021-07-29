import React from 'react'
import ProductConstants from '../../Redux/Products/constants'
import { fireEvent, render, screen, useDispatchMock, useModuleMock, userEvent } from '../../Utilities/test-utils'
import { ProductHeader } from './index'

describe('<ProductHeader>', () => {

    const selectProductByIdMock = useModuleMock('Redux/Products/selectors', 'selectProductById')
    const requestUpdateProductMock = useModuleMock('Redux/Products/actions', 'requestUpdateProduct')

    const product = {
        id: 0,
        name: 'Product 1',
        description: '',
        tagIds: [4],
        tags: [
            {   id: 4,
                label: 'Some tags',
                description: null,
                color: ''
            }
        ]
    }

    beforeEach(() => {
        selectProductByIdMock.mockReturnValue(product)
    })

    test('Has correct text', () => {
        render(<ProductHeader id = {0}/>)

        expect(screen.getByDisplayValue('Product 1')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Description not set...'))
        expect(screen.getByText('Some tags')).toBeInTheDocument()
    })

    test('should call onSubmit for name change', () => {
        useDispatchMock().mockReturnValue({})
        render(<ProductHeader id = {0}/>)

        userEvent.type(screen.getByTestId('ProductHeader__input-name'), '2{enter}')

        expect(requestUpdateProductMock).toHaveBeenCalledWith({
            ...product, name: 'Product 12', childIds: []
        })
    })

    test('should call onSubmit for description change', () => {
        useDispatchMock().mockReturnValue({})
        render(<ProductHeader id = {0}/>)

        const description = 'is no longer empty'
        userEvent.type(screen.getByTestId('ProductHeader__input-description'), `${description}{enter}`)

        expect(requestUpdateProductMock).toHaveBeenCalledWith({
            ...product, description, childIds: []
        })
    })

    test('should call updateProduct popup', () => {
        useDispatchMock().mockReturnValue({})
        const openPopupMock = useModuleMock('Redux/Popups/actions', 'openPopup')

        render(<ProductHeader id = {0}/>)

        fireEvent.click(screen.getByTestId('ProductHeader__icon-action'))

        expect(openPopupMock).toHaveBeenCalledWith(
            ProductConstants.UPDATE_PRODUCT, 'CreateOrUpdateProductPopup', { id: product.id })
    })

    test('should display error messages', () => {
        const state = {
            errors: {
                'products/updateOne': [
                    'Name error'
                ]
            }
        }
        render(<ProductHeader id = {0}/>, { initialState: state })
        expect(screen.getByText('Name error')).toBeInTheDocument()
    })

})