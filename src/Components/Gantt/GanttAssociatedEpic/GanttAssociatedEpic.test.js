import { render, screen, userEvent } from 'Utilities/test-utils'
import { GanttAssociatedEpic } from './index'

describe('<GanttAssociatedEpic />', () => {
    test('should render', () => {
        render(<GanttAssociatedEpic
            title = 'title'
            name = 'name'
            isClosed = {true}
        />)

        screen.getByText('name')
        screen.getByText('-')
        screen.getByText('title')
        screen.getByText('CLOSED')
    })

    test('should not display CLOSED for open epics', () => {
        render(<GanttAssociatedEpic title = 'title' name = 'name'/>)

        expect(screen.queryByText('CLOSED')).not.toBeInTheDocument()
    })

    test('should render with no name', () => {
        render(<GanttAssociatedEpic title = 'title'/>)

        expect(screen.queryByText('-')).not.toBeInTheDocument()
        expect(screen.queryByTestId('DeleteOutlinedIcon')).not.toBeInTheDocument()
    })

    test('should handle onDelete', () => {
        const onDeleteMock = jest.fn()

        render(<GanttAssociatedEpic
            title = 'title'
            onDelete = {onDeleteMock}
        />)

        userEvent.click(screen.getByTestId('DeleteOutlinedIcon'))

        expect(onDeleteMock).toHaveBeenCalled()
    })

})
