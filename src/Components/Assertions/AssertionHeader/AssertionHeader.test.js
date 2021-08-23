import React from 'react'
import {
    fireEvent, renderWithRouter, screen, useDispatchMock, useModuleMock, userEvent, waitFor
} from '../../../Utilities/test-utils'
import { AssertionHeader } from './index'

describe('<AssertionHeader>', () => {
    const defaultProps = {
        onSave: jest.fn(),
        onDelete: jest.fn(),
        hasAccess: true
    }

    test('should render', () => {
        renderWithRouter(<AssertionHeader id = {1} category = 'category' title = 'detail' {...defaultProps}/>)

        expect(screen.getByText(/category:/)).toBeInTheDocument()
        expect(screen.getByDisplayValue(/detail/)).toBeInTheDocument()
    })

    test('should edit and restore', () => {
        useDispatchMock().mockReturnValueOnce({ action: '/', payload: {} })

        renderWithRouter(<AssertionHeader id = {1} category = 'cat' title = 'devils' editable {...defaultProps}/>)
        userEvent.type(screen.getByDisplayValue(/devils/), 'in the details{esc}')

        expect(screen.getByDisplayValue(/devils/)).toBeInTheDocument()
    })

    test('should edit and save', () => {
        const OnSaveMock = jest.fn()
        useDispatchMock().mockReturnValueOnce({ action: '/', payload: {} })

        renderWithRouter(
            <AssertionHeader
                id = {1}
                category = 'cat'
                title = 'devils'
                editable
                onSave = {OnSaveMock}
                onDelete = {jest.fn()}
                hasAccess = {true}
            />
        )
        userEvent.type(screen.getByDisplayValue(/devils/), 'in the details{Enter}')
        fireEvent.focusOut(screen.getByDisplayValue(/in the details/i))

        expect(screen.getByDisplayValue(/in the details/i)).toBeInTheDocument()
        expect(OnSaveMock).toHaveBeenCalled()
    })

    test('should see status', () => {
        useDispatchMock().mockReturnValueOnce()
        renderWithRouter(
            <AssertionHeader id = {1} category = 'cat' detail = 'devils' status = 'STARTED' {...defaultProps}/>, {
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

        expect(screen.getByText(/Started/)).toBeInTheDocument()
    })

    test('should show commentCount', () => {
        useDispatchMock().mockReturnValueOnce()
        renderWithRouter(
            <AssertionHeader id = {1} category = 'cat' detail = 'devils' commentCount = {1} {...defaultProps}/>)

        expect(screen.getByText('1')).toBeInTheDocument()
    })

    test('should call comment dispatches', () => {
        useDispatchMock().mockReturnValue({})
        const requestSearchCommentsMock = useModuleMock('Redux/Comments/actions', 'requestSearchComments')
        const setAssertionCommentMock = useModuleMock('Redux/AppSettings/reducer', 'setAssertionComment')

        renderWithRouter(<AssertionHeader id = {1} category = 'cat' detail = 'devils' {...defaultProps}/>)

        fireEvent.click(screen.getByTitle('comment'))

        expect(requestSearchCommentsMock).toHaveBeenCalledWith('assertion.id:1')
        expect(setAssertionCommentMock).toHaveBeenCalledWith(1)
    })

    test('should cancel delete ogsm', () => {
        useDispatchMock().mockReturnValueOnce()
        const onDeleteMock = jest.fn()
        renderWithRouter(
            <AssertionHeader
                id = {1}
                category = 'cat'
                detail = 'devils'
                editable
                onDelete = {onDeleteMock}
                onSave = {jest.fn()}
                hasAccess = {true}
            />
        )

        fireEvent.click(screen.getByTitle('delete'))
        fireEvent.click(screen.getByText('cancel'))

        expect(onDeleteMock).not.toHaveBeenCalled()
    })

    test('should confirm delete ogsm', () => {
        useDispatchMock().mockReturnValueOnce()
        const onDeleteMock = jest.fn()
        renderWithRouter(
            <AssertionHeader
                id = {1}
                category = 'cat'
                detail = 'devils'
                editable
                onDelete = {onDeleteMock}
                onSave = {jest.fn()}
                hasAccess = {true}
            />
        )

        fireEvent.click(screen.getByTitle('delete'))
        fireEvent.click(screen.getByText('confirm'))

        expect(onDeleteMock).toHaveBeenCalled()
    })

    test('should call addChildAssertion', () => {
        useDispatchMock().mockReturnValueOnce()
        const onAddChildMock = jest.fn()
        renderWithRouter(<AssertionHeader
            id = {1}
            category = 'cat'
            detail = 'devils'
            editable
            addChildAssertion = {onAddChildMock}
            addChildAssertionLabel = 'add me'
            {...defaultProps}
        />)

        fireEvent.click(screen.getByTitle('add me'))
        expect(onAddChildMock).toHaveBeenCalled()
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

        renderWithRouter(
            <AssertionHeader category = 'cat' detail = 'devils' id = {1} status = 'NOT_STARTED' {...defaultProps}/>,
            { initialState: mockState }
        )

        fireEvent.click(screen.getByText(/Not Started/))
        useDispatchMock().mockReturnValueOnce({ data: { payload: {} } })
        fireEvent.click(screen.getByText(/Completed/))

        expect(requestCreateCommentMock).toHaveBeenCalledWith({ assertionId: 1, text: '###COMPLETED' })
        waitFor(() => {
            expect(setAssertionCommentMock).toHaveBeenCalledWith(1)
            expect(requestUpdateAssertionMock).toHaveBeenCalledWith(
                { id: 1, text: 'devils', status: 'COMPLETED', children: [] }
            )
        })
    })


    test('should not trigger event listener with no access', () => {
        const OnSaveMock = jest.fn()
        useDispatchMock().mockReturnValueOnce({ action: '/', payload: {} })

        renderWithRouter(
            <AssertionHeader
                id = {1}
                category = 'cat'
                title = 'devils'
                editable
                onSave = {OnSaveMock}
                onDelete = {jest.fn()}
                hasAccess = {false}
            />
        )
        userEvent.type(screen.getByDisplayValue(/devils/), 'in the details{Enter}')
        fireEvent.focusOut(screen.getByDisplayValue(/devils/i))

        expect(screen.getByDisplayValue(/devils/i)).toBeInTheDocument()
        expect(OnSaveMock).not.toHaveBeenCalled()
        expect(screen.queryByTitle('delete')).not.toBeInTheDocument()
    })
})