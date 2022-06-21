import {
    mockSearchUsersComponent,
    render,
    screen,
    useDispatchMock,
    useModuleMock,
    userEvent
} from 'Utilities/test-utils'
import { UsersCollection } from './index'

jest.mock('Components/Search/SearchUsers/SearchUsers', () => function testing(props) {
    return mockSearchUsersComponent(props)
})

describe('<UsersCollection />', () => {
    jest.setTimeout(15000)
    const selectUsersByIdsMock = useModuleMock('Redux/Users/selectors', 'selectUsersByIds')
    const requestSearchUsersMock = useModuleMock('Redux/Users/actions', 'requestSearchUsers')

    const userMock1 = {
        id: 1,
        username: 'user1',
        displayName: ''
    }

    const userMock2 = {
        id: 2,
        username: 'user2',
        displayName: 'sis1'
    }

    const setUserIdsMock = jest.fn()

    beforeEach(() => {
        useDispatchMock().mockReturnValue({})
        setUserIdsMock.mockClear()
    })

    test('should render with user info', () => {
        selectUsersByIdsMock.mockReturnValue([userMock1, userMock2])
        render(<UsersCollection userIds = {[1, 2]} setUserIds = {setUserIdsMock} />)

        expect(screen.getByText('user1')).toBeInTheDocument()
        expect(screen.getByText('sis1')).toBeInTheDocument()
    })

    test('should fetch users missing from store state', () => {
        selectUsersByIdsMock.mockReturnValue([userMock1, {}, {}])
        render(<UsersCollection userIds = {[1, 2, 3]} setUserIds = {setUserIdsMock} />)

        expect(requestSearchUsersMock).toHaveBeenCalledWith('id:2 OR id:3')
    })

    test('should add user to userids list', () => {
        selectUsersByIdsMock.mockReturnValue([userMock1, userMock2])
        render(<UsersCollection userIds = {[1, 2]} setUserIds = {setUserIdsMock} placeholderValue = 'Text' />)

        userEvent.type(screen.getByPlaceholderText('Text'), 'foobar')

        expect(setUserIdsMock).toHaveBeenCalledWith([1, 2, 24])
    })

    test('should remove user from userids list', () => {
        selectUsersByIdsMock.mockReturnValue([userMock1, userMock2])
        render(<UsersCollection userIds = {[1, 2]} setUserIds = {setUserIdsMock} />)

        userEvent.click(screen.getAllByTitle('remove user')[0])

        expect(setUserIdsMock).toHaveBeenCalledWith([2])
    })

})