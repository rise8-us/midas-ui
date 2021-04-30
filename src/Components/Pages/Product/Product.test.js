import React from 'react'
import { render, screen, useDispatchMock, useModuleMock } from '../../../Utilities/test-utils'
import { Product } from './index'

describe('<Product>', () => {

    const selectProductByIdMock = useModuleMock('Redux/Products/selectors', 'selectProductById')
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
        expect(screen.getByTestId('ProductHeader__input-name').querySelector('input')).toHaveValue('Product 1')
        expect(screen.getByText('great vision')).toBeInTheDocument()
        expect(screen.getByText('Some tags')).toBeInTheDocument()
    })

})