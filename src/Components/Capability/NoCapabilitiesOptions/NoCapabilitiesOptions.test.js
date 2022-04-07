
import { fireEvent, render, screen, useDispatchMock, useModuleMock, waitFor } from 'Utilities/test-utils'
import { NoCapabilitiesOptions } from './index'

describe('<NoCapabilitiesOptions />', () => {

    test('should render', () => {
        render(<NoCapabilitiesOptions portfolioId = {1} onCreate = {jest.fn} />)

        expect(screen.getByText('Looks like theres nothing here...')).toBeInTheDocument()
        expect(screen.getByText('New Requirement')).toBeInTheDocument()
        expect(screen.getByText('Existing Requirement')).toBeInTheDocument()
    })

    test('should handle buttion clicks', async() => {
        const onCreateMock = jest.fn()
        const requestCreateCapabilityMock = useModuleMock('Redux/Capabilities/actions', 'requestCreateCapability')
        const openPopupMock = useModuleMock('Redux/Popups/actions', 'openPopup')
        useDispatchMock().mockResolvedValue({})

        render(<NoCapabilitiesOptions portfolioId = {1} onCreate = {onCreateMock} />)

        fireEvent.click(screen.getByText('New Requirement'))
        fireEvent.click(screen.getByText('Existing Requirement'))

        expect(openPopupMock).toHaveBeenCalledWith('LinkCapabilityPopup', 'LinkCapabilityPopup', { portfolioId: 1 })
        expect(requestCreateCapabilityMock).toHaveBeenCalledWith({
            referenceId: 1,
            portfolioId: 1,
            title: 'Enter new requirement here',
        })
        await waitFor(() => { expect(onCreateMock).toHaveBeenCalledWith(0) })
    })
})