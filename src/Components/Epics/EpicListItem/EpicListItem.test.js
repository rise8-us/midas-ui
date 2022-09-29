import {
    render,
    screen,
    userEvent
} from 'Utilities/test-utils'
import { EpicListItem } from './index'

describe('<EpicListItem />', () => {

    test('should render properly unchecked', async() => {
        render(<EpicListItem
            epic = {{ id: 1, title: 'epic' }}
            epicIds = {[]}
            handleOnSelect = {jest.fn}
            handleOnDeselect = {jest.fn}
        />)

        screen.getByTestId('EpicListItem__checkbox-unchecked')
        userEvent.click(screen.getByText('epic'))
    })

    test('should render properly checked', async() => {
        render(<EpicListItem
            epic = {{ id: 1, title: 'epic' }}
            epicIds = {[1]}
            handleOnSelect = {jest.fn}
            handleOnDeselect = {jest.fn}
        />)

        screen.getByTestId('EpicListItem__checkbox-checked')
        userEvent.click(screen.getByText('epic'))
    })

    test('should render with CLOSED text when closed', async() => {
        render(<EpicListItem
            epic = {{ id: 1, title: 'epic', state: 'closed' }}
            epicIds = {[]}
            handleOnSelect = {jest.fn}
            handleOnDeselect = {jest.fn}
        />)

        screen.getByText('CLOSED')
    })

    test('should render without CLOSED text when open', async() => {
        render(<EpicListItem
            epic = {{ id: 1, title: 'epic', state: 'opened' }}
            epicIds = {[]}
            handleOnSelect = {jest.fn}
            handleOnDeselect = {jest.fn}
        />)

        expect(screen.queryByText('CLOSED')).not.toBeInTheDocument()
    })
})
