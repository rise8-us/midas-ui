import { render, screen, useModuleMock } from 'Utilities/test-utils'
import { UserTooltip } from './index'

describe('<UserTooltip />', () => {
    const selectUsersByIdsMock = useModuleMock('Redux/Users/selectors', 'selectUsersByIds')

    test('should render with title and user display name', async() => {
        selectUsersByIdsMock.mockReturnValue([{ displayName: 'fiz', username: 'fiz@airforce.com' }])
        render(<UserTooltip userIds = {[1]} title = 'foo'/>)

        screen.getByText('foo')
        screen.getByText('fiz')
    })

    test('should render with username if no display name', async() => {
        selectUsersByIdsMock.mockReturnValue([{ username: 'fiz@airforce.com' }])
        render(<UserTooltip userIds = {[1]} title = 'foo'/>)

        screen.getByText('fiz@airforce.com')
    })

    test('should render with multiple users', async() => {
        selectUsersByIdsMock.mockReturnValue([{ username: 'fiz@airforce.com' }, { displayName: 'Mr President' }])
        render(<UserTooltip userIds = {[1]} title = 'foo'/>)

        screen.getByText('fiz@airforce.com')
        screen.getByText('Mr President')
    })

    test('should render empty list with title if no users', async() => {
        selectUsersByIdsMock.mockReturnValue([])
        render(<UserTooltip userIds = {[]} title = 'foo'/>)

        screen.getByText('foo')
        expect(screen.queryByTestId('User-Tooltip')).not.toBeInTheDocument()
    })
})
