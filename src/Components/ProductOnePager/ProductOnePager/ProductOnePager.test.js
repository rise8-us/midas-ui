import React from 'react'
import { render, screen, useDispatchMock, useModuleMock } from 'Utilities/test-utils'
import { ProductOnePager } from './index'

describe('<ProductList>', () => {

    const selectProductByIdMock = useModuleMock('Redux/Products/selectors', 'selectProductById')

    const product = {
        id: 1,
        name: 'product 1',
        description: 'description',
        mission: 'mission',
        vision: 'vision',
        problemStatement: 'problem',
        tags: [
            {
                label: 'nope::not this',
                color: '#000000'
            },
            {
                label: 'Ownership::this tag',
                color: '#FFFFFF'
            },
        ]
    }

    test('should render', () => {
        selectProductByIdMock.mockReturnValue(product)
        useDispatchMock().mockReturnValue()

        render(<ProductOnePager id = {1} />)

        // Header
        expect(screen.getByDisplayValue('product 1')).toBeInTheDocument()
        expect(screen.getByText('description')).toBeInTheDocument()
        expect(screen.getByText(/Ownership \| this tag/i)).toBeInTheDocument()

        // Details
        expect(screen.getByDisplayValue('mission')).toBeInTheDocument()
        expect(screen.getByDisplayValue('vision')).toBeInTheDocument()
        expect(screen.getByDisplayValue('problem')).toBeInTheDocument()
    })

})