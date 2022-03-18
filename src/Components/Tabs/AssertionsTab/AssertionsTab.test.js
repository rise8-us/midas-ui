import { createMemoryHistory } from 'history'
import { renderWithRouter, screen, useModuleMock } from 'Utilities/test-utils'
import { commentSidebarOpen } from './AssertionsTab'
import { AssertionsTab } from './index'

jest.mock('Components/Cards/OGSM/ObjectiveCard/ObjectiveCard',
    () => (function testing() { return (<div>ObjectiveCard</div>) }))

jest.mock('Components/Assertions/StrategiesContainer/StrategiesContainer',
    () => (function testing() { return (<div>StrategiesContainer</div>) }))

jest.mock('Components/Assertions/GoalsContainer/GoalsContainer',
    () => (function testing() { return (<div>GoalsContainer</div>) }))

jest.mock('Components/Assertions/AssertionComments/AssertionComments',
    () => (function testing() { return (<div>AssertionCommentsComponent</div>) }))

describe('<AssertionsTab>', () => {
    const history = createMemoryHistory()
    const selectAssertionCommentInfoMock = useModuleMock('Redux/AppSettings/selectors', 'selectAssertionCommentInfo')
    const setAssertionCommentMock = useModuleMock('Redux/AppSettings/reducer', 'setAssertionComment')
    const requestSearchAssertionsMock = useModuleMock('Redux/Assertions/actions', 'requestSearchAssertions')
    const selectAssertionsByProductIdMock = useModuleMock('Redux/Assertions/selectors', 'selectAssertionsByProductId')

    const allAssertions = [
        { id: 1, text: '', commentIds: [], parentId: null },
        { id: 2, text: '', commentIds: [], parentId: 1 }
    ]

    beforeEach(() => {
        selectAssertionsByProductIdMock.mockReturnValue(allAssertions)
        requestSearchAssertionsMock.mockReturnValue({ type: '/', payload: {} })
        setAssertionCommentMock.mockReturnValue({ type: '' })
        selectAssertionCommentInfoMock.mockReturnValue({ id: null, type: null })
    })

    test('should render', () => {
        renderWithRouter(<AssertionsTab productId = {0} hasEdit = {false}/>)

        expect(screen.getByText('Objectives, Goals, Strategies, and Measures')).toBeInTheDocument()
        expect(screen.getByText('ObjectiveCard')).toBeInTheDocument()
        expect(screen.getByText('StrategiesContainer')).toBeInTheDocument()
        expect(screen.getByText('GoalsContainer')).toBeInTheDocument()
    })

    test('should show comments', () => {
        selectAssertionCommentInfoMock.mockReturnValue({ id: 1, type: 'assertions' })

        renderWithRouter(<AssertionsTab productId = {0} hasEdit = {false}/>)

        expect(screen.getByText('AssertionCommentsComponent')).toBeInTheDocument()
    })

    test('commentSidebarOpen', () => {
        expect(commentSidebarOpen(1, null)).toEqual(false)
        expect(commentSidebarOpen(null, 'foo')).toEqual(false)
        expect(commentSidebarOpen(null, null)).toEqual(false)
        expect(commentSidebarOpen(2, 'foo')).toEqual(true)
    })

    test('should display objective blocker', () => {
        renderWithRouter(<AssertionsTab productId = {2} hasEdit = {false} />,
            { history, route: '/products/2/ogsms/1', path: '/products/2/ogsms/:assertionId' })

        expect(history.location.pathname).toEqual('/products/2/ogsms/1')
        expect(screen.getByTestId('AssertionRootIdentifier-true')).toBeInTheDocument()
        expect(screen.getByTestId('AssertionRootIdentifier-true')).toHaveTextContent(1)
    })

    test('should display strategy blocker', () => {
        renderWithRouter(<AssertionsTab productId = {2} hasEdit = {false} />,
            { history, route: '/products/2/ogsms/2', path: '/products/2/ogsms/:assertionId' })

        expect(history.location.pathname).toEqual('/products/2/ogsms/2')
        expect(screen.getByTestId('AssertionRootIdentifier-true')).toBeInTheDocument()
        expect(screen.getByTestId('AssertionRootIdentifier-true')).toHaveTextContent(1)
    })

    test('should display no assertions text', () => {
        selectAssertionsByProductIdMock.mockReturnValue([])

        renderWithRouter(<AssertionsTab productId = {2} hasEdit = {false} />)

        expect(screen.getByText('The current product has no OGSM\'s to view.')).toBeInTheDocument()
    })
})