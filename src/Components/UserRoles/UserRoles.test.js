import React from 'react'
import { fireEvent, render, screen, useDispatchMock, useModuleMock, within } from '../../Utilities/test-utils'
import { UserRoles } from './index'

const getRolesAsArrayMock = useModuleMock('Redux/AppSettings/selectors', 'getRolesAsArray')
const requestUpdateUserRolesMock = useModuleMock('Redux/Users/actions', 'requestUpdateUserRoles')

const userWithRoles = {
    roles: { ADMIN: true }
}
const userWithoutRoles = {
    roles: { }
}

const allRolesAsArray = [
    { name: 'ADMIN' },
    { name: 'ROLE2' }
]

test('<UserRoles /> - Lists roles', () => {
    getRolesAsArrayMock.mockReturnValue(allRolesAsArray)

    render(<UserRoles user = {userWithRoles}/>)

    expect(screen.queryByText('Assigned Roles')).toBeInTheDocument()
    expect(screen.queryByText('ADMIN')).toBeInTheDocument()
    expect(screen.queryByText('ROLE2')).not.toBeInTheDocument()
})

test('<UserRoles /> - Does not list page', () => {
    getRolesAsArrayMock.mockReturnValue(allRolesAsArray)

    render(<UserRoles user = {userWithoutRoles}/>)

    expect(screen.queryByText('Assigned Roles')).not.toBeInTheDocument()
})

test('<UserRoles editable/> - Checkboxes visible', () => {
    getRolesAsArrayMock.mockReturnValue(allRolesAsArray)

    render(<UserRoles user = {userWithRoles} editable/>)

    expect(screen.queryAllByRole('checkbox')).toHaveLength(2)
})

test('<UserRoles editable/> - save button visible', () => {
    getRolesAsArrayMock.mockReturnValue(allRolesAsArray)

    render(<UserRoles user = {userWithRoles} editable/>)

    expect(screen.getByText('save')).toBeTruthy()
})

test('<UserRoles editable/> - save dispatches updateUserRoles', () => {
    getRolesAsArrayMock.mockReturnValue(allRolesAsArray)
    useDispatchMock().mockReturnValue({})

    render(<UserRoles user = {userWithRoles} editable/>)
    fireEvent.click(screen.getByText('save'))

    expect(requestUpdateUserRolesMock).toHaveBeenCalled()
})

test('<UserRoles editable/> - Checkboxes initial values set', () => {
    getRolesAsArrayMock.mockReturnValue(allRolesAsArray)

    render(<UserRoles user = {userWithRoles} editable/>)

    expect(within(screen.getByTestId('UserRoles__checkbox-ADMIN')).getByRole('checkbox').checked).toBeTruthy()
    expect(within(screen.getByTestId('UserRoles__checkbox-ROLE2')).getByRole('checkbox').checked).toBeFalsy()
})

test('<UserRoles editable/> - Checkboxes can be updated', () => {
    getRolesAsArrayMock.mockReturnValue(allRolesAsArray)

    render(<UserRoles user = {userWithRoles} editable/>)
    expect(within(screen.getByTestId('UserRoles__checkbox-ADMIN')).getByRole('checkbox').checked).toBeTruthy()
    fireEvent.click(screen.getByText('ADMIN'))

    expect(within(screen.getByTestId('UserRoles__checkbox-ADMIN')).getByRole('checkbox').checked).toBeFalsy()
})
