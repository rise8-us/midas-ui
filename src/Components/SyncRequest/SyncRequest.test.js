import { fireEvent, render, screen, useDispatchMock, useModuleMock } from 'Utilities/test-utils'
import { SyncRequest } from './index'

describe('<SyncRequest />', () => {

    const requestSyncEpicsByProductIdMock = useModuleMock('Redux/Products/actions', 'requestSyncEpicsByProductId')

    beforeEach(() => {
        useDispatchMock().mockReturnValue({})
    })

    test('should render', () => {
        const request = jest.fn()
        render(
            <SyncRequest
                id = {1}
                request = {request}
                tooltip = ''
            />
        )

        expect(screen.getByTestId('SyncRequest__button-sync')).toBeInTheDocument()
    })

    test('should display warning icon on error', async() => {
        useDispatchMock().mockRejectedValue(['errors'])

        render(
            <SyncRequest
                id = {1}
                request = {requestSyncEpicsByProductIdMock}
                tooltip = ''
            />
        )

        fireEvent.click(screen.getByTestId('SyncRequest__button-sync'))

        expect(await screen.findByTestId('SyncRequest__warning-icon')).toBeInTheDocument()
    })

})