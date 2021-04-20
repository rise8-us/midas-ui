import React from 'react'
import { render, screen, useSelectorMock, waitFor } from '../../Utilities/test-utils'
import { PopupManager } from './index'

jest.mock('../Popups/CreateOrUpdateTeamPopup/CreateOrUpdateTeamPopup',
    () => function testing() { return (<div>PopupManagerTest</div>) })

describe('PopupManager', () => {

    beforeEach(async() => {
        useSelectorMock().mockReturnValue([])
    })

    test('initializes', async() => {
        render(<PopupManager />)

        await waitFor(() => expect(screen.queryByTestId('PopupManager__wrap-fallback')).not.toBeInTheDocument())
    })

    test('rendered component', async() => {

        useSelectorMock().mockReturnValue([{
            componentName: 'CreateOrUpdateTeamPopup',
            name: 'test/popup',
            open: true,
            props: { userId: 0 }
        }])

        render(<PopupManager />)

        expect(await screen.findByText('PopupManagerTest')).toBeInTheDocument()
    })

    test('checks props', async() => {
        useSelectorMock().mockReturnValueOnce([{
            componentName: 'CreateOrUpdateTeamPopup',
            name: 'test/popup',
            open: true,
            props: { userId: 0 }
        }])

        useSelectorMock().mockReturnValueOnce([{
            componentName: 'CreateOrUpdateTeamPopup',
            name: 'test/popupDiff',
            open: true,
            props: { userId: 0 }
        }])

        render(<PopupManager />)

        expect(await screen.findByText('PopupManagerTest')).toBeInTheDocument()
    })

    test('no dups same popup', async() => {
        useSelectorMock().mockReturnValueOnce([{
            componentName: 'CreateOrUpdateTeamPopup',
            name: 'test/popup',
            open: true,
            props: { userId: 0 }
        }])

        useSelectorMock().mockReturnValueOnce([{
            componentName: 'CreateOrUpdateTeamPopup',
            name: 'test/popup',
            open: true,
            props: { userId: 0 }
        }])

        render(<PopupManager />)

        expect(await screen.findAllByText('PopupManagerTest')).toHaveLength(1)
    })
})