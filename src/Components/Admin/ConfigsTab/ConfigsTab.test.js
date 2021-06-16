import React from 'react'
import GitlabConfigConstants from '../../../Redux/GitlabConfigs/constants'
import { fireEvent, render, screen, useDispatchMock, useModuleMock } from '../../../Utilities/test-utils'
import { ConfigsTab } from './index'

describe('<GitlabConfigsTab />', () => {

    const allGitlabConfigs = {
        name: 'Config Test',
        description: 'IL2',
        baseUrl: 'https://foo.bar'
    }

    const selectAllGitlabConfigsMock = useModuleMock('Redux/GitlabConfigs/selectors', 'selectGitlabConfigs')
    const openPopupMock = useModuleMock('Redux/Popups/actions', 'openPopup')

    beforeEach(() => {
        useDispatchMock().mockReturnValue({})
        selectAllGitlabConfigsMock.mockReturnValue([allGitlabConfigs])
    })

    test('Table display correctly', () => {
        render(<ConfigsTab  />)

        expect(screen.getByText('Name')).toBeInTheDocument()
        expect(screen.getByText('Description')).toBeInTheDocument()
        expect(screen.getByText('Base Url')).toBeInTheDocument()
    })

    test('Should fire updateConfigPopup', () => {
        render(<ConfigsTab />)

        fireEvent.click(screen.getByTitle('edit'))

        expect(openPopupMock).toHaveBeenCalledWith(
            GitlabConfigConstants.UPDATE_CONFIG, 'CreateOrUpdateGitlabConfigPopup', { id: allGitlabConfigs.id })
    })

    test('Add Config calls openPopup', () => {
        render(<ConfigsTab />)

        fireEvent.click(screen.getByText('Add New Config'))

        expect(openPopupMock).toHaveBeenCalledWith(
            GitlabConfigConstants.CREATE_CONFIG, 'CreateOrUpdateGitlabConfigPopup')
    })

})