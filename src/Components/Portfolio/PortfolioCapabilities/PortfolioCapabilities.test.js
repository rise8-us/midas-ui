import { render, screen, useDispatchMock, useModuleMock, userEvent } from 'Utilities/test-utils'
import { PortfolioCapabilities } from './index'

describe('<PortfolioCapabilities />', () => {
    const selectPortfolioPagePermissionMock =
        useModuleMock('Redux/PageAccess/selectors', 'selectPortfolioPagePermission')
    const selectCapabilitiesByPortfolioIdMock =
        useModuleMock('Redux/Capabilities/selectors', 'selectCapabilitiesByPortfolioId')

    const foundCapabilities = [{
        title: 'title 1',
        description: 'description 1',
        id: 1,
        deliverableIds: [1]
    },
    {
        title: 'title 2',
        description: 'description 2',
        id: 2,
        deliverableIds: [2]
    }]

    const permissions = {
        edit: true
    }

    beforeEach(() => {
        selectCapabilitiesByPortfolioIdMock.mockReturnValue(foundCapabilities)
        selectPortfolioPagePermissionMock.mockReturnValue(permissions)
        useDispatchMock()
    })

    test('renders message when no capabilities on portfolio', () => {
        selectCapabilitiesByPortfolioIdMock.mockReturnValue([])

        render(<PortfolioCapabilities portfolioId = {1}/>)

        expect(screen.queryByTestId('PortfolioCapabilities__parent-grid')).not.toBeInTheDocument()
    })

    test('should render existing portfolio capability', () => {
        render(<PortfolioCapabilities portfolioId = {1}/>)

        expect(screen.getByDisplayValue('title 1')).toBeInTheDocument()
        expect(screen.getByDisplayValue('description 1')).toBeInTheDocument()
    })

    test('should click through different capabilities', () => {
        render(<PortfolioCapabilities portfolioId = {1}/>)

        expect(screen.getByText('Previous')).toHaveAttribute('disabled')

        userEvent.click(screen.getByTestId('PortfolioCapabilities__next-button'))

        expect(screen.getByDisplayValue('title 2')).toBeInTheDocument()
        expect(screen.getByDisplayValue('description 2')).toBeInTheDocument()

        expect(screen.getByText('Next')).toHaveAttribute('disabled')

        userEvent.click(screen.getByTestId('PortfolioCapabilities__previous-button'))

        expect(screen.getByDisplayValue('title 1')).toBeInTheDocument()
        expect(screen.getByDisplayValue('description 1')).toBeInTheDocument()
    })

})