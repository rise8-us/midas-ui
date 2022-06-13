import { render, screen, useDispatchMock, useModuleMock } from 'Utilities/test-utils'
import { ProductCardSprintStats } from './index'

describe('<ProductCardSprintStats />', () => {
    const selectProductByIdMock = useModuleMock('Redux/Products/selectors', 'selectProductById')
    const requestSearchIssuesMock = useModuleMock('Redux/Issues/actions', 'requestSearchIssues')

    const JUN_9_2022 = 1654732800000
    const JUN_2_2022 = 1654128000000

    test('should render', () => {
        selectProductByIdMock.mockReturnValue({ name: 'product name', projectIds: [] })

        render(<ProductCardSprintStats productId = {1} dateRange = {[JUN_9_2022, JUN_9_2022]}/>)

        expect(screen.getByText('product name')).toBeInTheDocument()
        expect(screen.getByText('No issues closed this sprint :\'(')).toBeInTheDocument()
    })

    test('should fetch correct issues', async() => {
        useDispatchMock().mockResolvedValue({ type: '/', payload: [{ title: 'issue title' }] })
        selectProductByIdMock.mockReturnValue({ name: 'foo', projectIds: [2, 3] })

        render(<ProductCardSprintStats productId = {1} dateRange = {[JUN_2_2022, JUN_9_2022]}/>)

        expect(await screen.findByText('issue title')).toBeInTheDocument()
        expect(requestSearchIssuesMock).toHaveBeenCalledWith(
            '(project.id:2 OR project.id:3) AND completedAt>=2022-06-02 AND completedAt<=2022-06-09'
        )
    })
})