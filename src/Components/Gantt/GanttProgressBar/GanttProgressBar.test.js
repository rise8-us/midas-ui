import { render, screen } from 'Utilities/test-utils'
import { GanttProgressBar } from './index'

describe('<GanttProgressBar />', () => {

    const currDate = new Date()
    const startDate = new Date(currDate.getFullYear(), currDate.getMonth(), 1).toDateString()
    const endDate = new Date(currDate.getFullYear(), currDate.getMonth() + 2, 1).toDateString()

    test('should render', () => {
        render(<GanttProgressBar startDate = {startDate} endDate = {endDate}/>)

        expect(screen.getByTestId('GanttProgressBar__default')).toBeInTheDocument()
        expect(screen.getByText('0%')).toBeInTheDocument()
    })

    test('should show red progress bar', () => {
        render(<GanttProgressBar currentValue = {10} targetValue = {100} startDate = {startDate} endDate = {endDate}/>)

        expect(screen.getByTestId('GanttProgressBar__default')).toBeInTheDocument()
        expect(screen.getByText('10%')).toBeInTheDocument()
    })
})