import React from 'react'
import {
    mockSearchUsersComponent, render, screen, useDispatchMock, useModuleMock, userEvent
} from 'Utilities/test-utils'
import { TeamUsers } from './index'

jest.mock('Components/Search/SearchUsers/SearchUsers', () => function testing(props) {
    return mockSearchUsersComponent(props)
})

describe('<TeamUsers />', () => {
    jest.setTimeout(15000)
    const selectUsersByIdsMock = useModuleMock('Redux/Users/selectors', 'selectUsersByIds')
    const requestFindUserByMock = useModuleMock('Redux/Users/actions', 'requestFindUserBy')

    const userMock1 = {
        id: 1,
        username: 'user1',
        displayName: 'bro1'
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
        render(<TeamUsers userIds = {[1, 2]} setUserIds = {setUserIdsMock} />)

        expect(screen.getByText('user1')).toBeInTheDocument()
        expect(screen.getByText('bro1')).toBeInTheDocument()
        expect(screen.getByText('user2')).toBeInTheDocument()
        expect(screen.getByText('sis1')).toBeInTheDocument()
    })

    test('should fetch users missing from store state', () => {
        selectUsersByIdsMock.mockReturnValue([userMock1, {}, {}])
        render(<TeamUsers userIds = {[1, 2, 3]} setUserIds = {setUserIdsMock} />)

        expect(requestFindUserByMock).toHaveBeenCalledWith('id:2 OR id:3')
    })

    test('should add user to userids list', () => {
        selectUsersByIdsMock.mockReturnValue([userMock1, userMock2])
        render(<TeamUsers userIds = {[1, 2]} setUserIds = {setUserIdsMock} />)

        userEvent.type(screen.getByPlaceholderText('Add another team member...'), 'foobar')

        expect(setUserIdsMock).toHaveBeenCalledWith([1, 2, 24])
    })

    test('should remove user from userids list', () => {
        selectUsersByIdsMock.mockReturnValue([userMock1, userMock2])
        render(<TeamUsers userIds = {[1, 2]} setUserIds = {setUserIdsMock} />)

        userEvent.click(screen.getAllByTitle('remove user')[0])

        expect(setUserIdsMock).toHaveBeenCalledWith([2])
    })

})