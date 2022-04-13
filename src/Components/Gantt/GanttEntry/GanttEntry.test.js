import { render, screen, useModuleMock } from 'Utilities/test-utils'
import { GanttEntry } from './index'

describe('<GanttEntry />', () => {
    let date = new Date()

    const defaultProps = {
        startDate: 'foo',
        dueDate: 'bar',
        index: 1,
        dateRange: [date, date]
    }

    const parseStringToDateMock = useModuleMock('Utilities/dateHelpers', 'parseStringToDate')
    const calculatePositionMock = useModuleMock('Utilities/dateHelpers', 'calculatePosition')

    beforeEach(() => {
        parseStringToDateMock
            .mockReturnValueOnce(date)
            .mockReturnValueOnce(date)
        calculatePositionMock.mockReturnValue([25, 50])
    })

    test('should render', () => {
        render(
            <GanttEntry {...defaultProps}>
                hello world
            </GanttEntry>
        )

        expect(screen.getByText('hello world')).toBeInTheDocument()
    })

    test('should render disableDefaultCSS', () => {
        render(
            <GanttEntry {...defaultProps} disableDefaultCSS>
                hello world
            </GanttEntry>
        )

        expect(screen.getByText('hello world')).toBeInTheDocument()
        expect(screen.getByTestId('GanttEntry__wrap')).toHaveStyle('top: 0px')
    })
})
