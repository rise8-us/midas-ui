import React from 'react'
import { fireEvent, render, screen, useDispatchMock, useModuleMock, userEvent } from '../../../Utilities/test-utils'
import { Comment } from './index'

describe('<Comment>', () => {

    const selectCommentByIdMock = useModuleMock('Redux/Comments/selectors', 'selectCommentById')

    test('should render', () => {
        selectCommentByIdMock.mockReturnValue({
            text: 'body',
            author: {
                id: 11,
                displayName: '',
                email: 'email',
                username: ''
            },
            creationDate: 'created',
            lastEdit: 'newer'
        })

        render(<Comment id = {0} viewerId = {1} />)

        expect(screen.getByText('email')).toBeInTheDocument()
        expect(screen.getByText(/newer/)).toBeInTheDocument()
        expect(screen.getByText('body')).toBeInTheDocument()
        expect(screen.getByText(/\(edited\)/)).toBeInTheDocument()
    })

    test('should parse status', async() => {
        selectCommentByIdMock.mockReturnValue({
            text: 'body###COMPLETED',
            author: {
                id: 11,
                displayName: 'disName',
                email: '',
                username: ''
            },
            creationDate: 'created',
            lastEdit: null
        })

        render(
            <Comment
                id = {0}
                viewerId = {1}
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

        expect(await screen.findByText('status')).toBeInTheDocument()
        expect(screen.getByText('Completed')).toBeInTheDocument()
    })

    test('should edit and save comment', () => {
        selectCommentByIdMock.mockReturnValue({
            text: 'body###status::COMPLETED',
            author: {
                id: 1,
                displayName: '',
                email: '',
                username: 'usrnm'
            },
            creationDate: 'created',
            lastEdit: null
        })
        useDispatchMock().mockReturnValue()

        render(<Comment id = {0} viewerId = {1} />)

        fireEvent.click(screen.getByTitle(/more/i))
        fireEvent.click(screen.getByText(/edit/i))

        userEvent.type(screen.getByDisplayValue('body'), '1{enter}')

        expect(screen.getByText(/body1/i)).toBeInTheDocument()
    })

    test('should edit and revert comment', () => {
        selectCommentByIdMock.mockReturnValue({
            text: 'body###status::COMPLETED',
            author: {
                id: 1,
                displayName: '',
                email: '',
                username: 'usrnm'
            },
            creationDate: 'created',
            lastEdit: null
        })
        useDispatchMock().mockReturnValue()

        render(<Comment id = {0} viewerId = {1} />)

        fireEvent.click(screen.getByTitle(/more/i))
        fireEvent.click(screen.getByText(/edit/i))

        userEvent.type(screen.getByDisplayValue('body'), '1{esc}')

        expect(screen.getByText(/body/i)).toBeInTheDocument()
    })

    test('should delete comment', () => {
        const requestDeleteCommentMock = useModuleMock('Redux/Comments/actions', 'requestDeleteComment')
        selectCommentByIdMock.mockReturnValue({
            text: 'body###status::COMPLETED',
            author: {
                id: 1,
                displayName: '',
                email: '',
                username: 'usrnm'
            },
            creationDate: 'created',
            lastEdit: null
        })
        useDispatchMock().mockReturnValue()

        render(<Comment id = {0} viewerId = {1} />)

        fireEvent.click(screen.getByTitle(/more/i))
        fireEvent.click(screen.getByText(/delete/i))

        expect(requestDeleteCommentMock).toHaveBeenCalledWith(0)
    })
})