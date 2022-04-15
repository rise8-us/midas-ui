import { render, screen, userEvent } from 'Utilities/test-utils'
import { GanttActionBar } from './index'

describe('<GanttActionBar />', () => {
    const defaultProps = {
        backgroundColor: 'pink',
        borderColor: 'green',
        setDateRange: jest.fn(),
    }

    test('should render', () => {
        render(<GanttActionBar {...defaultProps}/>)

        expect(screen.getByTestId('GanttActionBar__wrapper')).toBeInTheDocument()
        expect(screen.getByTestId('GanttActionBar__wrapper')).toHaveStyle('borderColor: 1px solid green')
        expect(screen.getByTestId('GanttActionBar__wrapper')).toHaveStyle('backgroundColor: pink')
    })

    test('should handle non default button component types', () => {
        render(<GanttActionBar {...defaultProps} buttonComponent = {'div'} />)

        expect(screen.getByTestId('GanttActionBar__button-right-div')).toBeInTheDocument()
        expect(screen.getByTestId('GanttActionBar__button-left-div')).toBeInTheDocument()
    })

    test('should fire setDateRange callbacks', () => {
        const setDateRangeMock = jest.fn()
        render(<GanttActionBar {...defaultProps} setDateRange = {setDateRangeMock} />)

        userEvent.click(screen.getByTestId('GanttActionBar__button-right-button'))
        userEvent.click(screen.getByTestId('GanttActionBar__button-left-button'))

        expect(setDateRangeMock).nthCalledWith(1, 1)
        expect(setDateRangeMock).nthCalledWith(2, -1)
    })

    test('should render additionalActions', () => {
        render(<GanttActionBar {...defaultProps} additionalActions = {<div>Hello world</div>} />)

        expect(screen.getByText('Hello world')).toBeInTheDocument()
    })
})
