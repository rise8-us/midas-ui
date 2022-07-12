import { render, screen, useModuleMock } from 'Utilities/test-utils'
import { GanttEntry } from './index'

describe('<GanttEntry />', () => {
    let date = new Date()

    const defaultProps = {
        startDate: 'foo',
        dueDate: 'bar',
        dateRange: [date, date],
    }

    const parseStringToDateMock = useModuleMock('Utilities/dateHelpers', 'parseStringToDate')
    const calculatePositionMock = useModuleMock('Utilities/dateHelpers', 'calculatePosition')

    test('should render', () => {
        parseStringToDateMock
            .mockReturnValueOnce(date)
            .mockReturnValueOnce(date)
        calculatePositionMock.mockReturnValue([25, 50])
        render(
            <GanttEntry {...defaultProps}>
                hello world
            </GanttEntry>
        )

        expect(screen.getByText('hello world')).toBeInTheDocument()
    })

    test('should render enableFullHeight', () => {
        parseStringToDateMock
            .mockReturnValueOnce(date)
            .mockReturnValueOnce(date)
        calculatePositionMock.mockReturnValue([25, 50])
        render(
            <GanttEntry {...defaultProps} enableFullHeight>
                hello world
            </GanttEntry>
        )

        expect(screen.getByText('hello world')).toBeInTheDocument()
        expect(screen.getByTestId('GanttEntry__wrap')).toHaveStyle('height: 100%')
    })

    test('should render with null start', () => {
        calculatePositionMock.mockReturnValue([25, 50])
        render(<GanttEntry
            startDate = {null}
            dueDate = '2022-02-06'
            dateRange = {[new Date(2022, 0, 1), new Date(2022, 5, 1)]}
        >
            hello world
        </GanttEntry>)
    })

    test('should render with overflow startDate', () => {
        parseStringToDateMock
            .mockReturnValueOnce(new Date(2000, 0, 1))
            .mockReturnValueOnce(new Date(2022, 3, 1))
        calculatePositionMock.mockReturnValue([-1, 50])
        render(<GanttEntry
            startDate = {'2021-11-30'}
            dueDate = '2022-02-06'
            dateRange = {[new Date(2022, 0, 1), new Date(2022, 5, 1)]}
        >
            hello world
        </GanttEntry>)
    })

    test('should render with overflow endDate', () => {
        parseStringToDateMock
            .mockReturnValueOnce(new Date(2021, 0, 1))
            .mockReturnValueOnce(new Date(2023, 3, 1))
        calculatePositionMock.mockReturnValue([0, 150])
        render(<GanttEntry
            startDate = {'2021-11-30'}
            dueDate = '2022-02-06'
            dateRange = {[new Date(2022, 0, 1), new Date(2022, 5, 1)]}
        >
            hello world
        </GanttEntry>)
    })
})
