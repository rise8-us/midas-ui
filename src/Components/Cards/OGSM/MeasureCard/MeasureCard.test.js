import React from 'react'
import {
    fireEvent,
    mockDateSelector,
    render,
    screen,
    selectAssertionStatusesMock,
    useDispatchMock,
    useModuleMock,
    userEvent
} from 'Utilities/test-utils'
import { MeasureCard } from './index'

jest.mock('Components/CompletionType/CompletionType', () => function testing(props) {
    return (
        <>
            <div onClick = {() => props.onSaveValue(51)}>onSaveValue</div>
            <div onClick = {() => props.onSaveTarget(101)}>onSaveTarget</div>
            <div onClick = {() => props.onChangeType({ completionType: 'BINARY' })}>onChangeType</div>
        </>
    )
})

jest.mock('Components/DateSelector/DateSelector', () => function testing(props) { return mockDateSelector(props) })

describe('<MeasureCard />', () => {
    const measure = {
        id: 1,
        text: 'Text',
        completionType: 'BINARY',
        assertionId: 2,
        comments: [],
        children: [],
        target: 1,
        value: 0,
        startDate: null,
        dueDate: null,
        completedAt: null,
    }

    const completedMeasure = {
        ...measure,
        value: 1,
        startDate: '2020-01-01',
        dueDate: '2020-03-03',
        completedAt: '2020-02-02T15:22:00',
    }

    const selectMeasureByIdMock = useModuleMock('Redux/Measures/selectors', 'selectMeasureById')
    const requestUpdateMeasureMock = useModuleMock('Redux/Measures/actions', 'requestUpdateMeasure')
    const requestDeleteMeasureMock = useModuleMock('Redux/Measures/actions', 'requestDeleteMeasure')
    const requestSearchCommentsMock = useModuleMock('Redux/Comments/actions', 'requestSearchComments')

    beforeEach(() => {
        useDispatchMock().mockResolvedValue({})
        selectAssertionStatusesMock()
        selectMeasureByIdMock.mockReturnValue(measure)
        requestUpdateMeasureMock.mockClear()
    })

    test('should render', () => {
        selectMeasureByIdMock.mockReturnValue(completedMeasure)
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

    test('should update measure start date', () => {
        selectMeasureByIdMock.mockReturnValue(completedMeasure)

        render(<MeasureCard id = {completedMeasure.id} hasEdit = {true} />)

        fireEvent.blur(screen.getByDisplayValue('01-01-2020'))

        expect(requestUpdateMeasureMock).toBeCalledWith({ ...completedMeasure, startDate: '2021-04-20' })
    })

    test('should update measure due date', () => {
        selectMeasureByIdMock.mockReturnValue(completedMeasure)

        render(<MeasureCard id = {completedMeasure.id} hasEdit = {true} />)

        fireEvent.blur(screen.getByDisplayValue('03-03-2020'))

        expect(requestUpdateMeasureMock).toBeCalledWith({ ...completedMeasure, dueDate: '2021-04-20' })
    })

    test('should update measure value', () => {
        render(<MeasureCard id = {measure.id} hasEdit = {true} />)

        fireEvent.click(screen.getByText('onSaveValue'))
        expect(requestUpdateMeasureMock).toHaveBeenCalledWith({
            ...measure,
            value: 51,
            children: []
        })
    })

    test('should update measure target', () => {
        render(<MeasureCard id = {measure.id} hasEdit = {true} />)

        fireEvent.click(screen.getByText('onSaveTarget'))
        expect(requestUpdateMeasureMock).toHaveBeenCalledWith({
            ...measure,
            target: 101,
            children: []
        })
    })

    test('should update measure completionType', () => {
        render(<MeasureCard id = {measure.id} hasEdit = {true} />)

        fireEvent.click(screen.getByText('onChangeType'))
        expect(requestUpdateMeasureMock).toHaveBeenCalledWith({
            ...measure,
            completionType: 'BINARY',
            children: []
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

})