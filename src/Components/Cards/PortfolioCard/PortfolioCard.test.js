import { MemoryRouter } from 'react-router-dom'
import PortfolioConstants from 'Redux/Portfolios/constants'
import { fireEvent, render, screen, useDispatchMock, useModuleMock } from 'Utilities/test-utils'
import { PortfolioCard } from './index'

const mockHistoryPush = jest.fn()
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: mockHistoryPush,
    })
}))

describe('<PortfolioCard />', () => {

    const portfolio = {
        id: 1,
        name: 'portfolio world',
        products: [
            {
                id: 4,
                name: 'Midas',
                description: 'New description',
                projectIds: [2],
                isArchived: false,
                portfolioId: 2,
                tagIds: [4],
                tags: [
                    {   id: 4,
                        label: 'Some tags',
                        description: null,
                        color: ''
                    }
                ],
                projects: [{ id: 2, name: 'project 1', projectJourneyMap: 7 }]
            }
        ],
        tags: [
            {   id: 4,
                label: 'Some tags',
                description: null,
                color: ''
            }
        ],
    }
    const portfolio2 = {
        ...portfolio,
        products: [],
        tags: []
    }

    const selectPortfolioByIdMock = useModuleMock('Redux/Portfolios/selectors', 'selectPortfolioById')
    const hasProductAccessMock = useModuleMock('Redux/Auth/selectors', 'hasProductAccess')
    const openPopupMock = useModuleMock('Redux/Popups/actions', 'openPopup')

    beforeEach(() => {
        useDispatchMock().mockReturnValue({})
        selectPortfolioByIdMock.mockReturnValue(portfolio)
        hasProductAccessMock.mockReturnValue(true)
    })

    test('should display data with projects', () => {
        render(<PortfolioCard id = {portfolio.id}/>)

        expect(screen.getByText('Product Name')).toBeInTheDocument()
        expect(screen.getByText('Projects with CTF')).toBeInTheDocument()

        expect(screen.getByText('Midas')).toBeInTheDocument()
    })

    test('should display data without projects', () => {
        selectPortfolioByIdMock.mockReturnValue(portfolio2)
        render(<PortfolioCard id = {portfolio.id}/>)

        expect(screen.getByText('No products are currently assigned to this portfolio.')).toBeInTheDocument()
    })

    test('should call PortfolioPopup', () => {
        render(<PortfolioCard id = {portfolio.id}/>)

        fireEvent.click(screen.getByTestId('PortfolioCard__button-edit'))

        expect(openPopupMock).toHaveBeenCalledWith(
            PortfolioConstants.UPDATE_PORTFOLIO, 'PortfolioPopup', { id: portfolio.id })
    })

    test('should go to portfolios page', () => {
        render(<MemoryRouter><PortfolioCard id = {portfolio.id}/></MemoryRouter>)

        fireEvent.click(screen.getByText('Midas'))

        expect(mockHistoryPush).toHaveBeenCalledWith('/products/4/overview')
    })

    test('should not render edit icon', () => {
        hasProductAccessMock.mockReturnValue(false)

        render(<PortfolioCard id = {portfolio.id}/>)

        expect(screen.queryByTestId('PortfolioCard__button-edit')).not.toBeInTheDocument()
    })

})