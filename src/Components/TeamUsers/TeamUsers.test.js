import React from 'react'
import {
    render, screen, useDispatchMock, useModuleMock, userEvent
} from '../../Utilities/test-utils'
import { TeamUsers } from './index'

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

    const addUsersList = [
        {
            id: 10,
            username: 'jsmith',
            displayName: 'Jon Jacob Jingle Hiemer Smith'
        }, {
            id: 11,
            username: 'foobar',
            dislayName: ''
        }
    ]

    const setUserIdsMock = jest.fn()

    beforeEach(() => {
        useDispatchMock().mockReturnValue({})
        setUserIdsMock.mockClear()
    })

    test('should render with user info', () => {
        selectUsersByIdsMock.mockReturnValue([userMock1, userMock2])
        render(<TeamUsers userIds = {[1, 2]} setUserIds = {setUserIdsMock} />)

        screen.getByText('Members')
        screen.getByText('user1')
        screen.getByText('bro1')
        screen.getByText('user2')
        screen.getByText('sis1')
    })

    test('should fetch users missing from store state', () => {
        selectUsersByIdsMock.mockReturnValue([userMock1, {}, {}])
        render(<TeamUsers userIds = {[1, 2, 3]} setUserIds = {setUserIdsMock} />)

        expect(requestFindUserByMock).toHaveBeenCalledWith('id:2 OR id:3')
    })

    test('should add user to userids list', async() => {
        useDispatchMock().mockResolvedValue({ payload: addUsersList })
        selectUsersByIdsMock.mockReturnValue([userMock1, userMock2])
        render(<TeamUsers userIds = {[1, 2]} setUserIds = {setUserIdsMock} />)

        userEvent.type(screen.getByTestId('AutocompleteSearch__input'), 'test')
        userEvent.click(await screen.findByText('foobar'))

        expect(setUserIdsMock).toHaveBeenCalledWith([1, 2, 11])
    })

    test('should remove user from userids list', () => {
        selectUsersByIdsMock.mockReturnValue([userMock1, userMock2])
        render(<TeamUsers userIds = {[1, 2]} setUserIds = {setUserIdsMock} />)

        userEvent.click(screen.getAllByTitle('remove user')[0])

        expect(setUserIdsMock).toHaveBeenCalledWith([2])
    })
})