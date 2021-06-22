import React from 'react'
import PortfolioConstants from '../../../Redux/Portfolios/constants'
import { fireEvent, render, screen, useDispatchMock, useModuleMock } from '../../../Utilities/test-utils'
import { Portfolios } from './index'

jest.mock('../../Cards/PortfolioCard/PortfolioCard', () =>
    function testing() { return (<div>Portfolio Card mock</div>) })

describe('<Portfolios>', () => {

    const openPopupMock = useModuleMock('Redux/Popups/actions', 'openPopup')
    const selectUnarchivedPortfoliosMock =
        useModuleMock('Redux/Portfolios/selectors', 'selectUnarchivedPortfolios')

    beforeEach(() => {
        useDispatchMock().mockReturnValue({})
        selectUnarchivedPortfoliosMock.mockReturnValue([
            {
                id: 1,
                name: '1n',
                description: '1d',
                projects: []
            }, {
                id: 2,
                name: '2n',
                description: '2d',
                projects: [
                    {
                        name: 'p1',
                        description: 'p2'
                    }
                ]
            }
        ])
    })

    test('should have correct text', () => {
        render(<Portfolios />)

        expect(screen.getAllByText('Portfolio Card mock')).toHaveLength(2)
    })

    test('Add Portfolio calls openPopup', () => {
        render(<Portfolios />)

        fireEvent.click(screen.getByTitle(/add/i))

        expect(openPopupMock).toHaveBeenCalledWith(PortfolioConstants.CREATE_PORTFOLIO, 'CreateOrUpdatePortfolioPopup')
    })
})