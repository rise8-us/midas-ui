import React from 'react'
import {
    act, fireEvent, render, screen, useDispatchMock, useModuleMock, userEvent
} from '../../Utilities/test-utils'
import { ProductHeader } from './index'

describe('<ProductHeader>', () => {

    const selectProductByIdMock = useModuleMock('Redux/Products/selectors', 'selectProductById')
    const submitProductMock = useModuleMock('Redux/Products/actions', 'requestUpdateProduct')

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
        selectProductByIdMock.mockReturnValue(product)
    })

    test('Has correct text', () => {
        render(<ProductHeader id = {0}/>)
        expect(screen.getByTestId('ProductHeader__input-name').querySelector('input')).toHaveValue('Product 1')
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
        render(<ProductHeader id = {0}/>)

        fireEvent.click(screen.getByTestId('ProductHeader__icon-action'))
        expect(screen.getByTestId('ProductHeader__input-name').querySelector('input')).toHaveValue('')
    })

    test('should call onSubmit for update product vision', () => {
        render(<ProductHeader id = {0}/>)

        act(() => {
            fireEvent.click(screen.getByTestId('ProductHeader__icon-action'))
        })

        const name = 'My Edited Product'
        const visionStatement = 'New visionStatement'

        const nameInput = screen.getByTestId('ProductHeader__input-name').querySelector('input')
        const visionStatementInput = screen.getByTestId('ProductHeader__input-description').querySelector('textarea')
        userEvent.clear(nameInput)
        userEvent.clear(visionStatementInput)

        userEvent.type(visionStatementInput, visionStatement)
        userEvent.type(nameInput, name)

        fireEvent.click(screen.getByTestId('ProductHeader__icon-action'))

        expect(submitProductMock).toHaveBeenCalledWith({
            ...product, name, visionStatement
        })
    })

    test('should revert changes', () => {
        render(<ProductHeader id = {0}/>)

        act(() => {
            fireEvent.click(screen.getByTestId('ProductHeader__icon-action'))
        })

        const nameInput = screen.getByTestId('ProductHeader__input-name').querySelector('input')
        const visionStatementInput = screen.getByTestId('ProductHeader__input-description').querySelector('textarea')
        userEvent.clear(nameInput)
        userEvent.clear(visionStatementInput)

        act(() => {
            fireEvent.click(screen.getByTestId('ProductHeader__icon-revert'))
        })
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