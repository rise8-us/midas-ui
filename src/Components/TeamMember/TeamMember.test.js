import React from 'react'
import { render, screen, useDispatchMock, useModuleMock } from 'Utilities/test-utils'
import { TeamMember } from './index'

describe('<TeamMember />', () => {
    const selectUserByIdMock = useModuleMock('Redux/Users/selectors', 'selectUserById')

    beforeEach(() => {
        useDispatchMock().mockReturnValue({})
    })

    test('should render', () => {
        selectUserByIdMock.mockReturnValue({ id: 1, username: 'John Smith' })

        render(<TeamMember id = {1} title = 'title' />)

        expect(screen.getByText('title')).toBeInTheDocument()
        expect(screen.getByText('JS')).toBeInTheDocument()
        expect(screen.getByText('John Smith')).toBeInTheDocument()
    })

    test('should render no user found', () => {
        selectUserByIdMock.mockReturnValue({})

        render(<TeamMember id = {null} title = 'title' noUserText = 'out to lunch'/>)

        expect(screen.getByText('out to lunch')).toBeInTheDocument()
    })

})