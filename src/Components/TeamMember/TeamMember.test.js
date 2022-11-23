import { render, screen, useDispatchMock, useModuleMock } from 'Utilities/test-utils'
import { TeamMember } from './index'
import { fireEvent } from '@testing-library/dom'

describe('<TeamMember />', () => {
    const selectUserByIdMock = useModuleMock('Redux/Users/selectors', 'selectUserById')

    beforeEach(() => {
        useDispatchMock().mockReturnValue({})
    })

    test('should render with user information', () => {
        selectUserByIdMock.mockReturnValue({ id: 1, username: 'John Smith' })

        render(<TeamMember id = {1} title = 'title' />)

        screen.getByText('title')
        screen.getByText('JS')
        screen.getByText('John Smith')
    })

    test('should open user details popup when circle is clicked', () => {
        selectUserByIdMock.mockReturnValue({ id: 1, username: 'John Smith' })

        render(<TeamMember id = {1} title = 'title' />)

        expect(screen.queryByTestId('UserDetails__wrap')).not.toBeInTheDocument()
        fireEvent.click(screen.getByText('JS'))
        screen.getByTestId('UserDetails__wrap')
    })

    test('should render question mark and text when no user found', () => {
        selectUserByIdMock.mockReturnValue({})

        render(<TeamMember id = {null} title = 'title' noUserText = 'out to lunch'/>)

        screen.getByText('?')
        screen.getByText('out to lunch')
    })

})
