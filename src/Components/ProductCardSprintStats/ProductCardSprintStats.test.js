import { render, screen, useDispatchMock, useModuleMock } from 'Utilities/test-utils'
import { ProductCardSprintStats } from './index'

jest.mock('Components/ProjectCardSprintStats/ProjectCardSprintStats',
    () => function testing() { return (<div>Project Sprint Stats</div>) })
jest.mock('Components/ProductDoraMetrics/ProductDoraMetrics',
    () => function testing(props) {
        return (<div>
            Product Dora Metrics
            <div data-testid = 'released-at'>
                {props.releasedAt}
            </div>
            <div data-testid = 'sprint-metrics'>
                {Object.values(props.sprintMetrics).map(item => <div key = {item}>{item}</div>)}
            </div>
        </div>)
    })

describe('<ProductCardSprintStats />', () => {
    const selectProductByIdMock = useModuleMock('Redux/Products/selectors', 'selectProductById')
    const selectPortfolioPagePermissionMock = useModuleMock('Redux/Issues/actions', 'selectPortfolioPagePermission')

    const JUN_9_2022 = 1654732800000
    const dateRange = [JUN_9_2022, JUN_9_2022]
    const productWithLatestRelease = {
        name: 'product name',
        projectIds: [1],
        latestRelease: { releasedAt: '2022-06-14T17:59:17' }
    }

    beforeEach(() => {
        useDispatchMock().mockReturnValue({})
        selectPortfolioPagePermissionMock.mockReturnValue({})
        selectProductByIdMock.mockReturnValue({ name: 'product name', projectIds: [1] })
    })

    test('should render', () => {
        render(<ProductCardSprintStats productId = {1} dateRange = {dateRange}/>)

        expect(screen.getByText('product name')).toBeInTheDocument()
        expect(screen.getByText('Project Sprint Stats')).toBeInTheDocument()
        expect(screen.getByText('Product Dora Metrics')).toBeInTheDocument()
    })

    test('should handle latest release stats', () => {
        selectProductByIdMock.mockReturnValue(productWithLatestRelease)
        const sprintMetrics = [{ deliverStories: 1000, deliveredPoints: 2000 }]

        render(<ProductCardSprintStats productId = {1} dateRange = {dateRange} sprintMetrics = {sprintMetrics} />)

        expect(screen.getByText('2022-06-14T17:59:17Z')).toBeInTheDocument()
        expect(screen.getByText('1000')).toBeInTheDocument()
        expect(screen.getByText('2000')).toBeInTheDocument()
    })
})