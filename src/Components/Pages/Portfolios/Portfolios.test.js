import PortfolioConstants from 'Redux/Portfolios/constants'
import { fireEvent, render, screen, useDispatchMock, useModuleMock } from 'Utilities/test-utils'
import { Portfolios } from './index'

jest.mock('Components/Cards/PortfolioCard/PortfolioCard', () =>
    (function testing() { return (<div>Portfolio Card mock</div>) }))

jest.mock('Hooks/useHistory')

describe('<Portfolios>', () => {

    const openPopupMock = useModuleMock('Redux/Popups/actions', 'openPopup')
    const isProductCreatorMock = useModuleMock('Redux/Auth/selectors', 'isProductCreator')
    const selectUnarchivedPortfoliosMock =
        useModuleMock('Redux/Portfolios/selectors', 'selectUnarchivedPortfolios')

    beforeEach(() => {
        useDispatchMock().mockReturnValue({})
        isProductCreatorMock.mockReturnValue(true)
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

    test('should call openPopup on FAB click', () => {
        render(<Portfolios />)

        fireEvent.click(screen.getByTitle(/add/i))

        expect(openPopupMock).toHaveBeenCalledWith(PortfolioConstants.CREATE_PORTFOLIO, 'PortfolioPopup')
    })

    test('should not render FAB', () => {
        isProductCreatorMock.mockReturnValue(false)

        render(<Portfolios />)

        expect(screen.queryByTitle(/add/i)).not.toBeInTheDocument()
    })
})