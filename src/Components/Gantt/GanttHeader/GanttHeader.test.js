import { renderWithRouter, screen } from 'Utilities/test-utils'
import { GanttHeader } from './index'

describe('<GanttHeader />', () => {
    let dateStart = new Date()
    let dateEnd = new Date()
    dateStart.setMonth(dateStart.getMonth() - 3)
    dateEnd.setMonth(dateStart.getMonth() + 12)

    test('should render', () => {
        renderWithRouter(<GanttHeader dateRange = {[dateStart, dateEnd]} />)

        expect(screen.getByText('Jan')).toBeInTheDocument()
        expect(screen.getByText('Dec')).toBeInTheDocument()
    })
})
