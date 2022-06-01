import { render, screen, useDispatchMock, useModuleMock, userEvent } from 'Utilities/test-utils'
import { UserPopup } from './index'

describe('<UserTab />', () => {
    const user = {
        id: 42,
        username: 'grogu',
        displayName: 'baby yoda',
        email: 'yoda.2@mando.space',
        phone: null,
        roles: {
            ADMIN: false
        }
    }

    const selectUserByIdMock = useModuleMock('Redux/Users/selectors', 'selectUserById')
    const requestUpdateUserMock = useModuleMock('Redux/Users/actions', 'requestUpdateUser')
    const requestUpdateUserRolesMock = useModuleMock('Redux/Users/actions', 'requestUpdateUserRoles')

    test('should render', () => {
        selectUserByIdMock.mockReturnValue(user)
        useDispatchMock().mockResolvedValue({})

        render(<UserPopup id = {42}/>)
        userEvent.click(screen.getByText('submit'))

        expect(requestUpdateUserMock).toHaveBeenCalled()
        expect(requestUpdateUserRolesMock).toHaveBeenCalled()
    })

})