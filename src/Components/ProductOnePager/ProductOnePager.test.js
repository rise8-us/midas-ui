import React from 'react'
import { render, screen, useDispatchMock, useModuleMock, userEvent } from 'Utilities/test-utils'
import { ProductOnePager } from './index'

describe('<ProductList>', () => {

    const selectProductByIdMock = useModuleMock('Redux/Products/selectors', 'selectProductById')
    const hasProductOrTeamAccessMock = useModuleMock('Redux/Auth/selectors', 'hasProductOrTeamAccess')
    const requestUpdateProductMock = useModuleMock('Redux/Products/actions', 'requestUpdateProduct')

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

    beforeEach(() => {
        selectProductByIdMock.mockReturnValue(product)
        hasProductOrTeamAccessMock.mockReturnValue(true)
        useDispatchMock().mockReturnValue()
    })

    test('should render', () => {
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

    test('should exclude header', () => {
        render(<ProductOnePager id = {1} excludeHeader/>)

        expect(screen.queryByText('description')).not.toBeInTheDocument()
    })

    test('should allow change if user has access', () => {
        render(<ProductOnePager id = {1} />)

        userEvent.type(screen.getByDisplayValue('mission'), 'New stuff')
        userEvent.tab()

        expect(requestUpdateProductMock).toHaveBeenCalled()
    })

})