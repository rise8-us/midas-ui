import { render, screen, useModuleMock } from 'Utilities/test-utils'
import { ProductCardSprintStats } from './index'

describe('<ProductCardSprintStats />', () => {
    const selectProductByIdMock = useModuleMock('Redux/Products/selectors', 'selectProductById')
    const selectPortfolioPagePermissionMock = useModuleMock('Redux/Issues/actions', 'selectPortfolioPagePermission')

    const JUN_9_2022 = 1654732800000

    beforeEach(() => {
        selectPortfolioPagePermissionMock.mockReturnValue({})
    })

    test('should render', () => {
        selectProductByIdMock.mockReturnValue({ name: 'product name', projectIds: [], projects: [] })

        render(<ProductCardSprintStats productId = {1} dateRange = {[JUN_9_2022, JUN_9_2022]}/>)

        expect(screen.getByText('product name')).toBeInTheDocument()
        expect(screen.getByText('No issues closed this sprint.')).toBeInTheDocument()
    })

})