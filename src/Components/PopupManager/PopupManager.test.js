import React from 'react'
import { render, screen, useSelectorMock, waitFor } from '../../Utilities/test-utils'
import { PopupManager } from './index'

jest.mock('../Popups/CreateOrUpdateTeamPopup/CreateOrUpdateTeamPopup',
    () => function testing() { return (<div>PopupManagerTest</div>) })

const popup = {
    componentName: 'CreateOrUpdateTeamPopup',
    name: 'test/popup',
    open: true,
    props: { userId: 0 }
}

describe('PopupManager', () => {

    beforeEach(async() => {
        useSelectorMock().mockReturnValue([])
    })

    test('initializes', async() => {
        render(<PopupManager />)

        await waitFor(() => expect(screen.queryByTestId('PopupManager__wrap-fallback')).not.toBeInTheDocument())
    })

    test('rendered component', async() => {
        useSelectorMock().mockReturnValue([popup])

        render(<PopupManager />)

        expect(await screen.findByText('PopupManagerTest')).toBeInTheDocument()
    })

    test('checks props', async() => {
        useSelectorMock().mockReturnValueOnce([popup])
        useSelectorMock().mockReturnValueOnce([{
            ...popup,
            name: 'test/popupDiff',
        }])

        render(<PopupManager />)

        expect(await screen.findByText('PopupManagerTest')).toBeInTheDocument()
    })

})