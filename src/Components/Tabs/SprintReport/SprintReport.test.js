import { act, render, screen, useDispatchMock, userEvent } from 'Utilities/test-utils'
import { SprintReport } from './index'

jest.mock('Components/ProductCardSprintStats/ProductCardSprintStats',
    () => function testing() { return (<div>Product Sprint Stats</div>) })
jest.mock('Components/PortfolioCardSprintStats/PortfolioCardSprintStats',
    () => function testing() { return (<div>Portfolio Sprint Summary</div>) })

describe('<SprintReport />', () => {

    const defaultProps = {
        portfolioId: 10,
        productIds: [1, 2],
        sprintDuration: 4,
        sprintStart: new Date(2020, 6, 15)
    }

    beforeEach(() => {
        useDispatchMock().mockResolvedValue({ type: '/', payload: {} })
    })

    test('should render', async() => {
        
        render(<SprintReport {...defaultProps}/>)
        await act(() => Promise.resolve())
        await screen.findByTestId('SprintReport__container-stack')

        expect(screen.getByTestId('ArrowBackIcon')).toBeInTheDocument()
        expect(screen.getByText('15 Jul 20')).toBeInTheDocument()
        expect(screen.getByText('18 Jul 20')).toBeInTheDocument()
        expect(screen.getByTestId('ArrowForwardIcon')).toBeInTheDocument()
        expect(screen.getAllByText('Product Sprint Stats')).toHaveLength(2)
    })

    test('should handle navigation changes', async() => {
        render(<SprintReport {...defaultProps}/>)
        await act(() => Promise.resolve())
        await screen.findByTestId('SprintReport__container-stack')

        userEvent.click(screen.getByTestId('ArrowBackIcon'))
        expect(await screen.findByText('11 Jul 20')).toBeInTheDocument()
        expect(screen.getByText('14 Jul 20')).toBeInTheDocument()

        userEvent.click(screen.getByTestId('ArrowForwardIcon'))
        expect(await screen.findByText('15 Jul 20')).toBeInTheDocument()
        expect(screen.getByText('18 Jul 20')).toBeInTheDocument()
    })

})