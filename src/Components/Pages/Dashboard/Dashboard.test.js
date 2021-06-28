import React from 'react'
import { render, screen, useModuleMock } from '../../../Utilities/test-utils'
import { Dashboard } from './index'

describe('<Dashboard>', () => {

    const selectAllActivePortfoliosNameAndIdsMock =
        useModuleMock('Redux/Portfolios/selectors', 'selectAllActivePortfoliosNameAndIds')

    beforeEach(() => {
        selectAllActivePortfoliosNameAndIdsMock.mockReturnValue([{ id: 1, name: 'test' }])
    })

    test('should render', () => {
        render(<Dashboard />)

        expect(screen.getByText('Portfolios')).toBeInTheDocument()
        expect(screen.getByText('ALL')).toBeInTheDocument()
        expect(screen.getByText('test')).toBeInTheDocument()
    })

})