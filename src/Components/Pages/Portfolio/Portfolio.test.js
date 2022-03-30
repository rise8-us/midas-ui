import { renderWithRouter, screen, useModuleMock } from 'Utilities/test-utils'
import { Portfolio } from './index'

describe('<Portfolio />', () => {

    const selectPortfolioByIdMock = useModuleMock('Redux/Portfolios/selectors', 'selectPortfolioById')

    test('should render', () => {
        selectPortfolioByIdMock.mockReturnValue({ name: 'foo' })
        renderWithRouter(<Portfolio />)

        expect(screen.getByText('foo')).toBeInTheDocument()
        expect(screen.getByText('A fansy smancy gantt chart component')).toBeInTheDocument()
    })
})