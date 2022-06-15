import { render, screen, useModuleMock } from 'Utilities/test-utils'
import { ProductCardSprintStats } from './index'

jest.mock('Components/ProjectCardSprintStats/ProjectCardSprintStats',
    () => function testing() { return (<div>Project Sprint Stats</div>) })

describe('<ProductCardSprintStats />', () => {
    const selectProductByIdMock = useModuleMock('Redux/Products/selectors', 'selectProductById')
    const selectPortfolioPagePermissionMock = useModuleMock('Redux/Issues/actions', 'selectPortfolioPagePermission')

    const JUN_9_2022 = 1654732800000

    test('should render', () => {
        selectPortfolioPagePermissionMock.mockReturnValue({})
        selectProductByIdMock.mockReturnValue({ name: 'product name', projectIds: [1] })

        render(<ProductCardSprintStats productId = {1} dateRange = {[JUN_9_2022, JUN_9_2022]}/>)

        expect(screen.getByText('product name')).toBeInTheDocument()
        expect(screen.getByText('Project Sprint Stats')).toBeInTheDocument()
    })

})