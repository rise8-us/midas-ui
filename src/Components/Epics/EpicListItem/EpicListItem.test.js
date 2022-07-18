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

        expect(screen.getByTestId('EpicListItem__checkbox-unchecked'))
        userEvent.click(screen.getByText('epic'))
    })

    test('should render properly checked', async() => {
        render(<EpicListItem
            epic = {{ id: 1, title: 'epic' }}
            epicIds = {[1]}
            handleOnSelect = {jest.fn}
            handleOnDeselect = {jest.fn}
        />)

        expect(screen.getByTestId('EpicListItem__checkbox-checked'))
        userEvent.click(screen.getByText('epic'))
    })

})