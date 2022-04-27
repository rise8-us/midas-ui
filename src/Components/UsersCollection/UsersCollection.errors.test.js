
import { render, screen, useDispatchMock, useModuleMock, userEvent } from 'Utilities/test-utils'
import { UsersCollection } from './index'

jest.mock('Components/Search/SearchUsers/SearchUsers', () => function testing(props) {
    return (
        <>
            <input
                title = 'searchUsersMock'
                onChange = {e => props.onChange(e, {})}
                placeholder = {props.placeholder}
            />
            <p>{props.error}</p>
        </>)
})

describe('<UsersCollection /> errors', () => {
    const setUserIdsMock = jest.fn()
    const selectUsersByIdsMock = useModuleMock('Redux/Users/selectors', 'selectUsersByIds')

    beforeEach(() => {
        useDispatchMock().mockReturnValue({})
        setUserIdsMock.mockClear()
    })

    test.only('should display error when team member not found ', () => {
        selectUsersByIdsMock.mockReturnValue([{
            id: 1,
            username: 'user1',
            displayName: 'bro1'
        }, {
            id: 2,
            username: 'user2',
            displayName: 'sis1'
        }])
        render(
            <UsersCollection
                userIds = {[1, 2]}
                setUserIds = {setUserIdsMock}
                placeholderValue = 'Add another team member...'
            />
        )

        userEvent.type(screen.getByPlaceholderText('Add another team member...'), 'Doesnt Exist{enter}')

        expect(screen.getByText('Please select a user from the list')).toBeInTheDocument()
    })

})