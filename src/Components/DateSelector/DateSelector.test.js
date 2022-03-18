import { fireEvent, render, screen } from 'Utilities/test-utils'
import { DateSelector } from './index'

const mockOnAccept = jest.fn()
const initialValue = '01-01-2020'

describe('<DateSelector />', () => {
    test('should render', () => {
        render(<DateSelector onAccept = {mockOnAccept}/>)

        expect(screen.getByPlaceholderText('mm/dd/yyyy')).toBeInTheDocument()
    })

    test('should save value', () => {
        render(<DateSelector initialValue = {initialValue} onAccept = {mockOnAccept} hasEdit/>)

        fireEvent.click(screen.getByDisplayValue('01/01/2020'))
        fireEvent.click(screen.getByLabelText('Next month'))
        fireEvent.click(screen.getByLabelText('Feb 1, 2020'))
        fireEvent.click(screen.getByText('OK'))

        expect(mockOnAccept).toHaveBeenCalledWith('2020-02-01')
    })

    test('should be clearable', () => {
        render(<DateSelector initialValue = {initialValue} onAccept = {mockOnAccept} clearable hasEdit/>)

        fireEvent.click(screen.getByDisplayValue('01/01/2020'))
        fireEvent.click(screen.getByText('Clear'))

        expect(mockOnAccept).toHaveBeenCalledWith(null)
    })
})