import React from 'react'
import {
    fireEvent, render, screen, useDispatchMock, useModuleMock, userEvent, within
} from '../../../Utilities/test-utils'
import { CreateOrUpdateTeamPopup } from './index'

describe('<CreateOrUpdateTeamPopup />', () => {

    const closePopupMock = useModuleMock('Redux/Popups/actions', 'closePopup')
    const submitTeamMock = useModuleMock('Redux/Teams/actions', 'requestCreateTeam')
    const submitTeamMockUpdate = useModuleMock('Redux/Teams/actions', 'requestUpdateTeam')

    const returnedTeam = {
        id: 4,
        name: 'My Team',
        description: 'Description',
        gitlabGroupId: 12345
    }

    test('should render properly', () => {
        render(<CreateOrUpdateTeamPopup />)

        expect(screen.getByText('Create Team')).toBeInTheDocument()
        expect(screen.getByTestId('CreateOrUpdateTeamPopup__input-name')).toBeInTheDocument()
        expect(screen.getByTestId('CreateOrUpdateTeamPopup__input-description')).toBeInTheDocument()
        expect(screen.getByTestId('CreateOrUpdateTeamPopup__input-gitlabGroupId')).toBeInTheDocument()
    })

    test('should execute onSubmit', () => {
        useDispatchMock().mockReturnValue({})
        render(<CreateOrUpdateTeamPopup />)

        const name = 'My New Team'
        const gitlabGroupId = '1234'
        const description = 'Test Description'

        const nameInput = within(screen.getByTestId('CreateOrUpdateTeamPopup__input-name'))
            .getByRole('textbox')
        const descriptionInput = within(screen.getByTestId('CreateOrUpdateTeamPopup__input-description'))
            .getByRole('textbox')
        const gitlabGroupIdInput = within(screen.getByTestId('CreateOrUpdateTeamPopup__input-gitlabGroupId'))
            .getByRole('spinbutton')


        userEvent.type(nameInput, name)
        userEvent.type(gitlabGroupIdInput, gitlabGroupId)
        userEvent.type(descriptionInput, description)
        fireEvent.click(screen.getByText('Submit'))

        expect(submitTeamMock).toHaveBeenCalledWith({
            name, description, gitlabGroupId, userIds: [] })
    })

    test('should close popup', () => {
        useDispatchMock().mockReturnValue({})
        render(<CreateOrUpdateTeamPopup />)

        fireEvent.click(screen.getByTestId('Popup__button-close'))

        expect(closePopupMock).toHaveBeenCalled()
    })

    test('should display error messages', () => {
        const state = {
            errors: {
                'teams/createOne': [
                    'name error'
                ]
            }
        }
        render(<CreateOrUpdateTeamPopup />, { initialState: state })

        expect(screen.getByText('name error')).toBeInTheDocument()

    })

    test('should call onSubmit to Update team', () => {
        const getTeamMock = useModuleMock('Redux/Teams/selectors', 'selectTeamById')
        useDispatchMock().mockReturnValue({})
        getTeamMock.mockReturnValue(returnedTeam)
        render(<CreateOrUpdateTeamPopup id = {4} />)

        const name = 'My Edited Team'
        const gitlabGroupId = '15550'
        const description = 'New Description'

        const nameInput = within(screen.getByTestId('CreateOrUpdateTeamPopup__input-name'))
            .getByRole('textbox')
        const descriptionInput = within(screen.getByTestId('CreateOrUpdateTeamPopup__input-description'))
            .getByRole('textbox')
        const gitlabGroupIdInput = within(screen.getByTestId('CreateOrUpdateTeamPopup__input-gitlabGroupId'))
            .getByRole('spinbutton')

        userEvent.clear(descriptionInput)
        userEvent.clear(gitlabGroupIdInput)
        userEvent.clear(nameInput)
        userEvent.type(descriptionInput, description)
        userEvent.type(gitlabGroupIdInput, gitlabGroupId)
        userEvent.type(nameInput, name)
        fireEvent.click(screen.getByText('Submit'))

        expect(submitTeamMockUpdate).toHaveBeenCalledWith({
            ...returnedTeam, name, description, gitlabGroupId, userIds: [] })
    })

})