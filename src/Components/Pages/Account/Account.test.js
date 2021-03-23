import React from 'react'
import { render, screen, useModuleMock } from '../../../Utilities/test-utils'
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

    const getRolesAsArrayMock = useModuleMock('Redux/AppSettings/selectors', 'getRolesAsArray')

    test('Renders Components', () => {
        getRolesAsArrayMock.mockReturnValue([
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