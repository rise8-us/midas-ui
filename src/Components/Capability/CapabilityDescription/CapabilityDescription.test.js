
import { render, screen, useDispatchMock, useModuleMock, userEvent } from 'Utilities/test-utils'
import { CapabilityDescription } from './index'

describe('<CapabilityDescription />', () => {

    const capability = { id: 1, description: 'foo' }

    test('should render', () => {
        render(<CapabilityDescription capability = {{ id: 1 }} />)

        expect(screen.getByDisplayValue('')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Enter Requirement Context')).toBeInTheDocument()
    })

    test('should not render', () => {
        render(<CapabilityDescription capability = {{ id: 1 }} renderEmptyOnReadOnly = {false}/>)

        expect(screen.queryByPlaceholderText('Enter Requirement Context')).not.toBeInTheDocument()
    })

    test('should handle update', () => {
        const requestUpdateCapabilityMock = useModuleMock('Redux/Capabilities/actions', 'requestUpdateCapability')
        useDispatchMock()

        render(<CapabilityDescription capability = {capability} canEdit />)

        userEvent.type(screen.getByDisplayValue('foo'), 'new')
        userEvent.tab()

        expect(requestUpdateCapabilityMock).toHaveBeenCalledWith({ id: 1, description: 'new' })
    })
})