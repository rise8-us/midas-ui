import { renderWithRouter, screen } from 'Utilities/test-utils'
import { GanttHeader } from './index'

describe('<Gantt Header />', () => {

    test('should render', () => {
        let dateStart = new Date()
        let dateEnd = new Date()
        dateStart.setMonth(dateStart.getMonth() - 3)
        dateEnd.setMonth(dateStart.getMonth() + 12)
        let dateRange = [dateStart, dateEnd]
        renderWithRouter(<GanttHeader dateRange = {dateRange} />)

        expect(screen.getByText('Jan')).toBeInTheDocument()
        expect(screen.getByText('Dec')).toBeInTheDocument()
    })
})
