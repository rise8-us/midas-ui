import React from 'react'
import { act, render, screen, useDispatchMock, useModuleMock, userEvent } from 'Utilities/test-utils'
import { AssignedUser } from './index'

describe('<AssignedUser />', () => {
    jest.setTimeout(15000)

    const selectUserByIdMock = useModuleMock('Redux/Users/selectors', 'selectUserById')

    const user = {
        id: 42,
        username: 'grogu gugu',
        displayName: 'baby yoda',
        email: 'yoda.2@mando.space'
    }

    beforeEach(() => {
        selectUserByIdMock.mockReturnValue(user)
    })

    test('should render avatar', async() => {
        selectUserByIdMock.mockReturnValue({})
        useDispatchMock().mockResolvedValue({ payload: [], type: '/' })

        render(<AssignedUser hasEdit = {false} onUserChange = {jest.fn}/>)

        expect(await screen.findAllByTestId('AssignedUser__avatar-icon')).toHaveLength(1)
    })

    test('should render initials w/ id & hasEdit == false', async() => {
        useDispatchMock().mockResolvedValue({ payload: [user], type: '/' })

        render(<AssignedUser hasEdit = {false} onUserChange = {jest.fn} id = {1} />)

        expect(await screen.findAllByTestId('AssignedUser__avatar-icon')).toHaveLength(1)
        expect(screen.getByText('gg')).toBeInTheDocument()
    })

    test('should render avatar on select and clear user on close', async() => {
        act(() => {
            useDispatchMock().mockResolvedValue({ payload: [user], type: '/' })
        })

        render(<AssignedUser hasEdit = {true} onUserChange = {jest.fn}/>)

        let input = screen.getByPlaceholderText('username, display name, or email')
        userEvent.hover(screen.getByTestId('AssignedUser_grid-item'))
        userEvent.click(input)
        userEvent.type(input, 'yoda')

        expect(await screen.findByText('grogu gugu (baby yoda)')).toBeInTheDocument()

        userEvent.click(screen.getByText('grogu gugu (baby yoda)'))
        userEvent.click(screen.getByTestId('CloseIcon'))
        userEvent.unhover(screen.getByTestId('AssignedUser_grid-item'))

        expect(input).toHaveValue('')
    })
})