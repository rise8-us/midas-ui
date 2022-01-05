import React from 'react'
import { fireEvent, render, screen, useDispatchMock, useModuleMock } from 'Utilities/test-utils'
import { CapabilitiesSidebar } from './index'

describe('<CapabilitiesSidebar />', () => {

    const selectUserLoggedInMock = useModuleMock('Redux/Auth/selectors', 'selectUserLoggedIn')
    const selectCapabilitiesPagePermissionMock =
        useModuleMock('Redux/PageAccess/selectors', 'selectCapabilitiesPagePermission')
    const setCapabilityPagePermissionMock = useModuleMock('Redux/PageAccess/reducer', 'setCapabilityPagePermission')

    beforeEach(() => {
        selectCapabilitiesPagePermissionMock.mockReturnValue(false)
        selectUserLoggedInMock.mockReturnValue({ id: 1, roles: { PORTFOLIO_LEAD: true } })
    })

    test('should render', () => {
        selectUserLoggedInMock.mockReturnValue({})

        render(<CapabilitiesSidebar />)

        expect(screen.getByText('Mission Thread')).toBeInTheDocument()
        expect(screen.getByText('Integrated Air and Missile Defense')).toBeInTheDocument()
        expect(screen.queryByTitle('locked')).not.toBeInTheDocument()
    })

    test('should render lock icon for permitted user', () => {
        render(<CapabilitiesSidebar />)

        expect(screen.getByTitle('locked')).toBeInTheDocument()
    })

    test('should toggle unlocked for permitted user', () => {
        useDispatchMock().mockReturnValue({})

        render(<CapabilitiesSidebar />)

        fireEvent.click(screen.getByTitle('locked'))

        expect(setCapabilityPagePermissionMock).toHaveBeenCalledWith({ permission: 'edit', value: true })
    })

    test('should show unlocked icon', () => {
        selectCapabilitiesPagePermissionMock.mockReturnValue(true)

        render(<CapabilitiesSidebar />)

        expect(screen.getByTitle('unlocked')).toBeInTheDocument()
    })

})