import React from 'react'
import {
    fireEvent, render, screen, useDispatchMock, useModuleMock, userEvent, waitFor
} from '../../../Utilities/test-utils'
import { AssertionHeader } from './index'

describe('<AssertionHeader>', () => {

    test('should render', () => {
        render(<AssertionHeader category = 'category' detail = 'detail'/>)

        expect(screen.getByText(/category:/)).toBeInTheDocument()
        expect(screen.getByDisplayValue(/detail/)).toBeInTheDocument()
    })

    test('should call onChange & update value', () => {
        const onChangeMock = jest.fn()
        render(<AssertionHeader category = 'cat' detail = 'devils' defaultEditable onChange = {onChangeMock}/>)

        userEvent.type(screen.getByDisplayValue(/devils/), 'in the details')

        expect(onChangeMock).toHaveBeenCalled()
        expect(screen.getByDisplayValue(/in the details/i)).toBeInTheDocument()
    })

    test('should edit and restore', () => {
        render(<AssertionHeader category = 'cat' detail = 'devils' editable/>)

        fireEvent.click(screen.getByTitle('edit'))
        userEvent.type(screen.getByDisplayValue(/devils/), 'in the details')
        expect(screen.getByDisplayValue(/in the details/i)).toBeInTheDocument()

        fireEvent.click(screen.getByTitle('restore'))
        expect(screen.getByDisplayValue(/devils/)).toBeInTheDocument()
    })

    test('should edit and restore w/out buttons', () => {
        useDispatchMock().mockReturnValueOnce({ action: '/', payload: {} })

        render(<AssertionHeader category = 'cat' detail = 'devils' editable/>)
        userEvent.type(screen.getByDisplayValue(/devils/), 'in the details{esc}')

        expect(screen.getByDisplayValue(/devils/)).toBeInTheDocument()
    })

    test('should edit and save', () => {
        const OnSaveMock = jest.fn()
        render(<AssertionHeader category = 'cat' detail = 'devils' editable onSave = {OnSaveMock}/>)

        fireEvent.click(screen.getByTitle('edit'))
        userEvent.type(screen.getByDisplayValue(/devils/), 'in the details')
        expect(screen.getByDisplayValue(/in the details/i)).toBeInTheDocument()

        fireEvent.click(screen.getByTitle('save'))
        expect(OnSaveMock).toHaveBeenCalled()
    })

    test('should edit and save w/out buttons', () => {
        const OnSaveMock = jest.fn()
        useDispatchMock().mockReturnValueOnce({ action: '/', payload: {} })

        render(<AssertionHeader category = 'cat' detail = 'devils' editable onSave = {OnSaveMock}/>)
        userEvent.type(screen.getByDisplayValue(/devils/), 'in the details{Enter}')

        expect(screen.getByDisplayValue(/in the details/i)).toBeInTheDocument()
        expect(OnSaveMock).toHaveBeenCalled()
    })

    test('should call onEditClick', () => {
        const onEditClickMock = jest.fn()
        render(<AssertionHeader category = 'cat' detail = 'devils' editable onEditClick = {onEditClickMock}/>)

        fireEvent.click(screen.getByTitle('edit'))

        expect(onEditClickMock).toHaveBeenCalledWith(true)
    })

    test('should see status', () => {
        render(<AssertionHeader category = 'cat' detail = 'devils' status = 'STARTED'/>, {
            initialState: {
                app: {
                    assertionStatus: {
                        STARTED: {
                            name: 'STARTED',
                            label: 'Started',
                            color: '#000000'
                        }
                    }
                }
            }
        })

        expect(screen.getByText('Started')).toBeInTheDocument()
    })

    test('should show commentCount', () => {
        render(<AssertionHeader category = 'cat' detail = 'devils' commentCount = {1} id = {1}/>)

        expect(screen.getByText('1')).toBeInTheDocument()
    })

    test('should call comment dispatches', () => {
        useDispatchMock().mockReturnValue({})
        const requestSearchCommentsMock = useModuleMock('Redux/Comments/actions', 'requestSearchComments')
        const setAssertionCommentMock = useModuleMock('Redux/AppSettings/reducer', 'setAssertionComment')

        render(<AssertionHeader category = 'cat' detail = 'devils' id = {1}/>)

        fireEvent.click(screen.getByTitle('comment'))

        expect(requestSearchCommentsMock).toHaveBeenCalledWith('assertion.id:1')
        expect(setAssertionCommentMock).toHaveBeenCalledWith(1)
    })

    test('should cancel delete ogsm', () => {
        const onDeleteMock = jest.fn()
        render(<AssertionHeader category = 'cat' detail = 'devils' editable onDelete = {onDeleteMock}/>)

        fireEvent.click(screen.getByTitle('delete'))
        fireEvent.click(screen.getByText('cancel'))

        expect(onDeleteMock).not.toHaveBeenCalled()
    })

    test('should confirm delete ogsm', () => {
        const onDeleteMock = jest.fn()
        render(<AssertionHeader category = 'cat' detail = 'devils' editable onDelete = {onDeleteMock}/>)

        fireEvent.click(screen.getByTitle('delete'))
        fireEvent.click(screen.getByText('confirm'))

        expect(onDeleteMock).toHaveBeenCalled()
    })

    test('should update status', () => {
        useDispatchMock().mockResolvedValue({ data: { payload: {} } })
        const requestCreateCommentMock = useModuleMock('Redux/Comments/actions', 'requestCreateComment')
        const setAssertionCommentMock = useModuleMock('Redux/AppSettings/reducer', 'setAssertionComment')
        const requestUpdateAssertionMock = useModuleMock('Redux/Assertions/actions', 'requestUpdateAssertion')

        const mockState = {
            app: {
                assertionStatus: {
                    NOT_STARTED: { name: 'NOT_STARTED', label: 'Not Started', color: '#000000' },
                    STARTED: { name: 'STARTED', label: 'Started', color: '#000000' },
                    COMPLETED: { name: 'COMPLETED', label: 'Completed', color: '#000000' }
                }
            }
        }

        render(
            <AssertionHeader category = 'cat' detail = 'devils' id = {1} status = 'NOT_STARTED'/>,
            { initialState: mockState }
        )

        fireEvent.click(screen.getByText('Not Started'))
        useDispatchMock().mockReturnValueOnce({ data: { payload: {} } })
        fireEvent.click(screen.getByText('Completed'))

        expect(requestCreateCommentMock).toHaveBeenCalledWith({ assertionId: 1, text: '###COMPLETED' })
        waitFor(() => {
            expect(setAssertionCommentMock).toHaveBeenCalledWith(1)
            expect(requestUpdateAssertionMock).toHaveBeenCalledWith(
                { id: 1, text: 'devils', status: 'COMPLETED', children: [] }
            )
        })
    })
})