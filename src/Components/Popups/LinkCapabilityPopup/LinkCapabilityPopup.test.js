import {
    render,
    screen,
    useDispatchMock,
    useModuleMock,
    userEvent,
    waitForElementToBeRemoved
} from 'Utilities/test-utils'
import { LinkCapabilityPopup } from './index'

describe('<LinkCapabilityPopup />', () => {
    jest.setTimeout(15000)

    const closePopupMock = useModuleMock('Redux/Popups/actions', 'closePopup')
    const selectCapabilitiesWithNoPortfolioIdMock = useModuleMock(
        'Redux/Capabilities/selectors', 'selectCapabilitiesWithNoPortfolioId'
    )

    const capabilities = [{ title: 'Capability 1' }, { title: 'Capability 2' }]

    beforeEach(() => {
        selectCapabilitiesWithNoPortfolioIdMock.mockReturnValue(capabilities)
    })

    test('should render', () => {
        useDispatchMock()
        render(<LinkCapabilityPopup portfolioId = {1}/>)

        expect(screen.getByText('Link existing Requirements')).toBeInTheDocument()
        expect(screen.getByText('close')).toBeInTheDocument()
        expect(screen.getByTestId('LinkCapabilityPopup__select')).toBeInTheDocument()

        userEvent.click(screen.getByText('close'))
        expect(closePopupMock).toHaveBeenCalled()
    })

    test('should handle selection -- success', async() => {
        useDispatchMock().mockResolvedValue({ type: '/', payload: {} })

        render(<LinkCapabilityPopup portfolioId = {1}/>)
        userEvent.click(screen.getByText('Please select a requirement'))
        userEvent.click(await screen.findByText('Capability 1'))

        await screen.findByTestId('CheckCircleOutlinedIcon')
        await waitForElementToBeRemoved(() => screen.queryByTestId('CheckCircleOutlinedIcon'), { timeout: 2000 })
    })

    test('should handle selection -- failure', async() => {
        useDispatchMock()
            .mockResolvedValueOnce({ type: '/', payload: {} })
            .mockRejectedValue('testing')

        render(<LinkCapabilityPopup portfolioId = {1}/>)
        userEvent.click(screen.getByText('Please select a requirement'))
        userEvent.click(await screen.findByText('Capability 1'))

        await screen.findByTestId('WarningAmberRoundedIcon')
        await waitForElementToBeRemoved(() => screen.queryByTestId('WarningAmberRoundedIcon'), { timeout: 2000 })
    })
})