import { render, screen, useModuleMock } from 'Utilities/test-utils'
import { Account } from './index'

describe('<Account />', () => {

    const mockState = {
        auth: {
            user: {
                id: 1,
                username: 'yoda',
                displayName: '',
                email: '',
                roles: 1
            }
        }
    }

    const selectRolesAsArrayMock = useModuleMock('Redux/AppSettings/selectors', 'selectRolesAsArray')

    test('Renders Components', () => {
        selectRolesAsArrayMock.mockReturnValue([
            {
                name: 'ROLE1',
                offset: 0
            }
        ])

        render(<Account />, { initialState: mockState })

        expect(screen.getByText('Account Information')).toBeInTheDocument()
        expect(screen.getByText('General Information')).toBeInTheDocument()
        expect(screen.getByText('Assigned Roles')).toBeInTheDocument()
    })

})