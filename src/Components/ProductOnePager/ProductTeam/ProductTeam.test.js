import TeamConstants from 'Redux/Teams/constants'
import { fireEvent, render, screen, useDispatchMock, useModuleMock } from 'Utilities/test-utils'
import { ProductTeam } from './index'

jest.mock('Components/TeamMember/TeamMember', () => function testing() { return (<div>TeamMemberMock</div>) })

describe('<ProductTeam />', () => {

    const selectTeamByIdMock = useModuleMock('Redux/Teams/selectors', 'selectTeamById')

    const openPopupMock = useModuleMock('Redux/Popups/actions', 'openPopup')

    const foundTeam = {
        id: 1,
        name: 'team',
        productManagerId: 2,
        designerId: 3,
        techLeadId: 4,
        userIds: [5],
    }

    test('should render', () => {
        selectTeamByIdMock.mockReturnValue(foundTeam)

        render(<ProductTeam productId = {1}/>)

        expect(screen.getByText('TEAM')).toBeInTheDocument()
        expect(screen.getAllByText('TeamMemberMock')).toHaveLength(5)
    })

    test('should render edit button', () => {
        useDispatchMock().mockReturnValue({})
        selectTeamByIdMock.mockReturnValue(foundTeam)

        render(<ProductTeam productId = {1} hasEdit/>)

        fireEvent.click(screen.getByTitle('edit team'))

        expect(openPopupMock).toHaveBeenCalledWith(TeamConstants.UPDATE_TEAM, 'TeamPopup', { id: 1, productIds: [1] })
    })

    test('should render add button', () => {
        useDispatchMock().mockReturnValue({})
        selectTeamByIdMock.mockReturnValue({ userIds: [] })

        render(<ProductTeam productId = {1} hasEdit/>)

        fireEvent.click(screen.getByTitle('add team'))

        expect(openPopupMock).toHaveBeenCalledWith(TeamConstants.CREATE_TEAM, 'TeamPopup', { productIds: [1] })
    })

})