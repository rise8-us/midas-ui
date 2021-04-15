import React from 'react'
import {
    fireEvent, render, screen, useDispatchMock, useModuleMock, userEvent, within
} from '../../../Utilities/test-utils'
import { UpdateTeamPopup } from './index'

describe('<UpdateTeamPopup />', () => {

    const closePopupMock = useModuleMock('Redux/Popups/actions', 'closePopup')
    const submitTeamMock = useModuleMock('Redux/Teams/actions', 'requestUpdateTeam')
    const selectTeamByIdMock = useModuleMock('Redux/Teams/selectors', 'selectTeamById')

    const returnedTeam = {
        id: 4,
        isArchived: false,
        name: 'My New Team',
        gitlabGroupId: 1234567,
        description: 'Test Description'
    }


    beforeEach(() => {
        useDispatchMock().mockReturnValue({})
        selectTeamByIdMock.mockReturnValue(returnedTeam)
    })

    test('should render properly', () => {
        render(<UpdateTeamPopup id = {4}/>)

        expect(screen.getByText('Update Team')).toBeInTheDocument()
        expect(within(screen.getByTestId('UpdateTeamPopup__input-name'))
            .getByRole('textbox')).toHaveValue(returnedTeam.name)
        expect(within(screen.getByTestId('UpdateTeamPopup__input-description'))
            .getByRole('textbox')).toHaveValue(returnedTeam.description)
        expect(within(screen.getByTestId('UpdateTeamPopup__input-gitlabGroupId'))
            .getByRole('spinbutton')).toHaveValue(returnedTeam.gitlabGroupId)
    })

    test('should call onSubmit', () => {
        render(<UpdateTeamPopup id = {4} />)

        const name = 'My Edited Team'
        const gitlabGroupId = '15550'
        const description = 'New Description'

        const nameInput = within(screen.getByTestId('UpdateTeamPopup__input-name'))
            .getByRole('textbox')
        const descriptionInput = within(screen.getByTestId('UpdateTeamPopup__input-description'))
            .getByRole('textbox')
        const gitlabGroupIdInput = within(screen.getByTestId('UpdateTeamPopup__input-gitlabGroupId'))
            .getByRole('spinbutton')

        userEvent.clear(descriptionInput)
        userEvent.clear(gitlabGroupIdInput)
        userEvent.clear(nameInput)
        userEvent.type(descriptionInput, description)
        userEvent.type(gitlabGroupIdInput, gitlabGroupId)
        userEvent.type(nameInput, name)
        fireEvent.click(screen.getByText('Submit'))

        expect(submitTeamMock).toHaveBeenCalledTimes(1)
        expect(submitTeamMock.mock.calls[0][0]).toEqual({ ...returnedTeam, name, description, gitlabGroupId })
    })

    test('should close popup', () => {
        render(<UpdateTeamPopup id = {4}/>)

        fireEvent.click(screen.getByTestId('Popup__button-close'))

        expect(closePopupMock).toHaveBeenCalled()
    })

    test('should display error message', () => {
        const state = {
            errors: {
                'teams/updateOne': [
                    'name error'
                ]
            }
        }
        render(<UpdateTeamPopup id = {4}/>, { initialState: state })

        expect(screen.getByText('name error')).toBeInTheDocument()
    })
})