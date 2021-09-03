import React from 'react'
import { fireEvent, renderWithRouter, screen, useDispatchMock, useModuleMock, userEvent } from 'Utilities/test-utils'
import { AssertionEntry } from './index'

describe('<AssertionEntry>', () => {
    const defaultProps = {
        onSave: jest.fn(),
        onDelete: jest.fn(),
        hasEdit: true,
        status: 'COMPLETED'
    }

    const mockState = {
        app: {
            assertionStatus: {
                NOT_STARTED: { name: 'NOT_STARTED', label: 'Not Started', color: '#000000' },
                COMPLETED: { name: 'COMPLETED', label: 'Completed', color: '#000000' }
            }
        }
    }

    test('should render', () => {
        renderWithRouter(<AssertionEntry id = {1} category = 'category' title = 'detail' {...defaultProps}/>)

        expect(screen.getByText(/category/)).toBeInTheDocument()
        expect(screen.getByDisplayValue(/detail/)).toBeInTheDocument()
    })

    test('should edit and restore', () => {
        useDispatchMock().mockReturnValueOnce({ action: '/', payload: {} })

        renderWithRouter(<AssertionEntry id = {1} category = 'cat' title = 'devils' {...defaultProps}/>)
        userEvent.type(screen.getByDisplayValue(/devils/), 'in the details{esc}')

        expect(screen.getByDisplayValue(/devils/)).toBeInTheDocument()
    })

    test('should edit and save', () => {
        const OnSaveMock = jest.fn()
        useDispatchMock().mockReturnValueOnce({ action: '/', payload: {} })

        renderWithRouter(
            <AssertionEntry
                id = {1}
                category = 'cat'
                title = 'devils'
                onSave = {OnSaveMock}
                onDelete = {jest.fn()}
                hasEdit = {true}
            />
        )
        userEvent.type(screen.getByDisplayValue(/devils/), 'in the details{Enter}')
        fireEvent.focusOut(screen.getByDisplayValue(/in the details/i))

        expect(screen.getByDisplayValue(/in the details/i)).toBeInTheDocument()
        expect(OnSaveMock).toHaveBeenCalled()
    })

    test('should show commentCount', () => {
        useDispatchMock().mockReturnValueOnce()
        renderWithRouter(
            <AssertionEntry id = {1} category = 'cat' title = 'devils' commentCount = {1} {...defaultProps}/>
        )

        fireEvent.mouseEnter(screen.getByDisplayValue('devils'))

        expect(screen.getByText('1')).toBeInTheDocument()
    })

    test('should call comment dispatches', () => {
        useDispatchMock().mockReturnValue({})
        const requestSearchCommentsMock = useModuleMock('Redux/Comments/actions', 'requestSearchComments')
        const setAssertionCommentMock = useModuleMock('Redux/AppSettings/reducer', 'setAssertionComment')

        renderWithRouter(<AssertionEntry id = {1} category = 'cat' title = 'devils' {...defaultProps}/>)

        fireEvent.mouseEnter(screen.getByDisplayValue('devils'))
        fireEvent.click(screen.getByTitle('comment'))

        expect(requestSearchCommentsMock).toHaveBeenCalledWith('assertion.id:1')
        expect(setAssertionCommentMock).toHaveBeenCalledWith({ assertionId: 1, deletedAssertionId: null })
    })

    test('should cancel delete ogsm', () => {
        useDispatchMock().mockReturnValueOnce()
        const onDeleteMock = jest.fn()

        renderWithRouter(
            <AssertionEntry
                id = {1}
                category = 'cat'
                title = 'devils'
                onDelete = {onDeleteMock}
                onSave = {jest.fn()}
                hasEdit = {true}
                status = 'COMPLETED'
            />, { initialState: mockState }
        )

        fireEvent.mouseEnter(screen.getByDisplayValue('devils'))

        fireEvent.click(screen.getByTitle('delete'))
        fireEvent.click(screen.getByText('cancel'))

        expect(onDeleteMock).not.toHaveBeenCalled()
    })

    test('should confirm delete ogsm', () => {
        useDispatchMock().mockReturnValueOnce()
        const onDeleteMock = jest.fn()

        renderWithRouter(
            <AssertionEntry
                id = {1}
                category = 'cat'
                title = 'devils'
                onDelete = {onDeleteMock}
                onSave = {jest.fn()}
                hasEdit = {true}
                status = 'COMPLETED'
            />, { initialState: mockState }
        )

        fireEvent.mouseEnter(screen.getByDisplayValue('devils'))

        fireEvent.click(screen.getByTitle('delete'))
        fireEvent.click(screen.getByText('confirm'))

        fireEvent.mouseLeave(screen.getByDisplayValue('devils'))

        expect(onDeleteMock).toHaveBeenCalled()
    })

    test('should call addChildAssertion', () => {
        useDispatchMock().mockReturnValueOnce()
        const onAddChildMock = jest.fn()

        renderWithRouter(
            <AssertionEntry
                id = {1}
                category = 'cat'
                title = 'devils'
                addChildAssertion = {onAddChildMock}
                addChildAssertionLabel = 'add me'
                {...defaultProps}
            />, { initialState: mockState }
        )

        fireEvent.mouseEnter(screen.getByDisplayValue('devils'))

        fireEvent.click(screen.getByTitle('add me'))
        expect(onAddChildMock).toHaveBeenCalled()
    })

    test('should not trigger event listener with no access', () => {
        const OnSaveMock = jest.fn()
        useDispatchMock().mockReturnValueOnce({ action: '/', payload: {} })

        renderWithRouter(
            <AssertionEntry
                id = {1}
                category = 'cat'
                title = 'devils'
                onSave = {OnSaveMock}
                onDelete = {jest.fn()}
                hasEdit = {false}
            />
        )

        userEvent.type(screen.getByDisplayValue(/devils/), 'in the details{Enter}')
        fireEvent.focusOut(screen.getByDisplayValue(/devils/i))

        expect(screen.getByDisplayValue(/devils/i)).toBeInTheDocument()
        expect(OnSaveMock).not.toHaveBeenCalled()
        expect(screen.queryByTitle('delete')).not.toBeInTheDocument()
    })
})