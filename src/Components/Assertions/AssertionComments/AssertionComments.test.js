import { fireEvent, render, screen, useDispatchMock, useModuleMock, userEvent } from 'Utilities/test-utils'
import { generateIdBasedOnType } from './AssertionComments'
import { AssertionComments } from './index'

jest.mock('Components/Comments/Comment/Comment', () => (function testing() { return (<div>Comment</div>) }))

describe('<AssertionComments>', () => {

    const setAssertionCommentMock = useModuleMock('Redux/AppSettings/reducer', 'setAssertionComment')
    const requestCreateCommentMock = useModuleMock('Redux/Comments/actions', 'requestCreateComment')

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

    beforeEach(() => {
        useDispatchMock().mockReturnValue({})
    })

    afterEach(() => {
        useDispatchMock().mockReset()
    })

    test('should render', () => {
        render(<AssertionComments />, { initialState: mockState })

        expect(screen.getByPlaceholderText(/enter comment here.../i)).toBeInTheDocument()
    })

    test('should handle submit', () => {
        useDispatchMock().mockResolvedValue({ data: {} })

        render(<AssertionComments />, {
            initialState: {
                ...mockState,
                app: {
                    ...mockState.app,
                    assertionCommentId: 1,
                    assertionCommentType: 'assertions'
                }
            }
        })

        userEvent.type(screen.getByPlaceholderText(/enter comment here.../i), 'new comment{enter}')

        expect(requestCreateCommentMock).toHaveBeenCalledWith({
            assertionId: 1, measureId: null, text: 'new comment'
        })
    })

    test('should handle onClose', () => {
        render(<AssertionComments />, { initialState: mockState })

        fireEvent.click(screen.getByTestId('AssertionComments__icon-close'))

        expect(setAssertionCommentMock).toHaveBeenCalledWith({
            assertionId: null,
            deletedAssertionId: null,
            type: null
        })
    })

    test('should set height', () => {
        render(<AssertionComments />, { initialState: {
            assertions: { ...mockState.assertions },
            app: {
                assertionStatus: { },
                pageScrollY: -289
            }
        } })

        expect(screen.getByTestId('AssertionComment__paper')).toHaveStyle('height: 358px')
    })

    test('generateIdBasedOnType - should return correct ids', () => {
        expect(generateIdBasedOnType('assertions', 1)).toEqual({ assertionId: 1, measureId: null })
        expect(generateIdBasedOnType('measures', 2)).toEqual({ assertionId: null, measureId: 2 })
        expect(generateIdBasedOnType('foobar', 2)).toEqual({ assertionId: null, measureId: null })
    })

})