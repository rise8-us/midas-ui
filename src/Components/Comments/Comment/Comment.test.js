import { fireEvent, render, screen, useDispatchMock, useModuleMock, userEvent } from 'Utilities/test-utils'
import { Comment } from './index'

describe('<Comment>', () => {

    const selectCommentByIdMock = useModuleMock('Redux/Comments/selectors', 'selectCommentById')
    const selectUserLoggedInMock = useModuleMock('Redux/Auth/selectors', 'selectUserLoggedIn')

    const userMock = {
        id: 42,
        isAdmin: false
    }

    beforeEach(() => {
        selectUserLoggedInMock.mockReturnValue(userMock)
        useDispatchMock().mockReturnValue()
    })

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

        render(<Comment id = {0} />)

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

        expect(screen.getByText('status | Completed')).toBeInTheDocument()
    })

    test('should edit and save comment', () => {
        selectCommentByIdMock.mockReturnValue({
            text: 'body###status::COMPLETED',
            author: {
                id: 42,
                displayName: '',
                email: '',
                username: 'usrnm'
            },
            creationDate: 'created',
            lastEdit: null
        })

        render(<Comment id = {0} />)

        fireEvent.click(screen.getByTitle(/more/i))
        fireEvent.click(screen.getByText(/edit/i))

        userEvent.type(screen.getByDisplayValue('body'), '1{enter}')

        expect(screen.getByText(/body1/i)).toBeInTheDocument()
    })

    test('should edit and revert commentas user', () => {
        selectCommentByIdMock.mockReturnValue({
            text: 'body###status::COMPLETED',
            author: {
                id: 42,
                displayName: '',
                email: '',
                username: 'usrnm'
            },
            creationDate: 'created',
            lastEdit: null
        })

        render(<Comment id = {0} />)

        fireEvent.click(screen.getByTitle(/more/i))
        fireEvent.click(screen.getByText(/edit/i))

        userEvent.type(screen.getByDisplayValue('body'), '1{esc}')

        expect(screen.getByText(/body/i)).toBeInTheDocument()
    })

    test('should delete comment as user', () => {
        const requestDeleteCommentMock = useModuleMock('Redux/Comments/actions', 'requestDeleteComment')
        selectCommentByIdMock.mockReturnValue({
            text: 'body###status::COMPLETED',
            author: {
                id: 42,
                displayName: '',
                email: '',
                username: 'usrnm'
            },
            creationDate: 'created',
            lastEdit: null
        })

        render(<Comment id = {0} />)

        fireEvent.click(screen.getByTitle(/more/i))
        fireEvent.click(screen.getByText(/delete/i))

        expect(requestDeleteCommentMock).toHaveBeenCalledWith(0)
    })

    test('should see more Options dropdown as Admin', () => {
        selectUserLoggedInMock.mockReturnValue({ ...userMock, isAdmin: true })
        selectCommentByIdMock.mockReturnValue({
            text: 'body',
            author: {
                id: 42,
                displayName: 'Y',
            },
            creationDate: 'created',
            lastEdit: null
        })

        render(<Comment id = {0} />)

        expect(screen.getByTitle(/more/i)).toBeInTheDocument()
    })

    test('should not see more Options dropdown when not author or admin', () => {
        selectCommentByIdMock.mockReturnValue({
            text: 'body',
            author: {
                id: 1,
                displayName: 'Z',
            },
            creationDate: 'date',
            lastEdit: null
        })

        render(<Comment id = {0} />)

        expect(screen.queryByTitle(/more/i)).not.toBeInTheDocument()
    })
})