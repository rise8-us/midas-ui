import {
    act, fireEvent, render, screen, useDispatchMock, useModuleMock, waitFor, waitForElementToBeRemoved
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

        fireEvent.click(screen.getByText('close'))
        expect(closePopupMock).toHaveBeenCalled()
    })

    test('should handle selection -- success', async() => {
        jest.useFakeTimers()

        await waitFor(() => {
            useDispatchMock().mockResolvedValue({ type: '/', payload: {} })
        })

        render(<LinkCapabilityPopup portfolioId = {1}/>)

        await act(async() => {
            fireEvent.click(screen.getByTestId('LinkCapabilityPopup__select'))
            fireEvent.click(await screen.findByText('Capability 1'))
        })

        expect(screen.getByTestId('CheckBoxRoundedIcon')).toBeInTheDocument()

        jest.advanceTimersByTime(2500)
        await waitForElementToBeRemoved(screen.getByTestId('CheckBoxRoundedIcon'))

        jest.useRealTimers()
    })

    test('should handle selection -- failure', async() => {
        jest.useFakeTimers()

        await waitFor(() => {
            useDispatchMock()
                .mockResolvedValueOnce({ type: '/', payload: {} })
                .mockRejectedValue('testing')
        })

        render(<LinkCapabilityPopup portfolioId = {1}/>)

        await act(async() => {
            fireEvent.click(screen.getByTestId('LinkCapabilityPopup__select'))
            fireEvent.click(await screen.findByText('Capability 1'))
        })

        expect(screen.getByTestId('WarningAmberRoundedIcon')).toBeInTheDocument()

        jest.useRealTimers()
    })
})