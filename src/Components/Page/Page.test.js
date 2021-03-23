import React from 'react'
import { render, screen, useModuleMock } from '../../Utilities/test-utils'
import { Page } from './index'

describe('<Page />', () => {
    const getUserLoggedInMock = useModuleMock('Redux/Auth/selectors', 'getUserLoggedIn')
    getUserLoggedInMock.mockReturnValue({})

    test('renders', () => {
        render(<Page><div>This is a test</div></Page>)

        expect(screen.getByText(/This is a test/i)).toBeInTheDocument()
    })
})
