import { fireEvent, renderWithRouter, screen, useModuleMock } from 'Utilities/test-utils'
import { Portfolio } from './index'

describe('<Portfolio />', () => {

    const selectPortfolioByIdMock = useModuleMock('Redux/Portfolios/selectors', 'selectPortfolioById')

    beforeEach(() => {
        selectPortfolioByIdMock.mockReturnValue({ name: 'foo' })
    })

    test('should render', () => {
        renderWithRouter(<Portfolio />)

        expect(screen.getByText('foo')).toBeInTheDocument()
        expect(screen.getByText('objectives')).toBeInTheDocument()
        expect(screen.getByText('requirements')).toBeInTheDocument()
    })

    test('should handle tab switch', () => {
        renderWithRouter(<Portfolio />)

        fireEvent.click(screen.getByText('requirements'))

        expect(screen.getByText('Capabilities here')).toBeInTheDocument()
    })
})