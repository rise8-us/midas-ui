import { render, screen, useDispatchMock, useModuleMock } from 'Utilities/test-utils'
import { UserTooltip } from './index'

describe('<UserTooltip />', () => {
    const requestSearchUsersMock = useModuleMock('Redux/Users/actions', 'requestSearchUsers')

    test('should render', async() => {
        useDispatchMock().mockResolvedValue({ type: '/', payload: [{ username: 'fiz' }] })

        render(<UserTooltip userIds = {[1]} title = 'foo'/>)

        expect(requestSearchUsersMock).toHaveBeenCalledWith('id:1')
        expect(await screen.findByText('fiz')).toBeInTheDocument()
    })

    test('should render empty', async() => {
        render(<UserTooltip userIds = {[]} title = 'foo'/>)

        expect(requestSearchUsersMock).not.toHaveBeenCalled()
    })

    test('should clear state', async() => {
        useDispatchMock().mockResolvedValue({ type: '/', payload: [{ username: 'fiz' }] })

        const { rerender } = render(<UserTooltip userIds = {[1]} title = 'foo'/>)
        expect(await screen.findByText('fiz')).toBeInTheDocument()

        rerender(<UserTooltip userIds = {[]} title = 'foo'/>)
        expect(screen.queryByText('fiz')).not.toBeInTheDocument()
    })

})