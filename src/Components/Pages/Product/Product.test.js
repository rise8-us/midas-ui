import React from 'react'
import {
    fireEvent, render, screen, useDispatchMock, useModuleMock, userEvent
} from '../../../Utilities/test-utils'
import { Product } from './index'

describe('<Product>', () => {

    const selectProductByIdMock = useModuleMock('Redux/Products/selectors', 'selectProductById')
    const submitProductMock = useModuleMock('Redux/Products/actions', 'requestUpdateProduct')
    const queryParamsMock = useModuleMock('Utilities/queryParams', 'getUrlParam')

    const product = {
        id: 0,
        name: 'Product 1',
        visionStatement: 'great vision',
        problemStatement: 'great problem',
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
        useDispatchMock().mockReturnValue({})
        queryParamsMock.mockReturnValue(0)
        selectProductByIdMock.mockReturnValue(product)
    })

    test('Has correct text', () => {
        render(<Product />)
        expect(screen.getByTestId('Product__input-name').querySelector('input')).toHaveValue('Product 1')
        expect(screen.getByText('great vision')).toBeInTheDocument()
        expect(screen.getByText('Some tags')).toBeInTheDocument()
    })

    test('should have empty text', () => {
        selectProductByIdMock.mockReturnValue({
            name: '',
            visionStatement: '',
            problemStatement: '',
            tags: [],
            projects: []
        })
        render(<Product />)

        fireEvent.click(screen.getByTestId('SaveAlt__icon'))
        expect(screen.getByTestId('Product__input-name').querySelector('input')).toHaveValue('')
    })

    test('should call onSubmit for update product vision', () => {
        const { rerender } = render(<Product />)
        fireEvent.click(screen.getByTestId('SaveAlt__icon'))

        rerender(<Product />)

        const name = 'My Edited Product'
        const visionStatement = 'New visionStatement'

        const nameInput = screen.getByTestId('Product__input-name').querySelector('input')
        const visionStatementInput = screen.getByTestId('Product__input-vision').querySelector('textarea')
        userEvent.clear(nameInput)
        userEvent.clear(visionStatementInput)

        userEvent.type(visionStatementInput, visionStatement)
        userEvent.type(nameInput, name)

        fireEvent.click(screen.getByTestId('SaveOut__icon'))

        expect(submitProductMock).toHaveBeenCalledWith({
            ...product, name, visionStatement
        })
    })

    test('should display error messages', () => {
        const state = {
            errors: {
                'products/updateOne': [
                    'Tag error'
                ]
            }
        }
        render(<Product />, { initialState: state })
        expect(screen.getByText('Tag error')).toBeInTheDocument()
    })

})