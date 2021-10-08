import React from 'react'
import { fireEvent, render, screen, useModuleMock } from 'Utilities/test-utils'
import { CapabilitiesSidebar } from './index'

describe('<CapabilitiesSidebar />', () => {

    const selectUserLoggedInMock = useModuleMock('Redux/Auth/selectors', 'selectUserLoggedIn')

    const user = { id: 1, roles: { PORTFOLIO_LEAD: true } }

    test('should render', () => {
        render(<CapabilitiesSidebar />)

        expect(screen.getByText('Mission Thread')).toBeInTheDocument()
        expect(screen.getByText('Integrated Air and Missile Defense')).toBeInTheDocument()

        expect(screen.queryByTitle('locked')).not.toBeInTheDocument()
    })

    test('should render lock icon for permitted user', () => {
        selectUserLoggedInMock.mockReturnValue(user)

        render(<CapabilitiesSidebar />)

        expect(screen.getByTitle('locked')).toBeInTheDocument()
    })

    test('should toggle unlocked for permitted user', () => {
        selectUserLoggedInMock.mockReturnValue(user)

        render(<CapabilitiesSidebar />)

        fireEvent.click(screen.getByTitle('locked'))

        expect(screen.getByTitle('unlocked')).toBeInTheDocument()
    })

})