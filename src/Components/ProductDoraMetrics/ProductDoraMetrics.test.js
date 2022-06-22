import { render, screen } from 'Utilities/test-utils'
import { ProductDoraMetrics } from './index'

describe('<ProductDoraMetrics />', () => {

    const sprintMetrics = {
        deliveredStories: 100,
        deliveredPoints: 200,
    }

    test('should render', () => {
        render(<ProductDoraMetrics sprintMetrics = {sprintMetrics}/>)

        expect(screen.getByText('Closed Issues:')).toBeInTheDocument()
        expect(screen.getByText('Points Delivered:')).toBeInTheDocument()
        expect(screen.getByText('Last Release:')).toBeInTheDocument()
        expect(screen.queryByTestId('ProductDoraMetrics__last-release')).not.toBeInTheDocument()

        expect(screen.getByText('100')).toBeInTheDocument()
        expect(screen.getByText('200')).toBeInTheDocument()
        expect(screen.getByText('N/A')).toBeInTheDocument()
    })

    test('should show released at', () => {
        render(<ProductDoraMetrics sprintMetrics = {sprintMetrics} releasedAt = '2022-06-14T17:59:17Z'/>)

        expect(screen.getByTestId('ProductDoraMetrics__last-release')).toBeInTheDocument()
    })
})