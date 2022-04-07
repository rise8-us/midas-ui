
import { render, screen, useDispatchMock, useModuleMock, userEvent, waitFor } from 'Utilities/test-utils'
import { CapabilityTitle } from './index'

describe('<CapabilityTitle />', () => {

    const capability = { id: 1, title: 'title', deliverableIds: [2] }

    const requestDeleteCapabilityMock = useModuleMock('Redux/Capabilities/actions', 'requestDeleteCapability')
    const requestUpdateCapabilityMock = useModuleMock('Redux/Capabilities/actions', 'requestUpdateCapability')
    const requestDeleteDeliverableMock = useModuleMock('Redux/Deliverables/actions', 'requestDeleteDeliverable')

    test('should render', () => {
        render(<CapabilityTitle capability = {capability} />)

        expect(screen.getByDisplayValue('title')).toBeInTheDocument()
    })

    test('should handle update', () => {
        useDispatchMock()

        render(<CapabilityTitle capability = {capability} canEdit />)

        userEvent.type(screen.getByDisplayValue('title'), 'new')
        userEvent.tab()

        expect(requestUpdateCapabilityMock).toHaveBeenCalledWith({ ...capability, title: 'new' })
    })

    test('should handle delete', async() => {
        const onDeleteMock = jest.fn()
        useDispatchMock().mockResolvedValue({})

        render(<CapabilityTitle capability = {capability} canEdit showDelete onDelete = {onDeleteMock}/>)

        userEvent.hover(screen.getByDisplayValue('title'))
        userEvent.click(screen.getByTestId('DeleteOutlineIcon'))

        expect(requestDeleteDeliverableMock).toHaveBeenCalledWith(2)
        await waitFor(() => expect(requestDeleteCapabilityMock).toHaveBeenCalledWith(1))
    })
})