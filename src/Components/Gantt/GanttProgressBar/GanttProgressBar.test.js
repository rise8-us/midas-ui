import { render, screen } from 'Utilities/test-utils'
import { GanttProgressBar } from './index'

describe('<GanttProgressBar />', () => {

    test('should render', () => {
        render(<GanttProgressBar />)

        expect(screen.getByTestId('GanttProgressBar__default')).toBeInTheDocument()
        expect(screen.getByText('0%')).toBeInTheDocument()
    })

    test('should show correct progress', () => {
        render(<GanttProgressBar currentValue = {10} targetValue = {100}/>)

        expect(screen.getByTestId('GanttProgressBar__default')).toBeInTheDocument()
        expect(screen.getByText('10%')).toBeInTheDocument()
    })

})