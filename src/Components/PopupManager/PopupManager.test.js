import React from 'react'
import { render, screen, useSelectorMock, waitFor } from '../../Utilities/test-utils'
import { PopupManager } from './index'

beforeEach(async() => {
    useSelectorMock().mockReturnValue([])
})

test('<PopupManger /> - initializes', async() => {
    render(<PopupManager />)

    await waitFor(() => expect(screen.queryByTestId('PopupManager__wrap-fallback')).not.toBeInTheDocument())
})

test('<PopupManger /> - rendered component', async() => {
    useSelectorMock().mockReturnValue([{
        componentName: 'CreateTeamPopup',
        name: 'test/popup',
        open: true,
        props: {}
    }])

    render(<PopupManager />)

    await waitFor(() => screen.findByTestId('PopupManager__wrap-fallback'))
    expect(screen.getByText('Create New Team')).toBeInTheDocument()
})

test('<PopupManger /> - checks props', async() => {
    useSelectorMock().mockReturnValueOnce([{
        componentName: 'CreateTeamPopup',
        name: 'test/popup',
        open: true,
        props: {}
    }])

    useSelectorMock().mockReturnValueOnce([{
        componentName: 'CreateTeamPopup',
        name: 'test/popupDiff',
        open: true,
        props: {}
    }])

    render(<PopupManager />)

    await waitFor(() => screen.findByTestId('PopupManager__wrap-fallback'))
    expect(screen.getByText('Create New Team')).toBeInTheDocument()
})

test('<PopupManger /> - no dups same popup', async() => {
    useSelectorMock().mockReturnValueOnce([{
        componentName: 'CreateTeamPopup',
        name: 'test/popup',
        open: true,
        props: {}
    }])

    useSelectorMock().mockReturnValueOnce([{
        componentName: 'CreateTeamPopup',
        name: 'test/popup',
        open: true,
        props: {}
    }])

    render(<PopupManager />)

    await waitFor(() => screen.findByTestId('PopupManager__wrap-fallback'))
    expect(screen.getAllByText('Create New Team')).toHaveLength(1)
})