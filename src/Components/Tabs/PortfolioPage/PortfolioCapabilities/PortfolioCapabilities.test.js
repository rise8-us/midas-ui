import { act, render, screen, useDispatchMock, useModuleMock, userEvent } from 'Utilities/test-utils'
import { PortfolioCapabilities } from './index'

describe('<PortfolioCapabilities />', () => {
    const selectPortfolioPagePermissionMock =
        useModuleMock('Redux/PageAccess/selectors', 'selectPortfolioPagePermission')
    const selectCapabilitiesByPortfolioIdMock =
        useModuleMock('Redux/Capabilities/selectors', 'selectCapabilitiesByPortfolioId')

    const foundCapabilities = [
        {
            title: 'title 1',
            description: 'description 1',
            id: 1,
            deliverableIds: [1]
        }, {
            title: 'title 2',
            description: 'description 2',
            id: 2,
            deliverableIds: [2]
        }
    ]

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
        selectPortfolioPagePermissionMock.mockReturnValue({})

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

    test('should handle moreOptions menu - Link existing', async() => {
        const openPopupMock = useModuleMock('Redux/Popups/actions', 'openPopup')
        useDispatchMock().mockResolvedValue({})

        render(<PortfolioCapabilities portfolioId = {1}/>)

        userEvent.click(screen.getByTestId('MoreVertIcon'))
        expect(await screen.findByText('Link existing')).toBeInTheDocument()
        userEvent.click(screen.getByText('Link existing'))

        expect(openPopupMock).toHaveBeenCalledWith('LinkCapabilityPopup', 'LinkCapabilityPopup', { portfolioId: 1 })
    })

    test('should handle moreOptions menu - Add new', async() => {
        const requestCreateCapabilityMock = useModuleMock('Redux/Capabilities/actions', 'requestCreateCapability')
        useDispatchMock().mockResolvedValue({ })

        requestCreateCapabilityMock.mockReturnValue()

        selectCapabilitiesByPortfolioIdMock
            .mockReturnValueOnce(foundCapabilities)
            .mockReturnValueOnce(foundCapabilities)
            .mockReturnValue([...foundCapabilities, {
                title: 'title 3',
                description: 'description 3',
                id: 3,
                deliverableIds: []
            }])

        render(<PortfolioCapabilities portfolioId = {1}/>)

        userEvent.click(screen.getByTestId('MoreVertIcon'))
        await act(async() => userEvent.click(await screen.findByText('Add new')))

        expect(requestCreateCapabilityMock).toHaveBeenCalledWith({
            referenceId: 3,
            portfolioId: 1,
            title: 'Enter new requirement here'
        })

    })

    test('should render capability 2', () => {
        render(<PortfolioCapabilities portfolioId = {1} capabilityId = {2}/>)

        expect(screen.getByDisplayValue('title 2')).toBeInTheDocument()
    })

})