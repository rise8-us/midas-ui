import React from 'react'
import { render, screen, useDispatchMock } from 'Utilities/test-utils'
import { SearchProducts } from './index'

describe('<SearchProducts>', () => {

    test('should render', () => {
        render(<SearchProducts />)

        expect(screen.getByPlaceholderText(/filter by product or project name/i)).toBeInTheDocument()
    })

    test('should dispatch search string', () => {
        useDispatchMock().mockReturnValue({})

        render(<SearchProducts />)
    })
})