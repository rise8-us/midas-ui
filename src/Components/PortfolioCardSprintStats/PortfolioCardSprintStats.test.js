import { render, screen } from 'Utilities/test-utils'
import { PortfolioCardSprintStats } from './index'

describe('<PortfolioCardSprintStats />', () => {

    test('should render', () => {
        render(<PortfolioCardSprintStats />)

        expect(screen.getByText('Total Production Deployments:')).toBeInTheDocument()
        expect(screen.getByText('Total New Issues in Production:')).toBeInTheDocument()
        expect(screen.getByText('Total New Issues in Staging:')).toBeInTheDocument()
        expect(screen.getAllByText('-')).toHaveLength(3)
    })

})