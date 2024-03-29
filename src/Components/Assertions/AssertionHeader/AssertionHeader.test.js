import { render, screen, useDispatchMock, useModuleMock, userEvent, waitFor } from 'Utilities/test-utils'
import { AssertionHeader } from './index'

describe('<AssertionHeader>', () => {

    const requestCreateAssertionMock = useModuleMock('Redux/Assertions/actions', 'requestCreateAssertion')

    const newOGSM = {
        text: 'Enter new objective here...',
        productId: 1,
        status: 'NOT_STARTED',
        children: [{
            text: 'Enter new strategy here...',
            productId: 1,
            status: 'NOT_STARTED',
            measures: [{
                value: 0,
                target: 1,
                text: 'Enter new measures here...',
                completionType: 'BINARY'
            }],
            children: []
        }],
        measures: [{
            value: 0,
            target: 1,
            text: 'Enter new goal here...',
            completionType: 'BINARY'
        }]
    }

    test('should fire request to create new OGSM', async() => {
        requestCreateAssertionMock.mockReturnValue({ type: '/', payload: {} })
        useDispatchMock().mockResolvedValue({ data: {} })
        const onCreateMock = jest.fn()

        render(<AssertionHeader productId = {1} onCreate = {onCreateMock} hasEdit/>)
        userEvent.click(screen.getByTestId('AddItem__icon-button'))

        expect(requestCreateAssertionMock).toHaveBeenCalledWith(newOGSM)
        await waitFor(() => { expect(onCreateMock).toBeCalled() })
    })
})