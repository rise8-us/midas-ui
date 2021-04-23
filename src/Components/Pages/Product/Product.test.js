import React from 'react'
import { render, screen, useDispatchMock, useModuleMock } from '../../../Utilities/test-utils'
import { Product } from './index'

describe('<Product>', () => {

    const selectProductByIdMock = useModuleMock('Redux/Products/selectors', 'selectProductById')

    const product = {
        id: 0,
        name: 'Product 1',
        visionStatement: 'great vision',
        problemStatement: 'great problem',
    }

    beforeEach(() => {
        useDispatchMock().mockReturnValue({})
        selectProductByIdMock.mockReturnValue(product)
    })

    test('Has correct text', () => {
        render(<Product />)
        expect(screen.getByText('Hello Product 1')).toBeInTheDocument()
        expect(screen.getByText('Vision: great vision')).toBeInTheDocument()
        expect(screen.getByText('Problem Statement: great problem')).toBeInTheDocument()
    })

})