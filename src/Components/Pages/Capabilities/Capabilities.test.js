import React from 'react'
import { render, screen, useDispatchMock } from 'Utilities/test-utils'
import { Capabilities } from './index'

jest.mock('Components/Cards/CapabilitiesSidebar/CapabilitiesSidebar',
    () => function testing() { return (<div>Sidebar</div>) })

describe('<CapabilitesPage />', () => {

    test('should render', () => {
        useDispatchMock().mockResolvedValue({ payload: {} })

        render(<Capabilities />)

        expect(screen.getByText('Sidebar')).toBeInTheDocument()
    })

})