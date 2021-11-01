import React from 'react'
import SourceControlConstants from 'Redux/SourceControls/constants'
import { fireEvent, render, screen, useDispatchMock, useModuleMock } from 'Utilities/test-utils'
import { SourceControlTab } from './index'

describe('<SourceControlsTab />', () => {

    const allSourceControls = {
        name: 'SourceControl Test',
        description: 'IL2',
        baseUrl: 'https://foo.bar'
    }

    const selectAllSourceControlsMock = useModuleMock('Redux/SourceControls/selectors', 'selectSourceControls')
    const openPopupMock = useModuleMock('Redux/Popups/actions', 'openPopup')

    beforeEach(() => {
        useDispatchMock().mockReturnValue({})
        selectAllSourceControlsMock.mockReturnValue([allSourceControls])
    })

    test('Table display correctly', () => {
        render(<SourceControlTab  />)

        expect(screen.getByText('Name')).toBeInTheDocument()
        expect(screen.getByText('Description')).toBeInTheDocument()
        expect(screen.getByText('Base Url')).toBeInTheDocument()
    })

    test('Should fire updateSourceControlPopup', () => {
        render(<SourceControlTab />)

        fireEvent.click(screen.getByTitle('edit'))

        expect(openPopupMock).toHaveBeenCalledWith(
            SourceControlConstants.UPDATE_CONFIG,
            'SourceControlPopup', { id: allSourceControls.id })
    })

    test('Add SourceControl calls openPopup', () => {
        render(<SourceControlTab />)

        fireEvent.click(screen.getByText('Add New Source Control'))

        expect(openPopupMock).toHaveBeenCalledWith(
            SourceControlConstants.CREATE_CONFIG, 'SourceControlPopup')
    })

})