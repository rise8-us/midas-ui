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

        screen.getByText('Average Velocity:')
        screen.getByText('Latest Release:')
        screen.getByText('Lead Time for Change:')
        expect(screen.queryByTestId('ProductDoraMetrics__last-release')).not.toBeInTheDocument()

        screen.getByText('N/A')
        screen.getByText('3 days 8 hours')
        screen.getByText('1 day 2 hours')
    })

    test('should round hours to the nearest hour', () => {
        render(<ProductDoraMetrics sprintMetrics = {sprintMetricsNeedRoundingUp}/>)

        screen.getByText('14 days')
        screen.getByText('1 day')
    })

    test('should format latest release with leading capital letter', () => {
        const releasedAt = '2022-09-28T12:00:00Z'
        Date.now = jest.fn(() => new Date('2022-10-31').valueOf())

        render(<ProductDoraMetrics sprintMetrics = {sprintMetrics} releasedAt = {releasedAt}/>)

        expect(screen.getByTestId('ProductDoraMetrics__last-release')).toHaveTextContent('About 1 month ago')
    })

    test('should not show released at if showReleasedAt is false', () => {
        render(<ProductDoraMetrics sprintMetrics = {sprintMetrics} showReleasedAt = {false}/>)

        expect(screen.queryByTestId('ProductDoraMetrics__last-release')).not.toBeInTheDocument()
        expect(screen.queryByText('N/A')).not.toBeInTheDocument()
        expect(screen.queryByText('Latest Release:')).not.toBeInTheDocument()
    })
})
