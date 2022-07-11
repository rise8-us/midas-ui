import { render, screen } from 'Utilities/test-utils'
import { PortfolioCardSprintStats } from './index'

jest.mock('Components/PortfolioStatsPieChart/PortfolioStatsPieChart', () => function testing() { return (<div/>) })

describe('<PortfolioCardSprintStats />', () => {

    test('should render', () => {
        render(<PortfolioCardSprintStats portfolioId = {1} dateRange = {[1, 2]} />)

        expect(screen.getByText('Total Production Deployments:')).toBeInTheDocument()
        expect(screen.getByText('Total New Issues in Production:')).toBeInTheDocument()
        expect(screen.getByText('Total New Issues in Staging:')).toBeInTheDocument()
        expect(screen.getAllByText('-')).toHaveLength(3)
    })

})