import React from 'react'
import { fireEvent, render, screen, useDispatchMock, useModuleMock, within } from '../../Utilities/test-utils'
import { UserRoles } from './index'

describe('<UserRoles />', () => {

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

    beforeEach(() => {
        getRolesAsArrayMock.mockReturnValue(allRolesAsArray)
        useDispatchMock().mockReturnValue({})
    })

    test('should lists roles', () => {
        render(<UserRoles user = {userWithRoles}/>)

        expect(screen.queryByText('Assigned Roles')).toBeInTheDocument()
        expect(screen.queryByText('ADMIN')).toBeInTheDocument()
        expect(screen.queryByText('ROLE2')).not.toBeInTheDocument()
    })

    test('should not list page', () => {
        render(<UserRoles user = {userWithoutRoles}/>)

        expect(screen.queryByText('Assigned Roles')).not.toBeInTheDocument()
    })

    test('should render checkboxes', () => {
        render(<UserRoles user = {userWithRoles} editable/>)

        expect(screen.queryAllByRole('checkbox')).toHaveLength(2)
    })

    test('should render save button', () => {
        render(<UserRoles user = {userWithRoles} editable/>)

        expect(screen.getByText('save')).toBeTruthy()
    })

    test('should save changes to roles', () => {
        render(<UserRoles user = {userWithRoles} editable/>)
        fireEvent.click(screen.getByText('save'))

        expect(requestUpdateUserRolesMock).toHaveBeenCalled()
    })

    test('should pre-set checkboxes', () => {
        render(<UserRoles user = {userWithRoles} editable/>)

        expect(within(screen.getByTestId('UserRoles__checkbox-ADMIN')).getByRole('checkbox').checked).toBeTruthy()
        expect(within(screen.getByTestId('UserRoles__checkbox-ROLE2')).getByRole('checkbox').checked).toBeFalsy()
    })

    test('should update checkboxes', () => {
        render(<UserRoles user = {userWithRoles} editable/>)
        expect(within(screen.getByTestId('UserRoles__checkbox-ADMIN')).getByRole('checkbox').checked).toBeTruthy()
        fireEvent.click(screen.getByText('ADMIN'))

        expect(within(screen.getByTestId('UserRoles__checkbox-ADMIN')).getByRole('checkbox').checked).toBeFalsy()
    })
})