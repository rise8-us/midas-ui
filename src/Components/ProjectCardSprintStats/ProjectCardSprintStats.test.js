import { render, screen, useDispatchMock, useModuleMock, userEvent } from 'Utilities/test-utils'
import { ProjectCardSprintStats } from './index'

describe('<ProductCardSprintStats />', () => {
    const selectProjectById = useModuleMock('Redux/Projects/selectors', 'selectProjectById')
    const requestSearchIssuesMock = useModuleMock('Redux/Issues/actions', 'requestSearchIssues')
    const requestSyncIssuesByProjectIdMock = useModuleMock('Redux/Issues/actions', 'requestSyncIssuesByProjectId')

    const JUN_9_2022 = 1654732800000

    beforeEach(() => {
        useDispatchMock().mockResolvedValue({ payload: [] })
        selectProjectById.mockReturnValue({ name: 'project name', projectIds: [1] })
    })

    test('should render', async() => {
        render(<ProjectCardSprintStats projectId = {1} dateRange = {[JUN_9_2022, JUN_9_2022]}/>)

        expect(await screen.findByText('project name')).toBeInTheDocument()
        expect(screen.getByText('Issues Deployed to Staging:')).toBeInTheDocument()
        expect(requestSearchIssuesMock)
            .toHaveBeenCalledWith('project.id:1 AND completedAt>=2022-06-09 AND completedAt<=2022-06-09')
    })

    test('should sync when sync button is pressed', async() => {
        render(<ProjectCardSprintStats projectId = {1} dateRange = {[JUN_9_2022, JUN_9_2022]} hasEdit/>)
        await screen.findByText('project name')
        userEvent.click(screen.getByTestId('SyncIcon'))

        expect(requestSyncIssuesByProjectIdMock).toHaveBeenCalledWith(1)

    })

    test('should show staging issues', async() => {
        useDispatchMock().mockResolvedValue({ payload: [{ title: 'stagingIssueTitle' }] })

        render(<ProjectCardSprintStats projectId = {1} dateRange = {[JUN_9_2022, JUN_9_2022]}/>)

        expect(await screen.findByText('stagingIssueTitle')).toBeInTheDocument()
    })

})