import React from 'react'
import { render, screen, useModuleMock } from '../../../Utilities/test-utils'
import { Account } from './index'

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

const allRolesMock = [
    {
        name: 'ROLE1',
        offset: 0
    }
]

const getRolesAsArrayMock = useModuleMock('Redux/Info/selectors', 'getRolesAsArray')

test('<Account /> - Renders Components', () => {
    getRolesAsArrayMock.mockReturnValue(allRolesMock)

    render(<Account />, { initialState: mockState })

    expect(screen.getByText('Account Information')).toBeInTheDocument()
    expect(screen.getByText('General Information')).toBeInTheDocument()
    expect(screen.getByText('Assigned Roles')).toBeInTheDocument()
})
