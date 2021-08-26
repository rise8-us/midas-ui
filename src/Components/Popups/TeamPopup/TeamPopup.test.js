import React from 'react'
import { fireEvent, render, screen, useDispatchMock, useModuleMock, userEvent } from 'Utilities/test-utils'
import { TeamPopup } from './index'

describe('<TeamPopup />', () => {
    jest.setTimeout(25000)

    const closePopupMock = useModuleMock('Redux/Popups/actions', 'closePopup')
    const submitCreateTeamMock = useModuleMock('Redux/Teams/actions', 'requestCreateTeam')
    const submitUpdateTeamMock = useModuleMock('Redux/Teams/actions', 'requestUpdateTeam')
    const selectTeamByIdMock = useModuleMock('Redux/Teams/selectors', 'selectTeamById')

    const returnedFoundTeam = {
        id: 4,
        name: 'My Team',
        description: 'Description',
        gitlabGroupId: 12345,
        userIds: [9]
    }

    const returnedNewTeam = {
        name: '',
        description: '',
        gitlabGroupId: '',
        userIds: []
    }

    beforeEach(() => {
        useDispatchMock().mockReturnValue({})
        selectTeamByIdMock.mockReturnValue(returnedNewTeam)
    })

    test('should render properly for createTeam', () => {
        render(<TeamPopup />)

        expect(screen.getByText('Create Team')).toBeInTheDocument()
    })

    test('should render properly for updateTeam', () => {
        selectTeamByIdMock.mockReturnValue(returnedFoundTeam)
        render(<TeamPopup id = {4}/>)

        expect(screen.getByText('Update Team')).toBeInTheDocument()
    })

    test('should display error messages', () => {
        const state = {
            errors: {
                'teams/createOne': [
                    'name error'
                ]
            }
        }
        render(<TeamPopup />, { initialState: state })

        expect(screen.getByText('name error')).toBeInTheDocument()
    })

    test('should call onSubmit to create Team', () => {
        render(<TeamPopup />)

        fireEvent.click(screen.getByText('Submit'))

        expect(submitCreateTeamMock).toHaveBeenCalledWith({
            name: '',
            description: '',
            gitlabGroupId: '',
            productManagerId: null,
            designerId: null,
            techLeadId: null,
            userIds: [],
            productIds: [],
        })
    })

    test('should call onSubmit to Update team', async() => {
        const allUsers = [
            {
                id: 10,
                username: 'jsmith',
                displayName: 'Jon Jacob Jingle Hiemer Smith'
            }
        ]
        selectTeamByIdMock.mockReturnValue(returnedFoundTeam)
        useDispatchMock().mockResolvedValue({ type: '/', payload: allUsers })

        render(<TeamPopup id = {4} />)

        const name = 'My Edited Team'

        const nameInput = screen.getByTestId('TeamPopup__input-name')
        userEvent.clear(nameInput)
        userEvent.type(nameInput, name)

        for (let i = 0; i < 3; i++) {
            userEvent.type(screen.getAllByPlaceholderText('username, display name, or email')[i], 'jsmith')
            fireEvent.click(await screen.findByText(/jsmith/))
        }

        userEvent.type(screen.getByPlaceholderText('Add another developer...'), 'jsmith')
        fireEvent.click(await screen.findByText(/jsmith/))

        fireEvent.click(screen.getByText('Submit'))

        expect(submitUpdateTeamMock).toHaveBeenCalledWith({
            ...returnedFoundTeam,
            productIds: [],
            name,
            productManagerId: 10,
            designerId: 10,
            techLeadId: 10,
            userIds: [9]
        })
    })

    test('should close popup', () => {
        render(<TeamPopup />)

        fireEvent.click(screen.getByTestId('Popup__button-close'))

        expect(closePopupMock).toHaveBeenCalled()
    })
})