import {
    fireEvent, render, screen, selectAssertionStatusesMock, useDispatchMock, useModuleMock, userEvent, waitFor
} from 'Utilities/test-utils'
import { UpdateStatusPopup } from './index'

describe('<UpdateStatusPopup />', () => {
    jest.setTimeout(20000)

    const requestCreateCommentMock = useModuleMock('Redux/Comments/actions', 'requestCreateComment')
    const requestUpdateMeasureMock = useModuleMock('Redux/Measures/actions', 'requestUpdateMeasure')
    const requestUpdateAssertionMock = useModuleMock('Redux/Assertions/actions', 'requestUpdateAssertion')
    const closePopupMock = useModuleMock('Redux/Popups/actions', 'closePopup')

    const measure = {
        id: 1,
        text: 'Text',
        status: 'NOT_STARTED',
    }

    const assertion = {
        id: 1,
        text: 'Text',
        status: 'NOT_STARTED',
    }

    beforeEach(() => {
        selectAssertionStatusesMock()
        closePopupMock.mockReset()
        useDispatchMock().mockResolvedValue({})
    })

    test('should render with assertion id', () => {
        render(<UpdateStatusPopup id = {1} type = 'assertion' />)

        expect(screen.getByLabelText('Status')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Enter your status update here')).toBeInTheDocument()
    })

    test('should render with measure id', () => {
        render(<UpdateStatusPopup id = {1} type = 'measure' />)

        expect(screen.getByLabelText('Status')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Enter your status update here')).toBeInTheDocument()
    })

    test('should close popup onCancel', () => {
        render(<UpdateStatusPopup id = {1} type = 'assertion' />)

        fireEvent.click(screen.getByText('cancel'))

        expect(closePopupMock).toHaveBeenCalledWith('UpdateStatusPopup')
    })

    test('should show errors when inputs are empty on Submit', async() => {
        render(<UpdateStatusPopup id = {1} type = 'assertion' />)

        fireEvent.click(screen.getByText('Submit'))

        expect(await screen.findByText('Status cannot be blank!')).toBeInTheDocument()
        expect(await screen.findByText('Details cannot be blank!')).toBeInTheDocument()
    })

    test('should show detail error when input is empty', async() => {
        render(<UpdateStatusPopup id = {2} type = 'assertion' />)

        expect(screen.queryByText('Details cannot be blank!')).not.toBeInTheDocument()

        userEvent.type(screen.getByPlaceholderText('Enter your status update here'), 'x{backspace}')

        expect(await screen.findByText('Details cannot be blank!')).toBeInTheDocument()
    })

    test('should show status error when input is empty', async() => {
        render(<UpdateStatusPopup id = {1} type = 'assertion' />)

        fireEvent.click(screen.getByLabelText('Status'))
        fireEvent.click(await screen.findByTitle('Open'))
        fireEvent.click(screen.getByText('On Track'))

        expect(screen.queryByText('Status cannot be blank!')).not.toBeInTheDocument()

        fireEvent.click(screen.getByTitle('Clear'))

        expect(await screen.findByText('Status cannot be blank!')).toBeInTheDocument()
    })

    test('should handle onSubmit for Measure', async() => {
        const selectMeasureByIdMock = useModuleMock('Redux/Measures/selectors', 'selectMeasureById')
        selectMeasureByIdMock.mockReturnValue(measure)

        const updatedMeasure = { ...measure, status: 'COMPLETED' }
        render(<UpdateStatusPopup id = {1} type = 'measure' />)

        fireEvent.click(screen.getByLabelText('Status'))
        fireEvent.click(await screen.getByTitle('Open'))
        fireEvent.click(screen.getByText('On Track'))
        userEvent.type(screen.getByPlaceholderText('Enter your status update here'), 'an untitled note')
        fireEvent.click(screen.getByText('Submit'))

        expect(requestCreateCommentMock).toHaveBeenCalledWith({
            measureId: 1,
            text: 'an untitled note###ON_TRACK'
        })

        requestUpdateMeasureMock.mockReturnValue(updatedMeasure)

        await waitFor(() => { expect(closePopupMock).toHaveBeenCalled() })
    })

    test('should handle onSubmit for Assertion', async() => {
        const selectAssertionByIdMock = useModuleMock('Redux/Assertions/selectors', 'selectAssertionById')
        selectAssertionByIdMock.mockReturnValue(assertion)

        const updatedAssertion = { ...assertion, status: 'COMPLETED' }
        render(<UpdateStatusPopup id = {1} type = 'assertion' />)

        fireEvent.click(screen.getByLabelText('Status'))
        fireEvent.click(await screen.getByTitle('Open'))
        fireEvent.click(screen.getByText('On Track'))
        userEvent.type(screen.getByPlaceholderText('Enter your status update here'), 'an untitled note')
        fireEvent.click(screen.getByText('Submit'))

        expect(requestCreateCommentMock).toHaveBeenCalledWith({
            assertionId: 1,
            text: 'an untitled note###ON_TRACK'
        })

        requestUpdateAssertionMock.mockReturnValue(updatedAssertion)

        await waitFor(() => { expect(closePopupMock).toHaveBeenCalled() })
    })
})