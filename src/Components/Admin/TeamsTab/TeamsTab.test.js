import React from 'react'
import TeamsConstants from '../../../Redux/Teams/constants'
import { fireEvent, render, screen, useDispatchMock, useModuleMock, waitFor } from '../../../Utilities/test-utils'
import TeamsTab from './TeamsTab'

describe('<TeamsTab />', () => {
    const allTeams = [
        {
            id: 1,
            name: 'TEAM1',
            gitlabGroupId: 9,
            description: 'Test Team 1',
            isArchived: false
        },
        {
            id: 2,
            name: 'TEAM2',
            gitlabGroupId: 8,
            description: 'Test Team 2',
            isArchived: true
        }
    ]

    const selectAllTeamsMock = useModuleMock('Redux/Teams/selectors', 'selectAllTeams')
    const openPopupMock = useModuleMock('Redux/Popups/actions', 'openPopup')
    const requestArchiveTeamMock = useModuleMock('Redux/Teams/actions', 'requestArchiveTeam')

    beforeEach(() => {
        useDispatchMock().mockReturnValue({})
        selectAllTeamsMock.mockReturnValue(allTeams)
    })

    test('should render team table', () => {
        render(<TeamsTab />)

        screen.getByText('id')
        screen.getByText('teamname')
        screen.getByText('GitLab Group Id')

        screen.getByText('1')
        screen.getByText('TEAM1')
        screen.getByText('9')

        screen.getByText('2')
        screen.getByText('TEAM2')
        screen.getByText('8')
    })

    test('Add Team calls openPopup', () => {
        render(<TeamsTab />)

        fireEvent.click(screen.getByText('Add New Team'))

        expect(openPopupMock).toHaveBeenCalledWith(TeamsConstants.CREATE_TEAM, 'TeamPopup')
    })

    test('Clicking on unarchived Team row calls openPopup', () => {
        render(<TeamsTab />)

        fireEvent.click(screen.queryAllByTestId('Table__row')[0])

        expect(openPopupMock).toHaveBeenCalledWith(TeamsConstants.UPDATE_TEAM, 'TeamPopup', { id: 1 })
    })

    test('Clicking on archived Team row does not call openPopup', () => {
        render(<TeamsTab />)

        fireEvent.click(screen.queryAllByTestId('Table__row')[1])

        expect(openPopupMock).not.toHaveBeenCalled()
    })

    test('Should fire archive tag', () => {
        render(<TeamsTab />)

        fireEvent.click(screen.getByTitle('archive'))

        waitFor(() => expect(requestArchiveTeamMock).toHaveBeenCalledWith(allTeams[0].id, true))
    })

    test('Should fire unarchive tag', () => {
        render(<TeamsTab />)

        fireEvent.click(screen.getByTitle('unarchive'))

        waitFor(() => expect(requestArchiveTeamMock).toHaveBeenCalledWith(allTeams[1].id, false))
    })
})