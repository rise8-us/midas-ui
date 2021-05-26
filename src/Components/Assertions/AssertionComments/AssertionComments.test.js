import React from 'react'
import { fireEvent, render, screen, useDispatchMock, useModuleMock, userEvent } from '../../../Utilities/test-utils'
import { AssertionComments } from './index'

describe('<AssertionComments>', () => {

    const mockState = {
        app: {
            assertionStatus: {
                NOT_STARTED: { name: 'NOT_STARTED', label: 'Not Started', color: '#000000' },
                COMPLETED: { name: 'COMPLETED', label: 'Completed', color: '#000000' }
            }
        },
        assertions: {
            1: {
                text: 'foobar',
                status: 'STARTED'
            }
        }
    }

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

        expect(requestCreateCommentMock).toHaveBeenCalledWith({ assertionId: 1, text: 'new comment###NOT_STARTED' })

    })

})