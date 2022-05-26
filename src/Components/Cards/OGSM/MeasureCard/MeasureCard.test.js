import {
    fireEvent,
    mockDateSelector,
    render,
    screen,
    selectAssertionStatusesMock,
    selectCompletionTypesMock,
    useDispatchMock,
    useModuleMock,
    userEvent
} from 'Utilities/test-utils'
import { MeasureCard } from './index'

jest.mock('Components/CompletionType/CompletionType', () => function testing(props) {
    return (
        <>
            <div onClick = {() => props.onChange({ foo: 'bar' })}>onChangeProp</div>
        </>
    )
})

jest.mock('Components/DateSelector/DateSelector', () => function testing(props) { return mockDateSelector(props) })

describe('<MeasureCard />', () => {
    const measure = {
        id: 1,
        text: 'Text',
        status: 'NOT_STARTED',
        assertionId: 2,
        comments: [],
        children: [],
        completion: {
            target: 1,
            value: 0,
            startDate: null,
            dueDate: null,
            completionType: 'BINARY',
            completedAt: null,
        }
    }

    const completedMeasure = {
        ...measure,
        completion: {
            ...measure.completion,
            value: 1,
            startDate: '2020-01-01',
            dueDate: '2020-03-03',
            completedAt: '2020-02-02T15:22:00',
        }
    }

    const selectMeasureByIdMock = useModuleMock('Redux/Measures/selectors', 'selectMeasureById')
    const requestUpdateMeasureMock = useModuleMock('Redux/Measures/actions', 'requestUpdateMeasure')
    const requestDeleteMeasureMock = useModuleMock('Redux/Measures/actions', 'requestDeleteMeasure')
    const requestSearchCommentsMock = useModuleMock('Redux/Comments/actions', 'requestSearchComments')

    beforeEach(() => {
        useDispatchMock().mockResolvedValue({})
        selectAssertionStatusesMock()
        selectCompletionTypesMock()
        selectMeasureByIdMock.mockReturnValue(measure)
        requestUpdateMeasureMock.mockClear()
    })

    test('should render', () => {
        selectMeasureByIdMock.mockReturnValue({
            ...completedMeasure,
            completion: {
                ...completedMeasure.completion,
                completionType: 'GITLAB_EPIC'
            }
        })
        render(<MeasureCard id = {completedMeasure.id} hasEdit = {false} />)

        userEvent.hover(screen.getByTestId('Collapsable__card'))

        expect(screen.getByDisplayValue('Text')).toBeInTheDocument()
        expect(screen.getByDisplayValue('01-01-2020')).toBeInTheDocument()
        expect(screen.getByDisplayValue('03-03-2020')).toBeInTheDocument()
        expect(screen.getByText('Completed on: Sun Feb 02 2020')).toBeInTheDocument()
    })

    test('should update measure text', () => {
        render(<MeasureCard id = {measure.id} hasEdit = {true} />)

        userEvent.type(screen.getByDisplayValue('Text'), 'Text Edit{enter}')
        expect(requestUpdateMeasureMock).toHaveBeenCalledWith({ ...measure, text: 'Text Edit' })
    })

    test('should update start date', () => {
        selectMeasureByIdMock.mockReturnValue(completedMeasure)

        render(<MeasureCard id = {completedMeasure.id} hasEdit = {true} />)

        fireEvent.blur(screen.getByDisplayValue('01-01-2020'))

        expect(requestUpdateMeasureMock).toBeCalledWith({
            ...completedMeasure,
            completion: {
                ...completedMeasure.completion,
                startDate: '2021-04-20'
            }
        })
    })

    test('should update due date', () => {
        selectMeasureByIdMock.mockReturnValue(completedMeasure)

        render(<MeasureCard id = {completedMeasure.id} hasEdit = {true} />)

        fireEvent.blur(screen.getByDisplayValue('03-03-2020'))

        expect(requestUpdateMeasureMock).toBeCalledWith({
            ...completedMeasure,
            completion: {
                ...completedMeasure.completion,
                dueDate: '2021-04-20'
            }
        })
    })

    test('should call Completion onChange()', () => {
        render(<MeasureCard id = {measure.id} hasEdit = {true} />)

        fireEvent.click(screen.getByText('onChangeProp'))
        expect(requestUpdateMeasureMock).toHaveBeenCalledWith({
            ...measure,
            completion: {
                ...measure.completion,
                foo: 'bar'
            }
        })
    })

    test('should not call dispatch to request update measure text if no change', () => {
        render(<MeasureCard id = {measure.id} hasEdit = {true} />)

        userEvent.type(screen.getByDisplayValue('Text'), 'Text{enter}')
        expect(requestUpdateMeasureMock).not.toHaveBeenCalled()
    })

    test('should call dispatch to request delete measure', () => {
        render(<MeasureCard id = {measure.id} hasEdit = {true} />)

        fireEvent.click(screen.getByTitle('delete'))
        fireEvent.click(screen.getByText('confirm'))
        expect(requestDeleteMeasureMock).toHaveBeenCalledWith(1)
    })

    test('should cancel delete measure popup', () => {
        render(<MeasureCard id = {measure.id} hasEdit = {true} />)

        fireEvent.click(screen.getByTitle('delete'))
        fireEvent.click(screen.getByText('cancel'))
        expect(requestDeleteMeasureMock).not.toHaveBeenCalled()
    })

    test('should open comments', () => {
        render(<MeasureCard id = {measure.id} hasEdit = {true} />)

        fireEvent.click(screen.getByTitle('comment'))
        expect(requestSearchCommentsMock).toHaveBeenCalledTimes(1)
    })

    test('should be blocked', () => {
        const measureBlocked = {
            ...measure,
            status: 'BLOCKED',
            completion: { ...measure.completion, dueDate: '2022-03-03', startDate: '2022-03-01' }
        }

        selectMeasureByIdMock.mockReturnValue(measureBlocked)
        render(<MeasureCard id = {measureBlocked.id} hasEdit = {true} />)

        fireEvent.click(screen.getByText('onChangeProp'))
        expect(requestUpdateMeasureMock).toHaveBeenCalledWith({
            ...measureBlocked,
            completion: {
                ...measureBlocked.completion,
                foo: 'bar'
            }
        })
    })

    test('should be on track', () => {
        const today = new Date()
        const measureOnTrack = {
            ...measure,
            status: 'ON_TRACK',
            completion: {
                ...measure.completion,
                dueDate: (new Date(today.setDate(today.getDate() + 1))).toDateString(),
                startDate: '2022-03-01'
            }
        }

        selectMeasureByIdMock.mockReturnValue(measureOnTrack)
        render(<MeasureCard id = {measureOnTrack.id} hasEdit = {true} />)

        fireEvent.click(screen.getByText('onChangeProp'))
        expect(requestUpdateMeasureMock).toHaveBeenCalledWith({
            ...measureOnTrack,
            completion: {
                ...measureOnTrack.completion,
                foo: 'bar'
            }
        })
    })

})