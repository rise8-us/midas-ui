import { render, screen, useModuleMock } from 'Utilities/test-utils'
import { ProductRoleMetrics } from './index'

describe('<ProductRoleMetrics />', () => {
    const selectTotalRoleCountByUserIdsMock = useModuleMock('Redux/Users/selectors', 'selectTotalRoleCountByUserIds')

    test('should render', () => {
        selectTotalRoleCountByUserIdsMock.mockReturnValue({ unassigned: [1, 2, 3], fooBar: [1, 2, 3, 4] })

        render(<ProductRoleMetrics ids = {[1, 2]} />)

        expect(screen.getByText('Non-team Viewers:')).toBeInTheDocument()
        expect(screen.getByText('2')).toBeInTheDocument()
        expect(screen.getByText('Unassigned')).toBeInTheDocument()
        expect(screen.getByText('3')).toBeInTheDocument()
        expect(screen.getByText('Foo Bar')).toBeInTheDocument()
        expect(screen.getByText('4')).toBeInTheDocument()
    })
})