import { createMemoryHistory } from 'history'
import { fireEvent, renderWithRouter, screen, useDispatchMock, useModuleMock } from 'Utilities/test-utils'
import { BlockerRow } from './index'

describe('<BlockerRow />', () => {
    const history = createMemoryHistory()

    const selectAssertionByIdMock = useModuleMock('Redux/Assertions/selectors', 'selectAssertionById')
    const selectCommentByIdMock = useModuleMock('Redux/Comments/selectors', 'selectCommentById')
    const selectProductByIdMock = useModuleMock('Redux/Products/selectors', 'selectProductById')
    const requestSearchCommentsMock = useModuleMock('Redux/Comments/actions', 'requestSearchComments')

    const mockState = {
        app: {
            assertionStatus: {
                'BLOCKED': {
                    label: 'Blocked',
                    color: '#000000'
                },
                'AT_RISK': {
                    label: 'At Risk',
                    color: '#FFFFFF'
                }
            }
        }
    }

    beforeEach(() => {
        useDispatchMock().mockReturnValue()
        selectAssertionByIdMock.mockReturnValue({
            id: 1,
            text: 'assertion',
            status: 'BLOCKED'
        })
        selectProductByIdMock.mockReturnValue({
            id: 2,
            name: 'product'
        })
        selectCommentByIdMock.mockReturnValue({
            id: 3,
            text: 'comment###',
            creationDate: '2021-01-02 14:50:15',
            lastEdit: '2021-03-04 14:50:15'
        })
    })

    test('should render', () => {
        renderWithRouter(<BlockerRow assertionId = {1} productId = {2} commentId = {3}/>,
            { history, initialState: mockState })

        expect(screen.getByText('PRODUCT')).toBeInTheDocument()
        expect(screen.getByText('assertion')).toBeInTheDocument()
        expect(screen.getByText('Blocked')).toBeInTheDocument()
        expect(screen.getByText('comment')).toBeInTheDocument()
        expect(screen.getByText('04 MAR 21')).toBeInTheDocument()
    })

    test('should render no comment', () => {
        selectCommentByIdMock.mockReturnValue({
            text: ''
        })

        renderWithRouter(<BlockerRow assertionId = {1} productId = {2} commentId = {3}/>,
            { history, initialState: mockState })

        expect(screen.getByText('DD MMM YY')).toBeInTheDocument()
        expect(requestSearchCommentsMock).toHaveBeenCalled()
    })
    test('should render comment by CreationDate', () => {
        selectCommentByIdMock.mockReturnValue({
            text: 'comment###',
            creationDate: '2021-01-02 14:50:15'
        })

        renderWithRouter(<BlockerRow assertionId = {1} productId = {2} commentId = {3}/>,
            { history, initialState: mockState })

        expect(screen.getByText('02 JAN 21')).toBeInTheDocument()
    })

    test('should go to product', () => {
        renderWithRouter(<BlockerRow assertionId = {1} productId = {2} commentId = {3} />,
            { history, initialState: mockState })

        fireEvent.click(screen.getByText('PRODUCT'))

        expect(history.location.pathname).toEqual('/products/2')
    })

    test('should go to ogsm', () => {
        renderWithRouter(<BlockerRow assertionId = {1} productId = {2} commentId = {3} />,
            { history, initialState: mockState })

        fireEvent.click(screen.getByText('assertion'))

        expect(history.location.pathname).toEqual('/products/2/ogsms/1')
    })

})