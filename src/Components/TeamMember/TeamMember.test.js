import React from 'react'
import { render, screen, useDispatchMock, useModuleMock } from 'Utilities/test-utils'
import { TeamMember } from './index'

describe('<TeamMember />', () => {
    const selectUserByIdMock = useModuleMock('Redux/Users/selectors', 'selectUserById')

    beforeEach(() => {
        useDispatchMock().mockReturnValue({})
    })

    test('should render with user display name', () => {
        selectUserByIdMock.mockReturnValue({ id: 1, displayName: 'display', username: 'username' })

        render(<TeamMember id = {1} title = 'title' />)

        expect(screen.getByText('display')).toBeInTheDocument()
        expect(screen.getByText('title')).toBeInTheDocument()
    })

    test('should render with username', () => {
        selectUserByIdMock.mockReturnValue({ id: 1, username: 'username' })

        render(<TeamMember id = {1} />)

        expect(screen.getByText('username')).toBeInTheDocument()
    })

    test('should render no user found', () => {
        selectUserByIdMock.mockReturnValue({})

        render(<TeamMember id = {1} title = 'title' noUserText = 'out to lunch'/>)

        expect(screen.getByText('out to lunch')).toBeInTheDocument()
    })

})