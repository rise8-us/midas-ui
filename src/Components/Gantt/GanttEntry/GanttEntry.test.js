import { render, screen, useModuleMock } from 'Utilities/test-utils'
import { GanttEntry } from './index'

describe('<GanttEntry />', () => {
    let dateStart = new Date()
    let dateEnd = new Date()
    dateStart.setMonth(dateStart.getMonth() - 3)
    dateEnd.setMonth(dateStart.getMonth() + 12)

    const parseStringToDateMock = useModuleMock('Utilities/dateHelpers', 'parseStringToDate')

    test('should render', () => {
        parseStringToDateMock
            .mockReturnValueOnce(dateStart)
            .mockReturnValueOnce(dateEnd)

        render(
            <GanttEntry
                startDate = 'foo'
                dueDate = 'bar'
                index = {1}
                dateRange = {[dateStart, dateEnd]}
            >
                hello world
            </GanttEntry>
        )

        expect(screen.getByText('hello world')).toBeInTheDocument()
    })
})
