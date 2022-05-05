import { fireEvent, renderWithRouter, screen, useModuleMock } from 'Utilities/test-utils'
import { Portfolio } from './index'

jest.mock('Components/Portfolio/PortfolioCapabilities/PortfolioCapabilities',
    () => function testing() { return (<div>RequirementsTab</div>) })

jest.mock('Components/EntriesContainer/EntriesContainer',
    () => function testing() { return (<div>ObjectivesTab</div>) })

describe('<Portfolio />', () => {

    const selectPortfolioByIdMock = useModuleMock('Redux/Portfolios/selectors', 'selectPortfolioById')
    const selectPortfolioPagePermissionMock =
        useModuleMock('Redux/PageAccess/selectors', 'selectPortfolioPagePermission')

    beforeEach(() => {
        selectPortfolioByIdMock.mockReturnValue({ name: 'foo' })
        selectPortfolioPagePermissionMock.mockReturnValue({})
    })

    test('should render', () => {
        renderWithRouter(<Portfolio />)

        expect(screen.getByText('foo')).toBeInTheDocument()
        expect(screen.getByText('objectives')).toBeInTheDocument()
        expect(screen.getByText('requirements')).toBeInTheDocument()
    })

    test('should render blank', () => {
        selectPortfolioByIdMock.mockReturnValue({})

        renderWithRouter(<Portfolio />)

        expect(screen.getByTestId('Portfolio__name-loading')).toBeInTheDocument()
    })

    test('should render Gantt tab', () => {
        renderWithRouter(<Portfolio />)

        fireEvent.click(screen.getByText('objectives'))
        expect(screen.getByText('ObjectivesTab')).toBeInTheDocument()
    })

    test('should render capabilities tab', () => {
        renderWithRouter(<Portfolio />)

        fireEvent.click(screen.getByText('requirements'))
        expect(screen.getByText('RequirementsTab')).toBeInTheDocument()
    })

    test('should handle action icons with permissions', () => {
        selectPortfolioPagePermissionMock.mockReturnValue({ edit: true })

        renderWithRouter(<Portfolio />)

        fireEvent.click(screen.getByTestId('Portfolio__button-edit'))
        expect(screen.getByTitle('unlocked')).toBeInTheDocument()
    })

    test('should handle actions icons without permissions', () => {
        selectPortfolioPagePermissionMock.mockReturnValue({ edit: false })

        renderWithRouter(<Portfolio />)

        fireEvent.click(screen.getByTestId('Portfolio__button-edit'))
        expect(screen.getByTitle('locked')).toBeInTheDocument()
    })

})