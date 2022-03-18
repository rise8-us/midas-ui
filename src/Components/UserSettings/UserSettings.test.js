import { fireEvent, render, screen, useDispatchMock, useModuleMock, userEvent } from 'Utilities/test-utils'
import { UserSettings } from './index'

describe('<UserSettings />', () => {
    const selectUserByIdMock = useModuleMock('Redux/Users/selectors', 'selectUserById')
    const requestUpdateUserMock = useModuleMock('Redux/Users/actions', 'requestUpdateUser')

    const user = {
        id: 4,
        username: 'Jon Smith',
        displayName: 'me ditto',
        email: 'dsmith@aol.com',
        company: null,
        phone: '5558675309',
        roles: ['admin'],
        isAdmin: true
    }

    test('should render', () => {
        selectUserByIdMock.mockReturnValue(user)

        render(<UserSettings id = {4}/>)

        expect(screen.getByText('General Information')).toBeInTheDocument()
        expect(screen.getByText('save')).toBeInTheDocument()

        expect(screen.getByDisplayValue('Jon Smith')).toBeInTheDocument()
        expect(screen.getByDisplayValue('me ditto')).toBeInTheDocument()
        expect(screen.getByDisplayValue('dsmith@aol.com')).toBeInTheDocument()
        expect(screen.getByDisplayValue('5558675309')).toBeInTheDocument()
        expect(screen.getByLabelText('Company')).toBeInTheDocument()
    })


    test('should save changes', () => {
        useDispatchMock().mockReturnValue({})
        selectUserByIdMock.mockReturnValue(user)

        render(<UserSettings id = {4}/>)

        userEvent.type(screen.getByDisplayValue('me ditto'), '2')
        userEvent.type(screen.getByDisplayValue('dsmith@aol.com'), '2')
        userEvent.type(screen.getByDisplayValue('5558675309'), '2')
        userEvent.type(screen.getByLabelText('Company'), '2')

        fireEvent.click(screen.getByTestId('UserSettings__button-save'))

        expect(requestUpdateUserMock).toHaveBeenCalledWith({
            id: 4,
            username: user.username,
            displayName: user.displayName + '2',
            email: user.email + '2',
            phone: user.phone + '2',
            company: '2',
        })
    })
})