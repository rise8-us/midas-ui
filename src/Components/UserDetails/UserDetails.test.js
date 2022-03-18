import { render, screen, useModuleMock } from 'Utilities/test-utils'
import { UserDetails } from './index'

describe('<UserDetails />', () => {
    const selectUserByIdMock = useModuleMock('Redux/Users/selectors', 'selectUserById')

    test('should render', () => {
        selectUserByIdMock.mockReturnValue({
            username: 'John Smith',
            displayName: 'yo diddy',
            phone: '555-555-5555',
            company: 'yip yiddy',
        })

        render(<UserDetails id = {1} role = 'title' />)

        expect(screen.getByText('title')).toBeInTheDocument()
        expect(screen.getByText('John Smith')).toBeInTheDocument()
        expect(screen.getByText('yo diddy')).toBeInTheDocument()
        expect(screen.getByText('555-555-5555')).toBeInTheDocument()
        expect(screen.getByText('yip yiddy')).toBeInTheDocument()
    })

    test('should only display one name', () => {
        selectUserByIdMock.mockReturnValue({
            username: 'John Smith',
            displayName: 'John Smith',
        })

        render(<UserDetails id = {1} role = 'title' />)

        expect(screen.getAllByText('John Smith')).toHaveLength(1)
    })

    test('should return null on no id', () => {

        render(<UserDetails id = {null} role = 'title' />)

        expect(screen.queryByTestId('UserDetails__wrap')).not.toBeInTheDocument()
    })

})