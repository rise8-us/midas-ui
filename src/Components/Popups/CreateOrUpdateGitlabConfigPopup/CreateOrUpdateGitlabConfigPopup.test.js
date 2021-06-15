import React from 'react'
import {
    fireEvent, render, screen, useDispatchMock, useModuleMock, userEvent
} from '../../../Utilities/test-utils'
import { CreateOrUpdateGitlabConfigPopup } from './index'

describe('<CreateOrUpdateGitlabConfigPopup />', () => {

    const closePopupMock = useModuleMock('Redux/Popups/actions', 'closePopup')
    const submitCreateGitlabConfigMock = useModuleMock('Redux/GitlabConfigs/actions', 'requestCreateGitlabConfig')
    const submitUpdateGitlabConfigMock = useModuleMock('Redux/GitlabConfigs/actions', 'requestUpdateGitlabConfig')
    const selectGitlabConfigByIdMock = useModuleMock('Redux/GitlabConfigs/selectors', 'selectGitlabConfigById')

    const returnedFoundGitlabConfig = {
        id: 4,
        name: 'Config Test',
        description: 'IL2',
        baseUrl: 'http://foo.bar'
    }

    const returnedNewGitlabConfig = {
        name: '',
        description: '',
        baseUrl: ''
    }

    beforeEach(() => {
        useDispatchMock().mockReturnValue({})
        selectGitlabConfigByIdMock.mockReturnValue(returnedNewGitlabConfig)
    })

    test('should render properly for createGitlabConfig', () => {
        render(<CreateOrUpdateGitlabConfigPopup />)

        expect(screen.getByText('Create Config')).toBeInTheDocument()
    })

    test('should render properly for updateGitlabConfig', () => {
        selectGitlabConfigByIdMock.mockReturnValue(returnedFoundGitlabConfig)
        render(<CreateOrUpdateGitlabConfigPopup id = {4}/>)

        expect(screen.getByText('Update Config')).toBeInTheDocument()
    })

    test('should display error messages', () => {
        const state = {
            errors: {
                'gitlabConfigs/createOne': [
                    'name error'
                ]
            }
        }
        render(<CreateOrUpdateGitlabConfigPopup />, { initialState: state })

        expect(screen.getByText('name error')).toBeInTheDocument()
    })

    test('should call onSubmit for createGitlabConfig', () => {
        render(<CreateOrUpdateGitlabConfigPopup />)

        fireEvent.click(screen.getByText('Submit'))

        expect(submitCreateGitlabConfigMock).toHaveBeenCalledWith({
            name: '', description: '', baseUrl: '' })
    })

    test('should call onSubmit to Update gitlabConfig', () => {
        selectGitlabConfigByIdMock.mockReturnValue(returnedFoundGitlabConfig)
        render(<CreateOrUpdateGitlabConfigPopup id = {4} />)

        const name = 'My Edited GitlabConfig'
        const baseUrl = 'http://foo.bar.baz'
        const description = 'New Description'

        const nameInput = screen.getByTestId('CreateOrUpdateGitlabConfigPopup__input-name')
        const descriptionInput = screen.getByTestId('CreateOrUpdateGitlabConfigPopup__input-description')
        const baseUrlInput = screen.getByTestId('CreateOrUpdateGitlabConfigPopup__input-baseUrl')

        userEvent.clear(descriptionInput)
        userEvent.clear(baseUrlInput)
        userEvent.clear(nameInput)

        userEvent.type(descriptionInput, description)
        userEvent.type(baseUrlInput, baseUrl)
        userEvent.type(nameInput, name)

        fireEvent.click(screen.getByText('Submit'))

        expect(submitUpdateGitlabConfigMock).toHaveBeenCalledWith({
            ...returnedFoundGitlabConfig, name, description, baseUrl })
    })

    test('should close popup', () => {
        render(<CreateOrUpdateGitlabConfigPopup />)

        fireEvent.click(screen.getByTestId('Popup__button-close'))

        expect(closePopupMock).toHaveBeenCalled()
    })
})