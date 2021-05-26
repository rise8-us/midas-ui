import React from 'react'
import { fireEvent, render, screen, useDispatchMock, userEvent } from '../../../Utilities/test-utils'
import { Comment } from './index'

describe('<Comment>', () => {

    test('should render', () => {
        render(
            <Comment
                id = {0}
                author = 'aSmith'
                lastEdit = 'timestamp'
                text = 'comment body'
                modified
            />
        )

        expect(screen.getByText('aSmith')).toBeInTheDocument()
        expect(screen.getByText(/timestamp/)).toBeInTheDocument()
        expect(screen.getByText('comment body')).toBeInTheDocument()
        expect(screen.getByText(/\(edited\)/)).toBeInTheDocument()
    })

    test('should parse status', () => {
        render(
            <Comment
                id = {0}
                author = 'aSmith'
                lastEdit = 'timestamp'
                text = 'comment body###COMPLETED'
                handleStatusUpdates
            />, {
                initialState: {
                    app: {
                        assertionStatus: {
                            COMPLETED: { name: 'COMPLETED', label: 'Completed', color: '#000000' }
                        }
                    }
                }
            }
        )

        expect(screen.getByText('status')).toBeInTheDocument()
        expect(screen.getByText('Completed')).toBeInTheDocument()
    })

    test('should edit and save comment', () => {
        useDispatchMock().mockReturnValue()

        render(
            <Comment
                id = {0}
                author = 'aSmith'
                lastEdit = 'timestamp'
                text = 'comment body'
                canEdit
            />
        )

        fireEvent.click(screen.getByTitle(/more/i))
        fireEvent.click(screen.getByText(/edit/i))

        userEvent.type(screen.getByDisplayValue('comment body'), '1{enter}')

        expect(screen.getByText(/comment body1/i)).toBeInTheDocument()
    })


    test('should edit and revert comment', () => {
        useDispatchMock().mockReturnValue()

        render(
            <Comment
                id = {0}
                author = 'aSmith'
                lastEdit = 'timestamp'
                text = 'comment body'
                canEdit
            />
        )

        fireEvent.click(screen.getByTitle(/more/i))
        fireEvent.click(screen.getByText(/edit/i))

        userEvent.type(screen.getByDisplayValue('comment body'), '1{esc}')

        expect(screen.getByText(/comment body/i)).toBeInTheDocument()
    })

})