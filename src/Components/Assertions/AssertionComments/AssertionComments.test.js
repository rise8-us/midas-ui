import React from 'react'
import { fireEvent, render, screen, useDispatchMock, useModuleMock, userEvent } from '../../../Utilities/test-utils'
import { AssertionComments } from './index'

jest.mock('../../Comments/Comment/Comment', () => function testing() {
    return (<div>Comment</div>)
})

describe('<AssertionComments>', () => {

    const mockState = {
        app: {
            assertionStatus: {
                NOT_STARTED: { name: 'NOT_STARTED', label: 'Not Started', color: '#000000' },
                STARTED: { name: 'STARTED', label: 'Started', color: '#000000' },
                COMPLETED: { name: 'COMPLETED', label: 'Completed', color: '#000000' }
            },
            pageScrollY: 0
        },
        assertions: {
            1: {
                text: 'foobar',
                status: 'STARTED',
                commentIds: [14, 15]
            },
            3: {
                text: 'foobar',
                status: 'AT_RISK',
                commentIds: [10, 11, 12]
            }
        }
    }

    test('should set height', () => {
        render(<AssertionComments assertionId = {3}/>, { initialState: {
            assertions: { ...mockState.assertions },
            app: {
                assertionStatus: { },
                pageScrollY: -289
            }
        } })

        expect(screen.getByText('Not Started')).toBeInTheDocument()
        expect(screen.getByTestId('AssertionComment__paper')).toHaveStyle('height: 446px')
    })

    test('should render', () => {
        render(<AssertionComments assertionId = {1}/>, { initialState: mockState })

        expect(screen.getByPlaceholderText(/enter comment here.../i)).toBeInTheDocument()
    })

    test('should not render', () => {
        render(<AssertionComments assertionId = {2}/>, { initialState: mockState })

        expect(screen.queryByPlaceholderText(/enter comment here.../i)).not.toBeInTheDocument()
    })

    test('should handle submit', () => {
        const requestCreateCommentMock = useModuleMock('Redux/Comments/actions', 'requestCreateComment')
        useDispatchMock().mockResolvedValue({ data: {} })
        render(<AssertionComments assertionId = {1}/>, { initialState: mockState })

        userEvent.type(screen.getByPlaceholderText(/enter comment here.../i), 'new comment')
        fireEvent.click(screen.getByText(/submit/i))

        expect(requestCreateCommentMock).toHaveBeenCalledWith({ assertionId: 1, text: 'new comment###STARTED' })

    })

})