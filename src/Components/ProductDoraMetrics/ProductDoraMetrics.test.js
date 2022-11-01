import { render, screen } from 'Utilities/test-utils'
import { ProductDoraMetrics } from './index'

describe('<ProductDoraMetrics />', () => {

    const sprintMetrics = {
        deliveredStories: 100,
        deliveredPoints: 200,
        releaseFrequencyThreeSprints: .3,
        leadTimeForChangeInMinutes: 1550
    }

    const sprintMetricsNeedRoundingUp = {
        deliveredStories: 100,
        deliveredPoints: 200,
        releaseFrequencyThreeSprints: .071429,
        leadTimeForChangeInMinutes: 1420
    }

    test('should render', () => {
        render(<ProductDoraMetrics sprintMetrics = {sprintMetrics}/>)

        expect(screen.getByText('Average Velocity:')).toBeInTheDocument()
        expect(screen.getByText('Latest Release:')).toBeInTheDocument()
        expect(screen.getByText('Lead Time for Change:')).toBeInTheDocument()
        expect(screen.queryByTestId('ProductDoraMetrics__last-release')).not.toBeInTheDocument()

        expect(screen.getByText('N/A')).toBeInTheDocument()
        expect(screen.getByText('3 days 8 hours')).toBeInTheDocument()
        expect(screen.getByText('1 day 2 hours')).toBeInTheDocument()
    })

    test('should round hours to the nearest hour', () => {
        render(<ProductDoraMetrics sprintMetrics = {sprintMetricsNeedRoundingUp}/>)

        expect(screen.getByText('14 days')).toBeInTheDocument()
        expect(screen.getByText('1 day')).toBeInTheDocument()
    })

    test('should show released at', () => {
        render(<ProductDoraMetrics sprintMetrics = {sprintMetrics} releasedAt = '2022-06-14T17:59:17Z'/>)

        expect(screen.getByTestId('ProductDoraMetrics__last-release')).toBeInTheDocument()
    })
})
